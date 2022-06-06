<template>
  <div class="wrapper_log">
    <form>
      <h1>Log in</h1>

      <h3>Логин</h3>
      <input placeholder="login..." v-model="login"/>

      <h3>Пароль</h3>
      <input placeholder="password..." type="password" v-model="password"/>

      <p>
        Если всё ещё нет аккаунта,
        <router-link to="/reg"><a href="#">зарегистрируйтесь</a></router-link>
        прямо сейчас!
      </p>

      <button @click="handleLogin()" type="button">Войти</button>

      <!-- <p class="token">{{ this.response }}</p> -->
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
  created() {
    /* localStorage.removeItem('user'); */
  },
};
</script>

<style scoped>
  .token{
    background: rgba(0, 255, 0, 0.1);
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: center;

    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 15%;
    height: 100px;
    padding: 10px;
    margin-top: 20px;
    flex-wrap: wrap;
    font-family: 'Courier New', Courier, monospace;
    font-size: 5px;
  }
</style>