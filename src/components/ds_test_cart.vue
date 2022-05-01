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
      <div class="test_progress">
         <!-- <p>
            {{ this.getStatus() }}
         </p> -->
         <p>
            {{ this.getPeopleAmount() }}
         </p>
      </div>

   </div>

   <el-dialog v-model="modalVisible" title="Edit test">
         <h1>{{ cart_data.name }}</h1>
  </el-dialog>

</template>

<script>
export default{
   data(){
      return {
         modalVisible: false,
         form: '',
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
         let s = this.cart_data.status;
         if (s === 'IN_PROCESS'){
            return 'In process'
         } else if (s === 'CLOSED'){
            return 'Closed'
         } else if (s === 'APPROVED'){
            return 'Approved'
         } else {
            return 'Published'
         }
      }
   },
   created(){
      
   }
}
</script>

<style>
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
      /* background-color: green; */
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
</style>