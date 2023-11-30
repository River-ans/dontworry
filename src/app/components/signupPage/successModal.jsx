import { CheckIcon } from "@/app/components/common";
import styles from "@/app/styles/authPage.module.scss";

export default function SuccessModal({ onClose }) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <CheckIcon />

        <h2>회원가입 성공</h2>
        <p>회원가입이 성공적으로 완료되었습니다.</p>
        <button onClick={onClose}>로그인 하러가기</button>
      </div>
    </div>
  );
}
