import styles from "@/app/styles/authPage.module.scss";

import "remixicon/fonts/remixicon.css";
import { BackIcon } from "../components/common";

export const metadata = {
  title: "login",
  description: "login page",
};

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
      {/* <i className="ri-arrow-left-s-line" onClick={goBack}></i> */}
      <div className={styles.backIcon}>
        <BackIcon />
      </div>
    </div>
  );
}
