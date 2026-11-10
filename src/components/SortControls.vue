<script setup>
const emit = defineEmits(["sort"]);

const handleSort = (event) => {
  emit("sort", event.target.value);
};
</script>

<template>
  <div class="row mb-4">
    <div class="col-md-6">
      <label for="sort" class="form-label">
        Sort lessons by
      </label>

      <select
        id="sort"
        class="form-select"
        @change="handleSort"
      >
        <option value="">Default order</option>

        <option value="title-asc">Subject (A–Z)</option>
        <option value="title-desc">Subject (Z–A)</option>

        <option value="location-asc">Location (A–Z)</option>
        <option value="location-desc">Location (Z–A)</option>

        <option value="price-asc">Price (Lowest first)</option>
        <option value="price-desc">Price (Highest first)</option>

        <option value="space-asc">Spaces (Lowest first)</option>
        <option value="space-desc">Spaces (Highest first)</option>
      </select>
    </div>
  </div>
</template>