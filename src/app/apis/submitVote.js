export async function submitVote({ postId, selectedOption }) {
  try {
    const response = await fetch(`http://localhost:4000/vote/${postId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selectedOption }),
      credentials: "include", // 쿠키를 포함시키기 위해 필요
    });

    const responseData = await response.json(); // 응답 데이터 파싱

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return await responseData;
  } catch (error) {
    alert(error);
    console.error("Error submitting vote:", error);
    throw error;
  }
}
