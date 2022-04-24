import { createWebHistory, createRouter } from "vue-router";
import dsIndex from "@/components/ds_index.vue";
import dsLogin from "@/components/ds_login.vue";
import dsReg from "@/components/ds_reg.vue";
import dsUserProfile from "@/components/ds_user_profile.vue"

const routes = [
   {
      path: "/",
      name: "Landing",
      component: dsIndex,
   },
   {
      path: "/login",
      name: "Login",
      component: dsLogin,
   },
   {
      path: "/reg",
      name: "Registration",
      component: dsReg,
   },
   {
      path: "/tests",
      name: "Tests",
      component: dsUserProfile,
   }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;