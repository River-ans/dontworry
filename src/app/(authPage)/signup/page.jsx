import styles from "@/app/styles/authPage.module.scss";
import SignupForm from "../../components/signupPage/signupForm";

export default function SignUpPage() {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <h1>회원가입</h1>
        <SignupForm />
      </div>
    </main>
  );
}
