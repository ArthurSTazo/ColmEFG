function renderGroups() {
  const container = document.getElementById("groupsList");
  if (!container) return;
  container.innerHTML = "";

  const joined = projects.filter(p => p.status === "approved" && p.members > 0);

  if (joined.length === 0) {
    container.innerHTML = `
      <div class="right-card">
        <h3>💬 Seus grupos</h3>
        <p>Quando você entrar em um projeto, o grupo da equipe aparecerá aqui.</p>
      </div>
    `;
    return;
  }

  joined.forEach(project => {
    container.innerHTML += `
      <div class="post">
        <h2>💬 ${escapeHTML(project.title)}</h2>
        <p class="post-description">Grupo da equipe • ${project.members} participantes</p>
        <button class="btn btn-primary" style="margin-top:15px"
                onclick="openChat('${escapeAttribute(project.title)}')">
          Abrir conversa
        </button>
      </div>
    `;
  });
}

function openChat(title) {
  document.getElementById("chatTitle").innerText = "💬 " + title;
  openModal("chatModal");
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  if (!text) return;

  const messages = document.getElementById("chatMessages");
  messages.innerHTML += `
    <div class="message me">
      <div class="message-author">Você</div>
      <div class="message-content">${escapeHTML(text)}</div>
    </div>
  `;
  input.value = "";
  messages.scrollTop = messages.scrollHeight;
}