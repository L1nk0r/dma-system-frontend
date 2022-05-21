<template>
   <div class="redactor_container">
      <input
      class="input_field"
      v-model="this.red_name"
      @change="setRedactorName()"
      placeholder="User's login" />
   </div>   
</template>

<script>
export default{
   name: 'dsNewRedactor',
   data(){
      return {
         red_name: ''
      }
   },
   props: {
      redactor: {
         type: Object,
         default: () => {},
      }
   },
   methods: {
      setRedactorName(){
         this.redactor.set_login(this.red_name);
      }
   }
}
</script>
