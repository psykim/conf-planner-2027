# STATUS — 현재 상태 (새 세션은 이 파일만 읽고 착수한다)

> 갱신 2026-09-06 · 규칙은 CLAUDE.md · 이력은 docs/history/INDEX.md

## 지금
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
- **배포 URL 매직링크 최종 재검증** — redirect 차단 요소는 해결됨(2026-09-06 20:40 KST, 사용자가
  대시보드 로그인 → Claude가 Redirect URLs에 `https://psykim.github.io/conf-planner-2027/**` 추가,
  "Successfully added 1 URL" 확인). 직후 재검증은 이메일 발송 한도(내장 SMTP 시간당 2통, 사용자
  시도 2통으로 소진)에 걸려 **21:34 KST 이후 자동 재발송·로그인 검증 예정**(백그라운드 대기 중).
- 팀원 이메일 명단 → 화이트리스트 등록 지시.
- Supabase 기본 이메일 발송 한도(시간당 2통 수준)로 팀원 로그인이 몰리면 지연될 수 있음 —
  문제 되면 custom SMTP(예: Resend 무료) 연결 결재.

## 다음 후보
- 팀원 온보딩 — 명단 등록 + `docs/TEAM-GUIDE.md` 공유.
- 웹앱 안정화 후: 주간 루틴을 웹앱 data.js 갱신형으로 재작성 + 아티팩트 정리.
