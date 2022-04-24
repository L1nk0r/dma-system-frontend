import {LoginApiInstance, DefaultApiInstance} from "@/auth"

export const AuthApi = {
   /**
    * 
    * @param {string} login 
    * @param {string} password 
    * @returns {Promise<AxiosResponse<any>>}
    */
   login(login, password){
      const url = '/login';
      const data = {login, password};
      return LoginApiInstance.post(url, data);
   },

   /**
    * 
    * @returns {Promise<AxiosResponse<any>>}
    */
   logout(){
      const url = '/logout';
      return DefaultApiInstance.post(url);
   }
}