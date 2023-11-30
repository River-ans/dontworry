"use client";

import Link from "next/link";
import { EditIcon } from "../common";
import styles from "@/app/styles/mainPage.module.scss";
import { fetchUserInfo } from "@/app/apis/userApi";
import { useQuery } from "@tanstack/react-query";

export default function CreatePostButton() {
  const { isPending, error, data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    retry: false,
    staleTime: Infinity,
  });

  return (
    <>
      {data ? (
        <Link href="/createpost" className={styles.editLink}>
          <EditIcon />
        </Link>
      ) : (
        <></>
      )}
    </>
  );
}
