
export default class Category{
   constructor(n){
      this.name = 'New category ' + n;
      this.id = n;
      this.elements = [];

      console.log(this.name);
   }

   add_sub_category(sub_category){
      this.elements.push(sub_category);
   }

   add_question(question){
      this.elements.push(question);
   }

   set_name(name){
      this.name = name;
   }
}