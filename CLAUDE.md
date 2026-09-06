# conf-planner-2027 — 프로젝트 규칙 (매 세션 자동 로드)

2027 학회 플래너 독립 웹앱. 김기웅 교수 연구팀이 학회 참가 계획(참가 여부 + ①참가자 ②참가신청
③출장신청 ④항공 ⑤숙소)을 공동 입력한다. vanilla JS 정적 페이지 + Supabase(매직링크 인증·RLS·
realtime), GitHub Pages 배포. 사용자는 플랜비포유 대표(의사, 비개발자).
원형은 Claude 아티팩트판(병행 운영 중)이며 UI·로직을 그대로 이식했다 — **재디자인 금지**.

## 세션 시작 절차
1. `STATUS.md`를 읽는다 — 현재 상태·확인 대기·다음 후보가 전부 거기 있다.
2. `git status`로 작업 트리를 확인한다(더러우면 먼저 사용자에게 알린다).
3. 과거 결정이 필요한 주제만 `docs/history/INDEX.md`에서 찾아 해당 문서를 읽는다.

## 빌드·배포·검증 (명령은 그대로 복사해 쓸 것)
정적 사이트 — 빌드 없음. push가 곧 배포다(GitHub Pages, 1~2분 내 반영).
```bash
node --check app.js && node --check data.js     # 문법 게이트 — 커밋 전 필수
python3 -m http.server 8873 -d .                # 로컬 스모크 (브라우저 도구로 로그인·CRUD 확인)
git push origin main                            # = 배포
```
- 배포 URL: https://psykim.github.io/conf-planner-2027/
- Supabase: `planb4u-pipeline`(id `dktalgktntdlqclykhoz`, 서울 리전) — **다른 앱과 공유하는
  프로젝트**다. 이 앱의 것은 `conf_` 접두사 3테이블(conf_attendance·conf_members·conf_allowed_emails)과
  `conf_` 함수 2개뿐 — **그 밖의 테이블·정책·publication은 절대 건드리지 않는다.**
- 팀원 추가/제거 = `conf_allowed_emails`에 insert/delete (사용자는 말로 지시, SQL은 Claude가).

## 절대 규칙 (전부 실사고·실검증에서 나온 규칙)
- **realtime 채널 구독 전 `sb.realtime.setAuth(session.access_token)` 필수** — 빼면 구독 상태는
  joined인데 RLS 필터에 걸려 **이벤트만 조용히 안 온다**(2026-09-06 구축 중 실사고. app.js startApp 참조).
- **service key·시크릿을 프론트/저장소에 넣지 않는다** — 노출 가능한 것은 publishable key뿐이고
  데이터 보호는 전적으로 RLS다. 저장소가 공개이므로 개인정보(이름·이메일·출장 정보)는 반드시 DB에만.
- **아티팩트판에서 검증된 UX 로직을 보존한다** — 참가자 중복 이메일 방지 · × 2단계 삭제(3초 자동
  해제) · 초록 저장 시 본인 이메일(vemail) 일치 확인 · regStatus 선택 즉시 저장 · **항공 저장 시
  출장신청 기간 자동 채움(비어 있을 때만 + 역전 방지 가드)** · `editing` 가드(열린 편집 폼은 실시간
  갱신이 덮어쓰지 않는다) · 사용자 입력 `esc()` 이스케이프. 고치기 전에 아티팩트판과 의도를 대조할 것.
- **학회 데이터(CONFS/TBA)는 data.js에만** — 갱신은 이 파일 교체로 하고 필드 구조는 바꾸지 않는다
  (id/cat/acro/full/start/end/dateKo/city/country/flag/venue/hybrid/status/scale/url/dl).
- **DB 타임스탬프는 JS epoch ms(bigint)** — 아티팩트판과 같다. timestamptz로 바꾸면 정렬·표시가 어긋난다.

## git 운영 (Claude 전담 — 사용자는 말로만 지시한다)
- 작업 단위마다 커밋(한국어 제목: 무엇을 왜). 버전마다 `vX.Y.Z` 태그.
- 커밋 전 문법 게이트 + 로컬 스모크. 세션 끝에 `git push origin main --tags`.
- 원격: https://github.com/psykim/conf-planner-2027 (공개 — Pages 무료 조건).
  되돌리기·비교는 사용자가 말로 요청한다.

## 모델 분업
- **Fable 직접**: 원인 진단, RLS·인증 등 보안 판단, 아키텍처 결정, 위임 결과 검수, 사용자 소통.
- **하위 모델 위임 가능**: 잘 규정된 UI 구현(스펙+금지사항 명시), 넓은 탐색(Explore), 문서 정리.
- **게이트**: 위임 결과는 반드시 Fable이 diff 검수 + 문법·스모크 통과 후 반영. 예외 없음.

## 사용자 소통
- 한국어. **결론부터**, 근거는 뒤에. 모르는 것·틀린 것은 숨기지 않고 그대로 보고.
- 결정이 필요한 것은 착수 전에 결재표(선택지+추천)로 묻는다. 비용 발생·개인정보 취급 방식·
  아티팩트판과의 동작 차이는 반드시 사용자 결재 사항이다.
