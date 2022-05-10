import Answer from "./answer";

export default class Question{
   constructor(apiResponseQuestion){
      if (apiResponseQuestion === undefined){
         this.question = 'new_question';
         this.answers = [];
      } else {
         this.question = apiResponseQuestion.question;
         this.question_id = apiResponseQuestion.question_id;
         this.answers = [];

         apiResponseQuestion.answers.forEach(element => {
            let ans = new Answer(element);
            this.answers.push(ans);
         });
      }
   }

   set_question(question){
      this.question = question;
   }

   add_new_answer(answer){
      this.answers.push(answer);
   }
}