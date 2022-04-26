
export default class Question{
   constructor(){
      this.question = 'new_question';
      this.answers = [];
   }

   set_question(question){
      this.question = question;
   }

   add_new_answer(answer){
      this.answers.push(answer);
   }
}