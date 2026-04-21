# atFeelog 🎫

공연·전시 관람 후 느낀 감정을 기록하고 공유할 수 있는 서비스입니다.
관람 경험을 단순 후기에서 끝내지 않고, 기록으로 남기고 관련 거래 정보까지 함께 볼 수 있도록 기획했습니다.

## ✨ 소개

atFeelog는 기존 학습형 게시판 프로젝트를 새로운 서비스 도메인으로 재구성한 개인 프로젝트입니다.
공연·전시 기록 서비스에 맞게 정보 구조와 UI를 다시 설계하고, 프론트엔드 구현을 진행했습니다.

## 🔗 배포 링크

👉 [atFeelog 바로가기](https://at-feelog-fe.vercel.app)

## 🛠 구현 기능

### ✅ 구현 완료
- 공연·전시 기록 목록 조회 (무한스크롤)
- 기록 작성 / 수정 / 삭제
- 임시저장 기능 (localStorage, write/update 공통)
- 장소 검색 (카카오 API 연동)
- 이미지 업로드
- 댓글 작성 / 수정 / 삭제 (무한스크롤)
- 로그인 / 회원가입
- 인증 (refreshToken 쿠키 + accessToken 메모리 이중 토큰)
- 토큰 만료 시 자동 갱신 및 재시도 (Apollo errorLink)

### 🚧 준비 중
- 마켓 (공연·전시 관련 굿즈 거래)
- 마이페이지

## 🧰 기술 스택

| 분류 | 기술 |
|---|---|
| Framework | Next.js 15 (Pages Router) |
| Language | TypeScript |
| State | Recoil |
| Data Fetching | Apollo Client, GraphQL |
| Form | react-hook-form, yup |
| Styling | Tailwind CSS |
| Editor | Tiptap |
| Test | Vitest, Storybook |
| CI/CD | GitHub Actions, Vercel |

## 🤔 구현하면서 중점적으로 고민한 부분

**인증 구조 설계**
- refreshToken(쿠키) + accessToken(Recoil 메모리) 이중 토큰 방식
- 싱글플라이트 패턴으로 동시 refresh 요청 방지
- Apollo errorLink에서 토큰 만료 시 자동 갱신 후 1회 재시도

**컴포넌트 설계**
- RecordEditor를 write/update 공용으로 설계, form 인스턴스를 상위에서 소유
- useDraftStorage를 제네릭 훅으로 설계해 도메인 독립적으로 구현

**CORS 해결**
- 공용 백엔드의 CORS 제한을 Next.js API Route 프록시로 우회
- Node.js http/https 스트림 파이핑 방식으로 메모리 효율적으로 구현

**macOS 대소문자 이슈**
- macOS와 Linux(CI)의 파일시스템 대소문자 처리 차이로 인한 빌드 실패 경험
- git mv로 강제 rename하여 해결

## 📁 폴더 구조

```bash
.
├── pages              # 라우트 및 페이지 구성
├── public             # 정적 파일
├── src
│   ├── components     # 공통 / 기능 / UI 컴포넌트
│   ├── lib            # Apollo 설정 및 공통 라이브러리
│   ├── shared         # GraphQL, 훅, 전역 상태, 유틸리티
│   └── styles         # 전역 스타일 및 테마
├── .github/workflows  # CI 설정
├── codegen.yaml       # GraphQL Code Generator 설정
├── next.config.ts     # Next.js 설정
└── package.json
```

## ⚙️ CI/CD

- **CI**: PR 생성 시 lint → 유닛 테스트 → 빌드 자동 실행 (GitHub Actions)
- **CD**: main 브랜치 push 시 Vercel 자동 배포
