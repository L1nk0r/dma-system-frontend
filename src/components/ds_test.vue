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


