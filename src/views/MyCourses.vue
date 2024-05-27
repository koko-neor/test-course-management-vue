<template>
  <div>
    <h1 class="mb-4">Мои курсы</h1>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="course in myCourses" :key="course.id">
        <CourseCard :course="course" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CourseCard from '../components/CourseCard.vue';

export default {
  computed: {
    ...mapState('course', ['myCourses']),
  },
  created() {
    this.loadMyCourses();
  },
  methods: {
    ...mapActions('course', ['fetchMyCourses']),
    loadMyCourses() {
      this.fetchMyCourses();
    },
  },
  components: {
    CourseCard,
  },
};
</script>