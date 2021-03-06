# DMA System

This is frontend part of DMA System. This application helps managers evalute employees.

## Content

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [How to run?](#how-to-run)
  - [Screenshots](#screenshots)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Sign in and sign up
- Create new test
- Edit existed test
- See all existed tests
- Pass test
- Get test analyze
- Enjoy!

### How to run

#### Project setup

Run this command to install all dependencies.

```
yarn install
```

#### Compiles and hot-reloads for development

Run this command to open application.

```
yarn run serve
```

### Screenshots

#### Landing

![](./src/assets/screenshots/ds_landing.png)

#### Login page

![](./src/assets/screenshots/ds_login.png)

#### Registration page

![](./src/assets/screenshots/ds_reg.png)

#### Profile

![](./src/assets/screenshots/ds_profile.png)

#### Create new test

![](./src/assets/screenshots/ds_crearte.png)

#### Edit test

![](./src/assets/screenshots/ds_edit.png)

## My process

### Built with

- HTML 5
- CSS 3
- JavaScript
- VueJs
- TypeScript
- ChartJs
- Element UI
- Axios
- vue-router

### What I learned

To post authorized requests:

```js
GET_TESTS_FROM_API({ commit }) {
return axios(`${this.getters.getServerUrl}/tests`, {
   method: "GET",
   headers: authHeader()
})
   .then((response) => {
      commit("SET_TESTS_TO_STATE", response.data);
      return response;
   })
   .catch((error) => {
      console.log(error);
      return error;
   });
}
```
