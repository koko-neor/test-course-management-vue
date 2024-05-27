import axios from './../axios';

const state = {
    user: null,
    token: localStorage.getItem('token') || '',
};

const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setToken(state, token) {
        state.token = token;
    },
    clearAuthData(state) {
        state.user = null;
        state.token = '';
    },
};

const actions = {
    async login({ commit }, credentials) {
        const response = await axios.post('/api/login', credentials);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        commit('setUser', response.data.user);
        commit('setToken', response.data.token);
    },
    async register({ dispatch }, userData) {
        await axios.post('/api/register', userData);
        await dispatch('login', {
            email: userData.email,
            password: userData.password,
        });
    },
    logout({ commit }) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        commit('clearAuthData');
        commit('course/clearCourses', null, { root: true });
    },
};

const getters = {
    isAuthenticated: state => !!state.token,
    isAdmin: state => state.user && state.user.role === 'admin',
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};