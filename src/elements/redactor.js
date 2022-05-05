
export default class Redactor{
   constructor(apiResponseRedactor){
      if (apiResponseRedactor === undefined){
         this.login = '';
      } else {
         this.login = apiResponseRedactor.login;
      }
      
   }

   set_login(login){
      this.login = login;
   }
}