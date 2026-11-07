# AGENTS.md

이 저장소에서 일하는 AI 에이전트(Claude Code, Codex 등)가 따라야 할 규칙입니다.

## 프로젝트

JUSIAI GAMES 데브로그(https://jusiai-games.github.io)의 소스입니다. Astro + React + TypeScript 정적 사이트이고, `main`에 push하면 GitHub Actions(`.github/workflows/deploy.yml`)로 GitHub Pages에 배포됩니다.

| 명령어 | 용도 |
| --- | --- |
| `npm install` | 의존성 설치, 커밋 계정 검사 hook 활성화 |
| `npm run dev` | 개발 서버 (http://localhost:4321) |
| `npm run build` | 타입 검사 후 `dist/`에 빌드 |
| `npm run favicons` | `src/assets/brand/jusiai-icon-8bit-*.png`로 파비콘 세트 생성 |

## README

README는 공개 저장소를 찾아온 사람을 위한 **JUSIAI GAMES 소개**입니다. 설치, 빌드, 프로젝트 구조 같은 개발 문서는 README에 쓰지 않고 이 파일에 씁니다.

- 원본은 한국어 `README.md`, 번역은 영어 `README.en.md`, 일본어 `README.ja.md`입니다.
- 한국어 원본을 고치면 영어와 일본어 번역도 같은 커밋에서 함께 고칩니다.

## 역할 분담

- 에이전트는 **코드 작성과 리뷰**까지만 합니다.
- **커밋은 사용자가 명시적으로 요청할 때만 합니다.** "커밋해 줘"처럼 커밋을 직접 요청받지 않았다면 `git commit`을 실행하지 않습니다. 작업 요청, 수정 요청, 이전 대화에서 받은 커밋 요청은 커밋 요청이 아닙니다. 작업이 끝나면 아래 체크리스트로 리뷰하고, 변경 사항을 커밋하지 않은 채로 사용자에게 알립니다.
- **push는 사람이 직접 합니다.** 에이전트는 `git push`를 실행하지 않습니다. 요청받은 커밋을 마치면 "push 준비가 됐다"고만 알립니다.
- 다음 작업도 하지 않습니다: force push, 이미 push된 커밋의 amend·rebase, 브랜치·태그 삭제, `--no-verify`로 hook 건너뛰기.

## 커밋 규칙

- 작성자와 커미터는 반드시 `jusiai-games <jusiai.games@gmail.com>`입니다. 커밋 전에 `git config user.name`과 `git config user.email`을 확인합니다. 다른 계정이면 커밋하지 말고 사용자에게 알립니다.
- 개인 계정 정보(이름, 이메일)가 이력이나 파일에 남으면 안 됩니다.
- `.githooks/`의 pre-commit, pre-push hook이 계정을 검사합니다. hook이 거부하면 우회하지 말고 원인을 고칩니다.
- 커밋 메시지는 영어 명령문 제목 한 줄, 빈 줄, 변경 요약 bullet 순서로 씁니다.

## 커밋 전 리뷰 체크리스트

1. `npm run build`가 통과해야 합니다(타입 검사 `astro check` 포함, 오류·경고 0).
2. `git diff --staged`로 바뀐 내용을 모두 읽고 다음을 확인합니다.
   - 쓰지 않는 코드, 컴포넌트, 이미지, 의존성이 없는지
   - 템플릿 잔재(예시 글, placeholder 이미지, lorem ipsum, 영어 예시 문구)가 없는지
   - 코드를 그대로 다시 말하는 주석이나 낡은 설명이 없는지
   - 지운 파일이나 경로를 가리키는 링크·import가 남지 않았는지
   - 색을 값으로 직접 쓰지 않았는지(아래 디자인 규칙)
3. 화면을 바꿨다면 라이트·다크 테마와 모바일 폭(390px)에서 가로 스크롤 없이 보이는지 확인합니다.
4. 리뷰에서 찾은 문제는 고치고, 고치지 않은 것은 사용자에게 알립니다. 커밋은 사용자가 요청할 때만 합니다.

## 코드 규칙

- 불필요한 코드는 남기지 않습니다. 예시용 컴포넌트, 쓰지 않는 파일, 주석 처리한 코드는 지웁니다.
- 주석은 코드만 봐서는 알 수 없는 이유나 제약만 씁니다.
- 화면 문구와 문서는 한국어로 씁니다. 메뉴의 About, Contact처럼 정해진 영문 이름은 그대로 둡니다.
- 주요 메뉴는 `src/consts.ts`의 `NAV_ITEMS`(홈 → 데브로그 → About → Contact) 하나에서만 관리합니다.
- 데브로그 글은 `src/content/devlog/`에 `YYYY-MM-DD-슬러그.mdx` 이름으로 두고, frontmatter는 `src/content.config.ts` 스키마를 따릅니다. URL은 날짜를 뺀 `/devlog/슬러그/`이고, 글 정렬은 파일 이름이 아니라 `pubDate` 기준(최신 글이 위)입니다.
- 새 글은 `templates/devlog-post.mdx`를 복사해서 시작합니다. `src/content/devlog/` 밖에 두어야 글로 빌드되지 않습니다.
- GitHub 저장소 링크는 글에서 `src/components/RepoCard.astro`로 보여 줍니다.
- 인용구는 글에서 `src/components/Quote.astro`로 보여 줍니다.
- 글 이미지는 blog-images-2026 저장소에 올리고 `src/consts.ts`의 `IMAGE_URL_2026`으로 주소를 만듭니다. 한 장은 `src/components/PostImage.astro`, 여러 장은 `src/components/ImageCollage.astro`로 보여 줍니다.
- 글 첨삭은 `.claude/skills/edit-devlog/SKILL.md`(`/edit-devlog`)를 따릅니다.
- Node.js 26(`.nvmrc`)을 기준으로 합니다.

## 디자인 규칙

JUSIAI GAMES는 개발자 한 명의 1인 개발 랩이고, 블로그는 JUSIAI GAMES 디자인 시스템(https://claude.ai/artifact/TFsB4FPK46UPLuyBiGv5TY)을 따릅니다. 기준은 디자인 시스템의 `project/README.md`와 `project/tokens.json`이고, 블로그의 `tokens.css`·`components.css`는 같은 이름과 값을 씁니다. 핵심 5색은 `night-desk`(바탕), `night-panel`(면), `butter-gold`(Lamp Gold, 강조), `home-cream`(글자), `peach-coral`(포인트)입니다.

- 색은 `src/styles/tokens.css`의 토큰으로만 씁니다. UI에는 역할 토큰(`var(--surface)`, `var(--card)`, `var(--ink)`, `var(--heading)`, `var(--link)`, `var(--muted)`, `var(--action)` …)을 먼저 쓰고, 테마와 상관없는 브랜드 면에만 원색 토큰(`var(--night-desk)`, `var(--butter-gold)` …)을 씁니다. `#hex`를 컴포넌트나 페이지에 직접 쓰지 않습니다.
- 핵심 5색과 `moon-gray`, `neon-red`, 캐릭터 전용 색 밖의 새 색은 추가하지 않습니다. 필요하면 디자인 시스템부터 바꿉니다.
- 버튼, 배지, 태그, 카드, 콜아웃, 본문, 로고는 `src/styles/components.css`의 `jg-` 클래스를 씁니다. 파일 위쪽은 디자인 시스템 `components/bundle.css`와 같게 두고, 블로그 전용 클래스(`jg-night`, `jg-pixel`, `jg-logo__face`, `jg-stairs`, `jg-underline`, `jg-repo-card`, `jg-quote`, `jg-post-image`, `jg-image-collage`, `jg-media-caption`)는 맨 아래에 둡니다.
- 테마는 Night(OS 다크 모드)와 Blog Light(글 본문, 기본) 두 가지입니다. 헤더, 홈 히어로, 푸터는 두 테마 모두 Night이고, `jg-night` 클래스로 역할 토큰을 Night 값으로 바꿉니다. 경계는 `jg-stairs`(`night-panel` 픽셀 계단)로 표시합니다.
- Blog Light: `surface` #FFFCF4, `card` #F6F0E3, 본문·제목 `night-desk`, 링크 짙은 코랄 #A84E2B, 캡션 #5E6475, 기본 버튼 `night-desk` 면에 `home-cream` 글자.
- Night: `surface` `night-desk`, `card` `night-panel`, 본문 `home-cream`, 제목·링크 `butter-gold`, 캡션 `moon-gray`, 기본 버튼 `butter-gold` 면에 `on-accent` 글자.
- `butter-gold`, `peach-coral`, `home-cream` 면 위 글자는 `on-accent`(`night-desk`)입니다. 흰 글자를 올리지 않습니다. 비율은 `night-desk`·`night-panel` 70 / `home-cream` 20 / `butter-gold`·`peach-coral` 10을 목표로 합니다.
- 보조 버튼은 `heading` 색 테두리와 글자입니다. 제목 밑 짧은 밑줄은 `jg-underline`(`peach-coral`)입니다.
- `neon-red`는 LIVE, NEW, 경고 같은 작은 표시에만, 한 화면에 하나만 쓰고 위 글자는 `on-signal`입니다.
- 모서리는 `radius-md`(14px), 그림자·그라디언트·왼쪽 색 띠는 쓰지 않습니다. 구분은 `surface`와 `card`의 면 색 차이와 픽셀 계단으로 합니다.
- 글자 대비는 두 테마 모두 4.5:1 이상이어야 합니다.
- 브랜드 이미지는 `src/assets/brand/`의 파일만 쓰고 색이나 비율을 바꾸지 않습니다. 원본은 디자인 시스템의 Logos, Character 에셋입니다.
  - 로고(`Logo.astro`)는 캐릭터 얼굴(`butter-gold` 칸) + `JUSIAI GAMES` 글자(Pretendard 800, 자간 0.02em)입니다.
  - 캐릭터는 32×32 픽셀입니다. 화면마다 `JUSIAI GAMES` 글자 왼쪽 작은 얼굴 하나가 기본이고, 크게 쓸 때는 정확히 2·4·8배(64·128·256px)로만 키웁니다. 8비트 아이콘은 40×40칸이라 40의 배수(120·160px)로 씁니다.
  - 픽셀 이미지는 Astro `<Image>`로 다시 인코딩하지 않고 원본 `src`를 `jg-pixel`(`image-rendering: pixelated`)로 씁니다.
  - 기본 OG 이미지는 `jusiai-games-banner-2560x1440.png`입니다.
  - 파비콘은 `npm run favicons`로만 다시 만듭니다.
- 토큰이나 컴포넌트를 바꾸면 디자인 시스템 문서(https://claude.ai/artifact/TFsB4FPK46UPLuyBiGv5TY)와 맞지 않게 됩니다. 사용자에게 알려 함께 갱신합니다.
