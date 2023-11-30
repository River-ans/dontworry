"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchUserInfo } from "@/app/apis/userApi"; // 올바른 경로로 수정하세요
import styles from "@/app/styles/mainPage.module.scss";
import Link from "next/link";
import {
  LoginIcon,
  LogoutIcon,
  SettingsIcon,
  SignupIcon,
  Spinner,
  UserIcon,
  UserSettingIcon,
} from "../common";
import { useRecoilState } from "recoil";
import { modalState } from "@/app/atoms/atoms";
import { logout } from "@/app/apis/logout";

function AuthLinks() {
  const [moadal, setModal] = useRecoilState(modalState);
  function handleCloseModal(e) {
    if (e.target === e.currentTarget) {
      setModal(false);
    }
  }
  return (
    <div className={styles.modalWrapper}>
      <h2>Don't worry, be happy</h2>
      <Link href="/login" onClick={handleCloseModal}>
        <LoginIcon />
        <span>로그인</span>
      </Link>
      <Link href="/signup" onClick={handleCloseModal}>
        <SignupIcon />
        <span>회원가입</span>
      </Link>
    </div>
  );
}

export default function ProfileModal() {
  const { isPending, error, data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    retry: false,
    staleTime: Infinity,
  });
  const queryClient = useQueryClient();
  const [moadal, setModal] = useRecoilState(modalState);

  function handleCloseModal(e) {
    if (e.target === e.currentTarget) {
      setModal(false);
    }
  }
  if (isPending) {
    return <Spinner />;
  }

  const handleLogoutClick = async () => {
    try {
      await logout();
      // 로그아웃 성공 후의 추가 처리
      setModal(false);
      queryClient.removeQueries("userInfo");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (moadal) {
    return (
      <div className={styles.backDrop} onClick={handleCloseModal}>
        <div className={styles.modal}>
          {data ? (
            <div className={styles.modalWrapper}>
              <div className={styles.profileImg}>
                <UserIcon />
              </div>
              <p className={styles.nickname}>{data.nickname}</p>
              <button>
                <UserSettingIcon />
                <span>프로필 수정</span>
              </button>
              <button>
                <SettingsIcon />
                <span>설정</span>
              </button>
              <button onClick={handleLogoutClick}>
                <LogoutIcon />
                <span>로그아웃</span>
              </button>
            </div>
          ) : (
            // 데이터가 없을 경우 로그인 링크를 보여주는 부분
            <AuthLinks />
          )}
        </div>
      </div>
    );
  }
}
