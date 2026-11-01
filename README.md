# JUSIAI GAMES Blog

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

## 프로젝트 구조

```text
├── .github/workflows/deploy.yml   # GitHub Pages 배포
├── public/                        # 그대로 복사되는 정적 파일 (favicon 등)
└── src/
    ├── assets/                    # 이미지·폰트 (빌드 시 최적화)
    ├── components/                # Astro 컴포넌트
    │   └── react/                 # React(.tsx) 컴포넌트
    ├── content/blog/              # 블로그 글 (.md / .mdx)
    ├── layouts/                   # 페이지 레이아웃
    ├── pages/                     # 라우트 (파일 = URL)
    ├── consts.ts                  # 사이트 제목·설명 등 전역 상수
    └── content.config.ts          # 글 frontmatter 스키마
```

## 새 글 쓰기

`src/content/blog/`에 `.md` 또는 `.mdx` 파일을 추가합니다.

```md
---
title: '글 제목'
description: '한 줄 요약'
pubDate: '2026-11-02'
heroImage: '../../assets/blog-placeholder-1.jpg' # 선택
---

본문...
```

## React 컴포넌트 사용

`src/components/react/`에 `.tsx`를 만들고 `.astro`(또는 `.mdx`)에서 `client:*` 디렉티브와 함께 사용합니다.

```astro
---
import Counter from '../components/react/Counter';
---
<Counter client:visible />
```

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
