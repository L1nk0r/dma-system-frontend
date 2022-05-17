import { createApp } from "vue";
import { createStore } from "vuex";
import router from "./router";
import App from "./App.vue";

import axios from "axios";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import Test from "./elements/test";
import TestAnalyze from "./elements/analyze";

import { auth } from "./auth.modules"

const store = createStore({
  modules:{
    auth
  },
  state: {
    BACKEND_URL: "http://localhost:3000",
    tests: [],
    new_test: {
      name: "No name",
      creator: "<ThisUserName>",
      description: "No description",
      responsible: null,
      creation_date: null,
      categories: [],
      redactors: [],
      passing: [],
    },
    cur_test: null,
    result_answers_array: [],
    result_name: null,
  },
  mutations: {
    SET_TESTS_TO_STATE: (state, tests) => {
      tests.forEach((element) => {
        let test = new Test(element);
        state.tests.push(test);
      });
    },
    SET_TEST_TO_STATE: (state, test) => {
      let ctest = new Test(test);
      state.cur_test = ctest;
    },
    GET_TEST_ANALYZE: (state, response) => {
      let analyze = new TestAnalyze(response);
      let result = state.tests.find((obj) => {
        return obj.id === analyze.id;
      });
      if (result != undefined) result.setAnalyze(analyze);
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
    },
    ADD_NEW_ANSWER_TO_ARRAY: (state, ans_obj) => {
      let result = state.result_answers_array.findIndex((obj) => {
        return obj.question_id === ans_obj.question_id;
      });
      if (result === -1) {
        state.result_answers_array.push(ans_obj);
      } else {
        state.result_answers_array.splice(result, 1);
        state.result_answers_array.push(ans_obj);
      }
    },
    UPDATE_RESULT_NAME: (state, name) => {
      state.result_name = name;
    },
  },
  actions: {
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
    GET_ONE_TEST_FROM_API({ commit }, id) {
      return axios(`${this.getters.getServerUrl}/tests/${id}`, {
        method: "GET",
      })
        .then((response) => {
          commit("SET_TEST_TO_STATE", response.data);
          return response;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
    GET_TEST_ANALYZE_DATA_FROM_API({ commit }, id) {
      return axios(`${this.getters.getServerUrl}/analyze?id=${id}`, {
        method: "GET",
      })
        .then((response) => {
          commit("GET_TEST_ANALYZE", response.data);
          return response;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
    SET_NEW_TEST() {
      const data = {
        name: this.state.new_test.name,
        description: this.state.new_test.description,
        creator: this.state.new_test.creator,
        responsible: this.state.new_test.responsible,
        test_status: "IN_PROCESS",
        redactors: this.state.new_test.redactors,
        creation_date: this.state.new_test.creation_date,
        passing: this.state.new_test.passing,
        categories: this.state.new_test.categories,
      };

      axios
        .post(`${this.state.BACKEND_URL}/tests/`, data)
        .then((response) => (this.testId = response.data.id))
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    SET_PASS_TEST() {
      const data = {
        mail: this.state.result_name,
        results: this.state.result_answers_array,
      };

      axios
        .post(`${this.state.BACKEND_URL}/tests_results/`, data)
        .then()
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
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
    ADD_NEW_TEST_REDACTOR({ commit }, redactor) {
      commit("ADD_TEST_REDACTOR", redactor);
    },
    ADD_NEW_TEST_NEW_RECIPIENT({ commit }, recipient) {
      commit("ADD_TEST_RECIPIENT", recipient);
    },
    REMOVE_ALL_NEW_TEST_RECIPIENTS({ commit }) {
      commit("REMOVE_ALL_TEST_RECIPIENTS");
    },
    SET_NEW_TEST_CREACTION_DATE({ commit }, date) {
      commit("SET_TEST_CREACTION_DATE", date);
    },
    ADD_ANSWER_TO_ARRAY({ commit }, ans_obj) {
      commit("ADD_NEW_ANSWER_TO_ARRAY", ans_obj);
    },
    SET_RESULT_NAME({ commit }, name) {
      commit("UPDATE_RESULT_NAME", name);
    },
  },
  getters: {
    getServerUrl: (state) => {
      return state.BACKEND_URL;
    },
    TESTS(state) {
      return state.tests;
    },
    NEW_TEST(state) {
      return state.new_test;
    },
    CUR_TEST(state) {
      return state.cur_test;
    },
    RESULT_ARRAY(state) {
      return state.result_answers_array;
    },
    ANALYZE(state) {
      return state.analyze;
    },
  },
});

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus);

app.mount("#app");
