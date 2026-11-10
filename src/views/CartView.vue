<script setup>
import { inject, computed, ref } from "vue";
import { createOrder } from "../services/orderService";
import { updateLesson } from "../services/lessonService";

const cart = inject("cart");
const lessons = inject("lessons");
const customerName = ref("");
const customerPhone = ref("");
const orderSubmitted = ref(false);
const submitting = ref(false);
const checkoutError = ref("");

const totalPrice = computed(() => {
    return cart.value.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
});

const removeFromCart = (lessonId) => {
    const item = cart.value.find(
        item => item._id === lessonId
    );

    if (!item) return;

    // Find the original lesson
    const lesson = lessons.value.find(
        lesson => lesson._id === lessonId
    );

    // Restore its available spaces
    if (lesson) {
        lesson.space += item.quantity;
    }

    // Remove the lesson from the cart
    cart.value = cart.value.filter(
        item => item._id !== lessonId
    );
};



// Name must contain letters and spaces only
const isNameValid = computed(() => {
    return /^[A-Za-z ]+$/.test(customerName.value.trim());
});

// Phone must contain numbers only
const isPhoneValid = computed(() => {
    return /^\d{10,}$/.test(customerPhone.value);
});

// Checkout validation
const isCheckoutValid = computed(() => {
    return (
        isNameValid.value &&
        isPhoneValid.value &&
        cart.value.length > 0
    );
});

const handleCheckout = async () => {
    if (!isCheckoutValid.value) return;

    try {
        submitting.value = true;
        checkoutError.value = "";

        const orderData = {
            name: customerName.value.trim(),
            phone: customerPhone.value,
            items: cart.value.map(item => ({
                lessonId: item._id,
                quantity: item.quantity
            }))
        };

        await createOrder(orderData);

        for (const item of cart.value) {
            const lesson = lessons.value.find(
                lesson => lesson._id === item._id
            );

            await updateLesson(item._id, {
                space: lesson.space
            });
        }


        orderSubmitted.value = true;
        cart.value = [];
        customerName.value = "";
        customerPhone.value = "";

    } catch (error) {
        checkoutError.value = error.message;
    } finally {
        submitting.value = false;
    }
};
</script>

<template>
    <div v-if="orderSubmitted" class="container py-5 text-center">
        <h2 class="text-success">Order Successful!</h2>
        <p>Thank you for your purchase.</p>
        <p>Your order has been placed successfully.</p>

        <RouterLink to="/" class="btn btn-primary">
            Continue Shopping
        </RouterLink>
    </div>
    <div v-else class="container py-5">
        <h2 class="mb-4">Shopping Cart</h2>

        <div v-if="cart.length === 0" class="alert alert-info">
            Your shopping cart is empty.
        </div>

        <div v-else>
            <div v-for="item in cart" :key="item._id" class="card mb-3 shadow-sm">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <div>
                        <h5>{{ item.title }}</h5>
                        <p class="mb-1">Price: £{{ item.price }}</p>
                        <p class="mb-1">Quantity: x{{ item.quantity }}</p>
                        <strong>
                            Subtotal: £{{ item.price * item.quantity }}
                        </strong>
                    </div>

                    <button class="btn btn-outline-danger" @click="removeFromCart(item._id)">
                        Remove
                    </button>
                </div>
            </div>

            <h4 class="text-end mt-4">
                Total: £{{ totalPrice }}
            </h4>

            <div class="card shadow-sm mt-5">
                <div class="card-header">
                    <h4 class="mb-0">Checkout</h4>
                </div>

                <div class="card-body">
                    <form @submit.prevent="handleCheckout">

                        <div class="mb-3">
                            <label for="customerName" class="form-label">
                                Full Name
                            </label>

                            <input id="customerName" v-model="customerName" type="text" class="form-control"
                                placeholder="Enter your full name" />

                            <small class="text-danger" v-if="customerName && !isNameValid">
                                Name must contain letters and spaces only.
                            </small>
                        </div>

                        <div class="mb-3">
                            <label for="customerPhone" class="form-label">
                                Phone Number
                            </label>

                            <input id="customerPhone" v-model="customerPhone" type="text" inputmode="numeric"
                                class="form-control" placeholder="Enter your phone number" />

                            <small class="text-danger" v-if="customerPhone && !isPhoneValid">
                                Phone must contain digits only and be more than 9 digits
                            </small>
                        </div>

                        <button type="submit" class="btn btn-success w-100" :disabled="!isCheckoutValid || submitting">
                            {{ submitting ? "Submitting..." : "Checkout" }}
                        </button>


                    </form>
                </div>
            </div>
        </div>
    </div>
    
</template>
