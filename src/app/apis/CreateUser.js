export async function createUser(formData) {
  try {
    const response = await fetch("http://localhost:4000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "회원가입 실패");
    }
  } catch (error) {
    throw error;
  }
}
