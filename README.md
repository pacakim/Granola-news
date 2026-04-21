# Granola News

고마워서그래의 그래놀라 뉴스 — 에세이 연재 웹사이트

---

## 🚀 배포 방법

### 1단계 — GitHub 레포 만들기

GitHub에서 새 레포지토리 생성 후:

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/본인계정/granola-news.git
git push -u origin main
```

### 2단계 — Vercel 연결

1. https://vercel.com 접속
2. "Add New Project" → GitHub 레포 선택
3. 설정 변경 없이 "Deploy" 클릭
4. 완료! `granola-news.vercel.app` 주소로 접속 가능

---

## ✏️ 글 추가하는 법

`posts/` 폴더에 마크다운 파일을 추가하면 됩니다.

**파일 이름**: `vol-3.md` (slug가 URL이 됩니다)

**파일 형식**:

```markdown
---
vol: 3
title: "에세이 제목"
date: "2025-09-01"
cover: "/images/vol-3.jpg"
---

본문을 여기에 씁니다.
마크다운 형식으로 자유롭게 작성하세요.
```

**이미지**: `public/images/` 폴더에 이미지 파일을 넣고 cover 경로를 맞춰주세요.

GitHub에 push하면 Vercel이 자동으로 배포합니다.

---

## 📁 폴더 구조

```
granola-news/
├── posts/          ← 여기에 글 추가
│   ├── vol-1.md
│   └── vol-2.md
├── public/
│   └── images/     ← 여기에 이미지 추가
├── pages/
├── styles/
└── lib/
```
