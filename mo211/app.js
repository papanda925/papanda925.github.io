(() => {
  const skills = window.MO211_SKILLS || [];
  const help = window.MO211_HELP || {paths:{},formulas:{},links:{},visuals:{}};

  const questions = skills.flatMap(s => ([
    {id:"q-"+s.id,skillId:s.id,mode:"choice",domain:s.domain,title:s.title,prompt:s.q,options:s.options,answer:s.answer,explanation:s.explanation},
    {id:"p-"+s.id,skillId:s.id,mode:"practice",domain:s.domain,title:"実技: "+s.title,prompt:s.practice,steps:s.steps,answerText:s.answerText}
  ]));

  const $=id=>document.getElementById(id);
  const quiz=$("quiz"), result=$("result"), mode=$("mode"), title=$("title"), skill=$("skill"),
        prompt=$("prompt"), answerArea=$("answerArea"), showAnswer=$("showAnswer"), next=$("next"),
        progressText=$("progressText"), progressBar=$("progressBar"), score=$("score"), breakdown=$("breakdown");

  let queue=[], index=0, points=0, answered=false, stats={};

  $("questionCount").textContent = questions.length;

  function shuffle(arr){ return [...arr].sort(()=>Math.random()-.5); }
  function initStats(){ stats={}; questions.forEach(q=>{if(!stats[q.domain])stats[q.domain]={correct:0,total:0};}); }

  function start(list){
    queue=list.length?list:[...questions];
    index=0;points=0;answered=false;initStats();
    result.classList.add("hidden");quiz.classList.remove("hidden");
    render();
    quiz.scrollIntoView({behavior:"smooth",block:"start"});
  }

  function render(){
    const q=queue[index]; answered=false; answerArea.innerHTML="";
    next.classList.add("hidden");showAnswer.classList.add("hidden");
    mode.textContent=q.mode==="choice"?"知識問題":"実技課題";
    title.textContent=q.title; skill.textContent="スキル "+q.skillId+" / "+q.domain;
    prompt.textContent=q.prompt;
    progressText.textContent=(index+1)+" / "+queue.length;
    progressBar.style.width=((index+1)/queue.length*100)+"%";

    if(q.mode==="choice"){
      const box=document.createElement("div");box.className="options";
      q.options.forEach((opt,i)=>{
        const b=document.createElement("button");b.className="option";
        b.textContent=String.fromCharCode(65+i)+". "+opt;
        b.onclick=()=>choose(i);box.appendChild(b);
      });
      answerArea.appendChild(box);
    }else{
      const ol=document.createElement("ol");ol.className="practice-steps";
      q.steps.forEach(s=>{const li=document.createElement("li");li.textContent=s;ol.appendChild(li);});
      answerArea.appendChild(ol);showAnswer.classList.remove("hidden");
    }
  }

  function choose(selected){
    if(answered)return;
    answered=true;
    const q=queue[index];
    const correct=selected===q.answer;
    const bs=[...answerArea.querySelectorAll(".option")];

    bs.forEach((b,i)=>{
      b.disabled=true;
      if(i===q.answer)b.classList.add("correct");
      if(i===selected&&i!==q.answer)b.classList.add("wrong");
    });

    stats[q.domain].total++;
    if(correct){points++;stats[q.domain].correct++;}

    const exp=document.createElement("div");
    exp.className="explanation";
    exp.innerHTML="<strong>"+(correct?"正解":"確認ポイント")+"</strong><p>"+escapeHtml(q.explanation)+"</p>";
    answerArea.appendChild(exp);

    const helpButton=document.createElement("button");
    helpButton.className="learn-more";
    helpButton.textContent=correct ? "操作手順・公式リンクも確認する" : "Excel 365 での操作を詳しく見る";
    exp.appendChild(helpButton);

    if(correct){
      helpButton.onclick=()=>{
        if(exp.querySelector(".deep-help")) return;
        helpButton.remove();
        renderDeepHelp(q,exp);
      };
    }else{
      helpButton.remove();
      renderDeepHelp(q,exp);
    }

    next.classList.remove("hidden");
  }

  showAnswer.onclick=()=>{
    if(answered)return;
    answered=true;
    const q=queue[index];
    showAnswer.classList.add("hidden");

    const exp=document.createElement("div");
    exp.className="explanation";
    exp.innerHTML="<strong>解答・確認ポイント</strong><p>"+escapeHtml(q.answerText)+"</p><div class='self-check'><span>自分でできましたか？</span><button data-v='1'>できた</button><button data-v='0'>要復習</button></div>";
    answerArea.appendChild(exp);

    exp.querySelectorAll(".self-check button").forEach(b=>b.onclick=()=>{
      if(b.parentElement.dataset.done)return;
      b.parentElement.dataset.done="1";
      const v=Number(b.dataset.v);
      stats[q.domain].total++;
      if(v){points++;stats[q.domain].correct++;}
      b.parentElement.querySelectorAll("button").forEach(x=>x.disabled=true);

      if(!v && !exp.querySelector(".deep-help")){
        renderDeepHelp(q,exp);
      }
      next.classList.remove("hidden");
    });
  };

  function renderDeepHelp(q,target){
    const source=skills.find(s=>s.id===q.skillId);
    if(!source)return;

    const box=document.createElement("div");
    box.className="deep-help";

    const h=document.createElement("h3");
    h.textContent="Excel for Microsoft 365 でどう使う？";
    box.appendChild(h);

    const route=help.paths?.[q.skillId];
    if(route){
      const routeBox=document.createElement("div");
      routeBox.className="route-box";
      routeBox.innerHTML="<span class='help-label'>操作場所</span><div class='route-text'>"+escapeHtml(route)+"</div>";
      box.appendChild(routeBox);
    }

    const formula=help.formulas?.[q.skillId];
    if(formula){
      const f=document.createElement("div");
      f.className="formula-box";
      f.innerHTML="<span class='help-label'>数式例</span><code>"+escapeHtml(formula)+"</code>";
      box.appendChild(f);
    }

    if(help.visuals?.[q.skillId]?.type==="flashfill"){
      box.appendChild(buildFlashFillVisual(help.visuals[q.skillId].caption));
    }

    const practice=document.createElement("div");
    practice.className="mini-practice";
    practice.innerHTML="<span class='help-label'>実際にやってみる</span><p>"+escapeHtml(source.practice)+"</p>";
    const ol=document.createElement("ol");
    source.steps.forEach(s=>{const li=document.createElement("li");li.textContent=s;ol.appendChild(li);});
    practice.appendChild(ol);
    box.appendChild(practice);

    const point=document.createElement("div");
    point.className="help-point";
    point.innerHTML="<span class='help-label'>覚えておくポイント</span><p>"+escapeHtml(source.answerText)+"</p>";
    box.appendChild(point);

    const links=help.links?.[q.skillId] || [];
    const linksBox=document.createElement("div");
    linksBox.className="official-links";
    const label=document.createElement("span");
    label.className="help-label";
    label.textContent="参考リンク";
    linksBox.appendChild(label);

    const ul=document.createElement("ul");
    if(links.length){
      links.forEach(link=>{
        const li=document.createElement("li");
        const a=document.createElement("a");
        a.href=link.url;
        a.target="_blank";
        a.rel="noopener noreferrer";
        a.textContent=link.label+" ↗";
        li.appendChild(a);ul.appendChild(li);
      });
    }else{
      const li=document.createElement("li");
      const a=document.createElement("a");
      a.href="https://support.microsoft.com/ja-jp/excel";
      a.target="_blank";
      a.rel="noopener noreferrer";
      a.textContent="Microsoft サポート：Excel ヘルプとラーニング ↗";
      li.appendChild(a);ul.appendChild(li);
    }

    const li2=document.createElement("li");
    const a2=document.createElement("a");
    a2.href="https://learn.microsoft.com/ja-jp/credentials/certifications/exams/mo-211/";
    a2.target="_blank";a2.rel="noopener noreferrer";
    a2.textContent="Microsoft Learn：MO-211 公式試験ページ ↗";
    li2.appendChild(a2);ul.appendChild(li2);

    linksBox.appendChild(ul);
    box.appendChild(linksBox);
    target.appendChild(box);
  }

  function buildFlashFillVisual(caption){
    const fig=document.createElement("figure");
    fig.className="excel-mock";
    fig.innerHTML=
      "<div class='mock-title'>Excel for Microsoft 365 — 操作イメージ</div>"+
      "<div class='mock-tabs'><span>ホーム</span><span class='active'>データ</span><span>数式</span><span>校閲</span><span>表示</span></div>"+
      "<div class='mock-ribbon'><span>並べ替え</span><span>フィルター</span><span class='highlight'>フラッシュ フィル<br><kbd>Ctrl + E</kbd></span><span>重複の削除</span><span>データの入力規則</span></div>"+
      "<div class='sheet-grid'>"+
        "<div class='corner'></div><div class='col'>A</div><div class='col'>B</div>"+
        "<div class='row'>1</div><div class='cell head'>氏名</div><div class='cell head'>姓</div>"+
        "<div class='row'>2</div><div class='cell'>山田 太郎</div><div class='cell input'>山田 ← まず例を入力</div>"+
        "<div class='row'>3</div><div class='cell'>鈴木 花子</div><div class='cell preview'>鈴木</div>"+
        "<div class='row'>4</div><div class='cell'>佐藤 次郎</div><div class='cell preview'>佐藤</div>"+
      "</div>"+
      "<figcaption>"+escapeHtml(caption||"")+"</figcaption>";
    return fig;
  }

  next.onclick=()=>{index++;if(index>=queue.length)finish();else render();};
  $("again").onclick=()=>start(shuffle(questions).slice(0,10));
  $("random10").onclick=()=>start(shuffle(questions).slice(0,10));
  $("allChoice").onclick=()=>start(questions.filter(q=>q.mode==="choice"));
  $("allPractice").onclick=()=>start(questions.filter(q=>q.mode==="practice"));
  document.querySelectorAll("[data-domain]").forEach(b=>b.onclick=()=>start(questions.filter(q=>q.domain===b.dataset.domain)));

  function finish(){
    quiz.classList.add("hidden");result.classList.remove("hidden");
    const total=Object.values(stats).reduce((n,s)=>n+s.total,0);
    score.textContent=total?points+" / "+total+" ("+Math.round(points/total*100)+"%)":"採点対象なし";
    breakdown.innerHTML="";
    Object.entries(stats).forEach(([d,s])=>{
      if(!s.total)return;
      const r=document.createElement("div");
      r.className="domain-row";
      r.innerHTML="<span>"+escapeHtml(d)+"</span><strong>"+s.correct+" / "+s.total+"</strong>";
      breakdown.appendChild(r);
    });
    result.scrollIntoView({behavior:"smooth",block:"start"});
  }

  function escapeHtml(v){
    return String(v)
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  start(shuffle(questions).slice(0,5));
})();