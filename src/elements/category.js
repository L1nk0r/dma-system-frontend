
export default class Category{
   constructor(n){
      this.name = 'New category ' + n;
      this.categories = [];
      this.questions = [];

      console.log(this.name);

      this.elements_type = '';
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