<template>
  <div class="wrapper_reg">
    <form>
      <h1>Sign in</h1>

      <h3>Имя</h3>
      <input placeholder="Иван Иванов..." />

      <h3>Логин</h3>
      <input type="text" placeholder="login..." v-model="this.login" />

      <h3>Пароль</h3>
      <input
        placeholder="password..."
        type="password"
        v-model="this.password"
      />

      <p>
        Уже есть аккаунт?
        <router-link to="/login"><a href="#">Войти</a></router-link>
      </p>

      <button @click="handleRegister()" type="button">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      login: "",
      password: "",
      response: ""
    };
  },
  computed: {
    ...mapGetters(["getServerUrl"]),
  },
  methods: {
    handleRegister() {
      const data = {
        login: this.login,
        password: this.password
      };

      axios
        .post(`${this.getServerUrl}/registration`, data)
        .then((response) => (this.response = response))
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
  },
};
</script>
