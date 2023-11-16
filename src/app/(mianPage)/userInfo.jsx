"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchUserInfo } from "@/app/apis/userApi"; // 올바른 경로로 수정하세요

export default function UserInfo() {
  const { isPending, error, data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    retry: false,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  if (data) {
    console.log(data);
    return <div>{data.nickname}</div>;
  }
}
