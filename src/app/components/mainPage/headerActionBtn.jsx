"use client";

import { modalState } from "@/app/atoms/atoms";
import { UserIcon } from "../common";
import { useRecoilState } from "recoil";

export function HeaderActionBtn() {
  const [modal, setModal] = useRecoilState(modalState);

  const handleClick = () => {
    setModal(true);
  };

  return (
    <button onClick={handleClick}>
      <UserIcon />
    </button>
  );
}
