# AGENTS.md

이 저장소에서 일하는 AI 에이전트(Claude Code, Codex 등)가 따라야 할 규칙입니다. 프로젝트 소개와 명령어는 [README.md](./README.md)를 보세요.

## 역할 분담

- 에이전트는 **코드 작성, 리뷰, 커밋**까지만 합니다.
- **push는 사람이 직접 합니다.** 에이전트는 `git push`를 실행하지 않습니다. 커밋을 마치면 "push 준비가 됐다"고만 알립니다.
- 다음 작업도 하지 않습니다: force push, 이미 push된 커밋의 amend·rebase, 브랜치·태그 삭제, `--no-verify`로 hook 건너뛰기.
- 작업 하나가 끝나면 아래 체크리스트로 리뷰한 뒤 커밋합니다.

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
4. 리뷰에서 찾은 문제는 고친 뒤 커밋하고, 고치지 않은 것은 사용자에게 알립니다.

## 코드 규칙

- 불필요한 코드는 남기지 않습니다. 예시용 컴포넌트, 쓰지 않는 파일, 주석 처리한 코드는 지웁니다.
- 주석은 코드만 봐서는 알 수 없는 이유나 제약만 씁니다.
- 화면 문구와 문서는 한국어로 씁니다. 메뉴의 About, Contact처럼 정해진 영문 이름은 그대로 둡니다.
- 주요 메뉴는 `src/consts.ts`의 `NAV_ITEMS`(홈 → 데브로그 → About → Contact) 하나에서만 관리합니다.
- 데브로그 글은 `src/content/devlog/`에 두고, frontmatter는 `src/content.config.ts` 스키마를 따릅니다.
- Node.js 26(`.nvmrc`)을 기준으로 합니다.

## 디자인 규칙

이 블로그는 JUSIAI GAMES 디자인 시스템(Aquarium Palette)을 따릅니다.

- 색은 `src/styles/tokens.css`의 토큰(`var(--ink)`, `var(--action)` …)으로만 씁니다. `#hex`를 컴포넌트나 페이지에 직접 쓰지 않습니다. 새 색이 필요하면 먼저 토큰을 추가합니다.
- 버튼, 배지, 태그, 카드, 콜아웃, 본문은 `src/styles/components.css`의 `jg-` 클래스를 씁니다.
- 밝은 바탕 위 글자는 `ink`, `deep-moss`, `aqua-soil`, `neon-blue-deep`만 씁니다(캡션·날짜는 `water-mist`). `lime-leaf`, `guppy-gold`, `guppy-coral`은 면으로만 씁니다.
- `neon-red`는 LIVE, NEW, 경고 같은 작은 표시에만 씁니다.
- 모서리는 `radius-md`(14px), 그림자는 쓰지 않습니다. 구분은 `surface`와 `river-stone`의 면 색 차이로 합니다.
- 글자 대비는 라이트·다크 모두 4.5:1 이상이어야 합니다.
- 로고는 `src/assets/brand/`의 구피 파일만 쓰고 색이나 비율을 바꾸지 않습니다. 파비콘은 `npm run favicons`로만 다시 만듭니다.
- 토큰이나 컴포넌트를 바꾸면 디자인 시스템 문서(https://claude.ai/artifact/TFsB4FPK46UPLuyBiGv5TY)와 맞지 않게 됩니다. 사용자에게 알려 함께 갱신합니다.
