<template>
  <div v-if="course">
    <h1 class="mb-4">{{ course.title }}</h1>
    <p>{{ course.description }}</p>
    <button v-if="!isEnrolled" @click="enroll(course.id)" class="btn btn-success mb-4">Записаться на курс</button>
    <hr>
    <div class="mb-4">
      <h3>Уроки</h3>
      <div class="list-group">
        <div class="list-group-item" v-for="lesson in course.lessons" :key="lesson.id">
          <h5>{{ lesson.title }}</h5>
          <p>{{ lesson.content }}</p>
          <p v-if="lesson.video_url">
            <a :href="lesson.video_url" target="_blank" class="btn btn-secondary">Смотреть видео</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState('course', ['course']),
    ...mapGetters('course', ['isEnrolled']),
  },
  created() {
    this.loadCourse();
  },
  methods: {
    ...mapActions('course', ['fetchCourse', 'enroll']),
    async loadCourse() {
      const id = this.$route.params.id;
      await this.fetchCourse(id);
    },
  },
};
</script>