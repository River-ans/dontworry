"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "@/app/styles/authPage.module.scss";

export default function KakaoRedirectHandler() {
  const router = useRouter();
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      sendCodeToServer(code);
    }
  }, []);

  const sendCodeToServer = async (code) => {
    try {
      const response = await fetch("http://localhost:4000/auth/kakao-login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();

      if (response.ok) {
        // 서버로부터의 응답 처리
        // 예: 사용자를 메인 페이지로 리다이렉트

        router.push("/");
      } else {
        // 에러 처리
        console.error("서버 에러");
      }
    } catch (error) {
      console.error("통신 에러", error);
      router.push("/login");
    }
  };

  return <main className={styles.main}> 카카오 로그인 중...</main>;
}
