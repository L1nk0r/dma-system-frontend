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


<style scoped>
   .wrapper_reg{
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: url("@/assets/background.png");
      background-repeat: no-repeat;
      
   }

   form{
      padding: 30px;
      border: 1px solid black;
      border-radius: 15px;
      flex-wrap: wrap;
      width: 40%;
   }

   form input{
      font-family: 'Montserrat';

      border: none;
      font-size: 20px;
      width: 100%;

      color: rgba(191, 159, 128, 0.3);

      border-bottom: 1px solid rgba(191, 159, 128, 0.3);

      transition: 0.4s;
   }

   form h3{
      color: rgba(191, 159, 128, 0.9);
      font-family: 'Montserrat';
   }

   form a{
      text-decoration: none;
      color: #232EC1;
   }

   ::placeholder{
      color: rgba(191, 159, 128, 0.3);
   }

   form input:focus{
      outline: none;
      color: rgba(191, 159, 128, 0.9);
      border-bottom: 1px solid rgba(191, 159, 128, 0.9);
   }

   form h1{
      font-family: Snyder Speed Brush Cyr;
   }

   form p{
      margin-top: 20px;
      font-family: 'Montserrat';
      margin-left: 33%;
   }

   form button{
      margin-top: 20px;
      margin-left: 25%;
      border: none;

      background: rgba(191, 159, 128, 0.7);

      font-family: 'Montserrat';

      box-sizing: border-box;
      border-radius: 15px;

      transition: 0.6s;
      padding: 15px;
      width: 50%;
      font-size: 24px;
      color: #fff;
   }

   form button:hover{
      cursor: pointer;

      background: rgba(191, 159, 128, 1);
   }

   @font-face {
      font-family: Snyder Speed Brush Cyr;
      src: url("../assets/snyderspeedbrushcyr_regular.ttf");
   }
</style>