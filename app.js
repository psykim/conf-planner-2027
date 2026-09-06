/* 2027 학회 플래너 — 독립 웹앱판.
   아티팩트판의 UI·로직을 그대로 유지하고, 저장소만 Supabase(매직링크 인증 + RLS)로 치환. */

/* ---------- supabase ---------- */
const SB_URL = "https://dktalgktntdlqclykhoz.supabase.co";
const SB_KEY = "sb_publishable_4Nhbi_UqgQYKb4D4zk0rZA_U4LzgWAr"; /* publishable key — 공개용, 데이터는 RLS로 보호 */
const sb = supabase.createClient(SB_URL, SB_KEY);

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
  $("#tbaNote").innerHTML=`<span><b>일정 미발표:</b> CTAD(통상 10–12월) · IPA(파도바, 통상 여름–초가을) · CHIL(통상 6월 말) · ML4H(통상 12월 초)</span>
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
function showAuth(){authEl.hidden=false;document.body.classList.remove("authed");}

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

function handleSession(session){
  if(!session){showAuth();return;}
  if(bootPromise)return;
  bootPromise=(async()=>{
    let allowed=false;
    try{const {data,error}=await sb.rpc("conf_is_allowed"); allowed=!error&&data===true;}catch(e){}
    if(!allowed){
      bootPromise=null;
      setAuthMsg(((session.user&&session.user.email)||"이 계정")+"은(는) 아직 팀에 등록되지 않았습니다 — 관리자에게 등록을 요청하세요.","err");
      await sb.auth.signOut();
      return;
    }
    startApp(session);
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
    setAuthMsg("로그인 링크를 이메일로 보냈습니다 — 메일함(스팸함 포함)에서 링크를 열면 접속됩니다.","ok");
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
