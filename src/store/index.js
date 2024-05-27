import { createStore } from 'vuex';
import user from './user';
import course from './course';

export default createStore({
    modules: {
        user,
        course,
    },
});