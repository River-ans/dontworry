export async function fetchUserInfo() {
  try {
    const response = await fetch("http://localhost:4000/userinfo", {
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
}
