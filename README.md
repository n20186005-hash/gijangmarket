# 기장시장 여행안내

부산 기장시장에 대한 독립 비영리 관광 정보 사이트입니다. Astro + Tailwind CSS + TypeScript 기반이며 Cloudflare Workers 배포를 목표로 합니다.

## 기술 버전
- Astro 7.2.4
- @astrojs/sitemap 3.7.3
- @astrojs/check 0.9.10
- Tailwind CSS / @tailwindcss/vite 4.3.3
- TypeScript 6.0.3 (`@astrojs/check` 0.9.10 peer 범위 `^5 || ^6` 충족)
- Wrangler 4.125.0
- pnpm 11.23.0
- Node.js 24.19.0 LTS

## 도메인 설정
실제 도메인이 정해지면 **한 곳만** 설정합니다.

```bash
SITE_URL="$PRODUCTION_ORIGIN" pnpm build
```

`SITE_URL`이 없으면 canonical/OG의 절대 URL을 강제하지 않고 sitemap 통합도 활성화하지 않습니다. 가짜 도메인을 쓰지 않습니다.

## 개발 및 검증
```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
pnpm build
```

## 이미지 출처 및 권리
- `public/images/hero.webp`: NOL World / Triple Guide에 게재된 기장시장 사진. 원저작권은 해당 사진 원저작자에게 있습니다.
- `public/images/market-entry.jpg`: 부산광역시 부산시보 이야기리포트에 게재된 기장시장 사진. 원저작권은 해당 사진 원저작자에게 있습니다.
- `public/images/seafood.jpg`: Nita Travel에 게재된 기장시장 수산물 사진. 원저작권은 해당 사진 원저작자에게 있습니다.

사이트는 비영리 정보 제공 목적으로 출처를 기록해 사용한 예시 프로젝트입니다. 공개 배포 전 운영자는 각 이미지의 사용 허용 범위를 다시 확인하고, 필요하면 라이선스가 명확한 자체 촬영물 또는 허가받은 이미지로 교체해야 합니다.

## 주요 정보 출처
- 기장군청 / 기장군 문화관광: 주소, 취급 품목, 운영시간, 정기휴무, 시장 역사, 주차, 주변 관광자원
- 부산광역시 / Visit Busan: 대중교통, 관광 개요
- 한국관광공사 VISITKOREA / 열린관광 모두의 여행: 시장 개요, 주차·무장애 편의정보

## 비공식 안내
본 사이트는 독립 비영리 관광 정보 안내 프로젝트이며 기장시장, 시장번영회 또는 어떠한 정부기관의 공식 사이트가 아닙니다.

## 편집 원칙
운영시간처럼 변동될 수 있는 정보는 기장군 문화관광의 현재 공개 안내를 우선하며, 다른 공공 관광자료와 내용이 다를 경우 본문에서 차이를 명시합니다. 확인되지 않은 전설이나 일화는 만들지 않습니다. 주변 음식·숙박·쇼핑 정보는 업종과 시설 유형만 설명하고 특정 상호를 추천하지 않습니다.
