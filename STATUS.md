# STATUS — 현재 상태 (새 세션은 이 파일만 읽고 착수한다)

> 갱신 2026-10-18 · 규칙은 CLAUDE.md · 이력은 docs/history/INDEX.md

## 지금
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
- **로그인이 자주 풀린다는 보고(2026-10-18)** — 서버 쪽 세션은 만료 없음(auth.sessions.not_after null,
  9월 세션의 마지막 refresh token도 미회수)이라 브라우저 쪽에서 세션을 잃는 것으로 보임. 원인 조사 중
  (아래 '다음 후보' 첫 항목). 2026-10-18 사용자 Chrome 단독 창은 로그인 유지 확인.
- (매직링크 전 과정은 2026-09-06 21:35 KST 사용자 Chrome에서 실측 성공. redirect 허용 목록
  `…/conf-planner-2027/**` 추가가 해결책이었고, 검증이 늦어진 이유는 내장 SMTP 시간당 2통 한도.)
- 팀원 이메일 명단 → 화이트리스트 등록 지시.
- Supabase 기본 이메일 발송 한도(시간당 2통 수준)로 팀원 로그인이 몰리면 지연될 수 있음 —
  문제 되면 custom SMTP(예: Resend 무료) 연결 결재.

## 다음 후보
- **로그인 유지 보강(결재 대기)** — app.js `handleSession`은 `conf_is_allowed` rpc가 *어떤 이유로든*
  실패하면(네트워크 끊김·잠자기 직후 만료 토큰 등) `signOut()`을 부른다. 이때 만료 토큰이면 서버 로그아웃은
  401로 실패하고 브라우저 세션만 지워져 "다시 로그인"이 된다. 보강안: 서버가 명확히 false를 줄 때만
  로그아웃, 오류면 `refreshSession()` 후 재시도·안내 문구. 아티팩트판과의 동작 차이이므로 사용자 결재 필요.
- 팀원 온보딩 — 명단 등록 + `docs/TEAM-GUIDE.md` 공유.
- 웹앱 안정화 후: 주간 루틴을 웹앱 data.js 갱신형으로 재작성 + 아티팩트 정리.
