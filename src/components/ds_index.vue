<template>
   <div class="container">

      <nav>
         <button class="logIn" @click="goToLogin()">Вход</button>
         <button class="signIn" @click="goToReg()">Регистрация</button>
      </nav>
      
      <div class="header">
         <p>Добро пожаловать в</p>
         <h1>Dma-system</h1>
      </div>
      
      <div class="wrapper">
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
            <!-- <div class="stat__content">
               <div class="d1">
                  <img alt='' src="../assets/rec1.png"/>
               </div>
               <div class="d2">
                  
               </div>
               <div class="d3">
                  <p>-one</p>
                  <p>-two</p>
               </div>
            </div> -->
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

<style scoped>
   @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

   :root{
      --black: #000105;
      --blue: #232EC1;
      --brown: #BF9F80;
      --white: #FFFFFF;
      --light-gray: #E9E5DC;
      --red: #E54C37;
   }

   .header{
      margin-left: 14%;
      padding: 0%;
   }

   .header p{
      font-size: 48px;
      color: rgba(191, 159, 128, 0.5);
      font-family: 'Montserrat', sans-serif;
      margin: 0;
   }

   .container{
      /* display: flex;
      align-content: center;
      justify-content: center; */
      color: #000105;
      background-image: url("../assets/background.png");
      background-repeat: no-repeat;
      background-position: 0ch;
      height: 100vh;
      flex-direction: column;
      margin: 0px auto;
   }

   .header h1{
      font-family: Snyder Speed Brush Cyr;
      font-size: 96px;
      margin: 0;
   }

   nav{
      display: flex;
      width: 100%;
      align-items: center;
      flex-wrap: wrap;
      padding: 20px 0;
   }

   nav button{
      width: 200px;
      height: 50px;

      cursor: pointer;

      background: none;

      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      color: #BF9F80;
   }

   nav .logIn{
      margin-left: 70%;
      border: none;
   }

   nav .signIn{
      border: 1px solid #BF9F80;
      box-sizing: border-box;
      border-radius: 15px;

      transition: 0.6s;
   }

   nav router-link{
      text-decoration: none;
   }

   nav .signIn:hover{
      background-color: #BF9F80;
      color: #fff;
   }

   .wrapper{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      margin-left: 12%;
      margin-top: 3%;
   }

   .wrapper div{
      width: 320px;
      height: 100%;

      background: rgba(233, 229, 220, 0.5);
      border-radius: 47px;

      padding: 20px;
      transition: 0.4s;
   }

   .wrapper div h1{
      font-family: 'Montserrat';
      font-weight: 700;
      margin-left: 10px;
      font-size: 36px;
   }

   /* .wrapper div img{
      width: 90%;
   } */

   .wrapper div p{
      font-family: 'Montserrat';
      font-weight: 400;
      font-size: 24px;
      margin-left: 10px;
      line-height: 29px;
   }

   .wrapper .about{
      background: rgba(233, 229, 220, 1);
   }

   .wrapper .stat{
      background: none;
      border: 2px solid #BF9F80;
   }

   /* .wrapper .stat .stat__content{
      display: grid;
      grid-template-columns: 1fr 1fr 2fr;
      background: none;
   }

   .wrapper .stat .stat__content div{
      background: red;
      width: 10px;
      height: 118px;
      border-radius: 10px;
      display: block;
   }

   .wrapper .stat .stat__content .d3{
      width: 100%;
      border: none;
      background: none;
   } */

   footer{
      width: 60%;
      background: none;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 20%;
      margin-top: 70px;

      border-top: 1px solid #BF9F80;

      font-family: 'Montserrat';

      color: rgba(191, 159, 128, 0.6);
   }

   @font-face {
      font-family: Snyder Speed Brush Cyr;
      src: url("../assets/snyderspeedbrushcyr_regular.ttf");
   }
</style>
