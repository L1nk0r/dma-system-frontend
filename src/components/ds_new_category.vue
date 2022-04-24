<template>
   <div class="new_categoty_container">

      <input v-model="this.category.name" placeholder="type here..." class="input_field"/>

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

   .input_field{
      border: none;
      border-bottom: 2px solid rgba(120, 120, 249, 0.4);
      font-size: 12px;

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
</style>
