import styles from "@/app/styles/authPage.module.scss";
import LoginForm from "./lgoinForm";
import Link from "next/link";
import KakaoIcon from "@/app/components/kakaoIcon";

function OrDivider() {
  return (
    <div className={styles.orDivider}>
      <div className={styles.line}></div>
      <span>OR</span>
      <div className={styles.line}></div>
    </div>
  );
}

function KakaoLogin() {
  return (
    <button className={styles.KakaoBtn}>
      <KakaoIcon />
      <span>카카오 로그인</span>
    </button>
  );
}

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <h1>로그인</h1>
        <LoginForm />
        <OrDivider />
        <KakaoLogin />
        <Link className={styles.signupLink} href="/signup">
          회원가입
        </Link>
      </div>
    </main>
  );
}
