import { createApp } from "vue";
import { createStore } from "vuex";
import router from "./router";
import App from "./App.vue";

import axios from "axios";

import { AuthApi } from "./auth/AuthApi";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import Test from "./elements/test";

const store = createStore({
  state: {
    BACKEND_URL: "http://localhost:3000",
    credentials: {
      token: localStorage.getItem("token") || null,
      userRole: localStorage.getItem("userRole") || null,
    },
    tests: [],
    new_test: {
      name: "No name",
      creator: "<ThisUserName>",
      description: "No description",
      responsible: null,
      creation_date: null,
      categories: [],
      redactors: [],
      passing: []
    },
  },
  mutations: {
    setToken(state, token) {
      state.credentials.token = token;
      localStorage.setItem("token", token);
    },
    setUserRole(state, userRole) {
      state.credentials.userRole = userRole;
      localStorage.setItem("userRole", userRole);
    },
    deleteToken(state) {
      state.credentials.token = null;
      localStorage.removeItem("token");
    },
    deleteUserRole(state) {
      state.credentials.userRole = null;
      localStorage.removeItem("userRole");
    },
    SET_TESTS_TO_STATE: (state, tests) => {
      tests.forEach(element => {
        let test = new Test(element);
        state.tests.push(test);
      });
    },
    ADD_NEW_ELEMENT: (state, element) => {
      state.new_test.categories.push(element);
    },
    SET_TEST_NAME: (state, name) => {
      state.new_test.name = name;
    },
    SET_TEST_DESCRIPTION: (state, description) => {
      state.new_test.description = description;
    },
    SET_TEST_RESPONSIBLE_USER: (state, responsible_user) => {
      state.new_test.responsible = responsible_user;
    },
    ADD_TEST_REDACTOR: (state, redactor) => {
       state.new_test.redactors.push(redactor);
    },
    ADD_TEST_RECIPIENT: (state, recipient_login) => {
      state.new_test.passing.push(recipient_login);
    },
    REMOVE_ALL_TEST_RECIPIENTS: (state) => {
      state.new_test.passing = [];
    },
    SET_TEST_CREACTION_DATE: (state, date) => {
      state.new_test.creation_date = date;
    }
  },
  actions: {
    onLogin({ commit }, { login, password }) {
      AuthApi.login({ login, password }).then((res) => {
        commit("setToken", res.token);
        commit("setUserRole", res.userRole);
      });
    },
    onLogout({ commit }) {
      commit("deleteToken");
      commit("deleteUserRole");
    },
    GET_TESTS_FROM_API({ commit }) {
      return axios(`${this.getters.getServerUrl}/tests`, {
        method: "GET",
      })
        .then((response) => {
          commit("SET_TESTS_TO_STATE", response.data);
          return response;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
    GET_TEST_FROM_API_BY_ID({commit}, id){
      return axios(`${this.getters.getServerUrl}/tests/${id}`, {
        method: "GET",
      }) 
        .then((response) => {
          commit("", response.data);
          return response
        })
        .catch((error) => {
          console.log(error);
          return error;
        })
    },
    SET_NEW_TEST(){
      const data = {
        name: this.state.new_test.name,
        description: this.state.new_test.description,
        creator: this.state.new_test.creator,
        responsible: this.state.new_test.responsible,
        test_status: "IN_PROCESS",
        redactors: this.state.new_test.redactors,
        creation_date: this.state.new_test.creation_date,
        passing: this.state.new_test.passing,
        categories: this.state.new_test.categories
      };

      console.log(JSON.stringify(data));

      axios.post(`${this.state.BACKEND_URL}/tests/`, data)
        .then(response => this.testId = response.data.id)
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    SAVE_TEST_TO_SERVER(editedTest){
      let eData = JSON.stringify(editedTest);
      console.log(editedTest.id);
      console.log(editedTest);
      console.log(eData.id);
      console.log(eData);
      /* axios.put(`${this.state.BACKEND_URL}/tests/${test.id}`, data)
      .then(response => this.testId = response.data.id)
      .catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      }); */
    },
    ADD_NEW_ELEMENT_TO_NEW_TEST({ commit }, element) {
      commit("ADD_NEW_ELEMENT", element);
    },
    SET_NEW_TEST_NAME({ commit }, name) {
      commit("SET_TEST_NAME", name);
    },
    SET_NEW_TEST_DESCRIPTION({ commit }, description) {
      commit("SET_TEST_DESCRIPTION", description);
    },
    SET_NEW_TEST_RESPONSIBLE_USER({ commit }, user_name) {
      commit("SET_TEST_RESPONSIBLE_USER", user_name);
    },
    ADD_NEW_TEST_REDACTOR({commit}, redactor){
       commit("ADD_TEST_REDACTOR", redactor);
    },
    ADD_NEW_TEST_NEW_RECIPIENT({commit}, recipient){
      commit("ADD_TEST_RECIPIENT", recipient);
    },
    REMOVE_ALL_NEW_TEST_RECIPIENTS({commit}){
      commit("REMOVE_ALL_TEST_RECIPIENTS");
    },
    SET_NEW_TEST_CREACTION_DATE({commit}, date){
      commit("SET_TEST_CREACTION_DATE", date);
    }
  },
  getters: {
    getServerUrl: (state) => {
      return state.BACKEND_URL;
    },
    getUserRole: (state) => state.credentials.userRole,
    TESTS(state) {
      return state.tests;
    },
    NEW_TEST(state) {
      return state.new_test;
    },
  },
});

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus);

app.mount("#app");
