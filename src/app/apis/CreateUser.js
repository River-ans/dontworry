export async function createUser(formData) {
  try {
    const response = await fetch("http://localhost:4000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(data.message || "회원가입 실패");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
