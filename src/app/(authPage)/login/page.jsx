import styles from "@/app/styles/authPage.module.scss";
import LoginForm from "./lgoinForm";
export default function LoginPage() {
  return (
    <main className={styles.main}>
      <LoginForm />
    </main>
  );
}
