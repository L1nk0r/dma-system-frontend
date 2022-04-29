
export default class SubCategory{
   constructor(n){
      this.name = 'New SubCategory' + n;
      this.elements = [];

      this.elements_type = '';
   }

   add_question(question){
      this.elements.push(question);
   }

   set_name(name){
      this.name = name;
   }

   set_elements_type(elements_type){
      this.elements_type = elements_type;
   }
}