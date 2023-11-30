"use client";
import createPost from "@/app/apis/createPost";
import {
  BackDrop,
  BackIcon,
  CloseIcon,
  DropDownIcon,
} from "@/app/components/common";
import styles from "@/app/styles/createPage.module.scss";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function createPage() {
  const router = useRouter();
  const [pollItems, setPollItems] = useState([]);
  const [cateModal, setCateModal] = useState(true);
  const categories = [
    "생활/일상",
    "학업/교육",
    "직장/커리어",
    "인간관계",
    "사랑/연애",
    "자기개발",
    "기타",
  ];
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addPollItem = () => {
    setPollItems([...pollItems, ""]);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);

    setCateModal(false);
  };

  const removePollItem = (index) => {
    setPollItems(pollItems.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    // 빈 항목을 제외하고 필터링
    const filteredPollItems = pollItems.filter((item) => item.trim() !== "");

    try {
      const result = await createPost({
        category: selectedCategory,
        title,
        content,
        pollItems: filteredPollItems,
      });
      console.log("Post created:", result.message);
      alert(result.message);
      router.push(`/posts/${result.postId}`);
      // 성공적인 게시글 생성 후의 로직 (예: 페이지 리디렉션)
    } catch (error) {
      alert(error);
      console.log(error);
      // 에러 처리 로직
    }
  };

  return (
    <BackDrop>
      {/* 카테고리 선택 모달 */}
      {cateModal && (
        <div className={styles.cateModalBackdrop}>
          <div className={styles.cateModal}>
            <h3>카테고리 선택</h3>
            <div className={styles.buttons}>
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* 게시글 작성페이지 */}
      <div className={styles.wrapper}>
        <div className={styles.backIcon}>
          <BackIcon />
        </div>
        {/*  */}
        <button className={styles.cateBtn} onClick={() => setCateModal(true)}>
          <span>{selectedCategory || "카테고리 선택"}</span>
          <span>
            <DropDownIcon />
          </span>
        </button>
        {/*  */}
        <form className={styles.creatPostFrom} onSubmit={handleSubmit}>
          <fieldset className={styles.postSection}>
            <input
              type="text"
              placeholder="제목을 입력하세요."
              className={styles.title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="고민된 내용을 적어주세요."
              className={styles.content}
              rows="10"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </fieldset>
          <fieldset className={styles.pollSection}>
            <legend>투표항목</legend>
            {pollItems.map((item, index) => (
              <div key={index} className={styles.pollItem}>
                <input
                  className={styles.pollInput}
                  type="text"
                  placeholder={`항목 ${index + 1}`}
                  value={item}
                  onChange={(e) => {
                    const newPollItems = [...pollItems];
                    newPollItems[index] = e.target.value;
                    setPollItems(newPollItems);
                  }}
                />
                <button type="button" onClick={() => removePollItem(index)}>
                  <span>
                    <CloseIcon />
                  </span>
                </button>
              </div>
            ))}
            {pollItems.length < 7 && (
              <button
                className={styles.pollBtn}
                type="button"
                onClick={addPollItem}
              >
                + 항목추가
              </button>
            )}
          </fieldset>
          <button type="submit" className={styles.submitBtn}>
            완료
          </button>
        </form>
      </div>
    </BackDrop>
  );
}
