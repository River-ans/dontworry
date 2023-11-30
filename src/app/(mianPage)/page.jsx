"use client";

import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../apis/getPosts";
import Link from "next/link";
import styles from "@/app/styles/postCardList.module.scss";

function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}초 전`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  return `${Math.floor(diffInSeconds / 86400)}일 전`;
}

export default function Home() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam = 1 }) => getPosts(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.hasNextPage ? nextPage : undefined;
      },
    });

  const loadMoreRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <main className={styles.main}>
      {/* 포스트 목록 렌더링 */}
      {data?.pages.map((group, i) => (
        <div key={i} className={styles.postWrapper}>
          {group.posts.map((post, index) => (
            <Link href={`/posts/${post._id}`} key={post._id}>
              <article className={styles.postContainer}>
                <div className={styles.postHeader}>
                  <time>{timeAgo(post.createdAt)}</time>
                  <span>|</span>
                  <div className={styles.nickname}>
                    {post.author.nickname} 님의 고민
                  </div>
                </div>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postContent}>{post.content}</p>
                <div className={styles.postCategory}>{post.category}</div>
                <div className={styles.postVotes}>
                  참여
                  {post.pollOptions.reduce(
                    (total, option) => total + option.voters.length,
                    0
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      ))}
      <div ref={loadMoreRef}>{isFetchingNextPage && "로딩 중..."}</div>
    </main>
  );
}
