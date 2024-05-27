<template>
  <div v-if="course">
    <h1 class="mb-4">Редактировать курс</h1>
    <form @submit.prevent="submitUpdateCourse" class="mb-4">
      <div class="mb-3">
        <input v-model="course.title" class="form-control" placeholder="Название" required>
      </div>
      <div class="mb-3">
        <textarea v-model="course.description" class="form-control" placeholder="Описание" required></textarea>
      </div>
      <div class="mb-3">
        <input v-model="course.category" class="form-control" placeholder="Категория" required>
      </div>
      <button type="submit" class="btn btn-success">Обновить курс</button>
    </form>
    <h2 class="mb-4">Управление уроками</h2>
    <form @submit.prevent="submitCreateLesson" class="mb-4">
      <div class="mb-3">
        <input v-model="lessonTitle" class="form-control" placeholder="Название урока" required>
      </div>
      <div class="mb-3">
        <textarea v-model="lessonContent" class="form-control" placeholder="Содержание урока" required></textarea>
      </div>
      <div class="mb-3">
        <input v-model="lessonOrder" type="number" class="form-control" placeholder="Порядок урока" required>
      </div>
      <div class="mb-3">
        <input v-model="lessonVideoUrl" class="form-control" placeholder="URL видео">
      </div>
      <button type="submit" class="btn btn-primary">Добавить урок</button>
    </form>
    <div v-if="course.lessons && course.lessons.length" class="list-group">
      <div class="list-group-item" v-for="lesson in course.lessons" :key="lesson.id">
        <h5>{{ lesson.title }}</h5>
        <p>{{ lesson.content }}</p>
        <p>Порядок: {{ lesson.order }}</p>
        <p v-if="lesson.video_url">
          <a :href="lesson.video_url" target="_blank" class="btn btn-secondary">Смотреть видео</a>
        </p>
        <button @click="submitEditLesson(lesson)" class="btn btn-warning me-2">Редактировать</button>
        <button @click="submitDeleteLesson(lesson.id)" class="btn btn-danger">Удалить</button>
      </div>
    </div>
    <div v-else>
      <p>Для этого курса нет уроков.</p>
    </div>

    <div class="modal fade" id="editLessonModal" tabindex="-1" aria-labelledby="editLessonModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editLessonModalLabel">Редактировать урок</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitUpdateLesson">
              <div class="mb-3">
                <input v-model="editingLesson.title" class="form-control" placeholder="Название урока" required>
                <div v-if="errors.title" class="text-danger">{{ errors.title[0] }}</div>
              </div>
              <div class="mb-3">
                <textarea v-model="editingLesson.content" class="form-control" placeholder="Содержание урока" required></textarea>
                <div v-if="errors.content" class="text-danger">{{ errors.content[0] }}</div>
              </div>
              <div class="mb-3">
                <input v-model="editingLesson.order" type="number" class="form-control" placeholder="Порядок урока" required>
                <div v-if="errors.order" class="text-danger">{{ errors.order[0] }}</div>
              </div>
              <div class="mb-3">
                <input v-model="editingLesson.video_url" class="form-control" placeholder="URL видео">
                <div v-if="errors.video_url" class="text-danger">{{ errors.video_url[0] }}</div>
              </div>
              <button type="submit" class="btn btn-success">Обновить урок</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Загрузка...</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default {
  data() {
    return {
      lessonTitle: '',
      lessonContent: '',
      lessonOrder: '',
      lessonVideoUrl: '',
      editingLesson: {},
      errors: {}
    };
  },
  computed: {
    ...mapState('course', ['course']),
  },
  async created() {
    await this.fetchCourse(this.$route.params.id);
  },
  methods: {
    ...mapActions('course', ['fetchCourse', 'updateCourse', 'createLesson', 'updateLesson', 'deleteLesson']),
    submitEditLesson(lesson) {
      this.editingLesson = { ...lesson };
      this.errors = {};
      const modal = new bootstrap.Modal(document.getElementById('editLessonModal'));
      modal.show();
    },
    async submitUpdateCourse() {
      try {
        await this.updateCourse(this.course);
        this.$router.push({ name: 'admin-courses' });
      } catch (error) {
        console.error('Error updating course:', error);
      }
    },
    async submitCreateLesson() {
      try {
        await this.createLesson({
          course_id: this.course.id,
          title: this.lessonTitle,
          content: this.lessonContent,
          order: this.lessonOrder,
          video_url: this.lessonVideoUrl
        });
        this.lessonTitle = '';
        this.lessonContent = '';
        this.lessonOrder = '';
        this.lessonVideoUrl = '';
        this.errors = {};
      } catch (error) {
        if (error.response && error.response.data.errors) {
          this.errors = error.response.data.errors;
        } else {
          console.error('Error creating lesson:', error);
        }
      }
    },
    async submitUpdateLesson() {
      try {
        const lessonData = {
          ...this.editingLesson,
          course_id: this.course.id,
        };
        await this.updateLesson(lessonData);
        const modal = bootstrap.Modal.getInstance(document.getElementById('editLessonModal'));
        modal.hide();
        this.errors = {};
      } catch (error) {
        if (error.response && error.response.data.errors) {
          this.errors = error.response.data.errors;
        } else {
          console.error('Error updating lesson:', error);
        }
      }
    },
    async submitDeleteLesson(id) {
      try {
        await this.deleteLesson({ lessonId: id, courseId: this.course.id });
      } catch (error) {
        console.error('Error deleting lesson:', error);
      }
    }
  }
};
</script>

<style scoped>
.edit-course {
  max-width: 800px;
  margin: auto;
}

.card {
  margin-top: 20px;
}
</style>