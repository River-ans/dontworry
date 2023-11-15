export async function login(userData) {
  try {
    const response = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    });
    const data = await response.json();

    if (response.ok) {
      // 로그인 성공 처리
      console.log("로그인 성공!");
      return data;
    } else {
      // 에러 처리
      throw new Error(data.message);
    }
  } catch (error) {
    throw error;
  }
}
