import Question from "./question";
export default class SubCategory{
   constructor(options){
      if (options === undefined){
         this.name = 'New SubCategory';
         this.questions = [];

         this.elements_type = '';
      } else {
         var apiResponseOneSubCategory = options;
         this.id = apiResponseOneSubCategory.id;
         this.name = apiResponseOneSubCategory.name;
         this.questions = [];
         this.elements_type = apiResponseOneSubCategory.elements_type;

         apiResponseOneSubCategory.questions.forEach(element => {
            let que = new Question(element);
            this.questions.push(que);
         });
      }  
      
   }

   add_question(question){
      this.questions.push(question);
   }

   set_name(name){
      this.name = name;
   }

   set_elements_type(elements_type){
      this.elements_type = elements_type;
   }
}