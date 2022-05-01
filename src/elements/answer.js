
export default class Answer{
   constructor(){
      this.text = 'new_answer';
      this.weight = 0;
   }

   set_answer(answer){
      this.text = answer;
   }

   set_weight(weight){
      this.weight = weight;
   }
}