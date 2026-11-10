const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://m01067827-after-school.onrender.com";

export const getLessons = async (search = "") => {
  try {
    const response = await fetch(
      `${API_URL}/lessons?search=${encodeURIComponent(search)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch lessons");
    }

    return await response.json();

  } catch (error) {
    console.error("Error fetching lessons:", error.message);
    throw error;
  }
};


export const updateLesson = async (lessonId, updateData) => {
  try {
    const response = await fetch(`${API_URL}/lessons/${lessonId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateData)
    });

    if (!response.ok) {
      throw new Error("Failed to update lesson spaces");
    }

    return await response.json();

  } catch (error) {
    console.error("Error updating lesson:", error.message);
    throw error;
  }
};
