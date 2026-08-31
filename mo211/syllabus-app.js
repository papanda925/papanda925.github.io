(() => {
  const root = document.getElementById("syllabusRoot");
  const data = window.MO211_SYLLABUS || [];
  let skillCount = 0;

  data.forEach(domain => {
    const section = document.createElement("section");
    section.className = "syllabus-domain panel";

    const head = document.createElement("div");
    head.className = "syllabus-domain-head";
    head.innerHTML = "<div><span class=\"pill\">" + domain.id + "</span><h2>" + escapeHtml(domain.title) + "</h2></div><strong>" + domain.weight + "</strong>";
    section.appendChild(head);

    domain.sections.forEach(mid => {
      const block = document.createElement("div");
      block.className = "syllabus-mid";
      block.innerHTML = "<h3><span>" + mid.id + "</span>" + escapeHtml(mid.title) + "</h3>";

      const list = document.createElement("ol");
      list.className = "skill-list";
      mid.skills.forEach(skill => {
        skillCount++;
        const li = document.createElement("li");
        li.innerHTML = "<code>" + skill.id + "</code><span>" + escapeHtml(skill.title) + "</span>";
        list.appendChild(li);
      });
      block.appendChild(list);
      section.appendChild(block);
    });

    root.appendChild(section);
  });

  document.getElementById("skillCount").textContent = skillCount;

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
