(() => {
  // app.js owns quiz state inside a closure. After a session finishes, its current index is
  // one past the end of the queue, so the original recall-mode handler would re-render an
  // undefined question. Preserve the original behavior during an active session and use a
  // safe reload only from the result screen.
  const button = document.getElementById("recallMode");
  const result = document.getElementById("result");
  if (!button) return;

  const originalHandler = button.onclick;
  button.onclick = () => {
    if (!result || result.classList.contains("hidden")) {
      if (typeof originalHandler === "function") originalHandler();
      return;
    }

    const key = "mo211-recall-mode";
    const next = localStorage.getItem(key) === "1" ? "0" : "1";
    localStorage.setItem(key, next);
    location.reload();
  };
})();