<template>
  <div class="auth-container">
    <div class="auth-form">
      <h2 class="auth-title">Форма входа</h2>
      <form @submit.prevent="performLogin">
        <div class="input-group">
          <input v-model="email" placeholder="Email" required>
        </div>
        <div class="input-group">
          <input type="password" v-model="password" placeholder="Password" required>
        </div>
        <button type="submit" class="auth-button">АВТОРИЗОВАТЬСЯ</button>
      </form>
      <p class="auth-link">У вас нет учетной записи? <router-link to="/register">Зарегистрироваться</router-link></p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions('user', ['login']),
    async performLogin() {
      try {
        await this.login({
          email: this.email,
          password: this.password,
        });
        this.$router.push('/');
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
  },
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.auth-form {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.auth-title {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.auth-button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.auth-button:hover {
  background: linear-gradient(90deg, #2575fc 0%, #6a11cb 100%);
}

.auth-link {
  margin-top: 1rem;
  font-size: 0.875rem;
}
</style>