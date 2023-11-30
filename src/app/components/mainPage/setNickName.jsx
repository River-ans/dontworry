"use client";
import styles from "@/app/styles/mainPage.module.scss";
import { fetchUserInfo } from "@/app/apis/userApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { updateNickname } from "@/app/apis/updateNickname";

export default function SetNickNameModal() {
  const [newNickname, setNewNickname] = useState("");
  const queryClient = useQueryClient();

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    retry: false,
    staleTime: Infinity,
  });

  const mutation = useMutation({
    mutationFn: updateNickname,
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      refetch();
      console.log(data.message);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^[a-zA-Z0-9가-힣]{2,16}$/.test(newNickname)) {
      console.log("닉네임은 최소 2자 이상이며, 영문, 한글, 숫자만 가능합니다.");
      return;
    }
    mutation.mutate({ nickname: newNickname });
  };

  if (data) {
    if (data.nickname == "" || !data.nickname) {
      return (
        <div className={styles.backDrop}>
          <div className={styles.modal}>
            <div className={styles.setNickNameWrapper}>
              <h2>회원가입 성공</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="닉네임을 입력하세요"
                  value={newNickname}
                  onChange={(e) => setNewNickname(e.target.value)}
                />
                <button className={styles.submitBtn} type="submit">
                  완료
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}
