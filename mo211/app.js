(() => {
  const all = window.MO211_QUESTIONS || [];
  const startBtn = document.getElementById("startBtn");
  const practiceBtn = document.getElementById("practiceBtn");
  const quizSection = document.getElementById("quizSection");
  const resultSection = document.getElementById("resultSection");
  const modeLabel = document.getElementById("modeLabel");
  const questionTitle = document.getElementById("questionTitle");
  const domainLabel = document.getElementById("domainLabel");
  const questionBody = document.getElementById("questionBody");
  const answerArea = document.getElementById("answerArea");
  const showAnswerBtn = document.getElementById("showAnswerBtn");
  const nextBtn = document.getElementById("nextBtn");
  const retryBtn = document.getElementById("retryBtn");
  const progressText = document.getElementById("progressText");
  const progressBar = document.getElementById("progressBar");
  const resultText = document.getElementById("resultText");
  const domainResult = document.getElementById("domainResult");

  let queue = [];
  let index = 0;
  let score = 0;
  let answered = false;
  let stats = {};

  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

  function resetStats() {
    stats = {};
    all.forEach(q => {
      if (!stats[q.domain]) stats[q.domain] = { correct: 0, total: 0 };
    });
  }

  function start(mode) {
    resetStats();
    index = 0;
    score = 0;
    answered = false;
    resultSection.classList.add("hidden");

    if (mode === "practice") {
      queue = all.filter(q => q.mode === "practice");
    } else {
      const choices = shuffle(all.filter(q => q.mode === "choice")).slice(0, 7);
      const practices = shuffle(all.filter(q => q.mode === "practice")).slice(0, 3);
      queue = shuffle([...choices, ...practices]);
    }

    quizSection.classList.remove("hidden");
    quizSection.scrollIntoView({ behavior: "smooth", block: "start" });
    render();
  }

  function render() {
    const q = queue[index];
    answered = false;
    answerArea.innerHTML = "";
    nextBtn.classList.add("hidden");
    showAnswerBtn.classList.add("hidden");

    modeLabel.textContent = q.mode === "choice" ? "知識チェック" : "実技課題";
    questionTitle.textContent = q.title;
    domainLabel.textContent = "分野: " + q.domain;
    progressText.textContent = (index + 1) + " / " + queue.length;
    progressBar.style.width = ((index + 1) / queue.length * 100) + "%";

    if (q.mode === "choice") {
      questionBody.textContent = q.prompt;
      const box = document.createElement("div");
      box.className = "options";
      q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "option";
        btn.textContent = String.fromCharCode(65 + i) + ". " + opt;
        btn.addEventListener("click", () => choose(i));
        box.appendChild(btn);
      });
      answerArea.appendChild(box);
    } else {
      questionBody.innerHTML = "<p>" + escapeHtml(q.prompt) + "</p>" +
        "<ol class=\"practice-steps\">" + q.steps.map(s => "<li>" + escapeHtml(s) + "</li>").join("") + "</ol>";
      showAnswerBtn.classList.remove("hidden");
    }
  }

  function choose(selected) {
    if (answered) return;
    answered = true;
    const q = queue[index];
    const buttons = [...answerArea.querySelectorAll(".option")];
    buttons.forEach((b, i) => {
      b.disabled = true;
      if (i === q.answer) b.classList.add("correct");
      if (i === selected && i !== q.answer) b.classList.add("wrong");
    });

    stats[q.domain].total++;
    if (selected === q.answer) {
      score++;
      stats[q.domain].correct++;
    }

    const exp = document.createElement("div");
    exp.className = "explanation";
    exp.innerHTML = "<strong>" + (selected === q.answer ? "正解" : "確認ポイント") + "</strong><p>" + escapeHtml(q.explanation) + "</p>";
    answerArea.appendChild(exp);
    nextBtn.classList.remove("hidden");
  }

  showAnswerBtn.addEventListener("click", () => {
    if (answered) return;
    answered = true;
    const q = queue[index];
    showAnswerBtn.classList.add("hidden");

    const exp = document.createElement("div");
    exp.className = "explanation";
    exp.innerHTML = "<strong>解答・確認ポイント</strong><p>" + escapeHtml(q.answerText) + "</p>" +
      "<div class=\"self-check\"><span>自分でできましたか？</span>" +
      "<button data-value=\"1\">できた</button><button data-value=\"0\">要復習</button></div>";
    answerArea.appendChild(exp);

    exp.querySelectorAll(".self-check button").forEach(btn => {
      btn.addEventListener("click", () => {
        if (btn.parentElement.dataset.checked) return;
        btn.parentElement.dataset.checked = "1";
        const val = Number(btn.dataset.value);
        stats[q.domain].total++;
        if (val === 1) {
          score++;
          stats[q.domain].correct++;
        }
        btn.parentElement.querySelectorAll("button").forEach(b => b.disabled = true);
        nextBtn.classList.remove("hidden");
      });
    });
  });

  nextBtn.addEventListener("click", () => {
    index++;
    if (index >= queue.length) finish();
    else render();
  });

  retryBtn.addEventListener("click", () => start("mixed"));
  startBtn.addEventListener("click", () => start("mixed"));
  practiceBtn.addEventListener("click", () => start("practice"));

  function finish() {
    quizSection.classList.add("hidden");
    resultSection.classList.remove("hidden");
    const total = Object.values(stats).reduce((n, s) => n + s.total, 0);
    resultText.textContent = total ? score + " / " + total + " (" + Math.round(score / total * 100) + "%)" : "採点対象なし";

    domainResult.innerHTML = "";
    Object.entries(stats).forEach(([domain, s]) => {
      if (!s.total) return;
      const row = document.createElement("div");
      row.className = "domain-row";
      row.innerHTML = "<span>" + escapeHtml(domain) + "</span><strong>" + s.correct + " / " + s.total + "</strong>";
      domainResult.appendChild(row);
    });

    resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
