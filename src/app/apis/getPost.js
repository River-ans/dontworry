export const getPost = async (postId) => {
  try {
    const response = await fetch(`http://localhost:4000/post/${postId}`, {
      credentials: "include",
    }); // 서버 주소와 엔드포인트에 주의하세요.

    if (!response.ok) {
      throw new Error("서버로부터 응답을 받는 데 실패했습니다.");
    }

    const post = await response.json();
    return post;
  } catch (error) {
    console.error("포스트를 가져오는 데 실패했습니다:", error);
    throw error;
  }
};
