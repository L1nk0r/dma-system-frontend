<template>
   <div 
      class="cart"
      @click="modalVisible = true"
   >
      <div class="cart_header">
         <h3>{{ cart_data.name }}</h3>

         <el-tag
            v-if="this.getStatus() === 'Closed'"
            type="success">            
            Closed
         </el-tag>

         <el-tag
            v-if="this.getStatus() === 'Published'"
            type="info">            
            Published
         </el-tag>

         <el-tag
            v-if="this.getStatus() === 'In process' || this.getStatus() === 'Approved'">            
            {{this.getStatus()}}
         </el-tag>
      </div>
      <div class="description">
         <p>
            {{ cart_data.description}}
         </p>
      </div>
      <div class="test_progress" v-if="this.getStatus() === 'Published'">
         <p>
            {{ this.getPeopleAmount() }}
         </p>
      </div>

   </div>

   <el-dialog v-model="modalVisible" title="Edit test">
      <div class="test_edit_container">


      
         <el-steps :active="this.active" finish-status="success">
            <el-step title="In process" @click="setStatus('IN_PROCESS')" class="step" />
            <el-step title="Approved" @click="setStatus('APPROVED')" class="step" />
            <el-step title="Published" @click="setStatus('PUBLISHED')" class="step" />
            <el-step title="Closed" @click="setStatus('CLOSED')" class="step" />
         </el-steps>
         <h1>{{ cart_data.name }}</h1>
         <p class="desc_p">{{ cart_data.description }} </p>
         <div class="desc_p">
            Responsible user: <div class="br">{{ cart_data.responsible.login }}</div>
         </div>
         <h4> Redactors: </h4>
         <ul class="zebra">
            <li
            v-for="item in cart_data.redactors"
            :key="item"> {{ item.login }} </li>
         </ul>
         <div class="questions_container" v-if="cart_data.test_status != 'CLOSED'">
            <ds-edit-category
                v-for="elem in cart_data.categories"
                :key="elem.id"
                :category="elem"
                :isEditeble="this.isEditeble"
            />
         </div>
         <button
            class="submitBtn"
            @click="saveEditedTest()">
            Save </button>
         
         
      </div>
  </el-dialog>

</template>

<script>
import dsEditCategory from "./ds_edit_dir/ds_edit_category.vue"
/* import RadarChart from "./chart_elements/ds_radar_chart.ts" */
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default{
   name: 'testCart',
   components: {
      dsEditCategory,
      /* RadarChart */
   },
   data(){
      return {
         modalVisible: false,
         form: '',
         active: 2,
         isEditeble: true
      }
   },
   props:{
      cart_data:{
         type: Object,
         default: () => {}
      }
   },
   computed: {
      ...mapGetters(["getServerUrl"]),
   },
   methods:{
      ...mapActions([
         "SAVE_TEST_TO_SERVER"
      ]),
      getQuestionsAmount(){
         return this.cart_data.questins.length;
      },
      getPeopleAmount(){
         return this.cart_data.already_finished + '/' + this.cart_data.people_amount;
      },
      getStatus(){
         let s = this.cart_data.test_status;
         if (s === 'IN_PROCESS'){
            this.isEditeble = true;
            this.active = 0;
            return 'In process'
         } else if (s === 'CLOSED'){
            this.isEditeble = false;
            this.active = 3;
            return 'Closed'
         } else if (s === 'APPROVED'){
            this.isEditeble = true;
            this.active = 1;
            return 'Approved'
         } else {
            this.isEditeble = false;
            this.active = 2;
            return 'Published'
         }
      },
      saveEditedTest(){
         const data = this.getData();

         axios.put(`${this.getServerUrl}/tests/${this.cart_data.id}`, data)
            .then(response => this.testId = response.data.id)
            .catch(error => {
            this.errorMessage = error.message;
               console.error("There was an error!", error);
            });
      },
      getData(){
         let today = new Date().toISOString().slice(0, 10);

         const data = {
            name: this.cart_data.name,
            description: this.cart_data.description,
            creator: this.cart_data.creator,
            responsible: this.cart_data.responsible,
            test_status: this.cart_data.test_status,
            redactors: this.cart_data.redactors,
            creation_date: this.cart_data.creation_date,
            passing: this.cart_data.passing,
            categories: this.cart_data.categories,
            last_modified_date: today,
            last_modified_person: "<ThisUserLogin>"
         };

         return data;
      },
      setStatus(str){
         this.cart_data.setStatus(str);
      }
   },
   created(){

   }
}
</script>

<style>
   @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap");

   .cart{
      margin: 15px;
      height: 200px;

      border: 1px solid rgba(0, 0, 0, 0.249);
      border-radius: 10px;

      display: grid;
      grid-auto-rows: 3fr 5fr 1fr;

      padding: 10px;

      background-color: white;
      box-shadow: 5px;

      

      transition: 0.4s;
   }

   .cart:hover{
      transform: translateY(-5px);
      border: 1px solid rgba(0, 0, 0, 0.7);
      -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
      -moz-box-shadow: 0px 15px 10px 2px rgba(34, 60, 80, 0.2);
      box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
   }

   .cart div{
      width: 100%;
   }

   .cart_header{
      display: grid;
      align-items: center;
      grid-template-columns: 3fr 1fr;
   }

   .cart_header h1{
      float: left;
   }

   .cart_header el-tag{
      float: right;
   }

   .cart .test_progress{
      text-align: right;
      color: rgba(0, 0, 0, 0.7);
      border-radius: 5px;
      align-items: center;
   }

   .cart .test_progress p{
      margin: 0px;
      padding: 0px;
      margin-right: 7px;
      margin-top: 2px;
   }

   .step:hover{
      cursor: pointer;
   }

   .desc_p{
      font-size: 20px;
      font-family: "Montserrat", sans-serif;
   }

   .desc_p .br{
      color: darkblue;
   }

   .zebra {
      list-style: none;
      padding: 0;
      width: 40%;
   }
   .zebra li {padding: 10px;}
   .zebra li:nth-child(odd) {background: #E1F1FF;}
   .zebra li:nth-child(even) {background: white;}

   .test_edit_container{
      margin-left: 20px;
   }

   .test_edit_container > *{
      margin: 30px 0;
   }

   input[type="text"]:disabled {
      background: #fff;
   }
</style>