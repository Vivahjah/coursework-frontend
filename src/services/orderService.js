
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://m01067827-after-school.onrender.com";

export const createOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      throw new Error("Failed to submit order");
    }

    return await response.json();

  } catch (error) {
    console.error("Error creating order:", error.message);
    throw error;
  }
};
