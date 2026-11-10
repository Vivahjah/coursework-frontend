<script setup>
const API_URL = import.meta.env.VITE_API_URL;

defineProps({
    lesson: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(["add-to-cart"]);
</script>

<template>
    <div class="card h-100 shadow-sm">
        <img :src="`${API_URL}/images/${lesson.image}`" class="card-img-top" :alt="lesson.title"
            style="height: 200px; object-fit: cover;" />

        <div class="card-body">
            <h5 class="card-title">{{ lesson.title }}</h5>

            <p class="card-text">
                <strong>Location:</strong> {{ lesson.location }}
            </p>

            <p class="card-text">
                <strong>Teacher:</strong>
                {{ lesson.teacher.firstName }} {{ lesson.teacher.lastName }}
            </p>

            <p class="card-text">
                <strong>Price:</strong> £{{ lesson.price }}
            </p>

            <p class="card-text">
                <strong>Available spaces:</strong> {{ lesson.space }}
            </p>
            <button class="btn btn-primary w-100" :disabled="lesson.space <= 0" @click="emit('add-to-cart', lesson)">
                {{ lesson.space > 0 ? "Add to Cart" : "Sold Out" }}
            </button>
        </div>
    </div>
</template>