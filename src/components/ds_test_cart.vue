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
         <el-steps :active="this.active" finish-status="success">
            <el-step title="In process" />
            <el-step title="Approved" />
            <el-step title="Published" />
            <el-step title="Closed" />
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
         <div class="questions_container">
            <ds-edit-category
                v-for="elem in cart_data.categories"
                :key="elem.id"
                :category="elem"
            />
         </div>
  </el-dialog>

</template>

<script>
import dsEditCategory from "./ds_edit_dir/ds_edit_category.vue"
export default{
   name: 'testCart',
   components: {
      dsEditCategory
   },
   data(){
      return {
         modalVisible: false,
         form: '',
         active: 2
      }
   },
   props:{
      cart_data:{
         type: Object,
         default: () => {}
      }
   },
   methods:{
      getQuestionsAmount(){
         return this.cart_data.questins.length;
      },
      getPeopleAmount(){
         return this.cart_data.already_finished + '/' + this.cart_data.people_amount;
      },
      getStatus(){
         let s = this.cart_data.test_status;
         if (s === 'IN_PROCESS'){
            this.active = 0;
            return 'In process'
         } else if (s === 'CLOSED'){
            this.active = 1;
            return 'Closed'
         } else if (s === 'APPROVED'){
            this.active = 2;
            return 'Approved'
         } else {
            this.active = 3;
            return 'Published'
         }
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

      border: 1px solid black;
      border-radius: 10px;

      display: grid;
      grid-auto-rows: 3fr 5fr 1fr;

      padding: 10px;

      background-color: white;
      box-shadow: 5px;

      -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
      -moz-box-shadow: 0px 15px 10px 2px rgba(34, 60, 80, 0.2);
      box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);

      transition: 0.4s;
   }

   .cart:hover{
      transform: translateY(-5px);
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
</style>