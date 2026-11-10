<script setup>
defineProps({
  teachers: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(["filter"]);

const handleChange = (event) => {
  emit("filter", event.target.value);
};
</script>

<template>
  <div class="mb-4">
    <label for="teacher" class="form-label">
      Filter by teacher
    </label>

    <select
      id="teacher"
      class="form-select"
      @change="handleChange"
    >
      <option value="">All teachers</option>

      <option
        v-for="teacher in teachers"
        :key="teacher"
        :value="teacher"
      >
        {{ teacher }}
      </option>
    </select>
  </div>
</template>