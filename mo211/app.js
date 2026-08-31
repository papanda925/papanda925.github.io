(() => {
  const skills = window.MO211_SKILLS || [];
  const help = window.MO211_HELP || {paths:{},formulas:{},links:{},visuals:{},contrasts:{}};

  const variants = window.MO211_VARIANTS || {};
  const questions = skills.flatMap(s => {
    const base = [
      {id:"q-"+s.id,skillId:s.id,mode:"choice",domain:s.domain,title:s.title,prompt:s.q,options:s.options,answer:s.answer,explanation:s.explanation},
      {id:"p-"+s.id+"-1",skillId:s.id,mode:"practice",domain:s.domain,title:"実技: "+s.title,prompt:s.practice,steps:s.steps,answerText:s.answerText,variant:1}
    ];
    (variants[s.id] || []).forEach((v,i) => {
      base.push({
        id:"p-"+s.id+"-"+(i+2),
        skillId:s.id,
        mode:"practice",
        domain:s.domain,
        title:"実技: "+s.title+"（別パターン）",
        prompt:v.prompt,
        steps:v.steps || s.steps,
        answerText:v.answerText || s.answerText,
        variant:i+2
      });
    });
    return base;
  });

  const $=id=>document.getElementById(id);
  const quiz=$("quiz"), result=$("result"), mode=$("mode"), title=$("title"), skill=$("skill"),
        prompt=$("prompt"), answerArea=$("answerArea"), showAnswer=$("showAnswer"), next=$("next"),
        progressText=$("progressText"), progressBar=$("progressBar"), score=$("score"), breakdown=$("breakdown");

  const REVIEW_KEY="mo211-review-v1";
  const RECALL_KEY="mo211-recall-mode";
  const REVIEW_INTERVALS=[1,3,7,14,30];
  let reviewState=loadReviewState();
  let recallMode=localStorage.getItem(RECALL_KEY)==="1";

  let queue=[], index=0, points=0, answered=false, stats={};
  let sessionMisses=new Set();
  let currentHintUsed=false;
  let currentConfidence=null;
  let calibration={highWrong:0,lowRight:0,rated:0};

  $("questionCount").textContent = questions.length;
  updateRecallButton();
  updateReviewCount();

  function shuffle(arr){ return [...arr].sort(()=>Math.random()-.5); }

  function initStats(){
    stats={};
    questions.forEach(q=>{if(!stats[q.domain])stats[q.domain]={correct:0,total:0};});
  }

  function start(list){
    queue=list.length?list:[...questions];
    index=0;
    points=0;
    answered=false;
    sessionMisses=new Set();
    calibration={highWrong:0,lowRight:0,rated:0};
    initStats();
    result.classList.add("hidden");
    $("retryMissed").classList.add("hidden");
    quiz.classList.remove("hidden");
    render();
    quiz.scrollIntoView({behavior:"smooth",block:"start"});
  }

  function render(){
    const q=queue[index];
    answered=false;
    currentHintUsed=false;
    currentConfidence=null;
    answerArea.innerHTML="";
    next.classList.add("hidden");
    showAnswer.classList.add("hidden");

    mode.textContent=q.mode==="choice"?"知識問題":"実技課題";
    title.textContent=q.title;
    skill.textContent="スキル "+q.skillId+" / "+q.domain;
    prompt.textContent=q.prompt;
    progressText.textContent=(index+1)+" / "+queue.length;
    progressBar.style.width=((index+1)/queue.length*100)+"%";

    if(q.mode==="choice"){
      const meta=document.createElement("div");
      meta.className="confidence-box";
      meta.innerHTML="<span>答える前の自信度（任意）</span><div><button data-c='low'>低</button><button data-c='mid'>中</button><button data-c='high'>高</button></div>";
      meta.querySelectorAll("button").forEach(b=>b.onclick=()=>{
        currentConfidence=b.dataset.c;
        meta.querySelectorAll("button").forEach(x=>x.classList.toggle("selected",x===b));
      });
      answerArea.appendChild(meta);

      const box=document.createElement("div");
      box.className="options";
      const ordered=shuffle(q.options.map((opt,i)=>({opt,original:i})));
      ordered.forEach((item,i)=>{
        const b=document.createElement("button");
        b.className="option";
        b.dataset.original=String(item.original);
        b.textContent=String.fromCharCode(65+i)+". "+item.opt;
        b.onclick=()=>choose(item.original);
        box.appendChild(b);
      });

      if(recallMode){
        box.classList.add("hidden");
        const recall=document.createElement("div");
        recall.className="recall-box";
        recall.innerHTML="<span class='help-label'>選択肢を見る前に、答えを記憶から出す</span><p>機能名・関数名・操作名を、自分の言葉で1つ書いてください。完全一致でなくて構いません。</p><input type='text' placeholder='例：フラッシュフィル'><button class='hint-btn'>選択肢を表示して答える</button>";
        const input=recall.querySelector("input");
        const reveal=recall.querySelector("button");
        reveal.onclick=()=>{
          recall.dataset.response=input.value.trim();
          input.disabled=true;
          reveal.disabled=true;
          reveal.textContent="選択肢を表示しました";
          box.classList.remove("hidden");
        };
        answerArea.appendChild(recall);
      }

      answerArea.appendChild(box);
    }else{
      renderPracticeThinking(q);
      showAnswer.textContent="解答・操作イメージ・参考情報を見る";
      showAnswer.classList.remove("hidden");
    }
  }

  function renderPracticeThinking(q){
    const route=help.paths?.[q.skillId] || "";
    const firstRoute=route ? route.split(/[>→]/)[0].trim() : "Excelのリボン／数式バー";

    const card=document.createElement("div");
    card.className="thinking-card";
    card.innerHTML=
      "<h3>本番思考：まず30秒、手順を見ないで考える</h3>"+
      "<p><strong>動詞</strong>：何を『作る／変更する／設定する／計算する』問題か？</p>"+
      "<p><strong>対象</strong>：セル、範囲、シート、ブック、グラフ、ピボットのどれか？</p>"+
      "<p><strong>完了条件</strong>：操作後、画面や値がどうなれば成功か？</p>"+
      "<div class='hint-row'>"+
        "<button class='hint-btn' data-h='1'>ヒント1：考え方</button>"+
        "<button class='hint-btn' data-h='2'>ヒント2：入口</button>"+
        "<button class='hint-btn' data-h='3'>ヒント3：操作場所</button>"+
      "</div><div class='hint-output hidden'></div>"+
      "<p class='review-note'>ヒントを使っても問題ありません。ただし『ヒントなしで再現できる』状態を最終目標にします。</p>";

    const output=card.querySelector(".hint-output");
    card.querySelectorAll(".hint-btn").forEach(btn=>{
      btn.onclick=()=>{
        currentHintUsed=true;
        output.classList.remove("hidden");
        if(btn.dataset.h==="1"){
          output.textContent="指示文の固有名詞より先に『動詞』を拾い、操作の種類を絞ってください。次に対象オブジェクトを先に選択します。";
        }else if(btn.dataset.h==="2"){
          output.textContent="操作の入口は「"+firstRoute+"」です。ここから先を記憶だけで探してみてください。";
        }else{
          output.textContent=route ? "操作場所： "+route : "この課題は数式バーまたは対象オブジェクトを選択した後のリボンから操作します。";
        }
      };
    });

    answerArea.appendChild(card);
  }

  function choose(selected){
    if(answered)return;
    answered=true;
    const q=queue[index];
    const correct=selected===q.answer;
    const bs=[...answerArea.querySelectorAll(".option")];

    bs.forEach(b=>{
      const original=Number(b.dataset.original);
      b.disabled=true;
      if(original===q.answer)b.classList.add("correct");
      if(original===selected&&original!==q.answer)b.classList.add("wrong");
    });

    stats[q.domain].total++;
    if(correct){
      points++;
      stats[q.domain].correct++;
      markReview(q.skillId,2);
    }else{
      sessionMisses.add(q.skillId);
      markReview(q.skillId,0);
    }

    if(currentConfidence){
      calibration.rated++;
      if(currentConfidence==="high" && !correct) calibration.highWrong++;
      if(currentConfidence==="low" && correct) calibration.lowRight++;
    }

    const exp=document.createElement("div");
    exp.className="explanation";
    exp.innerHTML="<strong>"+(correct?"正解":"確認ポイント")+"</strong><p>"+escapeHtml(q.explanation)+"</p>";
    answerArea.appendChild(exp);

    if(!correct){
      const cmp=document.createElement("div");
      cmp.className="answer-compare";
      cmp.innerHTML="<div><span>あなたの選択</span><strong>"+escapeHtml(q.options[selected])+"</strong></div><div><span>正解</span><strong>"+escapeHtml(q.options[q.answer])+"</strong></div>";
      exp.appendChild(cmp);
    }

    if(currentConfidence){
      const cal=document.createElement("div");
      cal.className="calibration-feedback";
      if(currentConfidence==="high" && !correct){
        cal.textContent="高い自信で誤答：このスキルは優先復習。『なぜ他の選択肢ではないか』まで確認してください。";
      }else if(currentConfidence==="low" && correct){
        cal.textContent="低い自信で正解：知識は出ています。次はヒントなしで素早く再現できるか確認すると定着が進みます。";
      }else{
        cal.textContent="自信度と正誤が概ね一致しています。実際のExcel操作でも再現できるか確認してください。";
      }
      exp.appendChild(cal);
    }

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
    updateReviewCount();
  }

  showAnswer.onclick=()=>{
    if(answered)return;
    answered=true;
    const q=queue[index];
    showAnswer.classList.add("hidden");

    const exp=document.createElement("div");
    exp.className="explanation";
    exp.innerHTML="<strong>解答・確認ポイント</strong><p>"+escapeHtml(q.answerText)+"</p>";
    answerArea.appendChild(exp);

    // 実技は、解答後に必ず操作場所・図・参考リンクまで見られるようにする。
    renderDeepHelp(q,exp);

    const check=document.createElement("div");
    check.className="self-check";
    check.innerHTML=
      "<span>解答を見る前の自分を判定：</span>"+
      "<button data-v='2'>自力でできた</button>"+
      "<button data-v='1'>ヒントありでできた</button>"+
      "<button data-v='0'>できなかった</button>";
    exp.appendChild(check);

    const note=document.createElement("p");
    note.className="review-note";
    note.textContent="『ヒントあり』『できなかった』は復習キューへ。解答を閉じたあと、同じ操作をもう一度記憶だけで再現すると定着しやすくなります。";
    exp.appendChild(note);

    check.querySelectorAll("button").forEach(b=>b.onclick=()=>{
      if(check.dataset.done)return;
      check.dataset.done="1";

      let v=Number(b.dataset.v);
      if(v===2 && currentHintUsed) v=1;

      stats[q.domain].total++;
      if(v===2){
        points++;
        stats[q.domain].correct++;
        markReview(q.skillId,2);
      }else{
        sessionMisses.add(q.skillId);
        markReview(q.skillId,v);
      }

      check.querySelectorAll("button").forEach(x=>x.disabled=true);

      if(Number(b.dataset.v)===2 && currentHintUsed){
        const msg=document.createElement("p");
        msg.className="review-note";
        msg.textContent="今回はヒントを使ったため、復習上は『ヒントあり』として記録しました。";
        check.after(msg);
      }

      next.classList.remove("hidden");
      updateReviewCount();
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

    const cue=document.createElement("div");
    cue.className="exam-cue";
    cue.innerHTML="<span class='help-label'>本番での頭の動かし方</span><p>"+escapeHtml(makeExamCue(q,route))+"</p>";
    box.appendChild(cue);

    const formula=help.formulas?.[q.skillId];
    if(formula){
      const f=document.createElement("div");
      f.className="formula-box";
      f.innerHTML="<span class='help-label'>数式例</span><code>"+escapeHtml(formula)+"</code>";
      box.appendChild(f);
    }

    const contrast=help.contrasts?.[q.skillId];
    if(contrast){
      const c=document.createElement("div");
      c.className="contrast-box";
      c.innerHTML="<span class='help-label'>似た機能と区別する</span><p>"+escapeHtml(contrast)+"</p>";
      box.appendChild(c);
    }

    const visual=help.visuals?.[q.skillId];
    if(visual){
      const visualNode=buildVisual(visual.type,visual.caption);
      if(visualNode) box.appendChild(visualNode);
    }else if(route){
      box.appendChild(buildGenericRouteVisual(route));
    }

    const practice=document.createElement("div");
    practice.className="mini-practice";
    practice.innerHTML="<span class='help-label'>答えを閉じて、もう一度やる</span><p>"+escapeHtml(source.practice)+"</p>";
    const ol=document.createElement("ol");
    source.steps.forEach(s=>{
      const li=document.createElement("li");
      li.textContent=s;
      ol.appendChild(li);
    });
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
        li.appendChild(a);
        ul.appendChild(li);
      });
    }else{
      const li=document.createElement("li");
      const a=document.createElement("a");
      a.href="https://support.microsoft.com/ja-jp/excel";
      a.target="_blank";
      a.rel="noopener noreferrer";
      a.textContent="Microsoft サポート：Excel ヘルプとラーニング ↗";
      li.appendChild(a);
      ul.appendChild(li);

      const kw=document.createElement("li");
      kw.textContent="Microsoft公式で探すキーワード： Excel Microsoft 365 「"+source.title+"」";
      ul.appendChild(kw);
    }

    const li2=document.createElement("li");
    const a2=document.createElement("a");
    a2.href="https://learn.microsoft.com/ja-jp/credentials/certifications/exams/mo-211/";
    a2.target="_blank";
    a2.rel="noopener noreferrer";
    a2.textContent="Microsoft Learn：MO-211 公式試験ページ ↗";
    li2.appendChild(a2);
    ul.appendChild(li2);

    const li3=document.createElement("li");
    const a3=document.createElement("a");
    a3.href="./study-method.html";
    a3.textContent="このサイトの勉強法：本番で手が動くようにする方法";
    li3.appendChild(a3);
    ul.appendChild(li3);

    linksBox.appendChild(ul);
    box.appendChild(linksBox);

    const retry=document.createElement("button");
    retry.className="learn-more";
    retry.textContent="答えを閉じて、このスキルを今すぐ再挑戦";
    retry.onclick=()=>{
      const alts=questions.filter(x=>x.skillId===q.skillId && x.id!==q.id);
      if(!alts.length)return;
      const nextAlt=alts[Math.floor(Math.random()*alts.length)];
      queue.splice(index+1,0,nextAlt);
      retry.disabled=true;
      retry.textContent="次の問題に再挑戦を追加しました";
    };
    box.appendChild(retry);

    target.appendChild(box);
  }

  function makeExamCue(q,route){
    if((route||"").includes("数式バー") || q.title.includes("関数") || q.title.includes("日付")){
      return "① 何を返したい関数かを言葉にする → ② 必要な入力値・範囲を確認 → ③ 引数の順番を思い出す → ④ 数式を確定 → ⑤ 返った値が目的どおりか確認。";
    }
    const first=route ? route.split(/[>→]/)[0].trim() : "対象オブジェクト";
    return "① 指示の動詞を拾う → ② 対象セル／オブジェクトを先に選ぶ → ③ 「"+first+"」を入口に機能を探す → ④ 必要な設定だけ行う → ⑤ 実際の表示・値・保護状態で完了を確認。";
  }

  function buildGenericRouteVisual(route){
    const fig=document.createElement("figure");
    fig.className="excel-mock";
    const parts=route.split(/>|→/).map(x=>x.trim()).filter(Boolean);
    const tabs=["ファイル","ホーム","挿入","ページ レイアウト","数式","データ","校閲","表示","開発"];
    const first=parts[0]||"";
    const active=tabs.find(t=>first.includes(t)) || (first.includes("数式バー") ? "数式" : "");
    const command=parts.length>1 ? parts.slice(1).join(" → ") : first;

    fig.innerHTML=
      "<div class='mock-title'>Excel for Microsoft 365 — 操作イメージ</div>"+
      "<div class='mock-tabs'>"+tabs.map(t=>"<span class='"+(t===active?"active":"")+"'>"+escapeHtml(t)+"</span>").join("")+"</div>"+
      "<div class='mock-ribbon'><span>クリップボード</span><span>編集</span><span class='highlight'>"+escapeHtml(command||"対象コマンド")+"</span><span>その他</span></div>"+
      "<div class='flow'>"+parts.map((p,i)=>"<span>"+(i+1)+" "+escapeHtml(p)+"</span>"+(i<parts.length-1?"<b>→</b>":"")).join("")+"</div>"+
      "<figcaption>各スキル専用の操作経路をExcel風に模式化しています。実際のExcel画面そのものではありません。</figcaption>";
    return fig;
  }

  function buildVisual(type,caption){
    const fig=document.createElement("figure");
    fig.className="excel-mock";
    const cap="<figcaption>"+escapeHtml(caption||"")+"<br><small>本サイト作成の模式図。実際のExcel画面そのものではありません。</small></figcaption>";

    if(type==="flashfill"){
      fig.innerHTML=
        "<div class='mock-title'>Excel for Microsoft 365 — 操作イメージ</div>"+
        "<div class='mock-tabs'><span>ホーム</span><span class='active'>データ</span><span>数式</span><span>校閲</span><span>表示</span></div>"+
        "<div class='mock-ribbon'><span>並べ替え</span><span>フィルター</span><span class='highlight'>フラッシュ フィル<br><kbd>Ctrl + E</kbd></span><span>重複の削除</span><span>データの入力規則</span></div>"+
        sheet2("氏名","姓","山田 太郎","山田 ← 例を入力","鈴木 花子","鈴木","佐藤 次郎","佐藤")+
        cap;
      return fig;
    }

    if(type==="conditional"){
      fig.innerHTML=
        "<div class='mock-title'>条件付き書式 — 新しい書式ルール</div>"+
        "<div class='dialog-mock'><div class='dialog-row selected'>● 数式を使用して、書式設定するセルを決定</div><label>次の数式を満たす場合に値を書式設定</label><div class='formula-entry'>=AND($A2&lt;TODAY(),$C2=&quot;未完了&quot;)</div><div class='format-sample'>プレビュー：期限切れ・未完了の行を強調</div></div>"+
        cap;
      return fig;
    }

    if(type==="xlookup"){
      fig.innerHTML=
        "<div class='mock-title'>Excel for Microsoft 365 — XLOOKUP</div>"+
        "<div class='formula-bar'>fx　=XLOOKUP(E2,$A$2:$A$5,$C$2:$C$5,&quot;未登録&quot;)</div>"+
        "<div class='mini-sheet four'><b>商品コード</b><b>商品名</b><b>単価</b><b>検索</b><span>P001</span><span>マウス</span><span>2500</span><span class='active-cell'>P002</span><span>P002</span><span>キーボード</span><span>6800</span><span class='result-cell'>6,800</span></div>"+
        cap;
      return fig;
    }

    if(type==="workday"){
      fig.innerHTML=
        "<div class='mock-title'>Excel for Microsoft 365 — WORKDAY</div>"+
        "<div class='formula-bar'>fx　=WORKDAY(A2,B2,$F$2:$F$5)</div>"+
        "<div class='mini-sheet four'><b>申請日</b><b>営業日数</b><b>期限日</b><b>祝日一覧</b><span>2026/9/1</span><span>5</span><span class='result-cell'>2026/9/8</span><span>2026/9/3</span><span></span><span></span><span></span><span>2026/9/23</span></div>"+
        cap;
      return fig;
    }

    if(type==="goalseek"){
      fig.innerHTML=
        "<div class='mock-title'>ゴール シーク</div>"+
        "<div class='dialog-mock goal'><label>数式入力セル</label><div class='input-like'>$D$5（利益）</div><label>目標値</label><div class='input-like'>1000000</div><label>変化させるセル</label><div class='input-like'>$B$5（販売数量）</div><div class='dialog-buttons'><span>OK</span><span>キャンセル</span></div></div>"+
        cap;
      return fig;
    }

    if(type==="macro"){
      fig.innerHTML=
        "<div class='mock-title'>Excel for Microsoft 365 — マクロの記録</div>"+
        "<div class='mock-tabs'><span>ホーム</span><span>挿入</span><span>数式</span><span class='active'>表示</span><span>開発</span></div>"+
        "<div class='mock-ribbon'><span>表示設定</span><span class='highlight'>マクロ ▼<br>マクロの記録</span><span>ウィンドウ</span></div>"+
        "<div class='flow'><span>① 記録開始</span><b>→</b><span>② Excelを操作</span><b>→</b><span>③ 記録停止</span><b>→</b><span>④ 再実行</span></div>"+
        cap;
      return fig;
    }

    if(type==="pivot"){
      fig.innerHTML=
        "<div class='mock-title'>Excel for Microsoft 365 — ピボットテーブル</div>"+
        "<div class='pivot-mock'><div class='pivot-table'><b>行ラベル</b><b>売上 合計</b><span>営業部</span><span>1,250,000</span><span>開発部</span><span>980,000</span><strong>総計</strong><strong>2,230,000</strong></div><div class='field-list'><b>ピボットテーブルのフィールド</b><label>☑ 部門</label><label>☑ 売上</label><label>☐ 担当者</label><hr><span>行：部門</span><span>値：売上</span></div></div>"+
        cap;
      return fig;
    }

    if(type==="slicer"){
      fig.innerHTML=
        "<div class='mock-title'>Excel for Microsoft 365 — スライサー</div>"+
        "<div class='slicer-mock'><div class='pivot-mini'><b>部門</b><b>売上</b><span>営業</span><span>1,250,000</span><span>開発</span><span>980,000</span></div><div class='slicer-box'><b>担当者</b><button class='on'>山田</button><button>鈴木</button><button>佐藤</button></div></div>"+
        cap;
      return fig;
    }

    return null;
  }

  function sheet2(h1,h2,a1,b1,a2,b2,a3,b3){
    return "<div class='sheet-grid'>"+
      "<div class='corner'></div><div class='col'>A</div><div class='col'>B</div>"+
      "<div class='row'>1</div><div class='cell head'>"+escapeHtml(h1)+"</div><div class='cell head'>"+escapeHtml(h2)+"</div>"+
      "<div class='row'>2</div><div class='cell'>"+escapeHtml(a1)+"</div><div class='cell input'>"+escapeHtml(b1)+"</div>"+
      "<div class='row'>3</div><div class='cell'>"+escapeHtml(a2)+"</div><div class='cell preview'>"+escapeHtml(b2)+"</div>"+
      "<div class='row'>4</div><div class='cell'>"+escapeHtml(a3)+"</div><div class='cell preview'>"+escapeHtml(b3)+"</div>"+
      "</div>";
  }

  function loadReviewState(){
    try{
      return JSON.parse(localStorage.getItem(REVIEW_KEY) || "{}");
    }catch(e){
      return {};
    }
  }

  function saveReviewState(){
    try{
      localStorage.setItem(REVIEW_KEY,JSON.stringify(reviewState));
    }catch(e){}
  }

  function markReview(skillId,quality){
    const now=Date.now();
    const old=reviewState[skillId] || {level:0,due:now,hits:0,misses:0,lastQuality:null};

    let level=Number(old.level||0);
    let days=1;

    if(quality===2){
      level=Math.min(REVIEW_INTERVALS.length,level+1);
      days=REVIEW_INTERVALS[Math.max(0,level-1)];
      old.hits=Number(old.hits||0)+1;
    }else if(quality===1){
      level=Math.max(0,level-1);
      days=1;
      old.misses=Number(old.misses||0)+1;
    }else{
      level=0;
      days=1;
      old.misses=Number(old.misses||0)+1;
    }

    reviewState[skillId]={
      ...old,
      level,
      due:now+days*24*60*60*1000,
      last:now,
      lastQuality:quality
    };

    saveReviewState();
  }

  function dueSkillIds(){
    const now=Date.now();
    return Object.entries(reviewState)
      .filter(([,v])=>Number(v.due||0)<=now)
      .sort((a,b)=>Number(a[1].due||0)-Number(b[1].due||0))
      .map(([id])=>id);
  }

  function updateReviewCount(){
    const el=$("reviewCount");
    if(el)el.textContent=dueSkillIds().length;
  }

  function makeReviewQueue(ids){
    return ids.slice(0,10).map(id=>{
      const options=questions.filter(q=>q.skillId===id);
      return options[Math.floor(Math.random()*options.length)];
    }).filter(Boolean);
  }

  next.onclick=()=>{index++;if(index>=queue.length)finish();else render();};

  $("again").onclick=()=>start(shuffle(questions).slice(0,10));
  $("random10").onclick=()=>start(shuffle(questions).slice(0,10));
  $("allChoice").onclick=()=>start(questions.filter(q=>q.mode==="choice"));
  $("allPractice").onclick=()=>start(questions.filter(q=>q.mode==="practice"));

  $("recallMode").onclick=()=>{
    recallMode=!recallMode;
    localStorage.setItem(RECALL_KEY,recallMode?"1":"0");
    updateRecallButton();
    render();
  };

  function updateRecallButton(){
    const b=$("recallMode");
    if(!b)return;
    b.textContent="思い出しモード："+(recallMode?"ON":"OFF");
    b.classList.toggle("active-mode",recallMode);
  }

  $("reviewDue").onclick=()=>{
    const due=dueSkillIds();
    if(due.length){
      start(makeReviewQueue(due));
      return;
    }
    const tracked=Object.keys(reviewState);
    if(tracked.length){
      start(makeReviewQueue(shuffle(tracked)));
      return;
    }
    start(shuffle(questions).slice(0,5));
  };

  $("retryMissed").onclick=()=>{
    const ids=[...sessionMisses];
    if(!ids.length)return;
    const list=shuffle(questions.filter(q=>ids.includes(q.skillId)));
    start(list);
  };

  document.querySelectorAll("[data-domain]").forEach(b=>{
    b.onclick=()=>start(questions.filter(q=>q.domain===b.dataset.domain));
  });

  function finish(){
    quiz.classList.add("hidden");
    result.classList.remove("hidden");

    const total=Object.values(stats).reduce((n,s)=>n+s.total,0);
    score.textContent=total?points+" / "+total+" ("+Math.round(points/total*100)+"%)":"採点対象なし";
    breakdown.innerHTML="";

    if(calibration.rated){
      const cal=document.createElement("div");
      cal.className="calibration-summary";
      cal.innerHTML="<strong>自信度の振り返り</strong><p>高い自信で誤答："+calibration.highWrong+"件　／　低い自信で正解："+calibration.lowRight+"件</p><small>高自信の誤答は、知識の思い違いを見つける重要な復習対象です。</small>";
      breakdown.appendChild(cal);
    }

    Object.entries(stats).forEach(([d,s])=>{
      if(!s.total)return;
      const r=document.createElement("div");
      r.className="domain-row";
      r.innerHTML="<span>"+escapeHtml(d)+"</span><strong>"+s.correct+" / "+s.total+"</strong>";
      breakdown.appendChild(r);
    });

    if(sessionMisses.size){
      $("retryMissed").classList.remove("hidden");
    }else{
      $("retryMissed").classList.add("hidden");
    }

    updateReviewCount();
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

  // 初回表示でも必ず問題が見えるようにする。
  start(shuffle(questions).slice(0,5));
})();