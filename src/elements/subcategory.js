
export default class SubCategory{
   constructor(n){
      this.name = 'New SubCategory' + n;
      this.questions = [];

      this.elements_type = '';
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