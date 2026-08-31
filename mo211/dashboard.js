(() => {
  const KEY="mo211-review-v1";
  const skills=window.MO211_SKILLS||[];
  const $=id=>document.getElementById(id);
  let filter="all";

  function load(){
    try{return JSON.parse(localStorage.getItem(KEY)||"{}");}catch(e){return {};}
  }

  function due(v){return Number(v?.due||0)<=Date.now();}
  function statusFor(v){
    if(!v)return {label:"未学習",cls:"new"};
    const level=Number(v.level||0);
    if(due(v))return {label:"復習期限",cls:"due"};
    if(level===0)return {label:"要復習",cls:"weak"};
    if(level>=4)return {label:"長めの復習間隔",cls:"stable"};
    return {label:"Level "+level,cls:"learning"};
  }

  function render(){
    const state=load();
    const studied=skills.filter(s=>state[s.id]).length;
    const dueN=skills.filter(s=>state[s.id]&&due(state[s.id])).length;
    const stable=skills.filter(s=>Number(state[s.id]?.level||0)>=4&&!due(state[s.id])).length;
    $("studiedCount").textContent=studied;
    $("dueCount").textContent=dueN;
    $("stableCount").textContent=stable;

    const root=$("skillDashboard");
    root.innerHTML="";

    const domains=[...new Set(skills.map(s=>s.domain))];
    domains.forEach(domain=>{
      const items=skills.filter(s=>s.domain===domain).filter(s=>{
        const v=state[s.id];
        if(filter==="all")return true;
        if(filter==="due")return Boolean(v)&&due(v);
        if(filter==="weak")return Boolean(v)&&Number(v.level||0)<=1;
        if(filter==="new")return !v;
        if(filter==="stable")return Number(v?.level||0)>=4&&!due(v);
        return true;
      });
      if(!items.length)return;

      const sec=document.createElement("section");
      sec.className="dash-domain";
      sec.innerHTML="<h2>"+esc(domain)+"</h2>";

      const grid=document.createElement("div");
      grid.className="skill-card-grid";

      items.forEach(s=>{
        const v=state[s.id],st=statusFor(v);
        const card=document.createElement("article");
        card.className="skill-card "+st.cls;

        const dueText=v?.due ? new Date(v.due).toLocaleDateString("ja-JP") : "—";
        const hits=Number(v?.hits||0),misses=Number(v?.misses||0);
        const total=hits+misses;
        const rate=total?Math.round(hits/total*100):0;

        card.innerHTML=
          "<div class='skill-card-head'><code>"+esc(s.id)+"</code><span class='status-chip'>"+st.label+"</span></div>"+
          "<h3>"+esc(s.title)+"</h3>"+
          "<dl><div><dt>Level</dt><dd>"+Number(v?.level||0)+"</dd></div><div><dt>次回</dt><dd>"+esc(dueText)+"</dd></div><div><dt>成功率</dt><dd>"+(total?rate+"%":"—")+"</dd></div></dl>"+
          "<a href='./' class='small-link'>問題で確認 →</a>";
        grid.appendChild(card);
      });

      sec.appendChild(grid);
      root.appendChild(sec);
    });
  }

  document.querySelectorAll("[data-filter]").forEach(b=>b.onclick=()=>{
    filter=b.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach(x=>x.classList.toggle("selected",x===b));
    render();
  });

  $("exportProgress").onclick=()=>{
    const payload={version:1,exportedAt:new Date().toISOString(),review:load()};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
    const a=document.createElement("a");
    a.href=URL.createObjectURL(blob);
    a.download="mo211-progress-"+new Date().toISOString().slice(0,10)+".json";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  $("importProgress").onchange=async e=>{
    const f=e.target.files?.[0];
    if(!f)return;
    try{
      const obj=JSON.parse(await f.text());
      const review=obj.review||obj;
      if(typeof review!=="object"||review===null||Array.isArray(review))throw new Error();
      localStorage.setItem(KEY,JSON.stringify(review));
      render();
      alert("進捗をインポートしました。");
    }catch(err){
      alert("進捗ファイルを読み込めませんでした。");
    }
    e.target.value="";
  };

  $("resetProgress").onclick=()=>{
    if(confirm("MO-211の学習進捗をこのブラウザから削除しますか？")){
      localStorage.removeItem(KEY);
      render();
    }
  };

  function esc(v){return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");}
  render();
})();