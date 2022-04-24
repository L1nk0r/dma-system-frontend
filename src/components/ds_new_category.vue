<template>
   <div class="new_categoty_container">

      <input v-model="this.category.name" placeholder="type here..."/>

   </div>
</template>

<script>
export default {
   data(){
      return {
         category:{
            type: Object,
            default(){
               return {
                  name: 'New category'
               }
            }
         }
      }
   },
   props:{ },
   methods:{
      add_sub_category(){
         this.$emit('sendName', this.category.name);
      }
   }
}
</script>

<style>
   .new_categoty_container{
      width: 70%;
      padding: 20px;
      margin: 15px;
      border: 1px solid blue;
      border-radius: 15px;
   }

   input{
      background: none;
      border: none;
      font-size: 15px;
      
      transition: 0.4s;
   }

   input:focus{
      border-bottom: 1px solid blue;
      width: 100%;
      outline: none;
   }
</style>
