
<script setup>
import { RouterView, useRoute, useRouter } from "vue-router";
import { provide, ref } from "vue";


const cart = ref([]);
const lessons = ref([]);

provide("cart", cart);
provide("lessons", lessons);

const router = useRouter();
const route = useRoute();


const goToCart = () => {
  if (route.path === "/cart") {
    router.push("/");
  } else if (cart.value.length > 0) {
    router.push("/cart");
  }
};
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <RouterLink class="navbar-brand" to="/">
          After School Lessons
        </RouterLink>

        <button
          class="btn btn-outline-light"
          :disabled="cart.length === 0 && route.path !== '/cart'"
          @click="goToCart"
        >
          {{ route.path === "/cart" ? "Back to Lessons" : `Shopping Cart (${cart.length})` }}
        </button>
      </div>
    </nav>

    <RouterView />
  </div>
</template>
