import styles from "@/app/styles/authPage.module.scss";
import SignupForm from "./signupForm";

export default function SignUpPage() {
  return (
    <main className={styles.main}>
      <SignupForm />
    </main>
  );
}
