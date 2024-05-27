<template>
  <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title">{{ course.title }}</h5>
      <p class="card-text">{{ course.description }}</p>
      <router-link :to="{ name: 'course', params: { id: course.id } }" class="btn btn-primary">Просмотреть курс</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
};
</script>