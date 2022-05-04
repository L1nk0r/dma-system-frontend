<template>
   <div class="test_content_wrapper">
      <div class="test_content">
         <h1>Test name</h1>
         <p>Interesting facts. Maybe some teories, words, links, цитаты великих людей, еще что-то, я пока это все не придумала</p>
      </div>
   </div>
</template>

<script>
export default{
   name: 'dsTest',
   data(){
      return {}
   },
   components:{},
   props:{},
   methods:{}
}
</script>

<style>
   @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap");

   .test_content_wrapper{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: url("../assets/background.png");
      height: 100vh;
   }

   .test_content{
      width: 70%;
      /* border: 1px solid black; */
      border-radius: 25px;
      height: 70vh;
      background: #E9E5DC80; 
      display: flex;
      padding: 30px;
      font-family: "Montserrat", sans-serif;
      flex-direction: column;
   }

   .test_content h1{
      margin-left: 50px;
      margin-top: 100px;
      font-size: 36px;
      font-weight: 700;
   }

   .test_content p{
      margin-left: 50px;
      font-size: 24px;
      font-weight: 400;
   }
</style>
