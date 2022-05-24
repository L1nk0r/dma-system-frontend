<template>
  <div class="wrapper_log">
    <form>
      <h1>Log in</h1>

      <h3>Логин</h3>
      <input placeholder="login..." />

      <h3>Пароль</h3>
      <input placeholder="password..." type="password" />

      <p>
        Если всё ещё нет аккаунта,
        <router-link to="/reg"><a href="#">зарегистрируйтесь</a></router-link>
        прямо сейчас!
      </p>

      <button @click="handleLogin()" type="button">Войти</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      login: '',
      password: '',
      response: ''
    };
  },
  methods: {
    handleLogin(){
      const data = {
        login: this.login,
        password: this.password
      };

      axios
        .post(`${this.getServerUrl}/login`, data)
        .then(response => {
          if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }
          return response.data;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    }
  },
  computed: {
    ...mapGetters(["getServerUrl"]),
  },
  created() { },
};
</script>
