<template>
   <div class="redactor_container">
      <input
      class="input_field"
      v-model="this.red_name"
      @change="setRedactorName()"
      placeholder="Redactor's name" />
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

<style>
.redactor_container {
  width: 90%;
  padding: 2px;
  margin: 5px;
  border-radius: 15px;
}

.input_field {
  border: none;
  border-bottom: 2px solid rgba(120, 120, 249, 0);
  font-size: 10px;

  width: 50% !important; 

  transition: 0.4s;

  color: rgba(120, 120, 249, 0.4);
}

.input_field:not(:placeholder-shown) {
  border: none;
  color: black;

  width: 100%;
}

.input_field:focus {
  outline: none;
  border-bottom: 2px solid rgba(120, 120, 249, 0.7);
  width: 50%;

  color: rgba(120, 120, 249, 0.9);

  padding: 5px;
}
</style>
