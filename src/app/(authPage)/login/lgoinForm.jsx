import styles from "@/app/styles/authPage.module.scss";

export default function LoginForm() {
  return (
    <div className={styles.authForm}>
      <form>
        <div className={styles.formGroup}>
          <input type="text" id="id" name="id" placeholder="이메일" required />
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호"
            required
          />
        </div>
        <button className={styles.submitBtn} type="submit">
          <span>로그인</span>
        </button>
      </form>
    </div>
  );
}
