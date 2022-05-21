<template>
   
   <div class="que_content">
      <p>{{ question.question }}</p>
      <el-select v-model="value" placeholder="Choose any answer" size="large" @change="changeAnswerId()">
         <el-option
            v-for="item in question.answers"
            :key="item.text"
            :label="item.text"
            :value="item.answer_id"
         />
      </el-select>
   </div>

      
</template>

<script>
export default{
   name: "dsResultAnswer",
   data(){
      return {
         value: null
      }
   },
   props:{
      question: {
         type: Object,
         default: () => {},
      },
   },
   methods: {
      changeAnswerId(){
         let data = {
            answer_id: this.value,
            question_id: this.question.question_id
         };
         this.$emit('changeAnswerId', data);
      }
   },
   mounted(){ }
}
</script>