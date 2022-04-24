<template>
   <div class="wrapper">
      <nav>
         <div class="header">
            <h3>Dma-system</h3>
         </div>
         <div class="user_status">
            <p>Logout</p>
         </div>
      </nav>

      <div class="tests">

         <div class="group">
            <h1>Tests</h1>
            <button class="addTest" @click="createTestVisible = true">+</button>
            <el-dialog v-model="createTestVisible" title="">
               <h1>Создать новый тест</h1>
               <div class="contaner">
                  <div class="raw">
                     <h3>Название теста</h3>
                      <input type="text" class="input_field" placeholder="Type here..."/>
                  </div>

                  <div class="raw">
                     <h3>Описание</h3>
                      <input type="text" class="input_field" id="description" placeholder="Type here..."/>
                  </div>

                  <div class="raw">
                     <h3>Ответственный</h3>
                      <input type="text" class="input_field" placeholder="Type here..."/>
                  </div>

                  <div class="raw">
                     <h3>Вопросы</h3>
                     <button class="left add_button" @click="add_category()">Добавить категрию</button>
                     <button
                        class="add_button"
                        @click="leave_category()"
                        v-if="this.deep > 0">
                     Выйти</button>
                     <button class="right add_button" @click="add_question()">Добавить вопрос</button>
                  </div>

                  <div class="questions_container">
                     <ds-new-category 
                        v-for="category in elements"
                        :key="category.id"
                        :category="category"
                     />
                  </div>
               </div>
              
               
            </el-dialog>
         </div>
         
         <el-select v-model="filter" class="m-2 filters_input" clearable placeholder="Filters">
            <el-option
               v-for="item in filters"
               :key="item.value"
               :label="item.label"
               :value="item.value"
               :disabled="item.disabled"
            >
               <span> {{ item.label }} </span>
            </el-option>
         </el-select>

         <div class="tests_container">
            <ds-test-cart
               v-for="item in TESTS"
               :key="item"
               :cart_data="item"
            />
         </div>
      </div>
   </div>
</template>

<script>
import dsTestCart from "./ds_test_cart.vue"
import dsNewCategory from "./ds_new_category.vue"
import {mapActions, mapGetters} from 'vuex'

export default {
   name: "Profile_tests",
   components:{
      dsTestCart,
      dsNewCategory
   },
   data(){
      return {
         filters:[
            {
               label:'Choose filter...',
               value:'CHOOSE_FILTER',
               disabled: true,
            },
            {
               label:'In process',
               value:'IN_PROCESS'
            },
            {
               label:'Done',
               value:'DONE'
            },
            {
               label:'Approved',
               value:'APPROVED'
            },
            {
               label:'Published',
               value:'PUBLISHED'
            },
            {
               label:'Finished',
               value:'FINISHED'
            }
         ],
         filter: '',
         createTestVisible: false,
         elements: [

         ],
         category_element:{
            id: 1,
            name: 'New category',
            elements:[]
         },
         elements_amount: 0,
         deep: 0,
         current_category: null,
         previous_category: null,
      }
   },
   created(){ },
   mounted(){
      this.GET_TESTS_FROM_API();
   },
   computed:{
      ...mapGetters([
         'TESTS'
      ])
   },
   methods:{
      ...mapActions([
         'GET_TESTS_FROM_API'
      ]),
      add_category(){
         if (this.current_category === null){
            this.elements.push(this.category_element);
            this.current_category = this.category_element;
            this.previous_category = null;
            this.deep++;
         } else {
            console.log(this.current_category);
         }
      },
      leave_category(){
         this.current_category = this.previous_category;
         this.previous_category = null;
         this.deep --;
      },

   }
}
</script>

<style>
   @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');

   .wrapper{
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Montserrat', sans-serif;
      width: 100%;

      background-image: url("../assets/background.png");

      flex-direction: column;
      margin: 0px auto;

      align-items: flex-start;
   }

   .raw{
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 20px;
   }

   .raw h3{
      margin-right: 15px;
   }

   .input_field{
      border: none;
      border-bottom: 2px solid rgba(120, 120, 249, 0.4);
      font-size: 20px;

      width: 30%;

      transition: 0.4s;

      color: rgba(120, 120, 249, 0.4);
   }

   .input_field:not(:placeholder-shown){
      border: none;
      color: black;
   }

   .input_field:focus{
      outline: none;
      border-bottom: 2px solid rgba(120, 120, 249, 0.7);
      width: 50%;

      color: rgba(120, 120, 249, 0.9);

      padding: 5px;
   }

   .add_button{
      height: 40px;
      font-size: 18px;

      border: 1px solid rgb(120, 120, 249);
      color: rgba(0, 0, 0, 0.4);

      background: none;

      font-weight: 400;
      font-family: 'Montserrat', sans-serif;
      
      transition: 0.4s;
   }

   .add_button:hover{
      background-color: rgba(120, 120, 249, 0.2);
      color: rgba(120, 120, 249, 0.7);
      cursor: pointer;
   }

   .left{
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
   }

   .right{
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
   }
   
   nav{
      display: grid;
      width: 100%;
      grid-template-columns: 1fr 1fr;
   }

   nav .header{
      margin-left: 40px;
      text-align: left;
   }

   nav .header h3{
      font-family: Snyder Speed Brush Cyr;
      font-size: 48px;
      color: rgba(191, 159, 128, 0.9);
   }

   nav .user_status{
      text-align: right;
      margin-right: 20px;
   }

   .tests .addTest{
      /* float: left; */

      height: 50px;
      width: 50px;

      cursor: pointer;

      background: white;

      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      color: #BF9F80;
      
      border: 1px solid #BF9F80;
      border-radius: 7px;

      margin: 30px;
   }

   .group{
      display: flex;
      align-items: center;
   }

   .tests{
      width: 76%;
      margin-left: 12%;
      margin-right: 12%;
   }

   .tests .filters_input{
      height: 30px;

      font-size: 25px;

      transition: 0.4s;
   }

   .el-select-dropdown__item{
      font-family: 'Montserrat', sans-serif;
   }

   .tests .tests_container{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      margin-top: 20px;
   }


   .questions_container{
      align-content: center;
   }

   @font-face {
      font-family: Snyder Speed Brush Cyr;
      src: url("../assets/snyderspeedbrushcyr_regular.ttf");
   }
</style>
