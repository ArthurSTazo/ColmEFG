function renderModeration() {
  const container = document.getElementById("moderationList");
  if (!container) return;
  container.innerHTML = "";

  const pending = projects.filter(p => p.status === "pending");

  if (pending.length === 0) {
    container.innerHTML = `
      <div class="right-card">
        <h3>✅ Tudo certo!</h3>
        <p>Não existem projetos aguardando moderação.</p>
      </div>
    `;
    return;
  }

  pending.forEach(project => {
    container.innerHTML += `
      <div class="moderation-item">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <h3>${escapeHTML(project.title)}</h3>
          <span class="moderation-status">Aguardando análise</span>
        </div>
        <p style="margin-top:10px;color:#64748b;line-height:1.5;">${escapeHTML(project.description)}</p>
        <p style="margin-top:10px;font-size:13px;">👤 Autor: ${escapeHTML(project.author)}</p>
        <p style="margin-top:5px;font-size:13px;">🏫 Escola: ${escapeHTML(project.school)}</p>
        <p style="margin-top:5px;font-size:13px;">👥 Máximo: ${project.maxMembers} participantes</p>
        ${project.image ? `<img src="${escapeAttribute(project.image)}" style="width:100%;max-height:220px;object-fit:cover;border-radius:10px;margin-top:12px;" />` : ""}
        <div class="moderation-buttons">
          <button class="btn btn-success" onclick="moderateProject(${project.id}, 'approved')">✓ Aprovar</button>
          <button class="btn btn-danger" onclick="moderateProject(${project.id}, 'rejected')">✕ Recusar</button>
        </div>
      </div>
    `;
  });
}

function moderateProject(id, status) {
  const project = projects.find(p => p.id === id);
  if (!project) return;

  project.status = status;
  saveData();
  renderModeration();
  renderProjects();

  if (status === "approved") {
    createNotification(`Seu projeto "${project.title}" foi aprovado pela moderação.`);
    showToast("Projeto aprovado! E-mail de aprovação enviado.");
  } else {
    createNotification(`Seu projeto "${project.title}" foi recusado pela moderação.`);
    showToast("Projeto recusado. E-mail de notificação enviado.");
  }
}