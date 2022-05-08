<template>
   <div class="test_content_wrapper">
      <div class="test_content">

         <p v-if="CUR_TEST === null">No such test</p>
         <div v-else>

         

            <h1> {{ CUR_TEST.name }} </h1>
            <p> {{ CUR_TEST.description }} </p>
            <div 
               v-for="(cat, index) in CUR_TEST.categories"
               :key="index">

               <div
                  v-for="(s_cat, index) in cat.categories"
                  :key="index">
                     <p>{{ cat.name }}/{{ s_cat.name}} </p>
                     <div v-for="(que, index) in s_cat.questions"
                           :key="index">
                           <p>{{ que.question }}</p>
                           <div v-for="(ans, index) in que.answers"
                              :key="index">
                              <p>{{ ans.text }} : {{ ans.weight }}</p>
                              
                        </div>
                     </div>
               </div>
            </div>

         
         </div>

      </div>
   </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { useRoute } from "vue-router";
export default{
   name: 'dsTest',
   data(){
      return {
         questionIndex: 0
      }
   },
   components:{},
   props:{},
   computed:{
      ...mapGetters(["CUR_TEST"]),
   },
   methods:{
      ...mapActions(["GET_ONE_TEST_FROM_API"]),
      next(){
         this.questionIndex++;
      },
      prev(){
         this.questionIndex--;
      }
   },
   created(){
      let testId = useRoute().params.id;
      /* this.$route.params.id */
      this.GET_ONE_TEST_FROM_API(testId)
      .then((response) => {
         if (response.data) {
            console.log("Test arrived!");
         }
    });
   }
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
