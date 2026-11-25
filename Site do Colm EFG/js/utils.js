function saveData() {
  localStorage.setItem("posts", JSON.stringify(posts));
  localStorage.setItem("projects", JSON.stringify(projects));
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function closeModal(id) {
  document.getElementById(id).classList.remove("show");
}

function openModal(id) {
  document.getElementById(id).classList.add("show");
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHTML(value);
}