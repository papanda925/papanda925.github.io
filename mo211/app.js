(() => {
  const skills = window.MO211_SKILLS || [];
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
    if(answered)return;answered=true;const q=queue[index];
    const bs=[...answerArea.querySelectorAll(".option")];
    bs.forEach((b,i)=>{b.disabled=true;if(i===q.answer)b.classList.add("correct");if(i===selected&&i!==q.answer)b.classList.add("wrong");});
    stats[q.domain].total++;
    if(selected===q.answer){points++;stats[q.domain].correct++;}
    const exp=document.createElement("div");exp.className="explanation";
    exp.innerHTML="<strong>"+(selected===q.answer?"正解":"確認ポイント")+"</strong><p>"+escapeHtml(q.explanation)+"</p>";
    answerArea.appendChild(exp);next.classList.remove("hidden");
  }

  showAnswer.onclick=()=>{
    if(answered)return;answered=true;const q=queue[index];showAnswer.classList.add("hidden");
    const exp=document.createElement("div");exp.className="explanation";
    exp.innerHTML="<strong>解答・確認ポイント</strong><p>"+escapeHtml(q.answerText)+"</p><div class='self-check'><span>自分でできましたか？</span><button data-v='1'>できた</button><button data-v='0'>要復習</button></div>";
    answerArea.appendChild(exp);
    exp.querySelectorAll("button").forEach(b=>b.onclick=()=>{
      if(b.parentElement.dataset.done)return;b.parentElement.dataset.done="1";
      const v=Number(b.dataset.v);stats[q.domain].total++;if(v){points++;stats[q.domain].correct++;}
      b.parentElement.querySelectorAll("button").forEach(x=>x.disabled=true);next.classList.remove("hidden");
    });
  };

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
    Object.entries(stats).forEach(([d,s])=>{if(!s.total)return;const r=document.createElement("div");r.className="domain-row";r.innerHTML="<span>"+escapeHtml(d)+"</span><strong>"+s.correct+" / "+s.total+"</strong>";breakdown.appendChild(r);});
    result.scrollIntoView({behavior:"smooth",block:"start"});
  }

  function escapeHtml(v){return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");}

  // ページを開いた時点で必ず問題が見えるよう、最初の5問を自動表示。
  start(shuffle(questions).slice(0,5));
})();