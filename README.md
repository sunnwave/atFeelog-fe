# atFeelog 🎫

공연 정보를 탐색하고, 관람 후 느낀 감상을 기록·공유하는 서비스입니다.

| 기간 | 팀 구성 | 역할 |
|---|---|---|
| 2026.02 ~ 현재 | FE 1명(본인) · BE 1명 | UI 디자인부터 프론트엔드 개발·배포까지 전담 |

- 🔗 **배포:** [atFeelog 바로가기](https://atfeelog.site) <!-- TODO: 실제 접속 주소 확인 -->
- 📓 **개발 기록:** [Notion 개발 기록](https://app.notion.com/p/7e8878e573674560be4b93ee107b3d08?v=30e1cffee6504f368dcc03efb86fe280) <!-- TODO: 공개 설정 후 링크 -->

<!-- TODO: 주요 화면 스크린샷 2~3장 (홈 / 공연 탐색 / 기록 작성) -->

<br/>

## ✨ 주요 기능

- **공연 탐색:** KOPIS 공연 목록·상세 조회, 박스오피스, 공연 찜하기
- **기록(필로그):** 관람 기록 작성·수정·삭제, Tiptap 에디터, 이미지 업로드, 장소 검색(카카오 API), 임시저장
- **피드:** 기록 목록 무한스크롤, 좋아요, 댓글
- **프로필:** 마이페이지(내 기록·좋아요한 기록·찜한 공연), 다른 사용자 프로필, 프로필 수정
- **인증:** 로그인·회원가입, 새로고침 후 로그인 상태 유지

<br/>

## 🧰 기술 스택

| 분류 | 기술 |
|---|---|
| Framework | Next.js 14 (Pages Router), React 18 |
| Language | TypeScript |
| 서버 상태 | Apollo Client(GraphQL), TanStack Query(REST) |
| 클라이언트 상태 | Recoil |
| Styling | Tailwind CSS v4 |
| Form·Editor | react-hook-form, yup, Tiptap |
| Test | Vitest, Playwright, Storybook, MSW |
| CI/CD | GitHub Actions, Vercel |

<br/>

## 🛠 핵심 구현

### 1. 컨테이너 쿼리 기반 반응형 레이아웃
- **문제:** 뷰포트 기준 미디어 쿼리는 사이드바를 뺀 실제 콘텐츠 너비를 반영하지 못해, 데스크톱에서 카드가 태블릿보다 작게 표시됨 (1024px 화면에서 콘텐츠 영역 736px, 5열 → 카드당 약 147px)
- **해결:** `ResponsiveGrid`는 그리드를 감싼 영역 너비로 열 수를, 카드는 자신의 너비(180·220·280·320px)로 글자·여백·아이콘 크기를 조정하도록 컨테이너 쿼리 적용
- **결과:** 홈·피드·공연 목록·마이페이지 등 10여 곳에서 배치 위치와 관계없이 카드가 일관되게 표시

### 2. 디자이너 없이 만든 디자인 기반
- 레퍼런스를 정해 AI 시안을 받고, 프로젝트 전체의 통일감과 정보 전달력을 기준으로 선택·조합
- 색상 토큰을 Primitive → Semantic → Tailwind `@theme` 구조로 정비하고, 공통 컴포넌트와 Storybook 문서로 연결

### 3. 로그인 상태 유지 흐름
- Access Token은 메모리(Recoil), Refresh Token은 HttpOnly 쿠키로 관리
- 앱 시작 시 토큰 복구 → 사용자 정보 조회 → 초기화 완료 순서로 로그인 상태 복원
- 토큰 만료로 실패한 요청은 Apollo `errorLink`에서 재발급 후 1회 재시도
- 동시에 발생한 재발급 요청은 하나의 Promise를 공유해 중복 호출 방지

### 4. REST API 서버 상태 관리
- GraphQL은 Apollo Client, 외부 REST API(KOPIS·카카오)는 TanStack Query로 분리
- `useState`·`useEffect`로 직접 관리하던 로딩·오류·페이지 누적 코드를 정리
- 공연 ID별 캐시를 상세 화면과 찜 목록에서 공유하고, 찜한 공연 상세 정보는 `useQueries`로 병렬 조회
- KOPIS XML 응답은 API Route와 어댑터 레이어에서 일관된 형태로 변환

### 5. 배포 환경 CORS 대응
- 공용 백엔드의 CORS 허용 목록 때문에 배포 후 API 요청이 차단되는 문제를 Next.js API Route 기반 GraphQL 프록시로 해결
- 요청·응답 본문을 메모리에 모두 올리지 않고 스트림으로 그대로 전달

### 6. 로딩·빈 데이터·오류 상태 공통 UI
- `Skeleton`, `EmptyState`, `PageFallback`을 공통 컴포넌트로 만들어 화면마다 같은 방식으로 로딩·빈 결과·오류 상태를 표시

### 7. 기록 에디터와 임시저장
- 기록 작성·수정 화면이 같은 `RecordEditor`를 쓰도록 만들고, 폼 인스턴스는 상위 화면이 소유하도록 구성
- 임시저장 로직을 도메인에 묶이지 않는 제네릭 훅 `useDraftStorage`로 분리해 작성·수정 화면에서 공통 사용

### 8. 공연 찜 즉시 반영
- 찜 버튼을 누르면 서버 응답 전에 화면에 먼저 반영하고(낙관적 UI), 실패하면 원래 상태로 되돌린 뒤 안내 토스트 표시
- 찜 목록을 다시 불러오는 대신 mutation 결과로 캐시를 직접 갱신해 불필요한 재요청 제거

<br/>

## 🐛 트러블슈팅: 인증 복구 시 좋아요 표시 오류

- **문제:** 새로고침 후 기존 좋아요가 빈 하트로 표시됨. 요청·응답 순서를 추적해, 토큰 복구 전에 피드가 조회되면서 비로그인 기준의 좋아요 상태가 반환되는 것을 확인
- **검토한 방법**
  - 인증 완료까지 피드 조회 대기 → 비로그인 사용자까지 첫 로딩이 늦어짐
  - 인증 후 활성 쿼리 재조회 → 이미 받은 목록 전체를 다시 요청
- **선택:** 공개 피드는 바로 조회하고, 로그인 확인 후 기존 좋아요 목록 API에서 게시물 ID만 별도로 조회해 대조
- **결과:** 공개 피드는 인증 대기 없이 표시하면서 사용자별 좋아요 상태를 반영. 좋아요 변경 시 게시물과 좋아요 목록 캐시를 함께 갱신해, 별도 재조회 없이 피드와 마이페이지 좋아요 목록을 동기화

<br/>

## 🐛 트러블슈팅: macOS와 CI 환경의 파일명 대소문자 차이
<!-- TODO: 실제 상황(어떤 파일이었는지) 확인 후 유지 -->
- **문제:** 로컬(macOS)에서는 빌드가 되는데 GitHub Actions(Linux)에서만 빌드 실패
- **원인:** macOS 파일시스템은 대소문자를 구분하지 않아, 파일명 대소문자만 바꾼 변경을 git이 인식하지 못함
- **해결:** `git mv`로 파일명을 강제로 변경해 git에 반영

<br/>

## 🧪 테스트

- **MSW 도입:** 컴포넌트마다 `fetch` 직접 패치, `MockedProvider` 등으로 섞여 있던 가짜 응답 방식을 MSW로 통합해 REST·GraphQL을 같은 방식으로 모킹
- **Storybook:** 공통 컴포넌트 대부분과 디자인 토큰(Palette Showcase)을 문서화하고, API 응답별 화면(데이터 표시·빈 결과·오류·무한스크롤)을 재현
- **Playwright E2E:** 로그인·로그인 유지·로그아웃, 임시저장 복구, 기록 작성, 댓글 흐름 (20개)
- **Vitest:** 쿠키 변환, 임시저장, 무한스크롤 등 주요 로직 단위 테스트

<br/>

## ⚙️ 개발 환경과 CI/CD

- **커밋 전:** husky + lint-staged로 변경된 파일에 `eslint --fix` 실행
- **푸시 전:** `tsc --noEmit`으로 타입 검사
- **CI:** PR 생성 시 GitHub Actions에서 타입 검사 → lint → 단위 테스트 → 빌드 실행
- **CD:** main 브랜치 반영 시 Vercel 자동 배포
- **문서화:** 이슈별 배경·원인·결정·배운 점을 Notion 개발 기록으로 정리

<br/>

## 📁 폴더 구조

```bash
.
├── pages                # 라우트 (feelog, shows, user, login, settings)
├── e2e                  # Playwright E2E 테스트
├── src
│   ├── api              # API 레이어 (graphql, rest, auth, adapters, server)
│   ├── components       # commons / features / ui 컴포넌트
│   ├── shared           # hooks, stores, tokens, constants, utils, types
│   ├── mocks            # MSW 핸들러
│   ├── storybook        # Storybook 설정·목 데이터
│   └── styles           # 전역 스타일, 디자인 토큰(theme.css)
├── .github/workflows    # CI 설정
└── codegen.yaml         # GraphQL Code Generator 설정
```
