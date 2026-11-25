const defaultProjects = [
  {
    id: 1,
    title: "Revitalização da quadra",
    description: "Pintar as linhas da quadra, melhorar a iluminação e fazer pequenos reparos.",
    school: "Escola Municipal Horizonte",
    image: "/img/quadra.png",
    maxMembers: 10, members: 8, status: "approved", author: "Maria Oliveira"
  },
  {
    id: 2,
    title: "Horta comunitária",
    description: "Criar uma horta para atividades educativas e integração dos alunos.",
    school: "Colégio Nova Geração",
    image: "/img/horta.jpg",
    maxMembers: 10, members: 5, status: "approved", author: "Lucas Santos"
  },
  {
    id: 3,
    title: "Espaço de estudos colaborativo",
    description: "Criar uma sala para estudos em grupo utilizando móveis que estão sem uso.",
    school: "Escola do Futuro SLLKO ",
    image: "/img/coworking.jpeg",
    maxMembers: 6, members: 0, status: "pending", author: "Ana Silva"
  }
];

let projects = JSON.parse(localStorage.getItem("projects")) || defaultProjects;

function openCreateProject() {
  openModal("projectModal");
}

function createProject() {
  const title = document.getElementById("projectTitle").value.trim();
  const description = document.getElementById("projectDescription").value.trim();
  const image = document.getElementById("projectImage").value.trim();
  const maxMembers = parseInt(document.getElementById("projectMax").value);
  const school = document.getElementById("projectSchool").value.trim();

  if (!title || !description) {
    showToast("Preencha o nome e a descrição do projeto.");
    return;
  }

  if (!maxMembers || maxMembers < 1) {
    showToast("Informe um número válido de integrantes.");
    return;
  }

  const project = {
    id: Date.now(),
    title, description, image,
    school: school || "Minha escola",
    maxMembers, members: 0, status: "pending", author: "Ana Silva"
  };

  projects.unshift(project);
  saveData();
  renderProjects();
  renderModeration();
  closeModal("projectModal");
  showToast("Projeto enviado para moderação.");
  clearProjectForm();
}

function clearProjectForm() {
  document.getElementById("projectTitle").value = "";
  document.getElementById("projectDescription").value = "";
  document.getElementById("projectImage").value = "";
  document.getElementById("projectMax").value = "10";
  document.getElementById("projectSchool").value = "";
}

function renderProjects() {
  const container = document.getElementById("projectsList");
  if (!container) return;
  container.innerHTML = "";

  const approved = projects.filter(p => p.status === "approved");

  if (approved.length === 0) {
    container.innerHTML = `<div class="right-card">Nenhum projeto aprovado ainda.</div>`;
    return;
  }

  approved.forEach(project => {
    const percentage = Math.min(100, (project.members / project.maxMembers) * 100);

    container.innerHTML += `
      <article class="post">
        <span class="tag tag-project">Projeto aprovado</span>
        <h2>${escapeHTML(project.title)}</h2>
        <p class="post-description">${escapeHTML(project.description)}</p>
        ${project.image ? `<img class="post-image" src="${escapeAttribute(project.image)}" alt="Imagem do projeto" />` : ""}
        <div class="project-card">
          <div style="display:flex;justify-content:space-between;">
            <strong>Equipe</strong>
            <span>${project.members}/${project.maxMembers}</span>
          </div>
          <div class="project-progress"><div style="width:${percentage}%"></div></div>
          <div class="project-footer">
            <small>👤 Criado por ${escapeHTML(project.author)}</small>
            ${project.members < project.maxMembers
              ? `<button class="btn btn-primary" onclick="joinProject(${project.id})">Quero participar</button>`
              : `<span style="color:#dc2626;font-weight:bold;">Equipe completa</span>`}
          </div>
        </div>
      </article>
    `;
  });
}

function joinProject(id) {
  const project = projects.find(p => p.id === id);
  if (!project) return;

  if (project.members >= project.maxMembers) {
    showToast("Este projeto já possui o número máximo de participantes.");
    return;
  }

  project.members++;
  saveData();
  renderProjects();
  createNotification(`Você entrou no projeto "${project.title}".`);
  showToast("Você entrou na equipe!");
}