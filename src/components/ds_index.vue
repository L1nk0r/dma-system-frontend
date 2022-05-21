<template>
   <div class="container_index">

      <nav class="nav_index">
         <button class="logIn" @click="goToLogin()">Вход</button>
         <button class="signIn" @click="goToReg()">Регистрация</button>
      </nav>
      
      <div class="header_index">
         <p>Добро пожаловать в</p>
         <h1>Dma-system</h1>
      </div>
      
      <div class="wrapper_index">
         <div class="facts">
            <h1>Facts</h1>
            <p>Interesting facts. Maybe some teories, words, links, цитаты великих людей, еще что-то, я пока это все не придумала</p>
         </div>
         <div class="about">
            <h1>About</h1>
            <p>Some words about the system, creation, idea. Some words about the system, creation, idea.</p>
         </div>
         <div class="stat">
            <h1>Statistics</h1>
            <img alt='' src="../assets/bar.png" />
         </div>
      </div>

      <footer>
         <p>Made by Angelina Maltseva and Boris Kozlov</p>
      </footer>
   </div>
</template>

<script>

export default{
   data(){
      return { }
   },
   methods:{
      goToLogin(){
         this.$router.push('/login');
      },
      goToReg(){
         this.$router.push('/reg');
      }
    },
   components: { }
}
</script>

