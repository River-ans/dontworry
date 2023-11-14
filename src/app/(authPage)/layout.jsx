import styles from "@/app/styles/authPage.module.scss";
import "remixicon/fonts/remixicon.css";

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
      <i className="ri-arrow-left-s-line"></i>
    </div>
  );
}
