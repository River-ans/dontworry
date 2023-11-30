import Header from "../components/mainPage/header";
import styles from "@/app/styles/mainPage.module.scss";
import UserInfoModal from "../components/mainPage/profileModal";
import SetNickNameModal from "../components/mainPage/setNickName";
import CreatePostButton from "../components/mainPage/createPostButton";

export const metadata = {
  title: "main",
  description: "main page",
};

export default function MainLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Header />
      <UserInfoModal />
      <SetNickNameModal />
      <CreatePostButton />
      {children}
    </div>
  );
}
