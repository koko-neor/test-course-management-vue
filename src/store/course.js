import axios from './../axios';

const state = {
    courses: [],
    course: null,
};

const mutations = {
    setCourses(state, courses) {
        state.courses = courses;
    },
    setCourse(state, course) {
        state.course = course;
    },
    clearCourses(state) {
        state.courses = [];
    },
    enrollInCourse(state, courseId) {
        const course = state.courses.find(course => course.id === courseId);
        if (course) {
            course.isEnrolled = true;
        }
    }
};

const actions = {
    async fetchCourses({ commit }) {
        try {
            const response = await axios.get('/api/courses', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            commit('setCourses', response.data.data);
        } catch (error) {
            console.error('Ошибка загрузки курсов:', error);
            throw error;
        }
    },
    async fetchCourse({ commit }, id) {
        try {
            const response = await axios.get(`/api/courses/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            commit('setCourse', response.data.data);
        } catch (error) {
            console.error('Ошибка загрузки курса:', error);
            throw error;
        }
    },
    async createCourse({ dispatch }, courseData) {
        try {
            await axios.post('/api/courses', courseData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch('fetchCourses');
        } catch (error) {
            console.error('Ошибка создания курса:', error);
            throw error;
        }
    },
    async updateCourse({ dispatch }, courseData) {
        try {
            await axios.put(`/api/courses/${courseData.id}`, courseData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch('fetchCourses');
        } catch (error) {
            console.error('Ошибка обновления курса:', error);
            throw error;
        }
    },
    async deleteCourse({ dispatch }, id) {
        try {
            await axios.delete(`/api/courses/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch('fetchCourses');
        } catch (error) {
            console.error('Ошибка удаления курса:', error);
            throw error;
        }
    },
    async createLesson({ dispatch }, lessonData) {
        try {
            await axios.post(`/api/courses/${lessonData.course_id}/lessons`, lessonData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch('fetchCourse', lessonData.course_id);
        } catch (error) {
            console.error('Ошибка создания урока:', error);
            throw error;
        }
    },
    async updateLesson({ dispatch }, lessonData) {
        try {
            await axios.put(`/api/lessons/${lessonData.id}`, lessonData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch('fetchCourse', lessonData.course_id);
        } catch (error) {
            console.error('Ошибка обновления урока:', error);
            throw error;
        }
    },
    async deleteLesson({ dispatch }, { lessonId, courseId }) {
        try {
            await axios.delete(`/api/lessons/${lessonId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch('fetchCourse', courseId);
        } catch (error) {
            console.error('Ошибка удаления урока:', error);
            throw error;
        }
    },
    async enroll({ commit }, courseId) {
        try {
            await axios.post(`/api/courses/${courseId}/enroll`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            commit('enrollInCourse', courseId);
        } catch (error) {
            console.error('Ошибка записи на курс:', error);
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('Произошла ошибка при записи на курс.');
            }
        }
    },
    async searchCourses({ commit }, keyword) {
        try {
            const response = await axios.get('/api/search', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                params: {
                    keyword: keyword
                }
            });
            commit('setCourses', response.data.data);
        } catch (error) {
            console.error('Ошибка поиска курсов:', error);
            throw error;
        }
    },
};

const getters = {
    allCourses: state => state.courses,
    singleCourse: state => state.course,
    isEnrolled: state => state.course && state.course.isEnrolled
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};