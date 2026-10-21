/* 2027 학회 플래너 — 독립 웹앱판.
   아티팩트판의 UI·로직을 그대로 유지하고, 저장소만 Supabase(매직링크 인증 + RLS)로 치환. */

/* ---------- supabase ---------- */
const SB_URL = "https://dktalgktntdlqclykhoz.supabase.co";
const SB_KEY = "sb_publishable_4Nhbi_UqgQYKb4D4zk0rZA_U4LzgWAr"; /* publishable key — 공개용, 데이터는 RLS로 보호 */
/* 다른 페이지 안(iframe, 예: CV 대시보드 탭)에 들어가면 Chrome 이 저장소를 따로 떼어 줘서 단독 창의
   로그인이 안 보인다. Storage Access API 로 단독 창과 같은 localStorage 를 얻어 로그인을 이어받는다
   (2026-10-18). 얻지 못하면 iframe 자체 저장소를 쓴다 — 예전과 같은 동작. */
const EMBEDDED = window.top !== window;
let sharedLS = null, saaFailed = false;
async function getSharedStorage(){
  try{
    const h=await document.requestStorageAccess({localStorage:true});
    if(h&&h.localStorage){sharedLS=h.localStorage;return true;}
  }catch(e){}
  return false;
}
const storageReady=(EMBEDDED&&document.requestStorageAccess)
  ? getSharedStorage().then(ok=>{saaFailed=!ok;})
  : Promise.resolve();
function authLS(){return sharedLS||localStorage;}
const authStorage={
  async getItem(k){await storageReady;try{return authLS().getItem(k);}catch(e){return null;}},
  async setItem(k,v){await storageReady;try{authLS().setItem(k,v);}catch(e){}},
  async removeItem(k){await storageReady;try{authLS().removeItem(k);}catch(e){}}
};
const sb = supabase.createClient(SB_URL, SB_KEY, {auth:{storage:authStorage}});

