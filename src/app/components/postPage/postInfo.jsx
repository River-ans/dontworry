import styles from "@/app/styles/postPage.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getPost } from "@/app/apis/getPost";
import { UserIcon } from "../common";
import PostPollForm from "./postPollForm";
import { useEffect } from "react";
import PostPollList from "./postPollList";

const convertDateFormat = (isoString) => {
  const date = new Date(isoString);
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  return formatter.format(date).replace(/\./g, "/").replace(" ", " ");
};

export default function PostInfo() {
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
  const formattedCreatedAt = convertDateFormat(data.createdAt);

  return (
    <div className={styles.postContainer}>
      <div className={styles.postInfo}>
        <div className={styles.userIcon}>
          <UserIcon />
        </div>
        <div>
          <p className={styles.postAuthor}>{data.author.nickname}</p>
          <p className={styles.postCreatedAt}>{formattedCreatedAt}</p>
        </div>
      </div>

      <div className={styles.postBody}>
        <h1 className={styles.postTitle}>{data.title}</h1>
        <p className={styles.postContent}>{data.content}</p>
      </div>
      {data.pollOptions &&
        data.pollOptions.length > 0 &&
        (data.votedOptionIndex == null ? (
          <PostPollForm />
        ) : (
          // 이미 투표했을 경우 보여줄 컨텐츠
          <PostPollList />
        ))}
    </div>
  );
}
