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
import User from "../models/user";

export default {
  data() {
    return {
      user: new User("", ""),
    };
  },
  methods: {
    submit() {
      this.$router.push("/tests");
    },
    handleLogin() {
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
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/tests");
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap");

.wrapper_log {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("@/assets/background.png");
  background-repeat: no-repeat;
}

form {
  padding: 30px;
  border: 1px solid black;
  border-radius: 15px;
  flex-wrap: wrap;
}

form input {
  font-family: "Montserrat";

  border: none;
  font-size: 20px;
  width: 100%;

  color: rgba(191, 159, 128, 0.3);

  border-bottom: 1px solid rgba(191, 159, 128, 0.3);

  transition: 0.4s;
}

form h3 {
  color: rgba(191, 159, 128, 0.9);
  font-family: "Montserrat";
}

form a {
  text-decoration: none;
  color: #232ec1;
}

::placeholder {
  color: rgba(191, 159, 128, 0.3);
}

form input:focus {
  outline: none;
  color: rgba(191, 159, 128, 0.9);
  border-bottom: 1px solid rgba(191, 159, 128, 0.9);
}

form h1 {
  font-family: Snyder Speed Brush Cyr;
}

form p {
  margin-top: 20px;
  font-family: "Montserrat";
}

form button {
  margin-top: 20px;
  margin-left: 25%;
  border: none;

  background: rgba(191, 159, 128, 0.7);

  font-family: "Montserrat";

  box-sizing: border-box;
  border-radius: 15px;

  transition: 0.6s;
  padding: 15px;
  width: 50%;
  font-size: 24px;
  color: #fff;
}

form button:hover {
  cursor: pointer;

  background: rgba(191, 159, 128, 1);
}

@font-face {
  font-family: Snyder Speed Brush Cyr;
  src: url("../assets/snyderspeedbrushcyr_regular.ttf");
}
</style>
