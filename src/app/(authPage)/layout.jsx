import styles from "@/app/styles/authPage.module.scss";

function SideText() {
  return (
    <div className={styles.SideText}>
      <span>Don't worry</span>
      <span>be happy</span>
    </div>
  );
}

export default function AuthLayout({ children }) {
  return (
    <div className={styles.layout}>
      <SideText />
      {children}
    </div>
  );
}
