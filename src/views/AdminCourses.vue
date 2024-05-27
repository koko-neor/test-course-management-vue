<template>
  <div>
    <h1 class="mb-4">Управление курсами</h1>
    <form @submit.prevent="createCourse" class="mb-4">
      <div class="mb-3">
        <input v-model="title" class="form-control" placeholder="Заголовок" required>
      </div>
      <div class="mb-3">
        <textarea v-model="description" class="form-control" placeholder="Описание" required></textarea>
      </div>
      <div class="mb-3">
        <input v-model="category" class="form-control" placeholder="Категория" required>
      </div>
      <button type="submit" class="btn btn-success">Создать курс</button>
    </form>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="course in courses" :key="course.id">
        <CourseCard :course="course" />
        <div class="mt-2">
          <button @click="deleteCourse(course.id)" class="btn btn-danger">Удалить</button>
          <router-link :to="{ name: 'edit-course', params: { id: course.id } }" class="btn btn-warning">Редактировать</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CourseCard from '../components/CourseCard.vue';

export default {
  data() {
    return {
      title: '',
      description: '',
      category: '',
    };
  },
  computed: {
    ...mapState('course', ['courses']),
  },
  created() {
    this.loadCourses();
  },
  methods: {
    ...mapActions('course', ['fetchCourses', 'createCourse', 'deleteCourse']),
    loadCourses() {
      this.fetchCourses();
    },
  },
  components: {
    CourseCard,
  },
};
</script>