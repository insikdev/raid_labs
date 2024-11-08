# 레이드랩스 과제

## 빌드

```bash
npm i
npm run dev
```

## 의존성

- vite
  - vite-plugin-svgr
- react
- tailwindcss
- typescript

## 배포

- GitHub Action 사용하여 github pages에 배포함
- https://insikdev.github.io/raid_labs/

## 구현

- 서버가 정렬 및 페이지네이션이 적용된 데이터를 제공하는 것처럼 API를 재구성함

  - `/src/api/get_rankings.ts`

- `useReducer` 훅을 사용하여 정렬, 페이지네이션 관련된 상태를 관리 및 업데이트

  - `/src/App.tsx`

- 파생 타입을 사용하여 안정성 유지 및 유연한 설계
  - `/src/model/rankging.ts`
