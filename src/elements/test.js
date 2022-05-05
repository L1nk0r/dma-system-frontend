import Redactor from "./redactor";
import Category from "./category";

export default class Test{
   constructor(apiResponse){
      this.id = apiResponse.id;
      this.name = apiResponse.name;
      this.description = apiResponse.description;
      this.creator = apiResponse.creator;
      this.responsible = apiResponse.responsible;
      this.redactors = [];
      this.passing = [];
      this.categories = [];

      this.test_status = apiResponse.test_status;
      apiResponse.redactors.forEach(element => {
         let red = new Redactor(element);
         this.redactors.push(red);
      });

      this.creation_date = apiResponse.creation_date;
      apiResponse.passing.forEach(element => {
         this.passing.push(element);
      });

      apiResponse.categories.forEach(element => {
         let cat = new Category(element);
         this.categories.push(cat);
      });
   }
}