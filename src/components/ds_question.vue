<template>
   <div class="question">
      <input
         type="text" 
         v-model="this.name"   
      /> : 
      <input
         type="text"
         v-model="this.weight"
      />
   </div>
</template>

<script>
export default{
   name: 'dsQuestion',
   components: {},
   data(){
      return {
         name: '',
         weight: 0
      }
   },
   props:{
      question:{
         type: Object,
         default:() => { }
      }
   },
   methods: {
      set_question_name(){
         this.question.set_question(this.name);
      },
      set_question_weight(){
         this.question.set_weight(this.weight);
      }
   },
   mounted(){},
   computed:{}
}
</script>

<style>

</style>