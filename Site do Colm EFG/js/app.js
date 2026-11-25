const pageCache = {};

async function loadPage(pageName) {
  const mainContent = document.getElementById("mainContent");

  if (pageCache[pageName]) {
    mainContent.innerHTML = pageCache[pageName];
    return;
  }

  try {
    const response = await fetch(`pages/${pageName}.html`);
    const html = await response.text();
    pageCache[pageName] = html;
    mainContent.innerHTML = html;
  } catch (error) {
    console.error("Erro ao carregar página:", error);
    mainContent.innerHTML = `<div class="right-card">Erro ao carregar página.</div>`;
  }
}

async function showPage(page) {
  document.querySelectorAll(".menu-item").forEach(i => i.classList.remove("active"));
  const activeItem = document.querySelector(`.menu-item[data-page="${page}"]`);
  if (activeItem) activeItem.classList.add("active");

  const pageMap = { feed: "feed", projects: "projects", groups: "groups", moderation: "moderation" };
  const file = pageMap[page];
  if (!file) return;

  await loadPage(file);

  if (page === "feed") renderFeed();
  if (page === "projects") renderProjects();
  if (page === "groups") renderGroups();
  if (page === "moderation") renderModeration();
}

document.addEventListener("DOMContentLoaded", () => {
  showPage("feed");
});