export async function updateNickname({ nickname }) {
  try {
    const response = await fetch("http://localhost:4000/change-nickname", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 필요한 경우 인증 토큰을 추가
        // 'Authorization': `Bearer ${yourAuthToken}`
      },
      body: JSON.stringify({ nickname }),
      credentials: "include", // HttpOnly 쿠키를 사용하는 경우에 필요
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
