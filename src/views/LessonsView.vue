<script setup>
import { ref, inject, computed, onMounted } from "vue";
import { getLessons } from "../services/lessonService";
// import ShoppingCart from "../components/ShoppingCart.vue";
import LessonCard from "../components/LessonCard.vue";
import SearchBar from "../components/SearchBar.vue";
import TeacherFilter from "../components/TeacherFilter.vue";
import SortControls from "../components/SortControls.vue";


const cart = inject("cart");
const lessons = inject("lessons");

const teachers = ref([]);
const selectedTeacher = ref("");
const sortOption = ref("");
const loading = ref(true);
const error = ref("");


const addToCart = (lesson) => {
  if (lesson.space <= 0) {
    return;
  }

  // Check whether the lesson is already in the cart
  const existingItem = cart.value.find(
    item => item._id === lesson._id
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.value.push({
      ...lesson,
      quantity: 1
    });
  }

  // Reduce the available spaces
  lesson.space--;
  console.log(`Added ${lesson.title} to cart. Remaining spaces: ${lesson.space}`);
  console.log("Current cart:", cart.value);
};

const fetchLessons = async (search = "") => {
  try {
    loading.value = true;
    error.value = "";

    lessons.value = await getLessons(search);

    if (!search) {
      teachers.value = [
        ...new Set(
          lessons.value.map(
            lesson =>
              `${lesson.teacher.firstName} ${lesson.teacher.lastName}`
          )
        )
      ];
    }

  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// Filter lessons by teacher
const filteredLessons = computed(() => {
  if (!selectedTeacher.value) {
    return lessons.value;
  }

  return lessons.value.filter(lesson => {
    const teacherName =
      `${lesson.teacher.firstName} ${lesson.teacher.lastName}`;

    return teacherName === selectedTeacher.value;
  });
});

// Sort lessons on the frontend
const sortedLessons = computed(() => {
  const sorted = [...filteredLessons.value];

  if (!sortOption.value) {
    return sorted;
  }

  const [attribute, direction] = sortOption.value.split("-");

  return sorted.sort((a, b) => {
    let comparison;

    if (attribute === "price" || attribute === "space") {
      comparison = a[attribute] - b[attribute];
    } else {
      comparison = a[attribute].localeCompare(b[attribute]);
    }

    return direction === "asc" ? comparison : -comparison;
  });
});

const handleSearch = (searchTerm) => {
  fetchLessons(searchTerm);
};

const handleTeacherFilter = (teacherName) => {
  selectedTeacher.value = teacherName;
};

const handleSort = (option) => {
  sortOption.value = option;
};



onMounted(() => {
  if (lessons.value.length === 0) {
    fetchLessons();
  } else {
    loading.value = false;
  }
});
</script>


<template>
  <div class="container py-5">
    <h1 class="text-center mb-5">After School Lessons</h1>

    <SearchBar @search="handleSearch" />

    <TeacherFilter :teachers="teachers" @filter="handleTeacherFilter" />

    <SortControls @sort="handleSort" />

    <p v-if="loading" class="text-center">
      Loading lessons...
    </p>

    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-else>
      <p class="mb-4">
        Lessons found: {{ sortedLessons.length }}
      </p>

      <div v-if="sortedLessons.length > 0" class="row g-4">
        <div v-for="lesson in sortedLessons" :key="lesson._id" class="col-12 col-sm-6 col-lg-4">
          <LessonCard :lesson="lesson" @add-to-cart="addToCart" />
        </div>
      </div>

      <div v-else class="alert alert-warning">
        No lessons found.
      </div>
    </div>
    <!-- <ShoppingCart :cart="cart" @remove="removeFromCart" /> -->
  </div>
</template>
