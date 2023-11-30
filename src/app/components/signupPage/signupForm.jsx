"use client";
import { useEffect, useState } from "react";
import styles from "@/app/styles/authPage.module.scss";
import { Msg, Spinner } from "@/app/components/common";
import { createUser } from "@/app/apis/createUser";
import SuccessModal from "./successModal";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => {
      return { ...prev, [name]: value };
    });

    validate(name, value);
  };

  //추가로 비밀번호 검사시 컴펌 비밀번호 재검사
  useEffect(() => {
    validate("confirmPassword", formValues.confirmPassword);
  }, [formValues.password]);

  const validate = (name, value) => {
    let errors = { ...formErrors };

    switch (name) {
      case "email":
        errors.email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          value
        )
          ? ""
          : "유효한 이메일 형식이어야 합니다.";
        break;
      case "password":
        errors.password =
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/.test(
            value
          )
            ? ""
            : "비밀번호는 최소 10자 이상이며, 영문, 숫자, 특수문자를 조합해야 합니다.";
        break;
      case "confirmPassword":
        errors.confirmPassword =
          value === formValues.password ? "" : "비밀번호가 일치하지 않습니다.";
        break;
      case "nickname":
        errors.nickname = /^[a-zA-Z0-9가-힣]{2,16}$/.test(value)
          ? ""
          : "닉네임은 최소 2자 이상이며, 영문, 한글, 숫자만 가능합니다.";
        break;
      default:
        break;
    }

    setFormErrors(errors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    // 폼 필드 값이 비어있지 않은지 확인
    const areFieldsFilled =
      formValues.nickname.trim() !== "" &&
      formValues.email.trim() !== "" &&
      formValues.password.trim() !== "" &&
      formValues.confirmPassword.trim() !== "";

    // 오류 메시지가 없는지 확인
    const isValidForm = Object.values(formErrors).every(
      (error) => error === ""
    );
    //  지연 함수
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // 초 지연
    await delay(1000);

    if (areFieldsFilled && isValidForm) {
      //   여기에 폼 제출 로직 (예: API 요청) 추가
      try {
        const data = await createUser(formValues);
        // 성공 시 실행되는 코드
        setShowSuccessModal(true);
      } catch (error) {
        // 실패 시 실행되는 코드
        console.log(error.message);

        // 실패 시 실행되는 코드
        if (error.message === "Failed to fetch") {
          setErrorMsg("sever error");
        } else if (error.message === "Network request failed") {
          setErrorMsg("인터넷을 확인해보세요");
        } else {
          setErrorMsg("회원가입 실패:" + error.message);
        }
      }
    } else {
      setErrorMsg("정보를 정확히 입력해주세요.");
    }

    setIsLoading(false);
  };

  const handleButtonClick = () => {
    setShowSuccessModal(false);
    router.push("/login");
  };

  return (
    <div className={styles.authForm}>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="이메일"
            required
            value={formValues.email}
            onChange={handleChange}
          />
          {formErrors.email && <p>{formErrors.email}</p>}
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호"
            required
            value={formValues.password}
            onChange={handleChange}
          />
          {formErrors.password && <p>{formErrors.password}</p>}
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            required
            value={formValues.confirmPassword}
            onChange={handleChange}
          />
          {formErrors.confirmPassword && <p>{formErrors.confirmPassword}</p>}
        </div>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="nickname"
            name="nickname"
            placeholder="닉네임"
            required
            value={formValues.nickname}
            onChange={handleChange}
          />
          {formErrors.nickname && <p>{formErrors.nickname}</p>}
        </div>
        <button className={styles.submitBtn} type="submit">
          {isLoading ? <Spinner /> : <span>회원가입</span>}
        </button>
      </form>
      {errorMsg ? <Msg>{errorMsg}</Msg> : <></>}
      {showSuccessModal && <SuccessModal onClose={handleButtonClick} />}
    </div>
  );
}