/* ---------- helpers ---------- */
const $=s=>document.querySelector(s);
function pd(s){const[y,m,d]=s.split("-").map(Number);return new Date(y,m-1,d);}
const today=new Date(); today.setHours(0,0,0,0);
const DAY=86400000;
function dday(s){return Math.round((pd(s)-today)/DAY);}
function doy(dt){return Math.round((dt-new Date(dt.getFullYear(),0,1))/DAY);}
function fmt(s){const d=pd(s);return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,"0")}.${String(d.getDate()).padStart(2,"0")}`;}
function fmtShort(s){if(!/^\d{4}-\d{2}-\d{2}$/.test(String(s||"")))return "";const d=pd(s);return `${d.getMonth()+1}/${d.getDate()}`;}
function esc(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}

/* stars (localStorage, per-browser convenience) */
let stars=new Set();
try{stars=new Set(JSON.parse(localStorage.getItem("conf2027-stars")||"[]"));}catch(e){}
function saveStars(){try{localStorage.setItem("conf2027-stars",JSON.stringify([...stars]));}catch(e){}}

/* ---------- deadline strip ---------- */
function buildStrip(){
  const items=[];
  CONFS.forEach(c=>c.dl.forEach(dl=>{if(dl.d){const n=dday(dl.d); if(n>=-7) items.push({c,dl,n});}}));
  items.sort((a,b)=>a.n-b.n);
  const host=$("#dlStrip"); host.innerHTML="";
  items.slice(0,8).forEach(({c,dl,n})=>{
    const isDl=dl.l.includes("마감");
    const el=document.createElement("div");
    el.dataset.id=c.id;
    el.className="dl-item"+(!isDl||n<0?"":n<=30?" crit":n<=90?" warn":"");
    el.innerHTML=`<span class="dday">${n<0?"마감됨":"D-"+n}</span><span class="who">${esc(c.acro)}</span>
      <span class="what">${esc(dl.l)}</span><span class="when mono">${fmt(dl.d)}</span>`;
    host.appendChild(el);
  });
}

/* ---------- timeline ---------- */
const MDAYS=[31,28,31,30,31,30,31,31,30,31,30,31];
function buildTimeline(list){
  const mh=$("#tlMonths"); mh.innerHTML="";
  MDAYS.forEach((d,i)=>{const s=document.createElement("span");s.style.width=(d/365*100)+"%";s.style.boxSizing="border-box";s.textContent=(i+1)+"월";mh.appendChild(s);});
  const host=$("#tlRows"); host.innerHTML="";
  const gl=document.createElement("div");gl.className="tl-gridlayer";
  let acc=0; MDAYS.forEach((d,i)=>{acc+=d; if(i<11){const ln=document.createElement("i");ln.style.left=(acc/365*100)+"%";gl.appendChild(ln);}});
  host.appendChild(gl);
  list.forEach(c=>{
    const row=document.createElement("div");row.className="tl-row";
    const l=doy(pd(c.start))/365*100, w=Math.max((doy(pd(c.end))-doy(pd(c.start))+1)/365*100,1.1);
    row.innerHTML=`<button class="tl-info" data-id="${c.id}" title="상세 팝업 열기">
        <span class="dot dot-${c.cat}"></span><span class="tacro">${esc(c.acro)}</span>
        <span class="tdate">${esc(c.dateKo)}</span>
        <span class="tcity">${c.flag} ${esc(c.city)}</span>
        <span class="ratt" data-id="${c.id}"></span></button>
      <div class="tl-track"><div class="tl-bar" style="left:${l}%;width:${w}%;background:var(--${c.cat})" data-id="${c.id}" tabindex="0" aria-label="${esc(c.acro)} ${esc(c.dateKo)} ${esc(c.city)}"></div></div>`;
    host.appendChild(row);
  });
  /* today marker (only if within 2027) */
  if(today.getFullYear()===2027){
    document.querySelectorAll(".tl-track").forEach(t=>{
      const m=document.createElement("div");m.className="tl-today";m.style.left=(doy(today)/365*100)+"%";t.appendChild(m);
    });
  }
  $("#tbaNote").innerHTML=`<span><b>일정 미발표:</b> CTAD(통상 10–12월) · CHIL(통상 6월 말) · ML4H(통상 12월 초)</span>
    <span><b>2027 개최 없음:</b> ISFTD · ADI · CINP (격년/취소 — 아래 참조)</span>`;
}

/* tooltip */
const tip=$("#tip");
document.addEventListener("mousemove",e=>{
  const b=e.target.closest?.(".tl-bar");
  if(b){const c=CONFS.find(x=>x.id===b.dataset.id);
    tip.innerHTML=`<b>${esc(c.acro)}</b>${esc(c.dateKo)} · ${esc(c.city)}, ${esc(c.country)}${c.venue?"<br>"+esc(c.venue):""}`;
    tip.style.display="block";
    tip.style.left=Math.min(e.clientX+14,innerWidth-280)+"px"; tip.style.top=(e.clientY+16)+"px";
  } else tip.style.display="none";
});

/* ---------- cards ---------- */
function dlRow(dl){
  let chip="";
  if(dl.d){const n=dday(dl.d); const isDl=dl.l.includes("마감");
    chip=n<0?`<span class="chip-d done">${isDl?"마감":"지남"}</span>`:`<span class="chip-d ${!isDl?"":n<=30?"crit":n<=90?"warn":""}">D-${n}</span>`;
    return `<div class="dlrow"><span class="l">${esc(dl.l)}</span><span class="d mono">${fmt(dl.d)}${dl.note?" "+esc(dl.note):""}</span>${chip}</div>`;
  }
  return `<div class="dlrow"><span class="l">${esc(dl.l)}</span><span class="d na">${esc(dl.note||"미공지")}</span></div>`;
}
function buildTbaList(){
  const host=$("#tbaList"); host.innerHTML="";
  TBA.forEach(t=>{
    const b=document.createElement("button");
    b.type="button"; b.className="lrow"; b.dataset.id=t.id;
    b.innerHTML=`<span class="dot dot-${t.cat}"></span><span class="racro">${esc(t.acro)}</span>
      <span class="rloc">${esc(t.txt.length>84?t.txt.slice(0,84)+"…":t.txt)}</span>
      <span class="ratt" data-id="${t.id}"></span>`;
    host.appendChild(b);
  });
}
function updateRowBadges(){
  document.querySelectorAll(".ratt[data-id]").forEach(el=>{
    const st=(ATT[el.dataset.id]||{}).status||"undecided";
    const n=(MEMBERS[el.dataset.id]||[]).length;
    el.className="ratt "+(st==="going"?"going":st==="skip"?"skip":"");
    el.textContent=st==="going"?("✓ 참가"+(n?` ${n}명`:"")):st==="skip"?"불참":"미정";
  });
}

/* ---------- 참가 학회 관리카드 (참가=going 이면 자동 생성, 2026-10-21) ----------
   학회 정보(data.js) + 주요 일정(학회 마감 + 팀원 출장·항공을 날짜순으로) + 참가자별 준비 현황.
   읽기 전용 요약이다 — 편집은 카드를 눌러 여는 상세 팝업에서 한다. */
function mcDay(n){return n<0?"지남":n===0?"오늘":"D-"+n;}
function mcEvents(c,mem){
  const ev=[];
  c.dl.forEach(dl=>ev.push({d:dl.d,l:dl.l+(dl.note&&dl.d?` (${dl.note})`:""),k:dl.l.includes("마감")?"dl":"info",na:dl.d?null:(dl.note||"미공지")}));
  ev.push({d:c.start,end:c.end,l:"학회 기간",k:"conf"});
  teamEvents(mem).forEach(g=>ev.push(g));
  const dated=ev.filter(e=>e.d).sort((a,b)=>a.d<b.d?-1:a.d>b.d?1:0), undated=ev.filter(e=>!e.d);
  return {dated,undated};
}
/* 팀원 출장·출국·귀국 — 같은 날짜·같은 일정은 참가자 이름을 모아 한 줄로 */
function teamEvents(mem){
  const grp={};
  const put=(d,l,k,name)=>{if(!d)return;const key=d+"|"+l;(grp[key]=grp[key]||{d,l,k,who:[]}).who.push(name);};
  mem.forEach(m=>{
    const nm=String(m.name||"");
    if(m.hospFrom&&m.hospTo){const key=m.hospFrom+"|출장|"+m.hospTo;(grp[key]=grp[key]||{d:m.hospFrom,end:m.hospTo,l:"출장 기간",k:"trip",who:[]}).who.push(nm);}
    put(m.outDate,"출국"+(m.outNo?" "+m.outNo:""),"fly",nm);
    put(m.retDate,"귀국"+(m.retNo?" "+m.retNo:""),"fly",nm);
  });
  return Object.values(grp);
}
function mcPrep(m){
  const reg=m.regStatus==="early"?["조기등록","on"]:m.regStatus==="regular"?["정규등록","on"]:["등록 전",""];
  const abs=m.title?[(m.ptype==="oral"?"구연":"포스터")+" 초록","on"]:["초록 없음",""];
  const items=[reg,abs,[m.hospFrom&&m.hospTo?"출장 "+fmtShort(m.hospFrom)+"–"+fmtShort(m.hospTo):"출장 미입력",m.hospFrom&&m.hospTo?"on":""],
    [flightText(m)?"항공 입력":"항공 미입력",flightText(m)?"on":""],[m.hotel?"숙소 입력":"숙소 미입력",m.hotel?"on":""]];
  const done=items.filter(x=>x[1]).length;
  return `<div class="mc-prow"><span class="pname">${esc(String(m.name||""))}</span><span class="mc-n mono">${done}/5</span>
    ${items.map(([t,on])=>`<span class="mc-tag${on?" on":""}">${esc(t)}</span>`).join("")}</div>`;
}
function buildMgmtCards(){
  const host=$("#mcards"); if(!host)return;
  if(!dbChecked){host.innerHTML='<p class="mc-empty">팀 공유 연결 중…</p>';return;}
  const ids=Object.keys(ATT).filter(id=>(ATT[id]||{}).status==="going");
  const confs=CONFS.filter(c=>ids.includes(c.id)).sort((a,b)=>pd(a.start)-pd(b.start));
  const tbas=TBA.filter(t=>ids.includes(t.id));
  const n=$("#tabCardsN"); if(n)n.textContent=(confs.length+tbas.length)||"";
  if(!confs.length&&!tbas.length){host.innerHTML='<p class="mc-empty">아직 참가로 체크한 학회가 없습니다 — ‘학회 플래너’ 탭에서 학회를 눌러 상세 팝업의 ‘참가’를 고르면 여기에 관리카드가 생깁니다.</p>';return;}
  let html="";
  confs.forEach(c=>{
    const mem=MEMBERS[c.id]||[];
    const {dated,undated}=mcEvents(c,mem);
    const next=dated.find(e=>dday(e.end||e.d)>=0&&e.k!=="info");
    const d0=dday(c.start), dEnd=dday(c.end);
    const rows=dated.map(e=>{
      const n=dday(e.d), past=dday(e.end||e.d)<0, isNext=e===next;
      const chip=past?`<span class="chip-d done">${e.k==="dl"?"마감":"지남"}</span>`
        :`<span class="chip-d ${e.k==="dl"?(n<=30?"crit":n<=90?"warn":""):""}">${n<0?"진행 중":mcDay(n)}</span>`;
      return `<div class="mc-ev k-${e.k}${past?" past":""}${isNext?" next":""}"><span class="d mono">${fmtShort(e.d)}${e.end&&e.end!==e.d?"–"+fmtShort(e.end):""}</span>
        <span class="l">${esc(e.l)}${e.who?` <span class="who">${esc(e.who.join(", "))}</span>`:""}</span>${chip}</div>`;
    }).join("")+undated.map(e=>`<div class="mc-ev na"><span class="d">미정</span><span class="l">${esc(e.l)} <span class="who">· ${esc(e.na)}</span></span></div>`).join("");
    html+=`<article class="mcard c-${c.cat}" data-id="${c.id}" tabindex="0" aria-label="${esc(c.acro)} 관리카드 — 눌러서 상세 페이지">
      <div class="mc-head"><div><div class="mc-acro">${esc(c.acro)}</div><div class="mc-full">${esc(c.full)}</div></div>
        <span class="mc-dday mono">${dEnd<0?"종료":d0<=0?"진행 중":"D-"+d0}</span></div>
      <div class="mc-facts">
        <span><b>${esc(c.dateKo)}</b>${c.hybrid?' <span class="hybrid">하이브리드</span>':""}</span>
        <span>${c.flag} ${esc(c.city)}, ${esc(c.country)}</span>
        <span class="venue">${c.venue?esc(c.venue):'<span class="no">베뉴 미공지</span>'}</span>
      </div>
      ${next?`<div class="mc-next">다음 할 일 · <b>${esc(next.l)}</b> ${fmt(next.d)} <span class="mono">${dday(next.d)<0?"진행 중":mcDay(dday(next.d))}</span></div>`:""}
      <div class="mc-sec"><span class="slabel">주요 일정</span>${rows}</div>
      <div class="mc-sec"><span class="slabel">준비 현황${mem.length?` · ${mem.length}명`:""}</span>
        ${mem.length?mem.map(mcPrep).join(""):'<div class="gmsg">참가자 미등록 — 카드를 눌러 ① 참가자를 추가하세요.</div>'}</div>
      <div class="mc-foot"><a class="linkbtn" href="${c.url}" target="_blank" rel="noopener">공식 사이트 ↗</a>
        <span class="statuspill ${c.status==="ok"?"ok":"part"}">${c.status==="ok"?"일정 확정":"일부 미정"}</span>
        <span class="mc-edit">상세 페이지 →</span></div>
    </article>`;
  });
  tbas.forEach(t=>{
    const mem=MEMBERS[t.id]||[];
    html+=`<article class="mcard c-${t.cat}" data-id="${t.id}" tabindex="0" aria-label="${esc(t.acro)} 관리카드 — 눌러서 상세 페이지">
      <div class="mc-head"><div><div class="mc-acro">${esc(t.acro)}</div><div class="mc-full">2027 일정 미발표</div></div>
        <span class="mc-dday mono">미정</span></div>
      <div class="mc-desc">${esc(t.txt)}</div>
      <div class="mc-sec"><span class="slabel">준비 현황${mem.length?` · ${mem.length}명`:""}</span>
        ${mem.length?mem.map(mcPrep).join(""):'<div class="gmsg">참가자 미등록 — 카드를 눌러 ① 참가자를 추가하세요.</div>'}</div>
      <div class="mc-foot"><a class="linkbtn" href="${t.url}" target="_blank" rel="noopener">공식 사이트 ↗</a><span class="mc-edit">상세 페이지 →</span></div>
    </article>`;
  });
  host.innerHTML=html;
}
$("#mcards").addEventListener("click",e=>{
  if(e.target.closest("a"))return;
  const card=e.target.closest(".mcard"); if(card)location.hash="cards/"+card.dataset.id;
});
$("#mcards").addEventListener("keydown",e=>{
  if(e.key!=="Enter"&&e.key!==" ")return;
  const card=e.target.closest(".mcard"); if(card&&e.target===card){e.preventDefault();location.hash="cards/"+card.dataset.id;}
});

/* ---------- 학회별 상세 페이지 (#cards/<id>, 2026-10-22) ----------
   details.js(공식 사이트 조사분: 준비 기한·등록비·발표 규정·도시·학회장 소개(place, v1.4.0)·출입국·교통·숙소·지원·팁·출처)
   + 팀원 일정(DB). 조사분이 없으면 data.js 기본 정보만 보여 준다. 편집은 기존 상세 팝업. */
let detailId=null;
const ST_LABEL={confirmed:["확정","ok"],expected:["예상","exp"],tba:["미공지","tba"]};
function safeUrl(u){return /^https?:\/\//.test(String(u||""))?esc(String(u)):null;}
function srcLink(u){if(Array.isArray(u))return u.map(srcLink).join("");const h=safeUrl(u);return h?` <a class="src" href="${h}" target="_blank" rel="noopener" title="출처">↗</a>`:"";}
function dsec(title,body,cls){return body?`<section class="d-sec${cls?" "+cls:""}"><h3>${title}</h3>${body}</section>`:"";}
function dtext(label,v,src){return v?`<div class="d-row"><span class="d-k">${label}</span><span class="d-v">${esc(String(v))}${srcLink(src)}</span></div>`:"";}
function buildDetail(id){
  const host=$("#cdetail"); if(!host)return;
  const c=CONFS.find(x=>x.id===id), t=TBA.find(x=>x.id===id), base=c||t;
  if(!base){host.innerHTML='<p class="mc-empty">학회를 찾지 못했습니다.</p>';return;}
  const D=(typeof DETAILS!=="undefined"&&DETAILS[id])||null, ov=(D&&D.overview)||{};
  const mem=MEMBERS[id]||[];
  const start=(ov.dates&&ov.dates.start)||(c&&c.start)||null, end=(ov.dates&&ov.dates.end)||(c&&c.end)||null;
  /* 일정표: 조사분 기한(없으면 data.js) + 학회 기간 + 팀원 일정 */
  const ev=[];
  const dls=D&&D.deadlines&&D.deadlines.length?D.deadlines.filter(x=>!(x.date&&x.date===start&&/학회 기간|본 학회/.test(x.label))).map(x=>({d:x.date||null,l:x.label,note:x.note,st:x.status,src:x.source,k:/마감|deadline/i.test(x.label)?"dl":"info"}))
    :(c?c.dl.map(dl=>({d:dl.d,l:dl.l,note:dl.note,st:dl.d?"confirmed":"tba",k:dl.l.includes("마감")?"dl":"info"})):[]);
  dls.forEach(x=>ev.push(x));
  if(start)ev.push({d:start,end:end,l:"학회 기간",k:"conf"});
  teamEvents(mem).forEach(g=>ev.push(g));
  const dated=ev.filter(e=>e.d).sort((a,b)=>a.d<b.d?-1:a.d>b.d?1:0), undated=ev.filter(e=>!e.d);
  const next=dated.find(e=>dday(e.end||e.d)>=0&&e.k!=="info");
  const rows=dated.map(e=>{
    const n=dday(e.d), past=dday(e.end||e.d)<0;
    const chip=past?`<span class="chip-d done">${e.k==="dl"?"마감":"지남"}</span>`
      :`<span class="chip-d ${e.k==="dl"?(n<=30?"crit":n<=90?"warn":""):""}">${n<0?"진행 중":mcDay(n)}</span>`;
    const st=e.st&&ST_LABEL[e.st]?`<span class="st st-${ST_LABEL[e.st][1]}">${ST_LABEL[e.st][0]}</span>`:"";
    return `<div class="mc-ev k-${e.k}${past?" past":""}${e===next?" next":""}"><span class="d mono">${fmt(e.d)}${e.end&&e.end!==e.d?"–"+fmtShort(e.end):""}</span>
      <span class="l">${esc(String(e.l))}${st}${e.who?` <span class="who">${esc(e.who.join(", "))}</span>`:""}${srcLink(e.src)}${e.note?`<span class="note">${esc(String(e.note))}</span>`:""}</span>${chip}</div>`;
  }).join("")+undated.map(e=>`<div class="mc-ev na"><span class="d">미정</span><span class="l">${esc(String(e.l))}${(()=>{const L=ST_LABEL[e.st]||ST_LABEL.tba;return `<span class="st st-${L[1]}">${L[0]}</span>`;})()}${srcLink(e.src)}${e.note&&e.note!=="미공지"?`<span class="note">${esc(String(e.note))}</span>`:""}</span></div>`).join("");
  /* 등록비 */
  let fees="";
  const R=D&&D.registration;
  if(R&&R.fees&&R.fees.length){
    const cur=[...new Set(R.fees.map(f=>f.currency).filter(Boolean))].join("/");
    fees=`<div class="d-basis">${esc(String(R.basis||""))}${cur?" · 통화 "+esc(String(cur)):""}${srcLink(R.source)}</div><div class="tbl-wrap"><table class="d-tbl"><thead><tr><th>구분</th><th>조기</th><th>정규</th><th>현장</th></tr></thead><tbody>`+
      R.fees.map(f=>`<tr><td>${esc(String(f.category||""))}</td><td>${esc(String(f.early||"–"))}</td><td>${esc(String(f.regular||"–"))}</td><td>${esc(String(f.onsite||"–"))}</td></tr>`).join("")+
      `</tbody></table></div>${R.notes?`<p class="d-p">${esc(String(R.notes))}</p>`:""}`;
  } else if(R&&R.notes){fees=`<p class="d-p">${esc(String(R.notes))}${srcLink(R.source)}</p>`;}
  const S=(D&&D.submission)||{}, T=(D&&D.travel)||{}, P=(D&&D.support)||{};
  const sub=[dtext("유형",S.types,S.source),dtext("형식",S.format),dtext("심사",S.review),dtext("발표",S.presentation),dtext("출판",S.publication)].join("");
  const L=(D&&D.place)||{};
  const plc=[dtext("도시",L.city,L.city_source),dtext("날씨",L.climate,L.climate_source),dtext("생활 수칙",L.safety,L.safety_source),
    dtext("학회장",L.venue,L.venue_source),dtext("부속 장소",L.venue2,L.venue2_source),dtext("주변",L.nearby,L.nearby_source)].join("");
  const trv=[dtext("입국",T.entry,T.entry_source),dtext("공항",T.airport),dtext("교통",T.transport),dtext("숙소",T.hotels),dtext("현지",T.local,T.source)].join("");
  const tips=D&&D.tips&&D.tips.length?`<ul class="d-list">${D.tips.map(x=>`<li>${esc(String(x))}</li>`).join("")}</ul>`:"";
  const srcs=D&&D.sources&&D.sources.length?`<ul class="d-list d-srcs">${D.sources.filter(x=>safeUrl(x.url)).map(x=>`<li><a href="${safeUrl(x.url)}" target="_blank" rel="noopener">${esc(String(x.title||x.url))} ↗</a></li>`).join("")}</ul>`:"";
  const d0=start?dday(start):null, dEnd=end?dday(end):null;
  const facts=[
    `<span><b>${start?fmt(start)+(end&&end!==start?"–"+fmtShort(end):""):"일정 미공지"}</b></span>`,
    `<span>${c?c.flag+" ":""}${esc(String(ov.city||(c&&c.city)||""))}${(ov.country||(c&&c.country))?", "+esc(String(ov.country||c.country)):""}</span>`,
    `<span class="venue">${esc(String(ov.venue||(c&&c.venue)||"베뉴 미공지"))}</span>`].join("");
  const ovRows=[dtext("주소",ov.address),dtext("형식",ov.format),dtext("주최",ov.organizer),dtext("규모",ov.scale),dtext("프로시딩",ov.proceedings),dtext("참고",ov.note)].join("");
  host.innerHTML=`
    <div class="d-top"><button type="button" class="d-back">← 관리카드 목록</button>
      ${D?`<span class="d-checked">공식 사이트 확인 ${esc(String(D.checked||""))}</span>`:'<span class="d-checked warn">공식 사이트 상세 조사 전 — 기본 정보만 표시</span>'}</div>
    <div class="d-head c-${base.cat}">
      <div class="d-titles"><div class="d-acro">${esc(base.acro)}</div><div class="d-full">${esc(String(ov.name||(c&&c.full)||""))}</div>
        <div class="mc-facts">${facts}</div></div>
      <span class="mc-dday mono">${d0===null?"미정":dEnd<0?"종료":d0<=0?"진행 중":"D-"+d0}</span>
    </div>
    <div class="d-actions"><a class="linkbtn primary" href="${safeUrl(base.url)||"#"}" target="_blank" rel="noopener">공식 사이트 ↗</a>
      <button type="button" class="linkbtn d-edit">참가 정보 편집 (참가자·등록·초록·출장·항공·숙소)</button></div>
    ${next?`<div class="mc-next">다음 할 일 · <b>${esc(String(next.l))}</b> ${fmt(next.d)} <span class="mono">${dday(next.d)<0?"진행 중":mcDay(dday(next.d))}</span></div>`:""}
    <div class="d-grid">
      ${dsec("준비 일정 <small>확정 · 예상(전년 기준) · 미공지</small>",rows||'<div class="gmsg">일정 정보 없음</div>',"wide")}
      ${dsec("팀 준비 현황"+(mem.length?` <small>${mem.length}명</small>`:""),mem.length?mem.map(mcPrep).join(""):'<div class="gmsg">참가자 미등록 — ‘참가 정보 편집’에서 ① 참가자를 추가하세요.</div>')}
      ${dsec("학회 개요",ovRows||(c?`<p class="d-p">${esc(c.scale)}</p>`:t?`<p class="d-p">${esc(t.txt)}</p>`:""))}
      ${dsec("도시 · 학회장 소개",plc,"wide")}
      ${dsec("등록비",fees)}
      ${dsec("초록 · 발표",sub)}
      ${dsec("출입국 · 교통 · 숙소",trv)}
      ${dsec("지원 · 수상",P.text?`<p class="d-p">${esc(String(P.text))}${srcLink(P.source)}</p>`:"")}
      ${dsec("참석 팁",tips)}
      ${dsec("출처",srcs,"wide")}
    </div>`;
}
$("#cdetail").addEventListener("click",e=>{
  if(e.target.closest(".d-back")){location.hash="cards";return;}
  if(e.target.closest(".d-edit")&&detailId){openModal(detailId);}
});

/* ---------- 탭: 학회 플래너 · 관리카드 (2026-10-21) ----------
   주소 #cards / #plan 으로 바로 열 수 있고, 마지막 탭은 이 브라우저에 기억한다. */
const TABS=["plan","cards"];
function showTab(h,remember){
  let [t,sub]=String(h||"").split("/");
  if(!TABS.includes(t)){t="plan";sub=null;}
  detailId=t==="cards"&&sub?decodeURIComponent(sub):null;
  $("#mcards").hidden=!!detailId; $("#cdetail").hidden=!detailId; $("#cardsSub").hidden=!!detailId;
  if(detailId){buildDetail(detailId);window.scrollTo(0,0);}
  TABS.forEach(x=>{
    $("#tab-"+x).hidden=x!==t;
    const b=$("#tabBtn-"+x); b.setAttribute("aria-selected",String(x===t)); b.tabIndex=x===t?0:-1;
  });
  if(remember){
    try{localStorage.setItem("conf2027-tab",t);}catch(e){}
    try{history.replaceState(null,"","#"+t);}catch(e){}
  }
}
document.querySelector(".tabs").addEventListener("click",e=>{
  const b=e.target.closest(".tab"); if(b)showTab(b.dataset.tab,true);
});
document.querySelector(".tabs").addEventListener("keydown",e=>{
  if(e.key!=="ArrowLeft"&&e.key!=="ArrowRight")return;
  const cur=TABS.indexOf(document.querySelector('.tab[aria-selected="true"]').dataset.tab);
  const nx=TABS[(cur+(e.key==="ArrowRight"?1:TABS.length-1))%TABS.length];
  showTab(nx,true); $("#tabBtn-"+nx).focus(); e.preventDefault();
});
window.addEventListener("hashchange",()=>showTab(location.hash.slice(1)));
/* 첫 화면 탭은 파일 맨 끝에서 고른다 — 상세 페이지가 ATT·MEMBERS(아래에서 선언)를 쓰므로 */

/* ---------- detail modal ---------- */
function openModal(id){
  const c=CONFS.find(x=>x.id===id), t=TBA.find(x=>x.id===id);
  if(!c&&!t)return;
  const wrap=$("#mWrap");
  wrap.className="m-wrap c-"+(c||t).cat;
  if(c){
    const d0=dday(c.start);
    wrap.innerHTML=`
      <div class="m-head">
        <div><div class="m-acro" id="mAcro">${esc(c.acro)}</div><div class="m-full">${esc(c.full)}</div></div>
        <button class="star" aria-pressed="${stars.has(c.id)}" aria-label="관심 표시" data-id="${c.id}">${stars.has(c.id)?"★":"☆"}</button>
        <button class="m-close" aria-label="닫기">✕</button>
      </div>
      <div class="m-body">
        <div class="m-grid">
          <div class="m-sec"><span class="slabel">일정 · 장소</span>
            <div class="fact"><span class="fl">일정</span><span><b>${esc(c.dateKo)}</b> <span class="mono" style="color:var(--muted);font-size:12px">${d0>=0?"D-"+d0:"종료"}</span>${c.hybrid?' <span class="hybrid">하이브리드</span>':""}</span></div>
            <div class="fact"><span class="fl">도시</span><span>${c.flag} ${esc(c.city)}, ${esc(c.country)}</span></div>
            <div class="fact"><span class="fl">베뉴</span><span>${c.venue?esc(c.venue):'<span style="color:var(--muted)">미공지</span>'}</span></div>
          </div>
          <div class="m-sec"><span class="slabel">주요 일정</span><div class="dls">${c.dl.map(dlRow).join("")}</div></div>
        </div>
        <div class="m-desc">${esc(c.scale)}</div>
        <div class="team" data-conf="${c.id}"><span class="conn">팀 공유 연결 중…</span></div>
      </div>
      <div class="m-foot">
        <a class="linkbtn primary" href="${c.url}" target="_blank" rel="noopener">공식 사이트 ↗</a>
        <span class="statuspill ${c.status==="ok"?"ok":"part"}">${c.status==="ok"?"일정 확정":"일부 미정"}</span>
        <button class="m-close" style="margin-left:auto;width:auto;padding:0 14px;">닫기</button>
      </div>`;
  } else {
    wrap.innerHTML=`
      <div class="m-head">
        <div><div class="m-acro" id="mAcro">${esc(t.acro)}</div><div class="m-full">2027년 개최 없음 · 일정 미발표</div></div>
        <button class="m-close" aria-label="닫기">✕</button>
      </div>
      <div class="m-body">
        <div class="m-desc">${esc(t.txt)}</div>
        <div class="team" data-conf="${t.id}"><span class="conn">팀 공유 연결 중…</span></div>
      </div>
      <div class="m-foot">
        <a class="linkbtn primary" href="${t.url}" target="_blank" rel="noopener">공식 사이트 ↗</a>
        <button class="m-close" style="margin-left:auto;width:auto;padding:0 14px;">닫기</button>
      </div>`;
  }
  const team=wrap.querySelector(".team"); if(team)renderTeamBlock(team);
  const dlg=$("#modal");
  if(!dlg.open)dlg.showModal();
  const body=wrap.querySelector(".m-body"); if(body)body.scrollTop=0;
}
$("#tbaList").addEventListener("click",e=>{const r=e.target.closest(".lrow");if(r)openModal(r.dataset.id);});
$("#dlStrip").addEventListener("click",e=>{const it=e.target.closest(".dl-item");if(it&&it.dataset.id)openModal(it.dataset.id);});

/* ---------- filters ---------- */
let cat="all", starOnly=false, goingOnly=false, q="";
function apply(){
  const list=CONFS.filter(c=>{
    if(cat!=="all"&&c.cat!==cat)return false;
    if(starOnly&&!stars.has(c.id))return false;
    if(goingOnly&&(ATT[c.id]||{}).status!=="going")return false;
    if(q){const hay=(c.acro+" "+c.full+" "+c.city+" "+c.country+" "+(c.venue||"")+" "+c.scale).toLowerCase();
      if(!hay.includes(q))return false;}
    return true;
  }).sort((a,b)=>pd(a.start)-pd(b.start));
  buildTimeline(list);
  $("#empty").style.display=list.length?"none":"block";
  refreshTeamUI();
}
document.querySelectorAll(".chip[data-cat]").forEach(b=>b.addEventListener("click",()=>{
  cat=b.dataset.cat;
  document.querySelectorAll(".chip[data-cat]").forEach(x=>x.setAttribute("aria-pressed",x===b?"true":"false"));
  apply();
}));
$("#starFilter").addEventListener("click",()=>{
  starOnly=!starOnly;$("#starFilter").setAttribute("aria-pressed",String(starOnly));apply();
});
$("#goingFilter").addEventListener("click",()=>{
  goingOnly=!goingOnly;$("#goingFilter").setAttribute("aria-pressed",String(goingOnly));apply();
});
document.querySelector(".tl-scroll").addEventListener("click",e=>{
  const t=e.target.closest("[data-id]"); if(t) openModal(t.dataset.id);
});

/* ---------- search suggestions ---------- */
const qEl=$("#q"), sg=$("#suggest");
let sgItems=[], sgIdx=-1;
function hayConf(c){return (c.acro+" "+c.full+" "+c.city+" "+c.country+" "+(c.venue||"")+" "+c.scale).toLowerCase();}
function renderSg(){
  if(!sgItems.length){sg.hidden=true;qEl.setAttribute("aria-expanded","false");return;}
  sg.innerHTML=sgItems.map((it,i)=>`<div class="sg-item${i===sgIdx?" active":""}" role="option" aria-selected="${i===sgIdx}" data-i="${i}">
    <b>${esc(it.acro)}</b><span class="m">${esc(it.m)}</span>${it.tag?`<span class="sg-tag">${it.tag}</span>`:""}</div>`).join("");
  sg.hidden=false; qEl.setAttribute("aria-expanded","true");
}
function buildSg(term){
  sgIdx=-1; sgItems=[];
  if(term){
    CONFS.filter(c=>hayConf(c).includes(term)).forEach(c=>sgItems.push({acro:c.acro,m:c.dateKo+" · "+c.city,id:c.id,conf:true}));
    TBA.filter(t=>(t.acro+" "+t.txt).toLowerCase().includes(term)).forEach(t=>sgItems.push({acro:t.acro,m:t.txt.slice(0,26)+"…",id:t.id,conf:false,tag:"미발표·미개최"}));
    sgItems=sgItems.slice(0,8);
  }
  renderSg();
}
function pickSg(i){
  const it=sgItems[i]; if(!it)return;
  sg.hidden=true; qEl.setAttribute("aria-expanded","false");
  if(it.conf){qEl.value=it.acro; q=it.acro.toLowerCase(); apply();}
  openModal(it.id);
}
qEl.addEventListener("input",e=>{
  q=e.target.value.trim().toLowerCase(); apply(); buildSg(q);
});
qEl.addEventListener("keydown",e=>{
  if(sg.hidden)return;
  if(e.key==="ArrowDown"){e.preventDefault();sgIdx=Math.min(sgIdx+1,sgItems.length-1);renderSg();}
  else if(e.key==="ArrowUp"){e.preventDefault();sgIdx=Math.max(sgIdx-1,0);renderSg();}
  else if(e.key==="Enter"&&sgIdx>=0){e.preventDefault();pickSg(sgIdx);}
  else if(e.key==="Escape"){sg.hidden=true;qEl.setAttribute("aria-expanded","false");}
});
sg.addEventListener("mousedown",e=>{
  const it=e.target.closest(".sg-item"); if(it){e.preventDefault();pickSg(+it.dataset.i);}
});
document.addEventListener("click",e=>{
  if(!e.target.closest(".searchwrap")){sg.hidden=true;qEl.setAttribute("aria-expanded","false");}
});
$("#modal").addEventListener("close",()=>{ if(goingOnly||starOnly)apply(); });

/* ---------- storage adapter (Supabase ← 구 artifact db와 동일한 API 형태) ---------- */
const SB_TABLES={attendance:{table:"conf_attendance",pk:"conf_id"},members:{table:"conf_members",pk:"id"}};
const M2DB={regStatus:"reg_status",hospFrom:"hosp_from",hospTo:"hosp_to",outNo:"out_no",outDate:"out_date",outTime:"out_time",retNo:"ret_no",retDate:"ret_date",retTime:"ret_time",createdAt:"created_at",updatedAt:"updated_at"};
const DB2M={}; for(const k in M2DB)DB2M[M2DB[k]]=k;
const toDb=o=>{const r={};for(const k in o)r[M2DB[k]||k]=o[k];return r;};
const toJs=o=>{const r={};for(const k in o)r[DB2M[k]||k]=o[k];return r;};
const sbListeners={attendance:[],members:[]};

async function sbFetchAll(col){
  const t=SB_TABLES[col];
  let qr=sb.from(t.table).select("*");
  if(col==="members")qr=qr.order("created_at",{ascending:true,nullsFirst:true});
  const {data,error}=await qr;
  if(error)throw error;
  return (data||[]).map(row=>{
    const id=row[t.pk];
    const d=toJs(row); delete d[t.pk]; delete d[DB2M[t.pk]];
    return {id, exists:true, data:()=>d};
  });
}
async function storeRefresh(col){
  let docs;
  try{docs=await sbFetchAll(col);}catch(e){return;}
  const snap={docs};
  sbListeners[col].forEach(cb=>{try{cb(snap);}catch(e){}});
}
const storeAPI={
  doc(path){
    const [col,id]=path.split("/");
    const t=SB_TABLES[col];
    return {
      async set(data){
        const row=toDb(data); row[t.pk]=id;
        const {error}=await sb.from(t.table).upsert(row);
        if(error)throw error;
        storeRefresh(col);
      },
      async update(data){
        const {error}=await sb.from(t.table).update(toDb(data)).eq(t.pk,id);
        if(error)throw error;
        storeRefresh(col);
      },
      async delete(){
        const {error}=await sb.from(t.table).delete().eq(t.pk,id);
        if(error)throw error;
        storeRefresh(col);
      }
    };
  },
  collection(col){
    const c={
      async add(data){
        const {error}=await sb.from(SB_TABLES[col].table).insert(toDb(data));
        if(error)throw error;
        storeRefresh(col);
      },
      orderBy(){return c;} , /* members는 sbFetchAll에서 항상 createdAt 순 정렬 */
      onSnapshot(cb){sbListeners[col].push(cb);storeRefresh(col);}
    };
    return c;
  }
};

/* ---------- team sharing ---------- */
let dbNS=null, dbChecked=false, ATT={}, MEMBERS={};
const EMAIL_RE=/^\S+@\S+\.\S+$/;

function findMember(mid){
  for(const k in MEMBERS){const m=MEMBERS[k].find(x=>x.id===mid); if(m)return m;}
  return null;
}
function refreshTeamUI(){
  const el=document.querySelector("#modal .team[data-conf]");
  if(el&&!el.classList.contains("editing"))renderTeamBlock(el);
  updateRowBadges();
  buildMgmtCards();
  if(detailId)buildDetail(detailId);
}
const REG_OPTS=[["","미등록"],["early","조기등록 완료"],["regular","정규등록 완료"]];
const SEC_EMPTY='<div class="gmsg">① 참가자 섹션에서 먼저 추가하세요.</div>';
function pname(m){return `<span class="pname">${esc(String(m.name||""))}</span>`;}
function flightText(m){
  const legF=[m.outNo,m.outDate?fmtShort(m.outDate):null,m.outTime].filter(Boolean).map(x=>esc(String(x))).join(" ");
  const legR=[m.retNo,m.retDate?fmtShort(m.retDate):null,m.retTime].filter(Boolean).map(x=>esc(String(x))).join(" ");
  return (legF||legR)?`${legF}${legR?(legF?" → ":"귀국 ")+legR:""}`:"";
}
function renderTeamBlock(el){
  const conf=el.dataset.conf;
  if(!dbChecked){el.innerHTML='<span class="conn">팀 공유 연결 중…</span>';return;}
  if(!dbNS){el.innerHTML="";return;}
  const st=(ATT[conf]||{}).status||"undecided";
  const mem=MEMBERS[conf]||[];
  const cinfo=CONFS.find(x=>x.id===conf)||TBA.find(x=>x.id===conf)||{};
  const city=cinfo.city||"";
  let html=`<div class="attend"><span class="alabel">참가 여부</span><div class="seg" role="group" aria-label="참가 여부">
    <button type="button" data-a="going" class="${st==="going"?"on":""}">${st==="going"?"✓ ":""}참가</button>
    <button type="button" data-a="undecided" class="${st==="undecided"?"on":""}">미정</button>
    <button type="button" data-a="skip" class="${st==="skip"?"on":""}">불참</button>
  </div></div>`;
  if(st==="going"){
    /* ① 참가자 — 명단 관리 */
    html+=`<div class="m-sec sec-mem"><span class="slabel">① 참가자${mem.length?` · ${mem.length}명`:""}</span>`;
    mem.forEach(m=>{
      html+=`<div class="prow" data-m="${m.id}">${pname(m)}<span class="pval memail mono">${esc(String(m.email||""))}</span>
        <button type="button" class="mx" title="명단에서 제거">×</button></div>`;
    });
    html+=`<form class="addf" autocomplete="off">
      <input name="mname" placeholder="이름" required>
      <input name="memail" type="email" placeholder="이메일" required>
      <button type="submit">참가자 추가</button><span class="ferr"></span><span class="fhint"></span>
    </form></div>`;
    /* ② 참가신청 — 학회 등록 상태 + 초록 */
    html+=`<div class="m-sec sec-reg"><span class="slabel">② 참가신청 — 학회 등록 · 초록</span>`;
    if(!mem.length)html+=SEC_EMPTY;
    mem.forEach(m=>{
      const rv=m.regStatus==="early"?"early":m.regStatus==="regular"?"regular":"";
      html+=`<div class="prow" data-m="${m.id}">${pname(m)}
        <select class="regsel${rv?" "+rv:""}" data-m="${m.id}" aria-label="${esc(String(m.name||""))} 학회 등록 상태">
          ${REG_OPTS.map(([v,l])=>`<option value="${v}"${rv===v?" selected":""}>${l}</option>`).join("")}
        </select>
        <span class="pval${m.title?"":" none"}">${m.title?`<span class="ptag ${m.ptype==="oral"?"oral":"poster"}">${m.ptype==="oral"?"구연":"포스터"}</span>${esc(String(m.title))}`:"초록 미등록"}</span>
        <button type="button" class="ebtn" data-act="abs" data-m="${m.id}">초록 ${m.title?"수정":"등록"}</button>
      </div>`;
    });
    html+=`</div>`;
    /* ③ 출장신청 — 병원 참가신청 기간 */
    html+=`<div class="m-sec sec-hosp"><span class="slabel">③ 출장신청 — 병원 참가신청 기간</span>`;
    if(!mem.length)html+=SEC_EMPTY;
    mem.forEach(m=>{
      const hosp=m.hospFrom&&m.hospTo, part=(m.hospFrom||m.hospTo)&&!hosp;
      const val=hosp?`<span class="tv on">${fmtShort(m.hospFrom)}–${fmtShort(m.hospTo)}</span>`
        :part?`<span class="tv">${m.hospFrom?fmtShort(m.hospFrom):"?"}–${m.hospTo?fmtShort(m.hospTo):"?"} · 시작·종료 모두 입력 필요</span>`
        :`<span class="tv">미입력</span>`;
      html+=`<div class="prow" data-m="${m.id}">${pname(m)}<span class="pval">${val}</span>
        <button type="button" class="ebtn" data-act="hosp" data-m="${m.id}">기간 ${(hosp||part)?"수정":"입력"}</button></div>`;
    });
    html+=`</div>`;
    /* ④ 항공 */
    html+=`<div class="m-sec sec-flight"><span class="slabel">④ 항공 — 출국 · 귀국편</span>`;
    if(!mem.length)html+=SEC_EMPTY;
    mem.forEach(m=>{
      const ft=flightText(m);
      html+=`<div class="prow" data-m="${m.id}">${pname(m)}<span class="pval">${ft?`<span class="tv on">${ft}</span>`:`<span class="tv">미입력</span>`}</span>
        <button type="button" class="ebtn" data-act="flight" data-m="${m.id}">항공편 ${ft?"수정":"입력"}</button></div>`;
    });
    html+=`</div>`;
    /* ⑤ 숙소 */
    html+=`<div class="m-sec sec-hotel"><span class="slabel">⑤ 숙소</span>`;
    if(!mem.length)html+=SEC_EMPTY;
    mem.forEach(m=>{
      const mapsHref=m.hotel?mapsUrl(String(m.hotel)+(city?" "+city:"")):null;
      const val=m.hotel?`<a class="tv on" href="${esc(mapsHref)}" target="_blank" rel="noopener" title="구글맵에서 보기">${esc(String(m.hotel))} ↗</a>`
        :`<span class="tv">미입력</span>`;
      html+=`<div class="prow" data-m="${m.id}">${pname(m)}<span class="pval">${val}</span>
        <button type="button" class="ebtn" data-act="hotel" data-m="${m.id}">숙소 ${m.hotel?"수정":"입력"}</button></div>`;
    });
    html+=`</div>`;
  } else if(st==="skip"){
    html+=`<div class="skipnote">불참으로 결정됨</div>`;
  }
  el.innerHTML=html;
}
function setStatus(conf,a){
  if(!dbNS)return;
  ATT[conf]=Object.assign({},ATT[conf],{status:a});
  refreshTeamUI(); if(goingOnly)apply();
  dbNS.doc("attendance/"+conf).set({status:a,updatedAt:Date.now()}).catch(()=>{});
}
function addMember(f){
  if(!dbNS)return;
  const team=f.closest(".team"), conf=team.dataset.conf, err=f.querySelector(".ferr");
  const name=f.elements.mname.value.trim(), email=f.elements.memail.value.trim();
  if(!name||!EMAIL_RE.test(email)){err.textContent="이름과 올바른 이메일을 입력하세요.";return;}
  if((MEMBERS[conf]||[]).some(m=>String(m.email).toLowerCase()===email.toLowerCase())){
    err.textContent="이미 등록된 이메일입니다.";return;}
  err.textContent="";
  dbNS.collection("members").add({conf,name,email,title:null,ptype:null,createdAt:Date.now()})
    .then(()=>{f.reset();team.classList.remove("editing");})
    .catch(()=>{err.textContent="저장 실패 — 잠시 후 다시 시도하세요.";});
}
function mapsUrl(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q);}
const SEC_OF_ACT={abs:"sec-reg",hosp:"sec-hosp",flight:"sec-flight",hotel:"sec-hotel"};
function openEditForm(btn){
  const team=btn.closest(".team"), act=btn.dataset.act, mid=btn.dataset.m, m=findMember(mid);
  if(!m||!SEC_OF_ACT[act])return;
  const row=team.querySelector(`.${SEC_OF_ACT[act]} .prow[data-m="${mid}"]`);
  if(!row)return;
  team.classList.add("editing");
  const conf=team.dataset.conf;
  const cinfo=CONFS.find(x=>x.id===conf)||TBA.find(x=>x.id===conf)||{};
  const city=cinfo.city||"";
  let fhtml="";
  if(act==="abs"){
    fhtml=`<form class="editf absf" data-m="${mid}" autocomplete="off">
      <input name="vemail" type="email" placeholder="본인 이메일 (확인용)" required>
      <input name="atitle" type="text" placeholder="발표 초록 제목" value="${esc(String(m.title||""))}" required>
      <label><input type="radio" name="ptype" value="oral" ${m.ptype!=="poster"?"checked":""}>구연</label>
      <label><input type="radio" name="ptype" value="poster" ${m.ptype==="poster"?"checked":""}>포스터</label>
      <button type="submit">저장</button><button type="button" class="cancel">취소</button>
      <span class="ferr"></span></form>`;
  } else if(act==="hosp"){
    fhtml=`<form class="editf hospf" data-m="${mid}" autocomplete="off">
      <span class="tl2">병원 참가신청 기간 — 시작일 · 종료일</span>
      <input type="date" name="hospFrom" value="${esc(String(m.hospFrom||""))}">
      <input type="date" name="hospTo" value="${esc(String(m.hospTo||""))}">
      <button type="submit">저장</button><button type="button" class="cancel">취소</button>
      <span class="ferr"></span></form>`;
  } else if(act==="flight"){
    fhtml=`<form class="editf flyf" data-m="${mid}" autocomplete="off">
      <span class="tl2">출국편 — 편명 · 날짜 · 시각/구간</span>
      <input type="text" name="outNo" placeholder="KE907" value="${esc(String(m.outNo||""))}">
      <input type="date" name="outDate" value="${esc(String(m.outDate||""))}">
      <input type="text" name="outTime" placeholder="10:20 ICN→AMS" value="${esc(String(m.outTime||""))}">
      <span class="tl2">귀국편</span>
      <input type="text" name="retNo" placeholder="KE908" value="${esc(String(m.retNo||""))}">
      <input type="date" name="retDate" value="${esc(String(m.retDate||""))}">
      <input type="text" name="retTime" placeholder="12:55 AMS→ICN" value="${esc(String(m.retTime||""))}">
      <span class="tl2">저장 시 ③ 출장신청 기간이 비어 있으면 출국·귀국일로 자동 입력됩니다</span>
      <button type="submit">저장</button><button type="button" class="cancel">취소</button>
      <span class="ferr"></span><span class="fhint"></span></form>`;
  } else if(act==="hotel"){
    const mapQ=m.hotel?String(m.hotel)+(city?" "+city:""):(city?city+" 호텔":"호텔");
    fhtml=`<form class="editf hotf" data-m="${mid}" data-city="${esc(city)}" autocomplete="off">
      <input type="text" name="hotel" placeholder="숙소명 (예: Gothia Towers)" value="${esc(String(m.hotel||""))}">
      <a class="tbtn mapbtn" href="${esc(mapsUrl(mapQ))}" target="_blank" rel="noopener">구글맵에서 찾기 ↗</a>
      <button type="submit">저장</button><button type="button" class="cancel">취소</button>
      <span class="ferr"></span></form>`;
  }
  row.querySelector(".pval").outerHTML=fhtml;
  btn.hidden=true;
  const first=row.querySelector("input:not([type=radio])"); if(first)first.focus();
}
function commitMember(team,mid,m,data,err){
  Object.assign(m,data);
  dbNS.doc("members/"+mid).update(data)
    .then(()=>{team.classList.remove("editing");renderTeamBlock(team);})
    .catch(()=>{err.textContent="저장 실패 — 잠시 후 다시 시도하세요.";});
}
function saveHosp(f){
  if(!dbNS)return;
  const team=f.closest(".team"), mid=f.dataset.m, m=findMember(mid), err=f.querySelector(".ferr");
  if(!m){team.classList.remove("editing");renderTeamBlock(team);return;}
  const v=n=>f.elements[n].value.trim()||null;
  const hospFrom=v("hospFrom"), hospTo=v("hospTo");
  if((hospFrom&&!hospTo)||(!hospFrom&&hospTo)){err.textContent="시작일과 종료일을 모두 입력하세요.";return;}
  if(hospFrom&&hospTo&&hospFrom>hospTo){err.textContent="종료일이 시작일보다 빠릅니다.";return;}
  commitMember(team,mid,m,{hospFrom,hospTo,updatedAt:Date.now()},err);
}
function saveFlight(f){
  if(!dbNS)return;
  const team=f.closest(".team"), mid=f.dataset.m, m=findMember(mid), err=f.querySelector(".ferr");
  if(!m){team.classList.remove("editing");renderTeamBlock(team);return;}
  const v=n=>f.elements[n].value.trim()||null;
  const outDate=v("outDate"), retDate=v("retDate");
  if(outDate&&retDate&&outDate>retDate){err.textContent="귀국일이 출국일보다 빠릅니다.";return;}
  const data={outNo:v("outNo"),outDate,outTime:v("outTime"),
    retNo:v("retNo"),retDate,retTime:v("retTime"),updatedAt:Date.now()};
  /* 섹션 간 자동 채움: ③ 출장신청 기간이 비어 있으면 항공 날짜로 (비어 있을 때만) */
  let nf=m.hospFrom||null, nt=m.hospTo||null;
  if(outDate&&!nf)nf=outDate;
  if(retDate&&!nt)nt=retDate;
  if((nf!==(m.hospFrom||null)||nt!==(m.hospTo||null))&&!(nf&&nt&&nf>nt)){data.hospFrom=nf;data.hospTo=nt;}
  commitMember(team,mid,m,data,err);
}
function saveHotel(f){
  if(!dbNS)return;
  const team=f.closest(".team"), mid=f.dataset.m, m=findMember(mid), err=f.querySelector(".ferr");
  if(!m){team.classList.remove("editing");renderTeamBlock(team);return;}
  commitMember(team,mid,m,{hotel:f.elements.hotel.value.trim()||null,updatedAt:Date.now()},err);
}
function saveAbstract(f){
  if(!dbNS)return;
  const team=f.closest(".team"), mid=f.dataset.m, m=findMember(mid), err=f.querySelector(".ferr");
  if(!m){team.classList.remove("editing");renderTeamBlock(team);return;}
  const vem=f.elements.vemail.value.trim().toLowerCase();
  if(vem!==String(m.email).toLowerCase()){err.textContent="등록된 참가자 이메일과 일치하지 않습니다.";return;}
  const title=f.elements.atitle.value.trim(), ptype=f.elements.ptype.value;
  if(!title){err.textContent="초록 제목을 입력하세요.";return;}
  m.title=title; m.ptype=ptype;
  dbNS.doc("members/"+mid).update({title,ptype,updatedAt:Date.now()})
    .then(()=>{team.classList.remove("editing");renderTeamBlock(team);})
    .catch(()=>{err.textContent="저장 실패 — 잠시 후 다시 시도하세요.";});
}
function handleDelete(mx){
  if(!dbNS)return;
  if(!mx.classList.contains("arm")){
    mx.classList.add("arm");mx.textContent="삭제?";
    setTimeout(()=>{if(mx.isConnected){mx.classList.remove("arm");mx.textContent="×";}},3000);
    return;
  }
  const team=mx.closest(".team"), conf=team.dataset.conf, mid=mx.closest(".prow").dataset.m;
  MEMBERS[conf]=(MEMBERS[conf]||[]).filter(m=>m.id!==mid);
  team.classList.remove("editing");renderTeamBlock(team);
  dbNS.doc("members/"+mid).delete().catch(()=>{});
}
$("#modal").addEventListener("input",e=>{
  if(!(e.target.classList&&e.target.classList.contains("regsel"))){
    const t=e.target.closest(".team"); if(t)t.classList.add("editing");
  }
  const f0=e.target.form;
  if(f0&&f0.classList&&f0.classList.contains("hotf")&&e.target.name==="hotel"){
    const mb=f0.querySelector(".mapbtn");
    if(mb){const hv=e.target.value.trim(), city=f0.dataset.city||"";
      mb.href=mapsUrl(hv?hv+(city?" "+city:""):(city?city+" 호텔":"호텔"));}
  }
});
/* ② 참가신청 — 등록 상태는 선택 즉시 저장 (열려 있는 다른 폼은 건드리지 않음) */
$("#modal").addEventListener("change",e=>{
  const rs=e.target.closest(".regsel"); if(!rs||!dbNS)return;
  const mid=rs.dataset.m, m=findMember(mid); if(!m)return;
  const val=rs.value||null;
  m.regStatus=val;
  rs.className="regsel"+(val==="early"?" early":val==="regular"?" regular":"");
  dbNS.doc("members/"+mid).update({regStatus:val,updatedAt:Date.now()}).catch(()=>{});
});
$("#modal").addEventListener("click",e=>{
  if(e.target.closest(".m-close")){$("#modal").close();return;}
  if(e.target===$("#modal")){$("#modal").close();return;}
  const st2=e.target.closest(".star");
  if(st2){
    const id=st2.dataset.id;
    stars.has(id)?stars.delete(id):stars.add(id);
    saveStars();
    st2.textContent=stars.has(id)?"★":"☆"; st2.setAttribute("aria-pressed",String(stars.has(id)));
    return;
  }
  const seg=e.target.closest(".seg button");
  if(seg){setStatus(seg.closest(".team").dataset.conf,seg.dataset.a);return;}
  const eb=e.target.closest(".ebtn");
  if(eb){openEditForm(eb);return;}
  const mx=e.target.closest(".mx");
  if(mx){handleDelete(mx);return;}
  const cc=e.target.closest(".team .cancel");
  if(cc){const team=cc.closest(".team");team.classList.remove("editing");renderTeamBlock(team);return;}
});
$("#modal").addEventListener("submit",e=>{
  const f=e.target;
  if(f.classList.contains("addf")){e.preventDefault();addMember(f);}
  else if(f.classList.contains("absf")){e.preventDefault();saveAbstract(f);}
  else if(f.classList.contains("hospf")){e.preventDefault();saveHosp(f);}
  else if(f.classList.contains("flyf")){e.preventDefault();saveFlight(f);}
  else if(f.classList.contains("hotf")){e.preventDefault();saveHotel(f);}
});

/* ---------- auth (매직링크 + 이메일 화이트리스트) ---------- */
const authEl=$("#auth"), authMsg=$("#authMsg"), loginForm=$("#loginForm"), loginBtn=$("#loginBtn");
let bootPromise=null, authBusy=false;

function setAuthMsg(msg,cls){authMsg.textContent=msg||"";authMsg.className="auth-msg"+(cls?" "+cls:"");}
function showAuth(){authEl.hidden=false;document.body.classList.remove("authed");showSaaButton();}

/* iframe 안: 단독 창에서 로그인하면(메일 링크는 새 창으로 열린다) 이 화면도 저절로 들어오게 몇 초마다 확인 */
if(EMBEDDED){
  setInterval(async()=>{
    if(document.body.classList.contains("authed")||bootPromise)return;
    const {data:{session}}=await sb.auth.getSession();
    if(session)handleSession(session);
  },4000);
}
/* 브라우저가 클릭을 요구해 자동으로 못 이어받았을 때만 보이는 단추 */
function showSaaButton(){
  if(!EMBEDDED||!saaFailed||!document.requestStorageAccess||$("#saaBtn"))return;
  const b=document.createElement("button");
  b.id="saaBtn"; b.type="button"; b.textContent="이 브라우저의 로그인 이어받기";
  b.addEventListener("click",async()=>{
    if(await getSharedStorage()){
      saaFailed=false; b.remove();
      const {data:{session}}=await sb.auth.getSession();
      if(session)handleSession(session);
      else setAuthMsg("이어받을 로그인이 아직 없습니다 — 아래로 로그인하면 이 화면도 저절로 들어옵니다.");
    }
    else setAuthMsg("이 브라우저에서는 이어받을 수 없습니다 — 아래로 로그인하거나 새 창에서 여세요.","err");
  });
  loginForm.parentNode.insertBefore(b,loginForm);
}
storageReady.then(()=>{if(!authEl.hidden)showSaaButton();});

async function startApp(session){
  authEl.hidden=true;
  document.body.classList.add("authed");
  $("#userEmail").textContent=(session.user&&session.user.email)||"";
  $("#userChip").hidden=false;
  dbNS=storeAPI; dbChecked=true;
  dbNS.collection("attendance").onSnapshot(s=>{
    ATT={}; s.docs.forEach(d=>{if(d.exists)ATT[d.id]=d.data();});
    refreshTeamUI(); if(goingOnly)apply();
  });
  dbNS.collection("members").orderBy("createdAt").onSnapshot(s=>{
    MEMBERS={}; s.docs.forEach(d=>{
      const m=Object.assign({id:d.id},d.data());
      (MEMBERS[m.conf]=MEMBERS[m.conf]||[]).push(m);
    });
    refreshTeamUI();
  });
  /* 실시간: 다른 팀원의 변경 이벤트가 오면 다시 읽어온다 (열려 있는 편집 폼은 editing 가드로 보호).
     구독 전에 인증 토큰을 실시간 소켓에 반드시 설정 — 없으면 RLS 필터로 이벤트가 오지 않음 */
  try{await sb.realtime.setAuth(session.access_token);}catch(e){}
  sb.channel("conf-planner-sync")
    .on("postgres_changes",{event:"*",schema:"public",table:"conf_attendance"},()=>storeRefresh("attendance"))
    .on("postgres_changes",{event:"*",schema:"public",table:"conf_members"},()=>storeRefresh("members"))
    .subscribe();
  document.addEventListener("visibilitychange",()=>{
    if(!document.hidden){storeRefresh("attendance");storeRefresh("members");}
  });
}

/* 명단 확인 — "yes" / "no"(서버가 분명히 false) / "unknown"(네트워크·만료 토큰 등 오류).
   오류일 때는 토큰을 새로 받아 다시 묻는다. 예전에는 오류도 로그아웃으로 처리해 잠자기 직후·
   토큰 만료 순간에 로그인이 풀렸다(2026-10-18). */
async function checkAllowed(){
  for(let i=0;i<3;i++){
    try{
      const {data,error}=await sb.rpc("conf_is_allowed");
      if(!error)return data===true?"yes":"no";
    }catch(e){}
    /* 끊긴 망에서는 refreshSession 이 자체 재시도로 오래 붙잡히므로 8초에서 끊는다 */
    try{await Promise.race([sb.auth.refreshSession(),new Promise(r=>setTimeout(r,8000))]);}catch(e){}
    await new Promise(r=>setTimeout(r,1500*(i+1)));
  }
  return "unknown";
}

let retryTimer=null;
function handleSession(session){
  if(!session){showAuth();return;}
  if(bootPromise)return;
  bootPromise=(async()=>{
    setAuthMsg("로그인 확인 중…");
    const res=await checkAllowed();
    if(res==="no"){
      bootPromise=null;
      setAuthMsg(((session.user&&session.user.email)||"이 계정")+"은(는) 아직 팀에 등록되지 않았습니다 — 관리자에게 등록을 요청하세요.","err");
      await sb.auth.signOut();
      return;
    }
    if(res==="unknown"){
      /* 로그인은 지우지 않는다 — 연결이 돌아오면 자동으로 다시 확인 */
      bootPromise=null;
      showAuth();
      setAuthMsg("서버에 연결하지 못했습니다 — 로그인은 유지돼 있으니 잠시 후 자동으로 다시 시도합니다.","err");
      const retry=async()=>{
        clearTimeout(retryTimer); window.removeEventListener("online",retry);
        const {data:{session:s}}=await sb.auth.getSession();
        if(s)handleSession(s); else setAuthMsg("");
      };
      window.addEventListener("online",retry);
      retryTimer=setTimeout(retry,15000);
      return;
    }
    clearTimeout(retryTimer); setAuthMsg("");
    const {data:{session:fresh}}=await sb.auth.getSession();   // refreshSession 뒤라면 새 토큰으로 실시간 인증
    startApp(fresh||session);
  })();
}

sb.auth.onAuthStateChange((ev,session)=>{
  if(ev==="INITIAL_SESSION"||ev==="SIGNED_IN"||ev==="SIGNED_OUT")handleSession(session);
});

loginForm.addEventListener("submit",async e=>{
  e.preventDefault();
  if(authBusy)return;
  const email=$("#loginEmail").value.trim();
  if(!EMAIL_RE.test(email)){setAuthMsg("올바른 이메일을 입력하세요.","err");return;}
  authBusy=true; loginBtn.disabled=true;
  setAuthMsg("확인 중…");
  try{
    const {data:allowed,error:e1}=await sb.rpc("conf_email_allowed",{p_email:email});
    if(e1)throw e1;
    if(!allowed){setAuthMsg("팀에 등록되지 않은 이메일입니다 — 관리자에게 등록을 요청하세요.","err");return;}
    const {error:e2}=await sb.auth.signInWithOtp({email,options:{emailRedirectTo:location.origin+location.pathname}});
    if(e2)throw e2;
    setAuthMsg(EMBEDDED&&sharedLS
      ?"로그인 링크를 이메일로 보냈습니다 — 링크는 새 창으로 열리고, 로그인되면 이 화면도 몇 초 안에 저절로 들어옵니다."
      :"로그인 링크를 이메일로 보냈습니다 — 메일함(스팸함 포함)에서 링크를 열면 접속됩니다.","ok");
  }catch(ex){
    const msg=String((ex&&ex.message)||"");
    setAuthMsg(/rate ?limit/i.test(msg)
      ?"이메일 발송 한도에 걸렸습니다 — 잠시 후(최대 1시간) 다시 시도하세요."
      :"로그인 링크를 보내지 못했습니다 — 잠시 후 다시 시도하세요.","err");
  }finally{authBusy=false;loginBtn.disabled=false;}
});
$("#logoutBtn").addEventListener("click",async()=>{
  try{await sb.auth.signOut();}catch(e){}
  location.reload();
});

buildStrip(); buildTbaList(); apply();
(()=>{let t=location.hash.slice(1);
  if(!TABS.includes(t.split("/")[0])){try{t=localStorage.getItem("conf2027-tab")||"plan";}catch(e){t="plan";}}
  showTab(t);})();
