
export default class Answer{
   constructor(options){
      if (options === undefined){
         this.text = 'new_answer';
         this.weight = 0;
      } else {
         var apiResponse = options;
         this.answer_id = apiResponse.answer_id;
         this.text = apiResponse.text;
         this.weight = apiResponse.weight;
      }
   }

   set_answer(answer){
      this.text = answer;
   }

   set_weight(weight){
      this.weight = weight;
   }
}