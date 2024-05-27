import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import CourseDetail from '../views/CourseDetail.vue';
import AdminCourses from '../views/AdminCourses.vue';
import EditCourse from '../views/EditCourse.vue';
import MyCourses from '../views/MyCourses.vue';

const routes = [
    { path: '/', component: Home, name: 'home' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/course/:id', component: CourseDetail, name: 'course' },
    { path: '/admin/courses', component: AdminCourses, name: 'admin-courses' },
    { path: '/admin/courses/:id/edit', component: EditCourse, name: 'edit-course' },
    { path: '/my-courses', component: MyCourses, name: 'my-courses' }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if ((to.name === 'admin-courses' || to.name === 'edit-course' || to.name === 'my-courses') && !token) {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router;