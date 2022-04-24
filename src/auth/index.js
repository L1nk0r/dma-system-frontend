import axios from "axios";

const loginConfig = {
      baseUrl: 'http://localhost:3000',
      headers: {
         'Content-Type': 'application/json'
      }
}

export const LoginApiInstance = axios.create(loginConfig);

const defaultConfig = {
   baseUrl: 'http://localhost:3000',
   headers: {
      'Content-Type': 'application/json'
   }
}

export const DefaultApiInstance = axios.create(defaultConfig);
