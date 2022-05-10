import SubCategory from "./subcategory";
import Question from "./question";
export default class Category{
   constructor(apiResponseCategories){
      if (apiResponseCategories === undefined){
         this.name = 'New category';
         this.categories = [];
         this.questions = [];

         this.elements_type = '';
      } else {
         this.name = apiResponseCategories.name;
         this.categories = [];
         this.questions = [];
         this.id = apiResponseCategories.id;

         if (apiResponseCategories.categories != undefined){
            if (apiResponseCategories.categories.length > 0){
               apiResponseCategories.categories.forEach(element => {
                  let subCat = new SubCategory(element);
                  this.categories.push(subCat);
                  this.elements_type = "cat";
               });
            } else {
               apiResponseCategories.questions.forEach(element => {
                  let que = new Question(element);
                  this.questions.push(que);
                  this.elements_type = "que";
               });
            }
         } else {
            apiResponseCategories.questions.forEach(element => {
               let que = new Question(element);
               this.questions.push(que);
               this.elements_type = "que";
            });
         }
      }
      
   }

   add_sub_category(sub_category){
      this.categories.push(sub_category);
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