/* 학회별 상세 페이지 데이터 — tools/build_details.py 가 research/*.json 에서 만든다(직접 고치지 말 것).
   각 학회 공식 사이트·정부 안내 조사분. 확인일은 항목별 checked. */
const DETAILS = {
 "aime": {
  "id": "aime",
  "checked": "2026-10-22",
  "overview": {
   "name": "AIME 2027 — 25th International Conference on Artificial Intelligence in Medicine",
   "dates": {
    "start": "2027-07-05",
    "end": "2027-07-08"
   },
   "city": "Amsterdam",
   "country": "Netherlands",
   "venue": "본회의: KIT Royal Tropical Institute (Queen Máxima Hall, 포스터·커피는 Marble Hall) / 워크숍·튜토리얼: Vrije Universiteit Amsterdam Computer Science Building(NU Building)",
   "address": "KIT: Mauritskade 64, 1092 AD Amsterdam (KIT 공식 연락처 기준, 일부 행사 페이지는 63 표기) / VU: Amsterdam Zuid 캠퍼스(De Boelelaan)",
   "format": "대면(in person) 행사. 하이브리드 안내 없음; Journal-first 발표도 최소 1인 암스테르담 현장 참석 요구",
   "organizer": "AIME 학회(Society for Artificial Intelligence in Medicine) 시리즈; 현지 주관 Amsterdam UMC·Vrije Universiteit Amsterdam (General co-chairs Iacopo Vagliano, Aneta Lisowska; Scientific chair Szymon Wilk)",
   "scale": "2027 규모 미공지. 참고: AIME 2025(Pavia)는 311편 투고 중 full 49편·short 81편 채택",
   "proceedings": "Springer Lecture Notes in Artificial Intelligence(LNAI, LNCS 하위 시리즈); 우수 논문은 Elsevier 'Artificial Intelligence in Medicine' 확장판 초청 가능",
   "note": "일정: 7/5 Doctoral Consortium·튜토리얼·환영 리셉션, 7/6–7 본회의(7/6 갈라 디너), 7/8 워크숍. 플래너의 날짜·KIT 정보는 맞지만 7/5 튜토리얼·7/8 워크숍은 KIT가 아닌 VU 캠퍼스(Amsterdam Zuid)에서 열림. 기조연설: Mihaela van der Schaar, Maria-Esther Vidal, Bram van Ginneken."
  },
  "deadlines": [
   {
    "label": "투고 시스템(EasyChair) 오픈",
    "date": "2026-11-02",
    "status": "confirmed",
    "note": "CFP 본문에는 'November 1 이후 오픈'으로도 표기",
    "source": "https://aime27.aimedicine.info/call-for-papers/"
   },
   {
    "label": "초록 등록 마감 (250단어 이내)",
    "date": "2027-01-31",
    "status": "confirmed",
    "note": "AoE 기준. 초록 먼저 등록해야 본문 업로드 가능. 2026년은 2026-02-10이었음",
    "source": "https://aime27.aimedicine.info/call-for-papers/"
   },
   {
    "label": "논문(Full/Short/Demo) 제출 마감",
    "date": "2027-02-07",
    "status": "confirmed",
    "note": "AoE 기준, 초록 마감 1주 뒤",
    "source": "https://aime27.aimedicine.info/call-for-papers/"
   },
   {
    "label": "워크숍 제안서 마감",
    "date": "2027-02-28",
    "status": "confirmed",
    "note": "AoE. 채택 통보 2027-03-07. Workshop/Tutorial chair Ameen Abu-Hanna",
    "source": "https://aime27.aimedicine.info/call-for-workshops-tutorials/"
   },
   {
    "label": "AIME Rising Star 추천 마감",
    "date": "2027-03-01",
    "status": "confirmed",
    "note": "랩을 이끄는 초기 경력 연구자 대상, Martin Michalowski·Gregor Štiglic에게 이메일 추천. 세부 기준은 추후 공지",
    "source": "https://aime27.aimedicine.info/call-for-papers/"
   },
   {
    "label": "워크숍 채택 통보",
    "date": "2027-03-07",
    "status": "confirmed",
    "note": "AoE",
    "source": "https://aime27.aimedicine.info/call-for-workshops-tutorials/"
   },
   {
    "label": "튜토리얼 제안서 마감",
    "date": "2027-03-15",
    "status": "confirmed",
    "note": "AoE. 등록자 5명 미만이면 취소·축소 가능",
    "source": "https://aime27.aimedicine.info/call-for-workshops-tutorials/"
   },
   {
    "label": "튜토리얼 채택 통보",
    "date": "2027-03-22",
    "status": "confirmed",
    "note": "AoE",
    "source": "https://aime27.aimedicine.info/call-for-workshops-tutorials/"
   },
   {
    "label": "Doctoral Consortium 제출 마감",
    "date": "2027-03-31",
    "status": "confirmed",
    "note": "박사과정생 연구계획 2,000–2,500단어. 통보 2027-04-27, 최종본 2027-05-11",
    "source": "https://aime27.aimedicine.info/call-for-dc/"
   },
   {
    "label": "Journal-first 트랙 제안서 마감",
    "date": "2027-04-04",
    "status": "confirmed",
    "note": "2025-10-01~2027-03-31 저널 채택 논문 대상, 2쪽 LNCS 제안서. 통보 2027-04-18. 프로시딩에는 미수록",
    "source": "https://aime27.aimedicine.info/call-for-papers/call-for-jf/"
   },
   {
    "label": "Journal-first 채택 통보",
    "date": "2027-04-18",
    "status": "confirmed",
    "note": "AoE",
    "source": "https://aime27.aimedicine.info/call-for-papers/call-for-jf/"
   },
   {
    "label": "논문 채택 통보",
    "date": "2027-04-19",
    "status": "confirmed",
    "note": "2026년도 같은 날(04-19)이었음",
    "source": "https://aime27.aimedicine.info/call-for-papers/"
   },
   {
    "label": "Doctoral Consortium 채택 통보",
    "date": "2027-04-27",
    "status": "confirmed",
    "note": "AoE",
    "source": "https://aime27.aimedicine.info/call-for-dc/"
   },
   {
    "label": "학생 여행 지원금(등록비 할인) 신청 마감",
    "date": "2027-04-30",
    "status": "confirmed",
    "note": "채택 논문 저자인 학생, 현장 참석 필수. aime27@amsterdamumc.nl로 채택 통보·학생 증빙·150단어 사유서 제출. 결과 통보 2027-05-02",
    "source": "https://aime27.aimedicine.info/registration/"
   },
   {
    "label": "카메라레디 제출 마감",
    "date": "2027-05-02",
    "status": "confirmed",
    "note": "AoE. 같은 날 학생 지원금 결과 통보",
    "source": "https://aime27.aimedicine.info/call-for-papers/"
   },
   {
    "label": "조기 등록(Early Bird) 마감",
    "date": "2027-05-10",
    "status": "confirmed",
    "note": "이후 Late/On-site 요금 적용",
    "source": "https://aime27.aimedicine.info/registration/"
   },
   {
    "label": "저자 등록 마감 (논문당 Full 등록 1건)",
    "date": "2027-05-10",
    "status": "confirmed",
    "note": "학생 등록으로는 논문 커버 불가, Full 1건당 논문 1편만 인정. 미등록 시 프로시딩 미수록",
    "source": "https://aime27.aimedicine.info/registration/"
   },
   {
    "label": "Doctoral Consortium 최종본 마감",
    "date": "2027-05-11",
    "status": "confirmed",
    "note": "AoE",
    "source": "https://aime27.aimedicine.info/call-for-dc/"
   },
   {
    "label": "등록 취소 마감 (€100 수수료)",
    "date": "2027-06-01",
    "status": "confirmed",
    "note": "이후 취소·노쇼는 전액 부과; 등록 취소 시 해당 논문 프로시딩 제외. 대리 참석자 변경은 언제든 가능",
    "source": "https://aime27.aimedicine.info/registration/"
   },
   {
    "label": "온라인 등록 마감",
    "date": "2027-07-01",
    "status": "confirmed",
    "note": "Late/현장 등록은 보장되지 않으며 수용 인원에 따라 추후 결정",
    "source": "https://aime27.aimedicine.info/registration/"
   },
   {
    "label": "비자 초청장 요청",
    "date": null,
    "status": "tba",
    "note": "명시 마감 없음 — 등록 완료 후 '가능한 빨리' 요청. 한국 여권은 무비자라 보통 불필요",
    "source": "https://aime27.aimedicine.info/travel/visa-and-entry-requirements/"
   },
   {
    "label": "공식 호텔 블록 예약 마감",
    "date": null,
    "status": "tba",
    "note": "2027 사이트에 지정 호텔·블록 안내 없음",
    "source": "https://aime27.aimedicine.info/travel/"
   },
   {
    "label": "프로그램(세션 일정) 공개",
    "date": null,
    "status": "tba",
    "note": "기조연설자 3명만 공개, 상세 프로그램 미공개",
    "source": "https://aime27.aimedicine.info/keynote-speakers/"
   }
  ],
  "registration": {
   "fees": [
    {
     "category": "Full registration",
     "early": "700",
     "regular": "800 (Late/On-site)",
     "onsite": "800 (보장 안 됨)",
     "currency": "EUR"
    },
    {
     "category": "Student registration",
     "early": "500",
     "regular": "600 (Late/On-site)",
     "onsite": "600 (보장 안 됨)",
     "currency": "EUR"
    },
    {
     "category": "Tutorials & DC (1일)",
     "early": "100",
     "regular": "150 (Late/On-site)",
     "onsite": "150 (보장 안 됨)",
     "currency": "EUR"
    },
    {
     "category": "Workshops (1일)",
     "early": "100",
     "regular": "150 (Late/On-site)",
     "onsite": "150 (보장 안 됨)",
     "currency": "EUR"
    }
   ],
   "basis": "2027 공식",
   "notes": "요금은 Early Bird(~2027-05-10)와 Late/On-site 두 단계뿐이며 별도 'regular' 구간은 없음. Full·Student 등록에는 구두·포스터 세션, 커피, 점심, 환영 칵테일이 포함되고 튜토리얼·워크숍은 따로 등록. 회원 할인 안내는 없음. 등록·비자 문의는 events@amsterdamumc.nl.",
   "source": "https://aime27.aimedicine.info/registration/"
  },
  "submission": {
   "types": "Full 논문 최대 10쪽, Short 논문 최대 5쪽(예비·late-breaking 결과), Demo 논문 최대 5쪽(쪽수에 참고문헌 포함). 이 밖에 Journal-first(2쪽 제안서)와 Doctoral Consortium(2,000–2,500단어) 트랙",
   "format": "Springer LNCS 양식(LaTeX/Word, Overleaf 템플릿)으로 EasyChair에 제출. 초록(250단어)을 먼저 내고 1주 내 본문을 올림. 투고 시 학생 여부를 표시하고, AI 보조 도구를 썼다면 참고문헌 앞에 사용 선언문을 넣어야 함",
   "review": "2027 CFP에는 single/double-blind 여부가 적혀 있지 않음(2026 CFP도 동일) — 익명화가 필요한지 조직위에 확인 권장",
   "presentation": "2027 발표 지침은 아직 없음. 2026 기준(참고): 긴 구두 발표 15분+질의 5분, 짧은 구두 발표 9분+질의 3분. e-포스터는 가로형 16:9 단일 페이지 PDF(1920×1080 이상 권장, 20MB 이하)를 55–75인치 화면에 띄움. 2027 포스터는 KIT Marble Hall에 전시",
   "publication": "Full·Short·Demo 채택 논문은 모두 Springer LNAI 프로시딩에 실리고, 우수 논문은 AIIM 저널 확장판에 초청될 수 있음. Journal-first 논문은 프로시딩에 들어가지 않고 프로그램에 초록과 링크만 실림",
   "source": "https://aime27.aimedicine.info/call-for-papers/"
  },
  "travel": {
   "entry": "한국 여권은 솅겐 단기 무비자 대상이라 180일 중 90일까지 비자 없이 머물 수 있음. ETIAS는 한국을 대상국에 포함하고 있지만 2026-10-22 현재 공식 사이트 기준 '운영 전'이며 시작일도 발표되지 않음(시행 시 수수료 EUR 20). EES(출입국 생체정보 등록)는 2026-04-10부터 전면 운영 중이므로 입국 심사 때 지문·안면 등록을 예상할 것.",
   "entry_source": "https://travel-europe.europa.eu/etias_en",
   "airport": "Amsterdam Schiphol(AMS) 공항. 도심까지 약 20분 거리",
   "transport": "공항에서 기차가 주간 5–10분 간격으로 다니며 Centraal 또는 Zuid역으로 감. KIT는 Centraal에서 트램 14번(Flevopark 방면)을 타고 Mauritskade에서 내리거나, 메트로 54 → Weesperplein → 트램 19번으로 감. VU(워크숍·튜토리얼)는 메트로 52번으로 Amsterdam Zuid역까지 가서 도보 약 10분이며 트램 24번 De Boelelaan/VU 정류장도 이용 가능",
   "hotels": "2027 사이트에 공식·추천 호텔이나 단체 예약 블록 안내가 없음. 7월 성수기이므로 직접 일찍 예약하는 편이 좋고, 7/5·7/8 일정이 있다면 KIT(동부 Oosterpark)와 VU(남부 Zuid) 사이 동선을 함께 고려",
   "local": "대중교통은 비접촉 카드나 휴대폰으로 태그인·태그아웃하며 하루 요금 상한은 €10.50(조직위 안내 기준). GVB·NS 경로 안내가 지도앱보다 정확하고, I amsterdam City Card도 쓸 수 있음. Centraal역 뒤 IJ 페리는 무료. 렌터카는 권하지 않음. 7월 기후는 이번 조사에서 공식 수치를 확인하지 못함",
   "source": "https://aime27.aimedicine.info/travel/"
  },
  "support": {
   "text": "학생 여행 지원금은 등록비 일부를 할인해 주는 방식이며 채택 논문 저자인 학생이 현장 참석할 때만 받을 수 있음(신청 마감 04-30, 결과 05-02). DC에 채택된 학생은 DC·본회의 등록비 지원을 제안받음. 상은 Mario Stefanelli(최우수 학생 논문), Marco Ramoni(최우수 일반 논문), AIME Rising Star가 있음. 학생 자원봉사·보육·장애인 접근성 안내는 2027 사이트에 없음.",
   "source": "https://aime27.aimedicine.info/registration/"
  },
  "tips": [
   "초록 등록(01-31)을 하지 않으면 본문을 낼 수 없고, 본문 마감(02-07)은 2027년 설 연휴 무렵이므로 1월 중 초록 등록과 원고 마무리를 끝낼 것.",
   "참고문헌 포함 Full 10쪽·Short 5쪽 제한이라 임상 데이터 논문은 Short 트랙도 검토할 만함. LNCS 양식으로 처음부터 작성 권장.",
   "논문마다 Full(비학생) 등록 1건이 필요함. 여러 편이 채택되면 팀 내 Full 등록자를 논문 수만큼 확보해 05-10 전에 등록할 것.",
   "이미 저널에 채택된 치매·정신건강 AI 논문(2025-10 이후 채택)은 Journal-first 트랙(04-04)으로 발표할 수 있음. 단 프로시딩에는 실리지 않음.",
   "7/5 튜토리얼·DC와 7/8 워크숍은 VU(Zuid), 본회의는 KIT(동부)라서 숙소는 두 곳 사이 메트로·트램 동선을 기준으로 고를 것.",
   "익명 심사 여부가 명시되지 않았으므로 제출 전 aime27@amsterdamumc.nl에 문의하거나 EasyChair 안내를 확인할 것.",
   "ETIAS는 아직 운영 전이지만 2027년 7월 전에 시작될 수 있음. 출국 전 travel-europe.europa.eu에서 시행 여부를 다시 확인할 것.",
   "e-포스터(2026 기준 16:9 가로형 PDF)일 수 있으니 포스터 발표가 배정되면 인쇄 전에 2027 지침부터 확인할 것."
  ],
  "sources": [
   {
    "title": "AIME 2027 공식 홈",
    "url": "https://aime27.aimedicine.info/"
   },
   {
    "title": "AIME 2027 Call for Papers",
    "url": "https://aime27.aimedicine.info/call-for-papers/"
   },
   {
    "title": "AIME 2027 Call for Journal-first Papers",
    "url": "https://aime27.aimedicine.info/call-for-papers/call-for-jf/"
   },
   {
    "title": "AIME 2027 Call for Doctoral Consortium",
    "url": "https://aime27.aimedicine.info/call-for-dc/"
   },
   {
    "title": "AIME 2027 Call for Workshops & Tutorials",
    "url": "https://aime27.aimedicine.info/call-for-workshops-tutorials/"
   },
   {
    "title": "AIME 2027 Registration",
    "url": "https://aime27.aimedicine.info/registration/"
   },
   {
    "title": "AIME 2027 Venue",
    "url": "https://aime27.aimedicine.info/venue/"
   },
   {
    "title": "AIME 2027 How to get there",
    "url": "https://aime27.aimedicine.info/travel/"
   },
   {
    "title": "AIME 2027 Visa and Entry Requirements",
    "url": "https://aime27.aimedicine.info/travel/visa-and-entry-requirements/"
   },
   {
    "title": "AIME 2027 Organization",
    "url": "https://aime27.aimedicine.info/organization/"
   },
   {
    "title": "AIME 2027 Keynote Speakers",
    "url": "https://aime27.aimedicine.info/keynote-speakers/"
   },
   {
    "title": "AIME 2026 Call for Papers (전년 일정 참고)",
    "url": "https://aime26.aimedicine.info/call-for-papers/"
   },
   {
    "title": "AIME 2026 Oral Presentation Instructions",
    "url": "https://aime26.aimedicine.info/oral-instructions/"
   },
   {
    "title": "AIME 2026 Poster/e-Poster Guidelines",
    "url": "https://aime26.aimedicine.info/call-for-papers/poster-e-poster-guidelines/"
   },
   {
    "title": "AIME 2025 Proceedings Part II (Springer, 규모 참고)",
    "url": "https://link.springer.com/book/9783031958403"
   },
   {
    "title": "KIT Royal Tropical Institute 연락처(주소)",
    "url": "https://www.kit.nl/contact/"
   },
   {
    "title": "EU 공식 ETIAS 사이트",
    "url": "https://travel-europe.europa.eu/etias_en"
   },
   {
    "title": "EU 공식 ETIAS — Who should apply (South Korea 포함)",
    "url": "https://travel-europe.europa.eu/etias/who-should-apply_en"
   },
   {
    "title": "European Commission — EES와 ETIAS 차이 (EES 2026-04-10 전면 운영)",
    "url": "https://home-affairs.ec.europa.eu/news/main-differences-between-ees-and-etias-what-travellers-need-know-2026-04-28_en"
   },
   {
    "title": "European Commission — Schengen visa policy (90/180일)",
    "url": "https://home-affairs.ec.europa.eu/policies/schengen/visa-policy_en"
   }
  ],
  "place": {
   "city": "암스테르담은 네덜란드의 공식 수도이며 시 인구 약 94만 명(2026-01-01 기준), 광역권 약 248만 명임. 운하가 촘촘해 '북쪽의 베네치아'로 불리며, 17세기 운하 환상지대는 2010년 유네스코 세계유산으로 지정됨. 17세기 네덜란드 황금시대에 세계적 항구·금융 중심지였고, 국립미술관(Rijksmuseum)·반 고흐 미술관·안네 프랑크의 집 등 박물관으로 유명함.",
   "city_source": "https://en.wikipedia.org/wiki/Amsterdam",
   "climate": "스히폴 공항 관측 기준 7월 평균 최고기온 약 22.5°C, 평균 최저기온 약 13.5°C로 한국 여름보다 훨씬 선선함. 7월 평균 강수량 약 82mm, 1mm 이상 비 오는 날이 약 11일로 한 달의 1/3가량 비가 옴. 아침·저녁용 얇은 겉옷이나 가디건, 접이식 우산이나 방수 재킷을 챙기는 것이 좋음.",
   "climate_source": "https://en.wikipedia.org/wiki/Amsterdam",
   "safety": "카페·바·식당 등 붐비는 곳과 대형 행사장에서 소매치기가 활동하며 여럿이 짜고 주의를 분산시키는 수법을 씀. 귀중품은 호텔 금고 등에 두고 현금은 최소한만 지니는 것이 권장됨. 자전거가 약 85만 대에 달해, 보행자는 인도로만 다니고 길을 건널 때 자전거와 차량을 먼저 확인해야 함. 운하는 벽이 높고 수온이 낮아 빠지면 위험하며, 응급 상황은 112(영어 응대 가능), 비응급 경찰은 0900-8844임. 팁은 의무가 아니며 5~10%가 관례임.",
   "safety_source": [
    "https://www.iamsterdam.com/en/travel-stay/health-safety-and-crime-in-amsterdam",
    "https://www.iamsterdam.com/en/travel-stay/visitor-information/communication-and-money"
   ],
   "venue": "주 행사장 KIT 왕립열대연구소 건물은 옛 동부 묘지 터에 1915년 착공했으나 제1차 세계대전과 자재 부족, 파업 등으로 11년이 걸려 1926년 10월 빌헬미나 여왕이 개관했으며 국가 기념물로 지정되어 있음. 신르네상스 양식으로 설계되었고, 팔각형의 대리석 홀(Marble Hall), 대강당, 마우리츠카더와 린나이우스스트라트 모퉁이의 종탑이 특징임. 오스터파르크(Oosterpark) 일대에 자리함. 학회에서는 Queen Máxima Hall이 기조강연·본 세션, Marble Hall이 포스터·커피 브레이크 공간으로 쓰임(AIME 2027 공식 안내).",
   "venue_source": [
    "https://en.wikipedia.org/wiki/Royal_Tropical_Institute",
    "https://aime27.aimedicine.info/venue/"
   ],
   "venue2": "워크숍·튜토리얼 장소인 VU 암스테르담은 1880년 설립된 대학으로 재학생 약 3만 1,500명(2026-06 기준)이며, 시 남부 부이텐벨더르트(Buitenveldert)의 밀집형 도심 캠퍼스가 현대식 업무지구 자위다스(Zuidas)에 맞붙어 있음. NU 건물(New University Building)은 2018년 개관한 신축 건물로 강의 공간과 문화 공간을 갖춤. 의과대학은 대형 병원 Amsterdam UMC(VUmc 캠퍼스) 바로 옆에 있음. 동부(Oost)의 KIT와 남부의 VU는 서로 다른 지역으로, 두 장소 간 이동 경로·소요시간은 (확인 필요)임.",
   "venue2_source": "https://en.wikipedia.org/wiki/Vrije_Universiteit_Amsterdam",
   "nearby": "행사장 옆 오스터파르크는 연못·개울·산책로가 있는 큰 도시공원으로 휴식 시간 산책에 적합함. 같은 건물 단지에 세계 각지 유물을 소장한 세계박물관(Wereldmuseum, 옛 트로펜박물관)이 있음. 다퍼스트라트의 다퍼마르크트(Dappermarkt)는 신선식품·치즈·청어·키벨링 등을 파는 거리 시장이며, 저녁에는 옛 목욕탕 건물의 양조장 Brouwerij 't IJ, 다양한 식당이 모인 야바스트라트(Javastraat), 17세기 영지인 프랑컨달 공원 등을 둘러볼 수 있음.",
   "nearby_source": [
    "https://www.iamsterdam.com/en/explore/neighbourhoods/oost/things-to-do",
    "https://en.wikipedia.org/wiki/Tropenmuseum"
   ]
  }
 },
 "ipa": {
  "id": "ipa",
  "checked": "2026-10-22",
  "overview": {
   "name": "2027 IPA International Congress (제26차 국제노인정신의학회 학술대회, International Psychogeriatric Association)",
   "dates": {
    "start": "2027-05-28",
    "end": "2027-05-30"
   },
   "city": "Padova (Padua)",
   "country": "Italy",
   "venue": "Padova Congress (Padua Congress Center)",
   "address": "Via Niccolò Tommaseo 59, 35131 Padova (PD), Veneto, Italy",
   "format": "전면 대면(all presentations in person). 5/28 오전 Pre-Congress Workshop + 저녁 개회식·기조강연·Welcome Reception, 5/29–30 Plenary·심포지엄·자유연제(7개 병행실)·포스터, 5/30 오후 Site Visit.",
   "organizer": "International Psychogeriatric Association (IPA, 미국 Milwaukee 사무국, info@ipa-online.org). 2027 위원회 명단은 아직 '준비 중'.",
   "scale": "공식 참가자 수 미공지. 프로그램 초안상 심포지엄·자유연제 7개 병행실, 워크숍실 100–237석 규모(중형 국제학회).",
   "proceedings": "2027 초록 출판 방식 미공지. 2025년(Kanazawa) 초록은 International Psychogeriatrics 37권 5호 Supplement로 출판, 2026년(Leiden)은 Fourwaves 온라인 Abstract Library로 공개.",
   "note": "플래너의 '일정 미공지'는 갱신 필요: 2027-05-28~30 확정(예년 여름–가을보다 이른 늦봄). 공식 테마로 'The Future of Psychogeriatrics: Mind, Brain and Wellbeing'이 행사 페이지에 게시됨."
  },
  "deadlines": [
   {
    "label": "초록 제출 사이트 개설",
    "date": "2026-08-14",
    "status": "confirmed",
    "note": "Fourwaves 'Abstract Timeline' 기준(사이트 'Dates' 칸은 8/13로 표기).",
    "source": "https://event.fourwaves.com/ic27/pages"
   },
   {
    "label": "Pre-Congress Workshop(반일) 제안 마감",
    "date": "2026-11-01",
    "status": "confirmed",
    "note": "미 중부시간(CT) 23:59 = 한국시간 11/2(월) 14:59. 스폰서/재정 확보 필수, 일반 초록 섹션으로 제출.",
    "source": "https://event.fourwaves.com/ic27/pages"
   },
   {
    "label": "심포지엄 초록 마감",
    "date": "2026-11-01",
    "status": "confirmed",
    "note": "CT 23:59(한국 11/2 14:59). 전체 개요 초록(~350단어)+개별 발표 초록 전부 필요. 2026년(Leiden)은 2025-12-17이었으니 올해는 약 6주 빠름.",
    "source": "https://www.ipa-online.org/news-and-issues/ipa-2027-ipa-padua-congress---call-for-symposium-abstracts"
   },
   {
    "label": "Free/Oral·포스터 초록 마감",
    "date": "2026-12-15",
    "status": "confirmed",
    "note": "CT 23:59(한국 12/16 14:59). 같은 페이지의 마감표에는 'December 15, 2027'로 적혀 있으나 타임라인은 2026이라 오타로 보임. 사무국 확인 권장.",
    "source": "https://event.fourwaves.com/ic27/pages"
   },
   {
    "label": "워크숍·심포지엄 심사 결과",
    "date": "2026-12-16",
    "status": "confirmed",
    "note": "제출 저자 이메일로 통보. 심포지엄 탈락 시 Free/Oral로 전환 제안될 수 있음.",
    "source": "https://event.fourwaves.com/ic27/pages"
   },
   {
    "label": "Free/Oral·포스터 심사 결과",
    "date": "2027-01-26",
    "status": "confirmed",
    "note": "'Review Timeline' 기준이며, 통보는 이 날짜 직후.",
    "source": "https://event.fourwaves.com/ic27/pages"
   },
   {
    "label": "Late-Breaking 초록 접수 시작",
    "date": "2027-02-15",
    "status": "confirmed",
    "note": "",
    "source": "https://event.fourwaves.com/ic27/pages"
   },
   {
    "label": "Late-Breaking 초록 마감",
    "date": "2027-03-15",
    "status": "confirmed",
    "note": "사이트 'Dates' 칸은 전체 제출기간 종료를 2027-04-15 CEST로 표기해 불일치.",
    "source": "https://event.fourwaves.com/ic27/pages"
   },
   {
    "label": "IPA Junior Research Awards 원고 마감",
    "date": null,
    "status": "expected",
    "note": "2027 공고 전. 2026년 마감은 2026-05-01(학회 2개월 전, 이메일 제출).",
    "source": "https://www.ipa-online.org/events/awards/ipa-jr-research-awards-submissions"
   },
   {
    "label": "사전등록(Early Bird) 마감",
    "date": null,
    "status": "expected",
    "note": "2027 등록 미오픈. 2026년은 2026-06-01까지 early rate, 6/2부터 인상(학회 1개월 전).",
    "source": "https://www.ipa-online.org/news-and-issues/update-congress-registration-open-now"
   },
   {
    "label": "발표자 등록(참석 확정)",
    "date": null,
    "status": "tba",
    "note": "채택 후 등록해야 세션이 배정된다고 명시돼 있으나 마감일은 미공지.",
    "source": "https://event.fourwaves.com/ic27/pages"
   },
   {
    "label": "일반 등록 마감",
    "date": null,
    "status": "expected",
    "note": "2026년은 온라인 등록 마감 후 현장등록(onsite rate)만 가능했음. 2027 미공지.",
    "source": "https://ipa2025congress.my.canva.site/ic26"
   },
   {
    "label": "호텔 블록 마감",
    "date": null,
    "status": "tba",
    "note": "2027 'Hotel Options' 페이지 'Launching Soon'.",
    "source": "https://ipa2025congress.my.canva.site/ipa2027congress"
   },
   {
    "label": "초청장(Invitation letter) 신청",
    "date": null,
    "status": "tba",
    "note": "공지 없음. 한국 여권은 무비자라 필요 시 info@ipa-online.org로 요청.",
    "source": "https://event.fourwaves.com/ic27/pages"
   },
   {
    "label": "프로그램 발표",
    "date": null,
    "status": "tba",
    "note": "일자별 시간표 골격은 게시됐고, 세부 세션·연자는 미공지.",
    "source": "https://ipa2025congress.my.canva.site/ipa2027congress"
   },
   {
    "label": "학회 기간(Pre-Congress Workshop 포함)",
    "date": "2027-05-28",
    "status": "confirmed",
    "note": "2027-05-28~30. 5/28 오전 워크숍(09–12시), 17:30 개회식.",
    "source": "https://event.fourwaves.com/ic27/pages"
   }
  ],
  "registration": {
   "fees": [
    {
     "category": "IPA 회원",
     "early": "$383",
     "regular": "미확인",
     "onsite": "$632",
     "currency": "USD($ 표기)"
    },
    {
     "category": "비회원",
     "early": "$599 (1년 회원권 포함 시 $557)",
     "regular": "미확인",
     "onsite": "$852",
     "currency": "USD($ 표기)"
    },
    {
     "category": "회원 학생/은퇴/간호사",
     "early": "$247",
     "regular": "미확인",
     "onsite": "$486",
     "currency": "USD($ 표기)"
    },
    {
     "category": "비회원 학생/은퇴/간호사",
     "early": "$407 (회원권 포함 $383)",
     "regular": "미확인",
     "onsite": "$632",
     "currency": "USD($ 표기)"
    },
    {
     "category": "Early Career Network",
     "early": "$231",
     "regular": "미확인",
     "onsite": "$492",
     "currency": "USD($ 표기)"
    },
    {
     "category": "저·중소득국(LMIC)",
     "early": "미표기",
     "regular": "미확인",
     "onsite": "$486",
     "currency": "USD($ 표기)"
    },
    {
     "category": "1일 등록(회원/비회원)",
     "early": "$226 / $341",
     "regular": "미확인",
     "onsite": "$464 / $535",
     "currency": "USD($ 표기)"
    },
    {
     "category": "단체 10인 이상(회원/비회원, 1인)",
     "early": "$331 / $546",
     "regular": "미확인",
     "onsite": "미표기",
     "currency": "USD($ 표기)"
    },
    {
     "category": "동반자(Guest)",
     "early": "$121",
     "regular": "미확인",
     "onsite": "$145",
     "currency": "USD($ 표기)"
    }
   ],
   "basis": "2026 기준(참고)",
   "notes": "2027 등록비는 미공지이고 위 표는 2026 Leiden 기준(early는 IPA 공지, onsite는 2026 행사 페이지). 연회비는 개인 $160/년(2년 $305), 학생·은퇴 $99. 회원 혜택은 International Psychogeriatrics 전자 구독, 학회 할인, APC 20% 할인 등이며, 초록 제출에 회원 자격은 필요 없음.",
   "source": "https://www.ipa-online.org/news-and-issues/2026-ipa-congress-registration-rates-announced"
  },
  "submission": {
   "types": "반일 Pre-Congress Workshop(스폰서 필요), 심포지엄(90분), Free/Oral Communication(10–12분), 포스터, Late-Breaking 초록.",
   "format": "초록당 350단어 이내, Title·Authors·Introduction·Objective·Method·Results·Conclusion·Keywords 구조. Word 원고 기준 Times New Roman 12pt, 영어만 허용. 상품명 금지(일반명만), 그림·표는 초록집 미수록.",
   "review": "Scientific Committee가 발표 형식을 최종 결정하며 심포지엄을 Free/Oral로 전환할 수 있음. 상호작용형·국제공동 심포지엄 우선. 마감 후 수정 불가, 오탈자는 그대로 초록집에 실림.",
   "presentation": "심포지엄 구성은 Fourwaves는 발표 2–4편(각 20–25분), IPA 뉴스는 3–5편으로 서로 다름. 포스터는 지정 세션에 포스터 옆에서 질의응답하며, 크기는 미공지. 모든 발표는 대면.",
   "publication": "2027 출판 방식은 미공지(사이트에 'abstract book' 언급). 2025년은 International Psychogeriatrics Supplement, 2026년은 온라인 Abstract Library로 공개.",
   "source": "https://event.fourwaves.com/ic27/pages"
  },
  "travel": {
   "entry": "한국 여권은 솅겐 지역에 무비자로 180일 중 90일까지 체류 가능하며, 여권은 출국 예정일 이후 3개월 이상 남아 있어야 함. ETIAS는 2026-10-22 현재 미시행(신청 접수 없음, 시행 수개월 전 공지, 수수료 EUR 20 예정). EES는 2026-04-10부터 전면 운영 중이라 첫 입국 때 얼굴·지문을 등록함.",
   "entry_source": "https://travel-europe.europa.eu/en/etias",
   "airport": "가장 가까운 공항은 Venice Marco Polo(VCE)로 행사장까지 약 30분. Treviso·Verona 공항도 이용 가능하고, Bologna(BLQ)에서는 Padova까지 기차로 약 1시간 30분.",
   "transport": "Padova역에서 행사장까지 약 500m로 도보 또는 버스 3·10·25번, 택시 이용. 장거리 버스 터미널도 역 옆에 있음. Venezia·Vicenza까지 기차 약 20분, Milano 약 2시간.",
   "hotels": "2027 IPA 'Hotel Options' 페이지는 아직 준비 중. 행사장이 역과 구시가 사이 도보권이라 역 주변 숙소가 동선상 유리함.",
   "local": "Padova는 숙박세(imposta di soggiorno)를 1박 단위, 연속 5박까지 부과함(2023년 시 자료 기준 호텔 €1–3, 현행 금액은 숙소 확인). 전압 230V/50Hz, 콘센트 C/F/L형이라 한국 플러그(C/F)는 대개 맞지만 L형 전용 콘센트에 대비해 어댑터를 권장. 학회 기간은 5월 말 늦봄.",
   "source": "https://www.padovacongress.it/informazioni-utili/"
  },
  "support": {
   "text": "IPA Junior Research Awards는 학위 후 5년 이내이고 Assistant Professor 이하인 연구자의 미발표 원저가 대상. 수상 시 여비·숙박 USD 1,500, 등록비 면제, 1년 회원권을 받고 학회에서 대면 발표해야 함(2026 기준, 2027 공고 대기). 초기 경력자(경력 5년 미만)는 Early Career Network(ECN) 등록 요율 대상. 별도 travel grant 공지는 없음.",
   "source": "https://www.ipa-online.org/events/awards/ipa-jr-research-awards-submissions"
  },
  "tips": [
   "심포지엄·워크숍 마감이 2026-11-01 CT(한국 11/2 14:59)로 10일 남음. 개별 발표 초록이 모두 있어야 심사되므로 연자 확정이 급선무.",
   "심포지엄 편수 규정이 공지마다 2–4편, 3–5편으로 달라서 3–4편으로 꾸리면 양쪽을 모두 충족함. 일본·대만·중국 등 국제 공동 연자와 토론형 구성을 넣으면 우선 선정에 유리.",
   "Free/Oral·포스터는 12/15(한국 12/16 오후) 마감. 350단어 구조화 초록이며 약물은 상품명 대신 일반명만 쓸 것.",
   "전원 대면 발표이고 채택 후 등록해야 세션이 배정됨. 5/28–30이 국내 춘계학회·외래 일정과 겹치는지 미리 확인하고 출장을 확보.",
   "IPA 개인 회원($160/년)이 되면 2026 기준 early 등록비가 $599에서 $383으로 내려가 회비를 거의 상쇄하고 저널 접근도 생김. 전공의·펠로는 ECN·학생 요율을 확인.",
   "Junior Research Award(2026 마감 5/1, USD 1,500+등록 면제)는 미발표 원고가 조건이라 대상 원고의 투고 시점을 조절해 둘 것.",
   "VCE 도착 후 Padova역까지 이동하면 행사장은 역에서 500m. 숙소는 역 주변이나 구시가로 잡고, 숙박세는 현장에서 별도 납부.",
   "ETIAS는 아직 미시행이라 출국 전 travel-europe.europa.eu에서 시행일을 재확인하고, EES 생체등록 때문에 첫 입국 심사는 여유 있게 잡을 것."
  ],
  "sources": [
   {
    "title": "IPA International Congress (공식 학회 목록)",
    "url": "https://www.ipa-online.org/events/annual-congress"
   },
   {
    "title": "2027 IPA International Congress 행사 페이지(Canva, IPA 링크)",
    "url": "https://ipa2025congress.my.canva.site/ipa2027congress"
   },
   {
    "title": "2027 IPA Congress 초록 제출(Fourwaves ic27)",
    "url": "https://event.fourwaves.com/ic27/pages"
   },
   {
    "title": "IPA 2027 Padua Congress - Call for Symposium Abstracts",
    "url": "https://www.ipa-online.org/news-and-issues/ipa-2027-ipa-padua-congress---call-for-symposium-abstracts"
   },
   {
    "title": "2026 IPA Leiden Congress 행사 페이지(현장 등록비·장소)",
    "url": "https://ipa2025congress.my.canva.site/ic26"
   },
   {
    "title": "2026 IPA Congress Registration Rates Announced",
    "url": "https://www.ipa-online.org/news-and-issues/2026-ipa-congress-registration-rates-announced"
   },
   {
    "title": "2026 Congress Registration - early rate 6/1 마감",
    "url": "https://www.ipa-online.org/news-and-issues/update-congress-registration-open-now"
   },
   {
    "title": "2026 IPA Leiden Congress - Call for Abstracts",
    "url": "https://www.ipa-online.org/news-and-issues/announcement-2026-ipa-leiden-congress---call-for-abstracts"
   },
   {
    "title": "Past IPA Congresses (초록집·Supplement 링크)",
    "url": "https://www.ipa-online.org/events/annual-congress/past-ipa-congresses"
   },
   {
    "title": "IPA Junior Research Awards - Call for Submissions",
    "url": "https://www.ipa-online.org/events/awards/ipa-jr-research-awards-submissions"
   },
   {
    "title": "IPA Membership Benefits",
    "url": "https://www.ipa-online.org/membership-in-ipa/benefits"
   },
   {
    "title": "IPA Join (연회비)",
    "url": "https://www.ipa-online.org/membership-in-ipa/join"
   },
   {
    "title": "IPA Early Career Network",
    "url": "https://www.ipa-online.org/membership-in-ipa/young-researchers-network"
   },
   {
    "title": "Padova Congress 공식 사이트",
    "url": "https://www.padovacongress.it/"
   },
   {
    "title": "Padova Congress - Informazioni utili(교통)",
    "url": "https://www.padovacongress.it/informazioni-utili/"
   },
   {
    "title": "EU 공식 ETIAS 사이트",
    "url": "https://travel-europe.europa.eu/en/etias"
   },
   {
    "title": "EU 공식 EES FAQ(전면 운영 2026-04-10)",
    "url": "https://travel-europe.europa.eu/ees/faq"
   },
   {
    "title": "EU Home Affairs - Visa policy(무비자 국가 목록 근거)",
    "url": "https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en"
   },
   {
    "title": "주한 헝가리대사관 - 솅겐 일반정보(한국인 90일 무비자, 여권 3개월)",
    "url": "https://szoul.mfa.gov.hu/eng/page/general-information"
   },
   {
    "title": "Comune di Padova 위원회 회의록(숙박세, 2023)",
    "url": "https://padovanet.it/16022023-verbale-ii-commissione"
   },
   {
    "title": "Italy plug types (Wise)",
    "url": "https://wise.com/us/blog/italy-power-adapter"
   }
  ],
  "place": {
   "city": "파도바는 베네토주 3번째 규모 도시로 인구 약 20만 8천 명(2026년 기준)임. 1222년 설립된 파도바 대학교가 도시의 중심이며, 1594년 건립된 현존하는 가장 오래된 상설 해부학 강당이 남아 있고 갈릴레오가 이곳에서 강의했음. 1545년 조성된 가장 오래된 대학 식물원(Orto Botanico, 1997년 등재)과 조토의 스크로베니 예배당을 포함한 14세기 프레스코 연작(Padova Urbs picta, 2021년 등재) 등 유네스코 세계유산 2건을 보유함. 유럽 최대급 광장인 프라토 델라 발레(9만㎡, 조각상 78개)도 대표 명소임.",
   "city_source": "https://en.wikipedia.org/wiki/Padua",
   "climate": "5월 평균 최고기온 약 24.0℃, 평균 최저기온 약 14.1℃로 낮에는 따뜻하고 아침·저녁은 선선함. 월 강수량 약 101.9mm, 강수일 약 9일로 비가 잦은 편임. 반팔·얇은 긴팔 위주에 저녁용 가벼운 겉옷과 접이식 우산을 챙기는 것이 좋음. 냉방이 강한 학회장 실내 대비 카디건 1벌도 권장함.",
   "climate_source": "https://en.wikipedia.org/wiki/Padua",
   "safety": "이탈리아는 전반적으로 범죄율이 낮으나 도심·주요 관광지, 대중교통, 기차역, 카페·식당 등 붐비는 곳에서 소매치기·날치기가 잦음. 소지품을 늘 시야 안에 두고, 주의 분산 수법에 유의하며, 귀중품을 한곳에 몰아 다니지 않는 것이 좋음. 역사지구는 노란 바탕에 검은 글씨 'ZTL' 표지의 차량 통행 제한 구역으로, 허가 없이 렌터카로 진입하면 번호판이 촬영되어 과태료가 부과됨. 긴급 신고는 112임.",
   "safety_source": "https://www.gov.uk/foreign-travel-advice/italy/safety-and-security",
   "venue": "Padova Congress는 파도바 박람회장(Fiera di Padova) 단지 안 Via N. Tommaseo 59에 위치한 컨벤션센터로, 일본 건축가가 설계한 현대 건축물임. 대표 홀인 Sala Giotto(1,565석, 공식 사이트는 1,380석으로 출처마다 다름)와 Sala Mantegna(988석)를 비롯해 60~150석 규모 소형 홀까지 총 11개 공간을 갖추고 있음. 152㎡ 대형 LED 스크린 등 첨단 멀티미디어 설비를 갖췄으며, 파도바 중앙역에서 약 500m(도보 5분) 거리임.",
   "venue_source": "https://www.padovaconvention.it/it/programma-un-convegno/centri-congressi-fiere/padova-congress",
   "nearby": "조토의 프레스코 연작(1303~1305)이 있는 스크로베니 예배당은 Piazza Eremitani 8에 있으며, 도보 소요시간은 (확인 필요)임. 관람은 최소 하루 전 예약이 필수이고 지각 시 입장이 불가하므로 학회 일정 전 미리 예약할 것을 권장함. 매일 9~19시 주간 관람 외에 3월 25일~11월 3일에는 19~22시 야간 관람도 운영되어 세션 종료 후 방문 가능함. 요금은 일반 15유로+예약비 1유로임(2026년 기준, 2027년 일정·요금은 재확인 필요).",
   "nearby_source": "https://www.turismopadova.it/en/scrovegni-chapel/"
  }
 },
 "miccai": {
  "id": "miccai",
  "checked": "2026-10-22",
  "overview": {
   "name": "MICCAI 2027 — 30th International Conference on Medical Image Computing and Computer Assisted Intervention",
   "dates": {
    "start": "2027-09-27",
    "end": "2027-10-01"
   },
   "city": "Auckland (Tāmaki Makaurau)",
   "country": "New Zealand",
   "venue": "New Zealand International Convention Centre (NZICC)",
   "address": "101 Hobson Street, Auckland CBD (Hobson St–Nelson St 사이; 출입구 83 Wellesley Street West, 50 Nelson Street도 있음)",
   "format": "대면 학회. 본 학회 3일(구두·포스터) + 앞뒤 날 워크숍·튜토리얼·챌린지(위성행사), 산업 세션·전시, Clinical Day(CLINICCAI), 태평양 보건·건강형평성 특별세션",
   "organizer": "MICCAI Society 주최. General Chairs: Jichao Zhao, Gabor Fichtinger, Stamatia (Matina) Giannarou. 사무국: DEKON Congress & Tourism(이스탄불)",
   "scale": "약 3,000명, 60개국 이상 참가 예상(Auckland Unlimited 발표)",
   "proceedings": "Springer LNCS (2026년 기준 본 학회 논문집 19권 + 위성행사 논문집, 개막 전후 오픈액세스 공개)",
   "note": "원래 하와이(호놀룰루) 개최 예정이었으나 컨벤션센터 공사 확대로 무산돼 2025-05 MICCAI Society가 변경을 공지했고, 2026-02-18 오클랜드 확정 발표. 공식 사이트·발표문은 9/27–10/1, 학회 Upcoming Conferences 페이지와 현지 보도는 9/26–10/1로 하루 차이가 있으니 9/26 출국·도착 여유를 두는 편이 안전함."
  },
  "deadlines": [
   {
    "label": "위성행사(워크숍·챌린지·튜토리얼) LOI 마감",
    "date": null,
    "status": "expected",
    "note": "2027 공지 없음. 2026년은 2025-12-15 마감(제출 사이트 2025-11-20 오픈) → 2027년은 2026년 12월 중순 예상. 워크숍 조직 계획이 있으면 곧 공지될 수 있음.",
    "source": "https://conferences.miccai.org/2026/en/CALL-FOR-SATELLITE-EVENTS.html"
   },
   {
    "label": "챌린지·튜토리얼 정식 제안서 마감",
    "date": null,
    "status": "expected",
    "note": "2026년 기준 2026-01-09. 2027년은 2027년 1월 초 예상.",
    "source": "https://conferences.miccai.org/2026/en/CALL-FOR-SATELLITE-EVENTS.html"
   },
   {
    "label": "워크숍 정식 제안서 마감",
    "date": null,
    "status": "expected",
    "note": "2026년 기준 2026-01-15. 2027년은 2027년 1월 중순 예상.",
    "source": "https://conferences.miccai.org/2026/en/CALL-FOR-SATELLITE-EVENTS.html"
   },
   {
    "label": "본 학회 초록 등록(Intention to Submit) + 공저자 리뷰어 등록",
    "date": null,
    "status": "expected",
    "note": "2026년 기준 2026-02-12 23:59 PT. 미등록 시 본 논문 제출 불가, 공저자 1인 리뷰어 미등록 시 desk reject.",
    "source": "https://conferences.miccai.org/2026/en/PAPER-SUBMISSION-GUIDELINES.html"
   },
   {
    "label": "본 학회 논문 제출(보충자료 포함)",
    "date": null,
    "status": "expected",
    "note": "2026년 기준 2026-02-26 23:59 PT, 연장 없음. 2027년은 2027년 2월 말 예상(공식 Important Dates 페이지 아직 공란).",
    "source": "https://conferences.miccai.org/2026/en/IMPORTANT-DATES.html"
   },
   {
    "label": "Clinical Day(CLINICCAI) 초록 마감",
    "date": null,
    "status": "expected",
    "note": "2026년 기준 2026년 4월(정확한 날짜 미표기), 6월 통보.",
    "source": "https://conferences.miccai.org/2026/en/IMPORTANT-DATES.html"
   },
   {
    "label": "리뷰 공개·조기 채택 통보",
    "date": null,
    "status": "expected",
    "note": "2026년 기준 2026-05-07(PT).",
    "source": "https://conferences.miccai.org/2026/en/IMPORTANT-DATES.html"
   },
   {
    "label": "Rebuttal 기간",
    "date": null,
    "status": "expected",
    "note": "2026년 기준 2026-05-08~05-14(1주).",
    "source": "https://conferences.miccai.org/2026/en/IMPORTANT-DATES.html"
   },
   {
    "label": "MICCAI Society·NIH 등록비 지원(Registration Grant) 신청 마감",
    "date": null,
    "status": "expected",
    "note": "2026년 기준 2026-05-17 23:59 AoE. 채택 통보 전에 신청해야 함.",
    "source": "https://conferences.miccai.org/2026/en/REGISTRATION-AND-TRAVEL-GRANTS.html"
   },
   {
    "label": "조기 채택 논문 camera-ready",
    "date": null,
    "status": "expected",
    "note": "2026년 기준 2026-05-25.",
    "source": "https://conferences.miccai.org/2026/en/IMPORTANT-DATES.html"
   },
   {
    "label": "최종 채택 통보",
    "date": null,
    "status": "expected",
    "note": "2026년 기준 2026-06-12(PT). 채택 시 비자 초청장 안내도 함께 옴.",
    "source": "https://conferences.miccai.org/2026/en/IMPORTANT-DATES.html"
   },
   {
    "label": "camera-ready 제출 + 저자 등록(결제 완료) 마감",
    "date": null,
    "status": "expected",
    "note": "2026년 기준 2026-06-26(가이드 본문에는 6/25 표기도 있어 혼재). 저자 등록 미완료 시 논문집 제외 위험.",
    "source": "https://conferences.miccai.org/2026/en/CAMERA-READY-SUBMISSION-GUIDELINES.html"
   },
   {
    "label": "MICCAI Society·RISE 여행 지원금(Travel Grant) 신청 마감",
    "date": null,
    "status": "expected",
    "note": "2026년 기준 2026-07-01 23:59 AoE, 8/3 통보.",
    "source": "https://conferences.miccai.org/2026/en/REGISTRATION-AND-TRAVEL-GRANTS.html"
   },
   {
    "label": "위성행사(워크숍) 논문 제출",
    "date": null,
    "status": "tba",
    "note": "각 워크숍이 개별 결정(보통 본 학회 통보 전후 6~7월). 위성행사 camera-ready는 2026년 기준 2026-08-27.",
    "source": "https://conferences.miccai.org/2026/en/CALL-FOR-SATELLITE-EVENTS.html"
   },
   {
    "label": "등록 취소 전액 환불(€25 공제) 마감",
    "date": null,
    "status": "expected",
    "note": "2026년 기준 2026-08-17까지, 이후 환불 불가.",
    "source": "https://conferences.miccai.org/2026/en/REGISTRATION.html"
   },
   {
    "label": "조기 등록(early) 마감",
    "date": null,
    "status": "expected",
    "note": "2026년 기준 2026-08-21(결제일 기준). 2027 등록 페이지는 아직 '준비 중'.",
    "source": "https://conferences.miccai.org/2026/en/REGISTRATION.html"
   },
   {
    "label": "구두·스포트라이트 발표 녹화본 사전 업로드",
    "date": null,
    "status": "expected",
    "note": "2026년 기준 2026-09-13(개막 2주 전). 슬라이드는 발표 전날 15시까지 업로드.",
    "source": "https://conferences.miccai.org/2026/en/MAIN-CONFERENCE-PRESENTATION-INSTRUCTIONS.html"
   },
   {
    "label": "비자 초청장 요청 마감",
    "date": null,
    "status": "tba",
    "note": "2027 사이트: 일반 초청장 제공 예정, 방법은 추후 공지. 한국 여권은 비자면제(NZeTA)라 대개 불필요.",
    "source": "https://conferences.miccai.org/2027/en/VISA-AND-ENTRY-REQUIREMENTS.html"
   },
   {
    "label": "공식 숙소 예약 마감",
    "date": null,
    "status": "tba",
    "note": "2027 Accommodation 페이지 '준비 중'. 2026년은 bookingmaster.travel 포털 사용.",
    "source": "https://conferences.miccai.org/2027/en/ACCOMMODATION.html"
   },
   {
    "label": "프로그램 공개",
    "date": null,
    "status": "tba",
    "note": "2027 Program 페이지 '준비 중'.",
    "source": "https://conferences.miccai.org/2027/en/PROGRAM-OVERVIEW.html"
   },
   {
    "label": "MICCAI 2027 본 학회·위성행사",
    "date": "2027-09-27",
    "status": "confirmed",
    "note": "2027-09-27~10-01, NZICC. 학회 목록 페이지·현지 보도는 9/26 시작으로 표기.",
    "source": "https://conferences.miccai.org/2027/en/"
   }
  ],
  "registration": {
   "fees": [
    {
     "category": "학생 – MICCAI 회원 (본 학회)",
     "early": "500",
     "regular": "600",
     "onsite": "미공지(late 요금 적용 추정)",
     "currency": "EUR"
    },
    {
     "category": "학생 – 비회원 (본 학회)",
     "early": "600",
     "regular": "750",
     "onsite": "미공지",
     "currency": "EUR"
    },
    {
     "category": "일반 – MICCAI 회원 (본 학회)",
     "early": "820",
     "regular": "980",
     "onsite": "미공지",
     "currency": "EUR"
    },
    {
     "category": "일반 – 비회원 (본 학회)",
     "early": "950",
     "regular": "1,100",
     "onsite": "미공지",
     "currency": "EUR"
    },
    {
     "category": "임상의 – MICCAI 회원 (본 학회)",
     "early": "820",
     "regular": "980",
     "onsite": "미공지",
     "currency": "EUR"
    },
    {
     "category": "임상의 – 비회원 (본 학회)",
     "early": "950",
     "regular": "1,100",
     "onsite": "미공지",
     "currency": "EUR"
    },
    {
     "category": "워크숍/튜토리얼/챌린지 1일 – 학생(본 학회와 함께 / 단독)",
     "early": "130 / 170",
     "regular": "190 / 230",
     "onsite": "미공지",
     "currency": "EUR"
    },
    {
     "category": "워크숍/튜토리얼/챌린지 1일 – 일반·임상의(본 학회와 함께 / 단독)",
     "early": "170 / 210",
     "regular": "230 / 270",
     "onsite": "미공지",
     "currency": "EUR"
    }
   ],
   "basis": "2026 기준(참고)",
   "notes": "2027 등록 페이지는 '준비 중'으로 요금 미공지(뉴질랜드 개최라 통화가 바뀔 수 있음). 2026년 표는 early=2026-08-21까지, regular=그 이후 late 요금이며 VAT 포함, 결제일 기준. 워크숍은 날짜별 별도 결제, 회원 요금은 등록 시 회원비 동시 결제로 가능, 학생은 증빙 필요(포닥은 일반).",
   "source": "https://conferences.miccai.org/2026/en/REGISTRATION.html"
  },
  "submission": {
   "types": "본 학회 논문(방법론·응용 연구), Clinical Day(CLINICCAI) 초록, 위성행사(워크숍·챌린지·튜토리얼) 논문·제안서, Open Data 트랙. 2027 Calls·Paper Submission 페이지는 아직 '준비 중'.",
   "format": "2026년 기준: MICCAI 전용 LaTeX/Word 템플릿, 본문 8쪽 + 참고문헌 최대 2쪽(camera-ready는 8.5쪽 + 2쪽), 템플릿·여백 조작 시 desk reject. 500자 Novelty/Impact 진술과 MIC/CAI 1차 분야 + Body·Modality·Application 2차 분야 선택 필수.",
   "review": "이중맹검(CMT, TPMS 매칭), 평균 리뷰어 3명 + AC 1~3명, 조기 채택 후 나머지는 1주 rebuttal. 공저자 1인이 반드시 리뷰어로 등록해야 하며 채택 논문은 리뷰가 공개됨. arXiv 사전공개는 허용.",
   "presentation": "2026년 기준 전원 대면 발표(하이브리드 없음), 모든 채택 논문에 포스터 세션 배정. 포스터는 세로형 A0(841×1189 mm) 이하로 본 학회 3일 내내 게시하고 e-poster도 업로드. 구두는 12분 슬롯에 발표 10분, 스포트라이트는 3분(슬라이드 3장 이하), 16:9 PPT.",
   "publication": "Springer LNCS 논문집(전자·인쇄), 개막 무렵 오픈액세스. 저자가 대면 발표하지 않으면 논문집에서 철회될 수 있음.",
   "source": "https://conferences.miccai.org/2026/en/PAPER-SUBMISSION-GUIDELINES.html"
  },
  "travel": {
   "entry": "한국(Korea, South)은 뉴질랜드 비자면제국이라 비자는 필요 없지만 출국 전 NZeTA가 필수(앱 NZD 17 / 웹 NZD 23, 72시간 이내 처리, 2년 유효, 1회 최대 3개월 체류). 관광세 IVL NZD 100은 NZeTA 신청 때 같이 내며 환불되지 않음. 여권은 출국 예정일 이후 3개월 이상 남아 있어야 하고, 출국 항공권과 체류비 증빙(월 NZD 1,000)이 필요함. 출발 24시간 전부터 NZ Traveller Declaration(NZTD, 무료)을 제출할 수 있음.",
   "entry_source": "https://www.immigration.govt.nz/visas/new-zealand-electronic-travel-authority-nzeta/",
   "airport": "Auckland Airport (AKL)가 주 관문. 인천–오클랜드 직항은 대한항공 KE411/412(B787-9, 약 11.5~12시간 소요, 밤에 출발해 다음 날 아침 도착)이 운항하나, 주간 운항 횟수가 시즌마다 바뀜. Air New Zealand의 서울 노선은 2025-03 이후 중단된 상태.",
   "transport": "공항에서 시내까지 30~45분 걸림. SkyDrive 직행버스는 05:00~22:30, 약 30분 간격으로 다니며 시내 정류장이 NZICC와 같은 Hobson St(Sky Tower 인근)에 있음. 그 밖에 Super Shuttle(2인 기준 NZD 20~), 택시·라이드셰어(약 NZD 38~105)가 있음. 시내 대중교통(AT)은 교통카드 없이 신용카드 비접촉 결제가 되며 하루 NZD 20 상한이 있고, 2026-09 City Rail Link 개통으로 도심 철도가 개선됨.",
   "hotels": "2027 공식 숙소 페이지는 '준비 중'(2026년에는 bookingmaster.travel 포털을 썼고 학회는 예약 책임을 지지 않음). 도심이 걸어 다닐 만해서 NZICC 주변 CBD 호텔이 편함.",
   "local": "9월 말은 남반구 봄으로 낮 약 16°C, 밤 약 8°C이고 비 오는 날이 잦아 우산·겉옷이 필요함. 2027-09-26 서머타임이 시작되면 한국보다 4시간 빠름. 전기는 230V Type I(기울어진 3핀)라 어댑터가 필요함. 음식(포장 과자·건조식품·김치 등 포함)은 모두 신고해야 하며, 미신고 시 즉석 벌금 NZD 400이 부과되고 입국장 폐기함(amnesty bin)을 이용할 수 있음.",
   "source": "https://conferences.miccai.org/2027/en/GETTING-TO-AND-AROUND-AUCKLAND.html"
  },
  "support": {
   "text": "2027 지원 프로그램은 아직 공지되지 않음. 2026년 기준 MICCAI Society 등록비 지원(약 25명, 등록비+1년 회원권)과 Travel Grant(최대 USD 2,500, 15명), RISE-MICCAI Travel Grant(5~10명)가 있었는데, 저소득국·과소대표 지역과 재정 필요 순으로 선정해 한국 팀은 우선순위가 낮을 수 있음. 학생은 MICCAI Student Board(MSB) 행사와 Women in MICCAI 행사에 참여할 수 있음. 자원봉사·보육·접근성 정보는 2026·2027 사이트 모두에서 찾지 못했음(NZICC에 장애인 주차·엘리베이터는 있음). 현재 공지된 Society 프로그램은 회원 지원금(2026-11-30 마감)과 Health Equity Award(2026-11-12 마감) 정도임.",
   "source": "https://conferences.miccai.org/2026/en/REGISTRATION-AND-TRAVEL-GRANTS.html"
  },
  "tips": [
   "2027 Important Dates가 아직 비어 있으므로 2026년 패턴(2월 중순 초록 등록, 2월 말 논문 마감, 연장 없음)을 기준으로 1~2월 원고 일정을 잡고, 뉴스레터를 구독해 공지를 받기.",
   "초록 등록 마감 전에 공저자 1명을 리뷰어로 등록해 두기(논문마다 다른 사람이어야 함). 학생 리뷰어는 MICCAI·MedIA·TMI 등에 1저자 논문이 있어야 함. 빠뜨리면 desk reject.",
   "워크숍·챌린지를 조직할 계획이면 2026년 12월 중순쯤 LOI 마감이 예상되니 지금 바로 공동 조직자를 정리하기.",
   "채택되면 반드시 대면 발표해야 하고(미발표 시 논문집 철회 가능), camera-ready 마감일까지 저자 등록 결제를 끝내야 함. 1저자가 여러 편일 때만 등록 1건으로 여러 편 발표 가능.",
   "NZeTA는 정부 공식 앱(NZD 17 + IVL 100)으로 신청하기. 대행 사이트는 비싸고 처리를 앞당겨 주지도 못함. 2년 유효하니 출국 몇 주 전에 미리 받아 두기.",
   "기내식 외 간식·라면·김·꿀 등 음식은 전부 NZTD에 신고하거나 폐기함에 버리기. 미신고 시 즉석 벌금 NZD 400.",
   "시작일 표기(9/26 vs 9/27)가 엇갈리고 직항편 요일이 시즌마다 바뀌므로 9/25~26 도착으로 잡고, 대한항공 2027년 9월 스케줄이 나오면 바로 확인하기.",
   "포스터는 세로형 A0 이하로 출력해 가져가고, 9월 말 오클랜드 봄비에 대비해 포스터 튜브용 방수 커버와 우산을 챙기기."
  ],
  "sources": [
   {
    "title": "MICCAI 2027 공식 사이트(홈)",
    "url": "https://conferences.miccai.org/2027/en/"
   },
   {
    "title": "MICCAI 2027 Conference Center (NZICC)",
    "url": "https://conferences.miccai.org/2027/en/CONFERENCE-CENTER.html"
   },
   {
    "title": "MICCAI 2027 Getting to & Around Auckland",
    "url": "https://conferences.miccai.org/2027/en/GETTING-TO-AND-AROUND-AUCKLAND.html"
   },
   {
    "title": "MICCAI 2027 Air & Ground Transportation",
    "url": "https://conferences.miccai.org/2027/en/AIR---GROUND-TRANSPORTATION.html"
   },
   {
    "title": "MICCAI 2027 Visa & Entry Requirements",
    "url": "https://conferences.miccai.org/2027/en/VISA-AND-ENTRY-REQUIREMENTS.html"
   },
   {
    "title": "MICCAI Society – Announcing MICCAI 2027 and 2028 locations (2026-02-18)",
    "url": "https://miccai.org/index.php/news/2026/02/18/announcing-miccai-2027-and-miccai-2028-locations"
   },
   {
    "title": "MICCAI Society – Update on MICCAI 2027 in Hawaii, USA (2025-05-13)",
    "url": "https://miccai.org/index.php/news/2025/05/13/update-on-miccai-2027-in-hawaii-usa"
   },
   {
    "title": "MICCAI Society – Upcoming Conferences",
    "url": "https://miccai.org/upcoming-conferences/"
   },
   {
    "title": "MICCAI Society – Accepting Applications to Awards and Grants (2026-10-04)",
    "url": "https://miccai.org/2026/10/04/accepting-applications-to-miccai-awards-and-grants/"
   },
   {
    "title": "Auckland Unlimited – Auckland to host MICCAI 2027 (2025-11-04)",
    "url": "https://aucklandunlimited.com/news/auckland-to-host-world-leading-ai-in-medicine-conference-in-2027"
   },
   {
    "title": "MICCAI 2026 Important Dates",
    "url": "https://conferences.miccai.org/2026/en/IMPORTANT-DATES.html"
   },
   {
    "title": "MICCAI 2026 Paper Submission Guidelines",
    "url": "https://conferences.miccai.org/2026/en/PAPER-SUBMISSION-GUIDELINES.html"
   },
   {
    "title": "MICCAI 2026 Camera-Ready Guidelines",
    "url": "https://conferences.miccai.org/2026/en/CAMERA-READY-SUBMISSION-GUIDELINES.html"
   },
   {
    "title": "MICCAI 2026 Call for Satellite Events",
    "url": "https://conferences.miccai.org/2026/en/CALL-FOR-SATELLITE-EVENTS.html"
   },
   {
    "title": "MICCAI 2026 Registration",
    "url": "https://conferences.miccai.org/2026/en/REGISTRATION.html"
   },
   {
    "title": "MICCAI 2026 Registration and Travel Grants",
    "url": "https://conferences.miccai.org/2026/en/REGISTRATION-AND-TRAVEL-GRANTS.html"
   },
   {
    "title": "MICCAI 2026 Main Conference Presentation Instructions",
    "url": "https://conferences.miccai.org/2026/en/MAIN-CONFERENCE-PRESENTATION-INSTRUCTIONS.html"
   },
   {
    "title": "MICCAI 2026 Open Access and Proceedings",
    "url": "https://conferences.miccai.org/2026/en/OPEN-ACCESS-AND-PROCEEDINGS.html"
   },
   {
    "title": "Immigration NZ – NZeTA",
    "url": "https://www.immigration.govt.nz/visas/new-zealand-electronic-travel-authority-nzeta/"
   },
   {
    "title": "Immigration NZ – Requesting an NZeTA (앱 NZD 17 / 웹 NZD 23)",
    "url": "https://www.immigration.govt.nz/about-us/news-centre/requesting-a-new-zealand-electronic-travel-authority/"
   },
   {
    "title": "Immigration NZ – Paying the International Visitor Levy",
    "url": "https://www.immigration.govt.nz/process-to-apply/applying-for-a-visa/fees-processing-times-and-refunds/paying-the-international-visitor-levy/"
   },
   {
    "title": "Immigration NZ – Visa waiver countries and territories",
    "url": "https://www.immigration.govt.nz/visit/what-you-need-to-visit-new-zealand/visa-waiver-countries-and-territories/"
   },
   {
    "title": "Immigration NZ – Visa Waiver Visitor Visa (조건)",
    "url": "https://www.immigration.govt.nz/new-zealand-visas/visas/visa/visa-waiver"
   },
   {
    "title": "MPI – How to declare items when arriving in NZ",
    "url": "https://www.mpi.govt.nz/bring-send-to-nz/bringing-and-posting-items-to-nz/how-to-declare-items-when-arriving-in-nz"
   },
   {
    "title": "MPI – What food you can bring to NZ",
    "url": "https://www.mpi.govt.nz/bring-send-to-nz/bringing-and-posting-items-to-nz/check-if-you-can-bring-or-send-an-item-to-nz/bringing-food-to-nz"
   },
   {
    "title": "govt.nz – Daylight saving (2027-09-26 시작)",
    "url": "https://www.govt.nz/browse/recreation-and-the-environment/daylight-saving/"
   },
   {
    "title": "Air New Zealand – Seoul seasonal service will not return (2025-02)",
    "url": "https://www.airnewzealandnewsroom.com/press-release-2025-air-new-zealand-seasonal-service-to-seoul-will-not-return-for-october-2025"
   },
   {
    "title": "Flightmapper – Korean Air KE411 ICN–AKL (참고용 스케줄)",
    "url": "https://info.flightmapper.net/flight/Korean_Air_KE_411"
   },
   {
    "title": "WeatherSpark – Auckland September climate (참고)",
    "url": "https://weatherspark.com/m/144891/9/Average-Weather-in-September-in-Auckland-New-Zealand"
   },
   {
    "title": "Discover New Zealand – Electricity voltage/plug (참고)",
    "url": "https://www.discovernewzealand.com/faqs/new-zealand-electricity-voltage"
   }
  ],
  "place": {
   "city": "오클랜드는 뉴질랜드 최대 도시로, 도시 인구 약 154만 7천 명(2025년 6월)이며 전국 인구의 약 29%가 거주함. 북쪽 와이테마타(Waitematā) 항과 남쪽 마누카우(Manukau) 항 사이에 자리하며, 최소 53개의 소형 화산체로 이루어진 오클랜드 화산지대 위에 세워진 도시임. 마오리어 이름 타마키 마카우라우(Tāmaki Makaurau)는 '많은 이들이 탐낸 타마키'라는 뜻으로 풍부한 자연자원과 지리적 이점을 가리킴. 주민의 44.9%가 해외 출생(2023년 인구조사)이고 세계에서 폴리네시아계 인구가 가장 많은 도시인 다문화 도시이며, 1883년 설립된 뉴질랜드 최대 대학인 오클랜드대학교가 있음.",
   "city_source": "https://en.wikipedia.org/wiki/Auckland",
   "climate": "학회 기간은 남반구 봄으로, NIWA 1991~2020년 평년값 기준 오클랜드의 일 평균 최고/최저기온은 9월 16.5℃/9.7℃, 10월 17.9℃/11.3℃ 수준임. 9~10월은 비 오는 날(0.1mm 이상)이 오클랜드 공항 기준 월 16~17일로 잦고 봄은 바람이 가장 강한 계절이므로 우산·방풍 겉옷 준비가 필요함. 뉴질랜드 일광절약시간은 2027년 9월 26일(일) 02시에 시작되어 학회 개막(9월 27일) 직전부터 적용되며, 한국과의 시차는 일광절약시간 중 +4시간, 시작 전 +3시간임(표준시 기준 계산, 확인 필요).",
   "climate_source": [
    "https://figure.nz/chart/suDfDLV40cwPuZWq-SieAAVRCwyf6BPo5",
    "https://webstatic.niwa.co.nz/static/Auckland%20ClimateWEB.pdf",
    "https://www.govt.nz/browse/recreation-and-the-environment/daylight-saving/"
   ],
   "safety": "뉴질랜드는 대부분의 식품 반입이 불법이며, 금지·과세 대상일 수 있는 물품은 입국 시 반드시 신고해야 함. 목재·가죽 제품, 텐트, 낚시 장비, 골프채 등도 병해충 매개 우려가 있어 확인 대상임. 반입 가능 여부가 불확실하면 생물보안 담당관에게 신고하거나 공항의 지정 폐기함에 버리면 되며, 생물보안 규정 위반 시 최대 NZ$100,000 벌금 또는 징역형이 부과될 수 있음.",
   "safety_source": "https://www.gov.uk/foreign-travel-advice/new-zealand/entry-requirements",
   "venue": "NZICC(New Zealand International Convention Centre)는 2026년 2월 개관한 오클랜드 도심의 컨벤션센터로, 공식 국제컨벤션센터 지위를 가진 시설임. 4개 층에 걸쳐 32,500㎡의 행사 공간과 회의실 33개를 갖추고 있으며, 아리키 홀(Ariki Hall)은 최대 4,500명·전시 부스 400개, 테 파에파에 극장(Te Paepae Theatre)은 2,852석으로 두 개 극장으로 분할 가능함. 마오리 신화 속 숲과 새의 영역인 '타네의 세계'에서 영감을 받은 디자인으로, 대형 공공 미술과 문화 서사가 건축 전반에 반영되어 있음.",
   "venue_source": "https://www.ttgmice.com/2026/07/22/new-zealand-international-convention-centre-auckland/",
   "nearby": "NZICC는 스카이시티(SkyCity) 단지와 바로 붙어 있어 스카이타워가 인접해 있으며, 주변 도보권에 8,000실 이상의 호텔 객실과 식당·쇼핑 시설이 있음. 같은 도심(CBD) 안에 1888년부터 운영된 오클랜드 미술관(Toi o Tāmaki), 화산 지형인 앨버트 파크, 오클랜드대학교 캠퍼스가 있음. 워터프런트의 바이어덕트 하버·윈야드 쿼터, 교통 거점인 브리토마트 역, 데번포트·와이헤케섬행 페리가 출발하는 오클랜드 페리 터미널도 도심에 있음(정확한 도보 소요시간은 확인 필요).",
   "nearby_source": [
    "https://www.ttgmice.com/2026/07/22/new-zealand-international-convention-centre-auckland/",
    "https://en.wikipedia.org/wiki/Auckland_CBD"
   ]
  }
 },
 "vascog": {
  "id": "vascog",
  "checked": "2026-10-22",
  "overview": {
   "name": "VasCog 2027 — International Society of Vascular Behavioural and Cognitive Disorders 학술대회",
   "dates": {
    "start": "2027-11-13",
    "end": "2027-11-16"
   },
   "city": "Singapore",
   "country": "Singapore",
   "venue": "미공지 (학회 포스터 배경은 Marina Bay Sands이지만 개최 장소로 발표된 것은 아님)",
   "address": "미공지",
   "format": "대면 4일. 2025년 기준 형식: Master Class, Plenary, Symposium, Debate, 그리고 ECI(신진연구자) Master Class",
   "organizer": "VasCog Society. 2027 현지조직위·PCO는 미공지 (대회 사이트 conference2027.vascog.org는 'coming soon' 상태)",
   "scale": "2027 미공지. VasCog 2025(Southampton)에는 약 200명 참석 (CCCB 하이라이트 논문 기준)",
   "proceedings": "초록집 저널 부록 확인 안 됨. 2025 대회는 학회지 Cerebral Circulation – Cognition and Behavior(CCCB)에 하이라이트 논문으로 정리됨 (doi:10.1016/j.cccb.2025.100525)",
   "note": "날짜(2027-11-13~16)와 도시(Singapore)는 vascog.org 공식 포스터로 확인되어 플래너와 일치. 장소·마감일·등록비는 2026-10-22 기준 모두 미공지. 학회는 격년 개최."
  },
  "deadlines": [
   {
    "label": "심포지엄/세션 제안",
    "date": null,
    "status": "tba",
    "note": "2027 공고 없음. 2025·2023 사이트에서도 공개 세션 제안 공모는 확인되지 않음.",
    "source": "https://conference2027.vascog.org/"
   },
   {
    "label": "초록 제출 마감 (일반 구연/포스터)",
    "date": null,
    "status": "expected",
    "note": "2027 미공지. 참고: 2023은 2023-06-07 마감(얼리버드 마감 1주 전, 수시 심사). 2025는 일반 마감일이 기록에 남아 있지 않음. 대회 3~5개월 전 마감을 예상.",
    "source": "https://web.archive.org/web/20230326182845/https://conference2023.vascog.org/abstract-submission/"
   },
   {
    "label": "초록 채택 통지",
    "date": null,
    "status": "expected",
    "note": "2023·2025 모두 수시(rolling)로 심사해 교신저자에게 이메일 통보. 일찍 낼수록 일찍 결과를 받음.",
    "source": "https://conference2025.vascog.org/abstract-submission/"
   },
   {
    "label": "Early Career Investigator Award 신청",
    "date": null,
    "status": "expected",
    "note": "별도 마감 없이 초록 제출 시 옵트인(2023·2025). 상위 3편에 상금. 마감은 초록 마감과 같음.",
    "source": "https://conference2025.vascog.org/abstract-submission/"
   },
   {
    "label": "얼리버드 등록 마감",
    "date": "2027-09-29",
    "status": "expected",
    "note": "추정치. 2025는 2025-08-01(연장 후, 대회 45일 전)에 마감, 2023은 06-14에 마감. 2025와 같은 간격을 적용한 날짜.",
    "source": "https://web.archive.org/web/20250715193513/https://conference2025.vascog.org/registration/"
   },
   {
    "label": "Late-breaking 포스터 초록 마감",
    "date": "2027-10-14",
    "status": "expected",
    "note": "추정치. 2025는 2025-08-16(연장 후, 대회 30일 전)에 마감했고 포스터만 받음.",
    "source": "https://web.archive.org/web/20250715193522/https://conference2025.vascog.org/"
   },
   {
    "label": "발표자 등록(등록비 납부)",
    "date": null,
    "status": "tba",
    "note": "채택 초록은 등록하고 등록비를 낸 저자가 발표해야 함(2023·2025 규정). 별도 마감일은 공지되지 않음. 얼리버드 마감 전 등록을 권장.",
    "source": "https://conference2025.vascog.org/abstract-submission/"
   },
   {
    "label": "온라인 등록 마감",
    "date": "2027-11-09",
    "status": "expected",
    "note": "추정치. 2025는 처음 09-01로 공지했다가 2025-09-11(대회 4일 전)에 마감. 현장등록 정보는 없음.",
    "source": "https://conference2025.vascog.org/registration/"
   },
   {
    "label": "호텔 예약 마감(공식 블록)",
    "date": null,
    "status": "tba",
    "note": "장소와 숙박 안내가 미공지. 2027년 11월 Singapore에서 ASEAN 정상회의(6일, 약 2,500명, 날짜 미정)가 예정되어 있어 숙박 수요 증가가 예상됨.",
    "source": "https://www.mfa.gov.sg/newsroom/announcements-and-highlights/invitation-for-proposals-for-sponsorship-of-food-and-drinks--furniture--audio-visual-equipment--event-tokens-and-medical-services-for-high-level-meetings-and-conferences-in-2027/"
   },
   {
    "label": "초청장(Invitation letter)",
    "date": null,
    "status": "tba",
    "note": "공지 없음. 한국 여권은 무비자라서 비자용으로는 필요 없음. 출장 결재에 필요하면 사무국에 요청.",
    "source": "https://conference2027.vascog.org/"
   },
   {
    "label": "프로그램 공개",
    "date": null,
    "status": "tba",
    "note": "2027 미공지. 2025는 대회 전 사이트에 프로그램 PDF를 게시함.",
    "source": "https://conference2025.vascog.org/programme-2/"
   },
   {
    "label": "SG Arrival Card 제출",
    "date": "2027-11-10",
    "status": "confirmed",
    "note": "규정은 확정: 도착일을 포함해 도착 3일 전부터만 제출할 수 있음. 날짜는 2027-11-12 도착을 가정한 제출 시작일.",
    "source": "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/sg-arrival-card"
   }
  ],
  "registration": {
   "fees": [
    {
     "category": "비회원 (2025 참고)",
     "early": "563",
     "regular": "598",
     "onsite": "미공지",
     "currency": "GBP (VAT 별도)"
    },
    {
     "category": "VasCog 회원 (2025 참고)",
     "early": "483",
     "regular": "517",
     "onsite": "미공지",
     "currency": "GBP (VAT 별도)"
    },
    {
     "category": "비회원 ECI (2025 참고)",
     "early": "360",
     "regular": "400",
     "onsite": "미공지",
     "currency": "GBP (VAT 별도)"
    },
    {
     "category": "회원 ECI (2025 참고)",
     "early": "320",
     "regular": "350",
     "onsite": "미공지",
     "currency": "GBP (VAT 별도)"
    }
   ],
   "basis": "이전 대회 기준(참고)",
   "notes": "2027 등록비는 미공지. Singapore 개최라 통화가 SGD 등으로 바뀔 수 있음. 2025 등록비에는 전 세션, 점심, 다과, 환영 리셉션, 학회 만찬이 포함됨. ECI는 MD·PhD 학생, 박사후연구원, 조교수. 회원가는 로그인 후 회원번호를 입력해야 적용되며 대회 기간까지 회원 자격이 유효해야 함. 연회비: 정회원 £60/1년, £110/2년, £150/3년, 학생 £40/1년. 참고로 2023 Gothenburg 등록비는 회원 SEK 4,500/5,500, 비회원 6,000/6,500, ECI 3,500/4,000.",
   "source": "https://web.archive.org/web/20250715193513/https://conference2025.vascog.org/registration/"
  },
  "submission": {
   "types": "구연 또는 포스터(일반 초록). 대회 직전에는 late-breaking 포스터만 받음(2025). 대회 주제 가운데 특정 심포지엄과 관련이 있어야 함.",
   "format": "최대 350단어, 구조: Introduction/Methods/Results/Conclusion. 그림 1개(2025: TIFF와 JPEG, 10MB 이하; 2023: PDF로 최대 3개). 영어. 온라인 포털로만 제출.",
   "review": "조직위가 수시 심사. 기준은 심포지엄 관련성, 과학적 내용·질·혁신성, 명료성. ECI는 신속 심사를 요청할 수 있었음(2025, eci@vascog.org).",
   "presentation": "2025 포스터 규격은 페이지 버전마다 달랐음(2025-07 게시본: 세로 90cm × 가로 80cm; 현재 페이지: A0 세로). 1·2일차 점심시간에 포스터 앞에서 대기. 2027 규격은 미공지.",
   "publication": "초록집 저널 게재는 확인 안 됨. 학회지 CCCB는 회원에게 게재료 할인을 제공.",
   "source": "https://conference2025.vascog.org/abstract-submission/"
  },
  "travel": {
   "entry": "한국 여권은 업무상 방문(회의 참석 포함)이나 관광 목적이면 최대 90일 무비자. 여권은 6개월 이상 남아 있어야 함. SG Arrival Card(전자 건강신고 포함)는 도착일 포함 3일 전부터 ICA e-Service나 MyICA 앱으로 무료 제출. 유료 대행 사이트에 주의.",
   "entry_source": "https://seoul.mfa.gov.sg/consular-services/visa-information/ ; https://www.ica.gov.sg/enter-transit-depart/entering-singapore ; https://www.ica.gov.sg/enter-transit-depart/entering-singapore/sg-arrival-card",
   "airport": "Singapore Changi Airport (SIN).",
   "transport": "MRT: Changi Airport(CG2)에서 Tanah Merah(EW4)로 가서 East West Line으로 환승하거나, Expo(CG1/DT35)에서 Downtown Line으로 환승. LTA가 Changi Airport–Tanah Merah 구간을 TEL로 전환하는 공사를 진행 중이라 운행 조정 일정은 출발 전에 확인. 해외 발급 Visa·Mastercard 비접촉 카드로 탑승할 수 있고(하루 S$0.60 수수료), SimplyGo EZ-Link 카드도 S$10에 구매 가능.",
   "hotels": "공식 숙박 안내는 미공지. 장소가 나오면 바로 근처 호텔을 무료 취소 조건으로 잡을 것. 2027년 11월 ASEAN 정상회의가 겹칠 수 있음.",
   "local": "11월은 몬순 전환기로 오후·초저녁 뇌우가 잦음(평균 강수 252mm, 강수일 19일, 최고 31°C·최저 25°C). 우산이 필수이고, 실내 냉방이 강해 겉옷을 챙길 것. 전원은 Type G, 230V라 어댑터가 필요함.",
   "source": "https://www.weather.gov.sg/climate-climate-of-singapore/ ; https://www.changiairport.com/en/at-changi/transport-and-directions/leaving-the-airport.html ; https://www.lta.gov.sg/content/ltagov/en/newsroom/2025/7/news-releases/TELe_and_CRL_changi_airport_to_city_centre.html ; https://simplygo.com.sg/faqs/cards-and-charms/simplygo/contactless-bank-cards/ ; https://sg.trip.com/guide/info/singapore-plugs.html"
  },
  "support": {
   "text": "2027 여행지원금 공고는 없음. 지난 대회에는 ECI Award(초록 제출 시 옵트인, 상위 3편 상금), ECI Master Class, ECI 독립 세션·소셜 이벤트가 있었음. VasCog ECI 네트워크(MD·PhD 학생, 박사후연구원, 조교수)는 연 2회 온라인 모임을 운영함(문의 vascogeci@gmail.com).",
   "source": "https://www.vascog.org/early-career-investigators/"
  },
  "tips": [
   "장소가 아직 미공지(포스터 배경 Marina Bay Sands는 확정 아님). conference2027.vascog.org를 주기적으로 확인하고, 호텔은 무료 취소 조건으로만 선예약할 것.",
   "등록 전에 VasCog 회원 가입·갱신: 2025 기준 회원 할인(약 £80)이 정회원 연회비(£60)보다 커서 이득이고, 대회 기간까지 회원 자격이 유효해야 할인이 적용됨.",
   "초록은 수시 심사이고 2023에는 대회 3개월 전에 마감됐으므로 2027년 상반기~여름에 미리 준비. 350단어 IMRaD, 그림 1개.",
   "초록은 특정 심포지엄과의 관련성이 심사 기준. 2025 주제(VCI 바이오마커, 신경영상, 역학·위험요인, 치료, AD 치료 중 혈관 문제·ARIA)에 맞춰 혈관성 인지·행동(우울 포함) 각도로 쓸 것.",
   "전공의·박사후연구원·조교수는 초록 제출 시 ECI Award 옵트인을 체크(상위 3편 상금). ECI 세션·소셜 행사로 네트워킹하기 좋음.",
   "발표자는 반드시 등록하고 등록비를 내야 함. 2025는 얼리버드와 late-breaking 마감이 모두 연장됐지만 연장을 기대하지 말 것.",
   "2027년 11월 Singapore에 ASEAN 정상회의(약 2,500명)가 예정돼 있어 숙박이 부족할 수 있음. 장소가 발표되면 즉시 예약.",
   "SG Arrival Card는 도착 3일 전부터만 제출되므로 출국 전날 전원 제출을 확인하고, 11월 오후 뇌우에 대비해 우산을 챙길 것."
  ],
  "sources": [
   {
    "title": "VasCog Society 홈 (VasCog 2027 Singapore 포스터)",
    "url": "https://www.vascog.org/"
   },
   {
    "title": "VasCog 2027 포스터 이미지 (2027-11-13~16, Singapore)",
    "url": "https://www.vascog.org/wp-content/uploads/2026/09/Poster-VasCog-2027.png"
   },
   {
    "title": "VasCog 2027 대회 사이트 (coming soon)",
    "url": "https://conference2027.vascog.org/"
   },
   {
    "title": "VasCog 2025 대회 사이트",
    "url": "https://conference2025.vascog.org/"
   },
   {
    "title": "VasCog 2025 초록 안내",
    "url": "https://conference2025.vascog.org/abstract-submission/"
   },
   {
    "title": "VasCog 2025 초록 안내 (2025-07 아카이브, 포스터 90×80cm)",
    "url": "https://web.archive.org/web/20250719052406/https://conference2025.vascog.org/abstract-submission/"
   },
   {
    "title": "VasCog 2025 등록 (2025-07 아카이브, 등록비)",
    "url": "https://web.archive.org/web/20250715193513/https://conference2025.vascog.org/registration/"
   },
   {
    "title": "VasCog 2025 등록 (현재 페이지, 마감 2025-08-01/09-11)",
    "url": "https://conference2025.vascog.org/registration/"
   },
   {
    "title": "VasCog 2025 홈 (2025-07 아카이브, 마감 연장 공지)",
    "url": "https://web.archive.org/web/20250715193522/https://conference2025.vascog.org/"
   },
   {
    "title": "VasCog 2023 초록 안내 (아카이브)",
    "url": "https://web.archive.org/web/20230326182845/https://conference2023.vascog.org/abstract-submission/"
   },
   {
    "title": "VasCog 2023 등록 (아카이브)",
    "url": "https://web.archive.org/web/20230326173333/https://conference2023.vascog.org/registration/"
   },
   {
    "title": "VasCog 회원 안내",
    "url": "https://www.vascog.org/membership/"
   },
   {
    "title": "VasCog Early Career Investigators",
    "url": "https://www.vascog.org/early-career-investigators/"
   },
   {
    "title": "VasCog About (격년 개최)",
    "url": "https://www.vascog.org/about-us/"
   },
   {
    "title": "VasCog 2025 하이라이트 (CCCB, 약 200명)",
    "url": "https://doi.org/10.1016/j.cccb.2025.100525"
   },
   {
    "title": "주한 싱가포르 대사관 비자 안내 (한국 여권 90일 무비자)",
    "url": "https://seoul.mfa.gov.sg/consular-services/visa-information/"
   },
   {
    "title": "ICA 입국 요건",
    "url": "https://www.ica.gov.sg/enter-transit-depart/entering-singapore"
   },
   {
    "title": "ICA SG Arrival Card",
    "url": "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/sg-arrival-card"
   },
   {
    "title": "MFA 2027 ASEAN 회의 일정 (2027-11 정상회의)",
    "url": "https://www.mfa.gov.sg/newsroom/announcements-and-highlights/invitation-for-proposals-for-sponsorship-of-food-and-drinks--furniture--audio-visual-equipment--event-tokens-and-medical-services-for-high-level-meetings-and-conferences-in-2027/"
   },
   {
    "title": "Meteorological Service Singapore 기후",
    "url": "https://www.weather.gov.sg/climate-climate-of-singapore/"
   },
   {
    "title": "Changi Airport 시내 이동",
    "url": "https://www.changiairport.com/en/at-changi/transport-and-directions/leaving-the-airport.html"
   },
   {
    "title": "LTA Changi Airport–Tanah Merah TEL 전환",
    "url": "https://www.lta.gov.sg/content/ltagov/en/newsroom/2025/7/news-releases/TELe_and_CRL_changi_airport_to_city_centre.html"
   },
   {
    "title": "SimplyGo 비접촉 은행카드 FAQ",
    "url": "https://simplygo.com.sg/faqs/cards-and-charms/simplygo/contactless-bank-cards/"
   },
   {
    "title": "Singapore 플러그 안내 (Type G, 230V; 비공식 여행 가이드)",
    "url": "https://sg.trip.com/guide/info/singapore-plugs.html"
   }
  ],
  "place": {
   "city": "싱가포르는 적도에서 북쪽으로 약 137km 떨어진 도시국가로, 2025년 추계 인구는 약 611만 명임. 공용어는 영어·말레이어·중국어(만다린)·타밀어 4개이며 국어는 말레이어임. 치매 연구 거점으로 NUS 의과대학(Yong Loo Lin)이 국립대학병원(NUH)과 협력 운영하는 Memory, Ageing and Cognition Centre(MACC)가 있으며, 2010년 이후 논문 561편과 예방 임상시험 SINGER를 수행 중임.",
   "city_source": [
    "https://en.wikipedia.org/wiki/Singapore",
    "https://www.macc.sg/"
   ],
   "climate": "연중 기온 25~33°C의 열대기후로, 가볍고 통풍이 잘되는 옷차림과 갑작스러운 비에 대비한 우산 지참이 권장됨. 표준시는 GMT+8(SGT)로 한국(UTC+9)보다 1시간 늦음.",
   "climate_source": "https://www.visitsingapore.com/travel-tips/essential-travel-information/",
   "safety": "건물·식당·교통 거점·대중교통 차량·체육시설 안은 금연이며, 흡연은 표지가 있는 지정 구역에서만 가능함. 전자담배는 구매·소지·사용 모두 불법으로 벌금(composition fine) 또는 기소 대상이며, 에토미데이트가 든 전자담배(K-pods)가 적발되면 입국 거부·재입국 금지가 될 수 있음. 껌과 전자담배는 반입 금지 품목임. 호커센터·푸드코트에서 쟁반·쓰레기를 테이블에 두고 가는 것도 위법이며, 팁은 관례가 아님.",
   "safety_source": [
    "https://www.visitsingapore.com/travel-tips/essential-travel-information/",
    "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/what-you-can-bring"
   ],
   "venue": "VasCog 2027 공식 사이트는 2026-10-22 기준 'coming soon' 상태이며 개최 장소는 발표되지 않음. 아래는 싱가포르의 대표적인 대형 컨벤션 시설을 소개하는 후보 참고 정보일 뿐, 개최 장소가 아님. Marina Bay Sands 안의 Sands Expo & Convention Centre(10 Bayfront Avenue)는 면적 약 11만~12만㎡(자료마다 다름)에 최대 4만 5천 명을 수용함. Suntec Singapore(마리나 센터)는 여러 층에 걸쳐 약 10만㎡ 규모이며 MRT Esplanade역·Promenade역과 가까움.",
   "venue_source": [
    "https://en.wikipedia.org/wiki/Marina_Bay_Sands",
    "https://en.wikipedia.org/wiki/Suntec_Singapore_Convention_and_Exhibition_Centre",
    "https://conference2027.vascog.org/"
   ],
   "nearby": "마리나베이 일대에는 슈퍼트리로 알려진 Gardens by the Bay, 공연장 Esplanade – Theatres on the Bay, Merlion Park가 모여 있음. 인근 시빅 디스트릭트에는 옛 대법원·시청 건물을 활용한 National Gallery Singapore, National Museum, Asian Civilisations Museum이 있음. 싱가포르 호커 문화는 2020년 유네스코 인류무형문화유산에 등재되었으며, 도심 호커센터로는 빅토리아 시대 건물인 Lau Pa Sat(야외 사테 거리 운영)과 Maxwell Food Centre가 있음.",
   "nearby_source": [
    "https://www.visitsingapore.com/travel-tips/travelling-to-singapore/itineraries/singapore-city-tour-guide/",
    "https://en.wikipedia.org/wiki/Civic_District",
    "https://en.wikipedia.org/wiki/Lau_Pa_Sat",
    "https://ich.unesco.org/en/RL/hawker-culture-in-singapore-community-dining-and-culinary-practices-in-a-multicultural-urban-context-01568"
   ]
  }
 }
};
