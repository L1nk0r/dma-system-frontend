<template>
   <div class="test_content_wrapper">
      <div class="test_content">

         <p v-if="CUR_TEST === null">No such test</p>
         <div v-else class="t_description">

         

            <h1> {{ CUR_TEST.name }} </h1>
            <p style="margin-left:50px;"> {{ CUR_TEST.description }} </p>

            <div class="raw">
               <h4>Ваша почта:</h4>
               <input
                type="text"
                class="input_field"
                placeholder="Please input your email here"
                v-model="this.user_name"
                @change="changePassingName()"
              />
            </div>

            

            <div 
               v-for="(cat, index) in CUR_TEST.categories"
               :key="index"
               class="cat_content">

               <p>{{ cat.name }}</p>

               <div
                  v-for="(s_cat, index) in cat.categories"
                  :key="index" class="subcat_content">
                     <p>{{ s_cat.name}} </p>
                     <ds-result-answer v-for="(que, index) in s_cat.questions"
                           :key="index"
                           class="que_content"
                           :question=que
                           @changeAnswerId="addNewAnswer">
                           
                     </ds-result-answer>
               </div>

               <ds-result-answer v-for="(que, index) in cat.questions"
                           :key="index"
                           class="que_content"
                           :question=que
                           @changeAnswerId="addNewAnswer">
                           
               </ds-result-answer>
            </div>

            <button
            class="submitBtn"
            @click="publishResults()">
            Завершить </button>
         </div>

      </div>
   </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { useRoute } from "vue-router";
import dsResultAnswer from "./ds_result_answer.vue"

export default{
   name: 'dsTest',
   data(){
      return {
         questionIndex: 0,
         value: '',
         results: [],
         user_name: ''
      }
   },
   components:{
      dsResultAnswer
   },
   props:{},
   computed:{
      ...mapGetters(["CUR_TEST", "RESULT_ARRAY"]),
   },
   methods:{
      ...mapActions(["GET_ONE_TEST_FROM_API", "ADD_ANSWER_TO_ARRAY", "SET_RESULT_NAME", "SET_PASS_TEST"]),
      next(){
         this.questionIndex++;
      },
      prev(){
         this.questionIndex--;
      },
      addNewAnswer(data){
         this.ADD_ANSWER_TO_ARRAY(data);
      },
      changePassingName(){
         this.SET_RESULT_NAME(this.user_name);
      },
      publishResults(){
         this.SET_PASS_TEST();
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
      /* height: 100vh; */
   }

   .test_content{
      width: 70%;
      /* border: 1px solid black; */
      border-radius: 25px;
      /* height: 70vh; */
      background: #E9E5DC80; 
      display: flex;
      padding: 30px;
      font-family: "Montserrat", sans-serif;
      flex-direction: column;
      margin-top: 100px;
   }

   .test_content h1{
      margin-left: 50px;
      margin-top: 100px;
      font-size: 36px;
      font-weight: 700;
   }

   .t_description{
      font-size: 24px;
   }

   /* .test_content p{
      margin-left: 50px;
      font-size: 24px;
      font-weight: 400;
   } */

   .cat_content{
      margin-left: 70px;
   }

   .subcat_content{
      margin-left: 40px;
   }

   .que_content{
      margin-left: 40px;
   }

   /* *{
      border: 1px dashed black;
   } */
</style>
