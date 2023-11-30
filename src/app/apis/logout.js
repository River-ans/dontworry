export const logout = async () => {
  try {
    // 서버에 로그아웃 요청 보내기
    const response = await fetch("http://localhost:4000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // 쿠키를 포함시키기 위해 필요
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    // 여기에 로그아웃 성공 시의 추가 처리 로직을 작성할 수 있습니다.
    console.log("Logged out successfully");
  } catch (error) {
    console.error(error);
  }
};
