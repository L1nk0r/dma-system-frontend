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

      <button @click="submit()">Войти</button>
    </form>
  </div>
</template>

<script>
/* import User from "../models/user"; */

export default {
  data() {
    /* return {
      user: new User("", ""),
    }; */
  },
  methods: {
    submit() {
      this.$router.push("/tests");
    },
    /* handleLogin() {
      this.loading = true;
      this.$store.dispatch("auth/login", this.user).then(
        () => {
          this.$router.push("/profile");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response && error.response.data) ||
            error.message || error.toString();
        }
      );
    }, */
  },
  computed: {
    /* loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }, */
  },
  created() {
    /* if (this.loggedIn) {
      this.$router.push("/tests");
    } */
  },
};
</script>
