
export default class TestAnalyze{

   constructor(apiResponse){
      if (apiResponse.length === 0){
         this.isAble = false;
      } else {
         this.isAble = true;
         this.lables = [];
         this.stats = [];
         this.id = apiResponse[0].id;

         apiResponse.forEach(element => {
            this.lables.push(element.parent + '/' + element.category);
            this.stats.push(element.stats);
         });

         this.amount = this.stats.length;
      }
      
   }
}