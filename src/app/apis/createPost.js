const createPost = async ({ category, title, content, pollItems }) => {
  try {
    const response = await fetch("http://localhost:4000/createpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 필요하다면 인증 토큰을 헤더에 추가하세요.
      },
      credentials: "include",
      body: JSON.stringify({
        category,
        title,
        content,
        pollItems,
      }),
    });

    if (!response.ok) {
      throw new Error("Server response was not OK");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export default createPost;
