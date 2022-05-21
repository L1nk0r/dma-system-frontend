<template>
   <div class="wrapper_reg">
      <form>
         <h1>Sign in</h1>

         <h3>Имя</h3>
         <input placeholder="Иван Иванов..."/>

         <h3>Логин</h3>
         <input placeholder="login..."/>

         <h3>Пароль</h3>
         <input placeholder="password..." type="password" />

         <p>Уже есть аккаунт? <router-link to="/login"><a href="#">Войти</a></router-link></p>

         <button @click="signIn()">Зарегистрироваться</button>

      </form>
   </div>
</template>

<script>

export default{
   data(){
      return {}
   },
   methods:{
      signIn(){
         fetch('http://localhost:3000/users')
      }
   }
 }
</script>