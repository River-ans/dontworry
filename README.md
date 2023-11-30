# **Don't worry**

돈 워리는 사람들이 일상생활의 다양한 선택과 고민에 대해 다른 사람들의 의견을 쉽게 얻을 수 있도록 돕는 플랫폼을 제공한다. 사용자들이 자신의 고민을 공유하고, 커뮤니티에서 투표 그리고 다양한 의견과 피드백을 통해 더 나은 결정을 내릴 수 있게 도와줄 수 있는 플랫폼이다.

[데모 영상](https://www.dropbox.com/scl/fi/erk2fxzqwdydnati8il65/2023-11-30-6.52.43.mov?rlkey=a13cjufrr83ejlpbylq2jzkte&dl=0)

## **설치 방법**

이 프로젝트는 `npm`을 사용하여 설정되었습니다.

1. 레포지토리를 클론합니다: **`git clone [레포지토리 URL]`**
2. 클론한 디렉토리로 이동합니다: **`cd [디렉토리 이름]`**
3. 필요한 패키지를 설치합니다: **`npm install`**
4. 로컬에서 프로젝트를 실행합니다: **`npm run start`**

## **프로젝트 문서**

### **사용 기술 스택**

- Next.js 14
- react 18
- tanstack/react-query
- recoil
- sass

### **페이지 구성**

<pre>
`app
├─ (authPage)
│ ├─ kakao
│ │ └─ page.jsx 카카오 리다이랙트 페이지
│ ├─ login
│ │ └─ page.jsx 로그인 페이지
│ ├─ signup
│ │ └─ page.jsx 회원가입 페이지
│ └─ layout.jsx
├─ (mianPage)
│ ├─ createpost
│ │ └─ page.jsx 게시글 작성 페이지
│ ├─ posts
│ │ └─ [id]
│ │ └─ page.jsx 게시글 페이지
│ ├─ layout.jsx
│ └─ page.jsx 메인 페이지`
</pre>

### **Roadmap or Future Improvements**

1. **성능 최적화**: 현재 버전에서는 성능 최적화에 크게 집중하지 못했습니다. 향후, 렌더링 성능 개선 및 효율적인 데이터 로딩 방식을 구현할 예정입니다.
2. **댓글 기능 추가**: 사용자 간의 상호작용을 높이기 위해 댓글 기능을 추가할 계획입니다.
3. **게시글 카테고리 기능**: 사용자가 게시글을 카테고리별로 분류하고 찾을 수 있도록 하는 기능을 개발할 예정입니다.
4. **UI/UX 개선**: 사용자 경험을 개선하기 위해 디자인 및 사용성 개선에 집중할 것입니다.

## **정보**

- [프로젝트 노션 링크](https://elfin-tank-a25.notion.site/don-t-worry-8206351f14ad4263a105c0372320b6d6)
  - 기획 배경
  - 와이어프레임

## **작성자**

- [문은용](https://velog.io/@river-m)
