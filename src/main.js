import { createApp } from "vue";
import { createStore } from "vuex";
import router from "./router";
import App from "./App.vue";

import axios from "axios";

import { AuthApi } from "./auth/AuthApi";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
/* 
import {Category} from '@/elements/category'
import {SubCategory} from '@/elements/subcategory'
import {Question} from '@/elements/question' */

const store = createStore({
  state: {
    BACKEND_URL: "http://localhost:3000",
    credentials: {
      token: localStorage.getItem("token") || null,
      userRole: localStorage.getItem("userRole") || null,
    },
    tests: [],
    new_test: {
      name: "",
      description: "",
      responsible: "",
      elements: [],
      redactors: [],
      commentators: []
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
      state.tests = tests;
      /* console.log(state.tests); */
    },
    ADD_NEW_ELEMENT: (state, element) => {
      state.new_test.elements.push(element);
    },
    SET_TEST_NAME: (state, name) => {
      state.new_test.name = name;
      /* console.log(state.new_test.name); */
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
    ADD_TEST_COMMENTATOR: (state, commentator) => {
      state.new_test.commentators.push(commentator);
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
    ADD_NEW_TEST_COMMENTATOR({commit}, commentator){
      commit("ADD_TEST_COMMENTATOR", commentator);
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

/* app.use(Category);
app.use(SubCategory);
app.use(Question); */

app.mount("#app");
