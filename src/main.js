import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from './axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

axios.get('/sanctum/csrf-cookie').then(() => {
    createApp(App).use(store).use(router).mount('#app');
}).catch(error => {
    console.error('CSRF token fetch failed:', error);
});