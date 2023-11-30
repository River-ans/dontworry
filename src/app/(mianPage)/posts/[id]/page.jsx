"use client";
import { getPost } from "@/app/apis/getPost";
import { BackDrop, BackIcon, UserIcon } from "@/app/components/common";
import PostInfo from "@/app/components/postPage/postInfo";
import styles from "@/app/styles/postPage.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function PostPage() {
  const params = useParams();
  const postId = params.id;

  const { isPending, error, data } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const data = await getPost(postId);
      return data;
    },
    retry: false,
  });

  if (error) {
    return (
      <BackDrop>
        {" "}
        <div className={styles.wrapper}>
          <div className={styles.backIcon}>
            <BackIcon />
          </div>
          <span> 찾을수 없는 페이지</span>
        </div>
      </BackDrop>
    );
  }

  if (data) {
    return (
      <BackDrop>
        <div className={styles.wrapper}>
          <div className={styles.backIcon}>
            <BackIcon />
          </div>
          {/*  postContainer*/}
          <PostInfo data={data} />
        </div>
      </BackDrop>
    );
  }
}
