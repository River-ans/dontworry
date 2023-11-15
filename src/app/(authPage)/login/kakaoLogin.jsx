"use client";
import KakaoIcon from "@/app/components/kakaoIcon";
import styles from "@/app/styles/authPage.module.scss";

export default function KakaoLogin() {
  const handleKakaoLogin = () => {
    const clientId = "62fac05f022c2b5a00896c5f4a832aa2"; // 카카오 클라이언트 ID
    const redirectUri = "http://localhost:3000/kakao"; // 리다이렉트 URI
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

    window.location.href = kakaoAuthUrl;
  };
  return (
    <button className={styles.KakaoBtn} onClick={handleKakaoLogin}>
      <KakaoIcon />
      <span>카카오 로그인</span>
    </button>
  );
}
