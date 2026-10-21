#!/usr/bin/env python3
"""research/<id>.json(학회별 공식 사이트 조사분) → details.js(const DETAILS).

조사 JSON 은 공개 정보만 담는다(학회 일정·등록비·규정·출입국 안내·출처). 팀원 정보는 DB 에만.
사용: python3 tools/build_details.py   → 바뀐 details.js 를 커밋하고 index.html 의 ?v= 를 올린다.
"""
import json, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
REQ = {"id", "checked", "overview", "deadlines"}
STATUS = {"confirmed", "expected", "tba"}

def check(d, name):
    miss = REQ - d.keys()
    if miss: sys.exit(f"{name}: 필수 키 없음 {sorted(miss)}")
    for x in d["deadlines"]:
        if x.get("status") not in STATUS: sys.exit(f"{name}: status 값 오류 {x}")
        if x.get("date") and not re.fullmatch(r"\d{4}-\d{2}-\d{2}", x["date"]): sys.exit(f"{name}: 날짜 형식 오류 {x}")

out = {}
for p in sorted((ROOT / "research").glob("*.json")):
    d = json.loads(p.read_text(encoding="utf-8"))
    check(d, p.name)
    out[d["id"]] = d
js = ("/* 학회별 상세 페이지 데이터 — tools/build_details.py 가 research/*.json 에서 만든다(직접 고치지 말 것).\n"
      "   각 학회 공식 사이트·정부 안내 조사분. 확인일은 항목별 checked. */\n"
      "const DETAILS = " + json.dumps(out, ensure_ascii=False, indent=1) + ";\n")
(ROOT / "details.js").write_text(js, encoding="utf-8")
print("details.js:", ", ".join(out) or "(비어 있음)")
