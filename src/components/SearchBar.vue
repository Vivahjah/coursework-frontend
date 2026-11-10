<script setup>
import { ref } from "vue";

const emit = defineEmits(["search"]);

const searchTerm = ref("");

const handleSearch = () => {
  emit("search", searchTerm.value.trim());
};
</script>

<template>
  <form @submit.prevent="handleSearch" class="input-group mb-4">
    <input
      v-model="searchTerm"
      type="text"
      class="form-control"
      placeholder="Search lessons by subject, location, price or spaces..."
    />

    <button type="submit" class="btn btn-primary">
      Search
    </button>
  </form>
</template>