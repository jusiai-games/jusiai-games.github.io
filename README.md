# JUSIAI GAMES Blog

> AI 에이전트 작업 규칙은 [AGENTS.md](./AGENTS.md)에 있습니다.

1인 게임 개발사 **JUSIAI GAMES**의 공식 블로그입니다. → https://jusiai-games.github.io

[Astro](https://astro.build) + React + TypeScript 기반 정적 사이트이며, `main` 브랜치에 push 하면 GitHub Actions로 GitHub Pages에 자동 배포됩니다.

## 요구 사항

- Node.js 26 (LTS) — `.nvmrc` 참고

## 명령어

| 명령어            | 설명                                         |
| :---------------- | :------------------------------------------- |
| `npm install`     | 의존성 설치                                  |
| `npm run dev`     | 개발 서버 실행 (`http://localhost:4321`)     |
| `npm run check`   | 타입 검사 (`astro check`)                    |
| `npm run build`   | 타입 검사 후 `./dist/`에 프로덕션 빌드       |
| `npm run preview` | 빌드 결과 로컬 미리보기                      |
| `npm run favicons`| 브랜드 아이콘으로 파비콘 세트 다시 생성      |

## 프로젝트 구조

```text
├── .github/workflows/deploy.yml   # GitHub Pages 배포
├── .githooks/                     # 커밋 계정 검사 hook
├── public/                        # 그대로 복사되는 정적 파일 (파비콘 등)
├── scripts/generate-favicons.mjs  # 파비콘 생성
└── src/
    ├── assets/brand/              # 로고(구피 마크, 앱 아이콘)
    ├── components/                # Astro 컴포넌트 (Logo, Header, PostCard, Callout …)
    ├── content/devlog/            # 데브로그 글 (.md / .mdx)
    ├── layouts/                   # 페이지 레이아웃
    ├── pages/                     # 라우트 (파일 = URL)
    ├── styles/                    # tokens.css(디자인 토큰), components.css(jg- 컴포넌트), global.css
    ├── consts.ts                  # 사이트 제목, 메뉴(NAV_ITEMS), 연락처 등 전역 상수
    └── content.config.ts          # 글 frontmatter 스키마
```

## 새 글 쓰기

`src/content/devlog/`에 `.md` 또는 `.mdx` 파일을 추가합니다.

```md
---
title: '글 제목'
description: '한 줄 요약'
pubDate: '2026-11-02'
heroImage: './images/cover.png' # 선택, 글 파일 기준 상대 경로
tags: ['devlog', 'unity'] # 선택
---

본문...
```

## 디자인 시스템

색, 글꼴, 간격, 컴포넌트는 **JUSIAI GAMES 디자인 시스템**(Aquarium Palette)을 따릅니다.

- 토큰: `src/styles/tokens.css`. 색은 직접 쓰지 말고 `var(--ink)`, `var(--action)` 같은 토큰을 씁니다. 다크 모드는 OS 설정을 따릅니다.
- 컴포넌트: `src/styles/components.css`의 `jg-` 클래스(버튼, 배지, 태그, 글 카드, 콜아웃, 본문 Prose).
- 글꼴: Pretendard(`pretendard` 패키지, 필요한 글자만 내려받는 분할 버전).
- MDX 글에서 콜아웃: `import Callout from '../../components/Callout.astro'` 후 `<Callout type="note">…</Callout>`.
- 파비콘: `src/assets/brand/guppy-app-icon.svg`를 바꾼 뒤 `npm run favicons`.

## 커밋 계정 규칙

이 저장소는 **`jusiai-games <jusiai.games@gmail.com>`** 계정으로만 커밋할 수 있습니다.

- `.githooks/pre-commit`: 작성자/커미터가 다르면 커밋을 거부합니다.
- `.githooks/pre-push`: push 대상 커밋 중 다른 계정이 섞여 있으면 push를 거부합니다.
- `npm install` 시 `prepare` 스크립트가 `core.hooksPath`를 자동 설정합니다.

새로 clone한 경우 아래를 먼저 실행하세요.

```sh
git config user.name "jusiai-games"
git config user.email "jusiai.games@gmail.com"
npm install   # hook 활성화
```

## 배포 설정 (최초 1회)

GitHub 저장소 **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions** 로 설정하세요.

## 라이선스

[Apache-2.0](./LICENSE)
