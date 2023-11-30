import { useEffect, useState } from "react";
import styles from "@/app/styles/postPage.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getPost } from "@/app/apis/getPost";

export default function PostPollList() {
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

  const totalVotes = data
    ? data.pollOptions.reduce(
        (total, option) => total + option.voters.length,
        0
      )
    : 0;

  return (
    <div className={styles.postPoll}>
      {data.pollOptions.map((optionObj, index) => {
        const optionVotes = optionObj.voters.length;
        const votePercentage =
          totalVotes > 0 ? Math.round((optionVotes / totalVotes) * 100) : 0;
        return (
          <div
            key={index}
            className={`${styles.pollOption} ${
              data.votedOptionIndex === index ? styles.active : ""
            }`}
          >
            <div
              className={`${styles.votePercentageBar} ${
                data.votedOptionIndex === index ? styles.active : ""
              }`}
              style={{ width: `${votePercentage}%` }}
            ></div>
            <span> {optionObj.option}</span>
            <div className={styles.voters}>
              <span className={styles.optionVotes}>{optionVotes}명</span>
              <span className={styles.votePercentage}>{votePercentage}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
