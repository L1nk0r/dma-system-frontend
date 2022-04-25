
export default class SubCategory{
   constructor(n){
      this.name = 'New SubCategory' + n;
      this.id = n;
      this.elements = [];
   }

   add_question(question){
      this.elements.push(question);
   }

   set_name(name){
      this.name = name;
   }
}