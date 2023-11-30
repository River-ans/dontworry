import styles from "@/app/styles/mainPage.module.scss";
import { MenuIcon, SearchIcon, UserIcon } from "../common";
import { HeaderActionBtn } from "./headerActionBtn";
import Link from "next/link";
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Link href={"/"}>
            <h1 className={styles.logo}>dont'worry</h1>
          </Link>
        </div>
        <div className={styles.right}>
          <SearchIcon />
          <HeaderActionBtn />
        </div>
      </div>
    </header>
  );
}
