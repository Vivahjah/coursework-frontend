import { createRouter, createWebHistory } from "vue-router";

import LessonsView from "../views/LessonsView.vue";
import CartView from "../views/CartView.vue";

const routes = [
  {
    path: "/",
    name: "Lessons",
    component: LessonsView
  },
  {
    path: "/cart",
    name: "Cart",
    component: CartView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  
  routes
});

export default router;
