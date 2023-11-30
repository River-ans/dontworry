"use client";
import { login } from "@/app/apis/login";
import { fetchUserInfo } from "@/app/apis/userApi";
import { Msg } from "@/app/components/common";
import styles from "@/app/styles/authPage.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState(null);
  const router = useRouter();
  const { refetch } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    enabled: false,
    retry: false,
    staleTime: Infinity,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg(null);

    try {
      const data = await login(userData);
      //성공 시 실행되는 코드
      router.push("/");
      refetch();
    } catch (error) {
      console.log(error.message);
      // 실패 시 실행되는 코드
      if (error.message === "Failed to fetch") {
        setErrorMsg("sever error");
      } else if (error.message === "Network request failed") {
        setErrorMsg("인터넷을 확인해보세요");
      } else {
        setErrorMsg("로그인 실패:" + error.message);
      }
    }
  };

  return (
    <div className={styles.authForm}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="이메일"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호"
            required
            onChange={handleInputChange}
          />
        </div>
        <button className={styles.submitBtn} type="submit">
          <span>로그인</span>
        </button>
      </form>
      {errorMsg ? <Msg>{errorMsg}</Msg> : <></>}
    </div>
  );
}
