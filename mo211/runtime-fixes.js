(() => {
  // app.js owns quiz state inside a closure. After a session finishes, its current index is
  // one past the end of the queue, so re-rendering from the original recall-mode handler can
  // dereference an undefined question. Replace only that public toggle behavior safely.
  const button = document.getElementById("recallMode");
  if (!button) return;

  button.onclick = () => {
    const key = "mo211-recall-mode";
    const next = localStorage.getItem(key) === "1" ? "0" : "1";
    localStorage.setItem(key, next);
    // Reloading restarts a small five-question practice set and keeps the setting persistent.
    location.reload();
  };
})();