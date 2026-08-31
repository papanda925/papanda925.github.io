(() => {
  const projects=window.MO211_PROJECTS||[];
  const help=window.MO211_HELP||{paths:{}};
  const $=id=>document.getElementById(id);

  let selected=[], pIndex=0, tIndex=0, status={}, timer=null, remaining=3000, timed=false;

  function shuffle(a){return [...a].sort(()=>Math.random()-.5);}

  function start(timedMode){
    timed=timedMode;
    selected=shuffle(projects).slice(0,6);
    pIndex=0;tIndex=0;status={};remaining=3000;
    clearInterval(timer);
    $("summary").classList.add("hidden");
    $("sim").classList.remove("hidden");

    if(timed){
      timer=setInterval(()=>{
        remaining--;
        renderTimer();
        if(remaining<=0){clearInterval(timer);finish();}
      },1000);
    }
    renderTimer();
    render();
    $("sim").scrollIntoView({behavior:"smooth",block:"start"});
  }

  function key(){return selected[pIndex].id+"-"+tIndex;}

  function render(){
    const p=selected[pIndex], t=p.tasks[tIndex];
    $("projNo").textContent="Project "+(pIndex+1)+" / "+selected.length;
    $("projTitle").textContent=p.title;
    $("projTheme").textContent=p.theme+" / 目安 "+p.minutes+"分";
    $("setupData").textContent=p.setup;
    $("taskNo").textContent="Task "+(tIndex+1)+" / "+p.tasks.length;
    $("taskText").textContent=t.text;
    $("taskSkill").textContent="対応スキル "+t.skill;
    $("taskHintOut").classList.add("hidden");
    $("taskHintOut").textContent="";

    const st=status[key()];
    $("markDone").textContent=st==="done"?"✓ 完了済み":"完了";
    $("markReview").textContent=st==="review"?"⚑ 見直し中":"あとで見直す";

    $("prevTask").disabled=tIndex===0;
    $("nextTask").disabled=tIndex===p.tasks.length-1;
    $("prevProject").disabled=pIndex===0;
    $("nextProject").textContent=pIndex===selected.length-1?"サマリーへ":"次のプロジェクト →";
  }

  function renderTimer(){
    if(!timed){$("timerText").textContent="時間制限なし";return;}
    const m=Math.floor(remaining/60),s=remaining%60;
    $("timerText").textContent=String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");
  }

  $("copyData").onclick=async()=>{
    try{
      await navigator.clipboard.writeText(selected[pIndex].setup);
      $("copyData").textContent="コピーしました";
      setTimeout(()=>$("copyData").textContent="コピー",1200);
    }catch(e){}
  };

  $("markDone").onclick=()=>{status[key()]="done";render();};
  $("markReview").onclick=()=>{status[key()]="review";render();};

  $("taskHint").onclick=()=>{
    const t=selected[pIndex].tasks[tIndex];
    $("taskHintOut").classList.remove("hidden");
    $("taskHintOut").textContent=help.paths?.[t.skill]?"操作入口： "+help.paths[t.skill]:"対象オブジェクトを選択し、指示の動詞に対応するリボンタブを探してください。";
  };

  $("prevTask").onclick=()=>{if(tIndex>0){tIndex--;render();}};
  $("nextTask").onclick=()=>{if(tIndex<selected[pIndex].tasks.length-1){tIndex++;render()}};

  $("prevProject").onclick=()=>{
    if(pIndex>0){pIndex--;tIndex=0;render();}
  };

  $("nextProject").onclick=()=>{
    if(pIndex<selected.length-1){pIndex++;tIndex=0;render();}
    else finish();
  };

  function finish(){
    clearInterval(timer);
    $("sim").classList.add("hidden");
    $("summary").classList.remove("hidden");

    let total=0,done=0,review=0;
    const list=$("summaryList");
    list.innerHTML="";

    selected.forEach((p,pi)=>{
      const row=document.createElement("div");
      row.className="summary-project";
      const items=p.tasks.map((t,ti)=>{
        total++;
        const s=status[p.id+"-"+ti]||"open";
        if(s==="done")done++;
        if(s==="review")review++;
        return "<li><span>"+escapeHtml(t.text)+"</span><strong>"+(s==="done"?"完了":s==="review"?"見直し":"未完了")+"</strong></li>";
      }).join("");
      row.innerHTML="<h3>Project "+(pi+1)+"："+escapeHtml(p.title)+"</h3><ul>"+items+"</ul>";
      list.appendChild(row);
    });

    $("summaryText").textContent="完了 "+done+" / "+total+"　｜　見直し "+review+"　｜　未完了 "+(total-done-review);
    $("retryReview").disabled=(done===total);
    $("summary").scrollIntoView({behavior:"smooth",block:"start"});
  }

  $("retryReview").onclick=()=>{
    for(let pi=0;pi<selected.length;pi++){
      for(let ti=0;ti<selected[pi].tasks.length;ti++){
        if(status[selected[pi].id+"-"+ti]!=="done"){
          pIndex=pi;tIndex=ti;
          $("summary").classList.add("hidden");$("sim").classList.remove("hidden");
          render();return;
        }
      }
    }
  };

  $("restartExam").onclick=()=>start(timed);
  $("startExam").onclick=()=>start(true);
  $("practiceProjects").onclick=()=>start(false);

  function escapeHtml(v){return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");}
})();