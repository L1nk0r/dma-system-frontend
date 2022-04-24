import { createApp } from 'vue'
import { createStore } from "vuex";
import router from './router';
import App from './App.vue';

import axios from 'axios';

import { AuthApi } from './auth/AuthApi';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const store = createStore({
   state:{ 
      BACKEND_URL: 'http://localhost:3000',
      credentials:{
         token: localStorage.getItem('token') || null,
         userRole: localStorage.getItem('userRole') || null
      },
      tests: []
   },
   mutations: { 
      setToken(state, token){
         state.credentials.token = token;
         localStorage.setItem('token', token);
      },
      setUserRole(state, userRole){
         state.credentials.userRole = userRole;
         localStorage.setItem('userRole', userRole);
      },
      deleteToken(state){
         state.credentials.token = null;
         localStorage.removeItem('token');
      },
      deleteUserRole(state){
         state.credentials.userRole = null;
         localStorage.removeItem('userRole');
      },
      SET_TESTS_TO_STATE:(state, tests)=>{
         state.tests = tests;
         console.log(state.tests);
      }
   },
   actions: { 
      onLogin({commit}, {login, password}){
         AuthApi.login({login, password}).then((res)=>{
            commit('setToken', res.token);
            commit('setUserRole', res.userRole);
         })
      },
      onLogout({commit}){
         commit('deleteToken');
         commit('deleteUserRole');
      },
      GET_TESTS_FROM_API({commit}){
         return axios(`${ this.getters.getServerUrl }/tests`, {
            method: 'GET'
         })
            .then((response) => {
               commit('SET_TESTS_TO_STATE', response.data)
            })
      }
   },
   getters: {
      getServerUrl: state => {
         return state.BACKEND_URL;
     },
     getUserRole: (state) => state.credentials.userRole,
     TESTS(state){
        return state.tests;
     }
    }
});

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus);
app.mount('#app');
