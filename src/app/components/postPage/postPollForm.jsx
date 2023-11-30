import { useEffect, useState } from "react";
import styles from "@/app/styles/postPage.module.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getPost } from "@/app/apis/getPost";
import { submitVote } from "@/app/apis/submitVote";

export default function PostPollForm() {
  const queryClient = useQueryClient();
  const [selectedOption, setSelectedOption] = useState(null);
  const params = useParams();
  const postId = params.id;
  const { data } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const data = await getPost(postId);
      return data;
    },
    retry: false,
    enabled: false,
  });

  const mutation = useMutation({
    mutationFn: submitVote,
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      refetch();
      console.log(data.message);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmitVote = async (event) => {
    event.preventDefault(); // 폼의 기본 제출 동작을 방지합니다.
    // 여기에 투표 제출 로직을 추가하세요.
    mutation.mutate({ postId, selectedOption });
  };

  //   data.votedOptionIndex

  return (
    <form onSubmit={handleSubmitVote} className={styles.postPoll}>
      {data.pollOptions.map((optionObj, index) => (
        <label key={index}>
          <input
            type="radio"
            name="pollOption"
            value={index}
            checked={selectedOption === index.toString()}
            onChange={handleOptionChange}
          />
          <span className={styles.pollOption}>{optionObj.option}</span>
        </label>
      ))}
      <button type="submit">투표 제출</button>
    </form>
  );
}
