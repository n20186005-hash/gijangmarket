# 전달 전 검증 기록

## 정적 감사
- `package.json` 직접 의존성과 `pnpm-lock.yaml` importer가 정확 버전으로 일치합니다.
- `packageManager`는 `pnpm@11.23.0`, Node.js는 `.node-version`과 `engines.node` 모두 `24.19.0`으로 고정했습니다.
- `@astrojs/check@0.9.10`의 TypeScript peer 범위 `^5.0.0 || ^6.0.0` 안에서 TypeScript `6.0.3`을 사용합니다.
- 단일 패키지 프로젝트이며 `pnpm-workspace.yaml`은 없습니다.
- 사이트 URL은 `astro.config.mjs`에서 `SITE_URL` 한 곳으로만 주입하며, 값이 없으면 sitemap 통합은 비활성화됩니다.
- 지도 임베드는 한국어/대한민국 지역 파라미터(`ko`/`kr`)를 사용합니다.
- 개인정보처리방침·서비스 이용약관·쿠키 설정은 독립 경로입니다.
- GA4는 분석 동의가 있을 때만 동적으로 로드됩니다.
- 본문 사진, 로고, favicon은 프로젝트 내부 파일입니다.

## 요청된 깨끗한 환경 실행 결과
실제로 `node_modules`와 `dist`를 삭제한 뒤 아래 첫 명령을 실행했습니다.

```bash
CI=1 corepack pnpm install --frozen-lockfile
```

현재 실행 샌드박스가 `registry.npmjs.org` DNS 조회를 허용하지 않아 Corepack이 고정된 pnpm 11.23.0 실행 파일을 내려받기 전에 `EAI_AGAIN`으로 중단되었습니다. 따라서 이 환경에서는 의존성 설치 이후 단계인 `pnpm check`와 `pnpm build`를 실행했다고 허위로 표시하지 않습니다. 상세 원문은 `ci-install.log`에 포함했습니다.

네트워크 접근이 가능한 Node.js 24.19.0 환경에서는 다음 게이트를 그대로 실행하십시오.

```bash
rm -rf node_modules dist
CI=1 corepack pnpm install --frozen-lockfile
pnpm check
pnpm build
```

실제 도메인이 아직 비어 있는 현재 설정에서는 sitemap이 생성되지 않는 것이 의도된 동작입니다. 운영 도메인을 `SITE_URL`에 지정한 뒤 다시 빌드하면 `@astrojs/sitemap`이 실제 도메인 기준으로 생성합니다.
