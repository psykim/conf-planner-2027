# STATUS — 현재 상태 (새 세션은 이 파일만 읽고 착수한다)

> 갱신 2026-10-21 (v1.1.0) · 규칙은 CLAUDE.md · 이력은 docs/history/INDEX.md

## 지금
- **v1.1.0 — 참가 학회 관리카드** (2026-10-21, 사용자 요청 "참가 체크한 학회는 상세 정보와 주요 일정을
  정리한 관리카드를 자동 생성"). 타임라인 아래 새 구역 `#mcards`: 참가(going) 학회마다 카드 자동 생성,
  학회 시작일 순. 카드 = 학회 정보(data.js) + 다음 할 일 + 주요 일정(data.js 마감 + 학회 기간 + 팀원
  출장·출국·귀국을 날짜순, 같은 날·같은 편은 이름을 모아 한 줄) + 참가자별 준비 현황 5종(등록·초록·출장·
  항공·숙소, n/5). 읽기 전용 요약 — 카드 클릭/Enter 는 기존 상세 팝업(openModal)으로 편집. 미발표(TBA)
  학회도 참가면 카드(설명 + 준비 현황). `refreshTeamUI()` 끝에서 다시 그려 실시간 반영. DB·스키마 변경 없음.
  로컬 스모크(가짜 Supabase 응답, Playwright): 라이트·다크·390px 렌더, 카드→팝업 열림, 콘솔 오류 없음(폰트 차단 제외).
  - 주의: 카드의 학회 마감은 data.js(2026-09-06 확인분) 그대로다 — data.js 갱신이 곧 카드 갱신.
- **v1.0.2 — 다른 페이지 안(iframe)에서도 로그인 이어받기** (2026-10-18, 사용자 결재). Chrome 은
  iframe 저장소를 최상위 사이트별로 떼어 줘서(third-party storage partitioning) CV 대시보드 탭 안의 앱은
  단독 창의 로그인을 못 보고, 메일 링크는 새 창에서 열려 탭은 영영 로그인 화면이었다. 이제 iframe 이면
  `document.requestStorageAccess({localStorage:true})`로 단독 창과 같은 localStorage 를 얻어 Supabase
  auth storage 로 쓴다(createClient 의 `auth.storage` 어댑터). 자동으로 못 얻으면 '이 브라우저의 로그인
  이어받기' 단추(클릭 요구 대응), 끝내 못 얻으면 예전 동작. iframe 이 로그인 화면일 때 4초마다 세션을
  다시 읽어, 단독 창에서 로그인하면 탭도 저절로 진입. 로컬 스모크(저장소 분리를 켠 Chrome — **Playwright
  기본값은 분리를 꺼 두므로 `ignoreDefaultArgs:true` 필수**): 단독 로그인→탭 이어받기 · 탭 대기 중 단독
  로그인→자동 진입 · API 없음→예전 동작 · 자동 거절→단추 클릭→진입, v1.0.1 단독 창 5종 회귀 통과.
- **v1.0.1 — 로그인 유지 보강** (2026-10-18, 사용자 결재). 예전 `handleSession`은 `conf_is_allowed`
  rpc가 *어떤 이유로든* 실패하면(네트워크 끊김·잠자기 직후 만료 토큰) `signOut()` → 브라우저 세션 삭제 →
  "다시 로그인". 이제 `checkAllowed()`가 서버의 명확한 false일 때만 로그아웃하고, 오류면
  `refreshSession()`(8초 제한) 후 3회 재시도, 그래도 안 되면 세션을 지우지 않고 안내 문구 + 15초 뒤·
  `online` 이벤트에 자동 재확인. 로컬 스모크(Supabase 응답을 가짜로 바꿔 7가지): true 진입 · false 로그아웃 ·
  끊김 유지 · 끊김→복구 진입 · 401 유지 · 만료→재발급 진입 · 35초 끊김→자동 재시도 진입 모두 통과.
- **2026-10-18 로그인 장애 복구** — 증상: "로그인 링크 받기"가 "보내지 못했습니다"로 실패, 메일 미발송.
  원인: 같은 Supabase 프로젝트의 회계 장부(fin) 보안 조치 **D-033**(2026-10-14, 마이그레이션
  `fin_security_d033`)이 `conf_email_allowed(text)`를 `private` 스키마로 옮기고 anon 실행을 회수 →
  로그인 전 명단 확인 rpc가 404(PGRST202). 복구: 마이그레이션 `conf_email_allowed_public_wrapper`로
  `public.conf_email_allowed(p_email)` 얇은 SECURITY DEFINER 함수(→ `private.conf_email_allowed`)를
  anon·authenticated에 다시 엶(사용자 승인). 앱 코드는 그대로. 사용자 메일 수신·로그인 확인 완료.
  - **주의: fin 쪽이 D-033을 다시 적용하거나 이 public 함수를 지우면 같은 장애가 재발한다.**
    Supabase 보안 점검의 "anon이 SECURITY DEFINER 실행 가능" 경고(conf_email_allowed·conf_is_allowed)는 의도된 것.
  - 되돌리기: `drop function public.conf_email_allowed(text); notify pgrst, 'reload schema';`
- CV 대시보드(`~/Desktop/CV/dashboard/Unified_Overview.html`, file://)에 '🗓 학회 플래너' 탭으로
  iframe 임베드(2026-10-18). 이 저장소는 손대지 않음 — GitHub Pages가 iframe을 막지 않는다.
- **v1.0.0 — 아티팩트판 → 독립 웹앱 전환 완료** (2026-09-06, 결정 이력 01장).
  - Supabase(공유 프로젝트 planb4u-pipeline)에 `conf_` 3테이블 + RLS + realtime 구축,
    아티팩트 실데이터 이관(참가 여부 6건 · 참가자 1건 · 화이트리스트 kwkimmd@gmail.com).
  - 프론트는 conference-planner-2027.html을 index/styles/data/app 4파일로 분리 이식.
    Gmail 검색·항공권 가져오기·편명 조회는 v1 제외(아티팩트 전용 기능 — 흔적 없이 제거).
  - 검증 완료: RLS 시뮬레이션 3종(anon 차단·화이트리스트 허용·미등록 로그인 차단) ·
    실제 매직링크 수신→로그인 · 대시보드·상세 모달 렌더 · CRUD 왕복(attendance set/delete,
    members add/delete) · **실시간**(서버 변경 → 4초 내 화면 반영).
- 배포: https://psykim.github.io/conf-planner-2027/ (push = 배포).
- **검증 게이트: 자동 테스트 없음** — 커밋 전 게이트는 `node --check` 2건 + 로컬 스모크가 전부.

## 동결·보류
- Gmail 참가자 검색·자동완성 / Gmail 항공권 가져오기 / Claude 편명 조회 — 아티팩트 전용 능력이라
  v1 제외. 필요해지면 Google OAuth + 서버 함수(Claude API)로 별도 검토(결정 2026-09-06).
- 주간 학회일정 자동 업데이트 루틴(월 09:00)은 **당분간 아티팩트만 갱신**(결정 2026-09-06) —
  웹앱 data.js는 변경분을 수동 반영. 웹앱 안정화 후 루틴 재편 예정.
- 기존 아티팩트판은 병행 유지(루틴 대상 + 교수 개인용). 팀 입력은 웹앱으로 일원화.

## 확인 대기 (사용자)
- **v1.0.1 로그인 유지 보강 효과 확인** — "로그인이 자주 풀린다" 보고(2026-10-18) 대응이 실제로 줄였는지.
  서버 세션은 만료 없음(auth.sessions.not_after null)이라 원인은 브라우저 쪽으로 판단했다.
- (매직링크 전 과정은 2026-09-06 21:35 KST 사용자 Chrome에서 실측 성공. redirect 허용 목록
  `…/conf-planner-2027/**` 추가가 해결책이었고, 검증이 늦어진 이유는 내장 SMTP 시간당 2통 한도.)
- 팀원 이메일 명단 → 화이트리스트 등록 지시.
- Supabase 기본 이메일 발송 한도(시간당 2통 수준)로 팀원 로그인이 몰리면 지연될 수 있음 —
  문제 되면 custom SMTP(예: Resend 무료) 연결 결재.

## 다음 후보
- 팀원 온보딩 — 명단 등록 + `docs/TEAM-GUIDE.md` 공유.
- 웹앱 안정화 후: 주간 루틴을 웹앱 data.js 갱신형으로 재작성 + 아티팩트 정리.
