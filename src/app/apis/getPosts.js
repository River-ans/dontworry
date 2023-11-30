export const getPosts = async (page, limit = 10) => {
  try {
    const response = await fetch(
      `http://localhost:4000/posts?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error("서버로부터 응답을 받는 데 실패했습니다.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("포스트를 가져오는 데 실패했습니다:", error);
    throw error;
  }
};
