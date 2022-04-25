
export default class Question{
   constructor(){
      this.question = 'new_question';
      this.weight = 0;
   }

   set_question(question){
      this.question = question;
   }

   set_weight(weight){
      this.weight = weight;
   }
}