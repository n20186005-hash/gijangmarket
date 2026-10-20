# 기장시장 부산 여행안내

부산 기장시장을 위한 한국어 독립 방문 가이드입니다. 시장·번영회·정부의 공식 사이트가 아니며 예약·판매 기능이 없습니다.

## 실행과 구조

Node 24.19.0 / pnpm 11.23.0. `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm build`를 실행합니다. Astro는 기존 `/`, `/privacy/`, `/terms/`, `/cookies/`와 404를 정적 HTML로 출력합니다. 새 언어를 추가하지 않습니다. canonical·OG·한국어 alternate와 홈페이지 sitemap은 확정 도메인 `https://gijangmarket.com/`을 사용합니다.

Cloudflare 실제 Worker 프로젝트는 `gijangmarket`입니다. ASSETS `run_worker_first`를 사용하는 Worker가 HTTP/www를 경로·쿼리 보존 301 처리하며, 없는 주소는 noindex가 포함된 실제 404입니다. `pnpm deploy`는 빌드 후 게시하므로 게시 권한자가 별도 실행합니다.

기존 저장소의 **빌드 결과 추적 관례를 유지**합니다. `dist/`의 새 해시 스타일, 그래픽, robots·sitemap·404도 원본과 함께 커밋에 포함하고 참조 파일이 제출 트리에 실제 있는지 검사합니다. 생성 캐시 `.astro/`와 `.wrangler/`, 설치 로그는 공개 트리에서 제외합니다.

## 편집과 그래픽

출처별 영업시간·휴무를 구분하고 건물·판매점·식당의 공통 일정으로 보장하지 않습니다. 무료·재고·신선도·위생·음식 적합성·시설 운영을 추정하지 않습니다. FAQ는 화면과 JSON-LD가 같은 배열에서 생성됩니다. TouristAttraction schema에는 시간·평가·가격을 넣지 않습니다. [SOURCES.md](SOURCES.md)에 자료 범위와 기존 사진의 교체 사유·알려진 출처를 보존합니다. 현재 그래픽은 명시적으로 표시한 개념 일러스트이며 실제 사진이나 지도가 아닙니다.

## 개인정보

Google 지도는 선택해서 여는 외부 링크입니다. Google Analytics는 `/cookies/`에서 명시적 허용 후에만 로드합니다. `gijangmarket_cookie_preferences`는 이전 `cookie-consent` 허용을 가져오지 않습니다. 철회 저장 실패 시 즉시 분석을 끄고 가능한 sessionStorage 거부로 같은 탭의 이동·새로고침에 유지합니다. 자동 새로고침하지 않으며 두 저장소 실패 시 현재 페이지에만 적용되는 한계를 한국어로 알립니다. 계정·예약·문의 양식·이메일 창구·사용하지 않는 환경설정 기능은 없습니다.
