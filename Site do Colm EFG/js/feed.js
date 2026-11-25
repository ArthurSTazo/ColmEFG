const defaultPosts = [
  {
    id: 1,
    author: "Maria Oliveira",
    initials: "MO",
    type: "problem",
    title: "Iluminação da quadra está com problemas",
    description: "Algumas lâmpadas da quadra estão queimadas há algumas semanas. À noite fica difícil utilizar o espaço para atividades.",
    school: "Escola do Futuro SLLKO",
    image: "/img/quadra.png",
    likes: 12,
    comments: 4
  },
  {
    id: 2,
    author: "Lucas Santos",
    initials: "LS",
    type: "suggestion",
    title: "Criar uma área de leitura no pátio",
    description: "Poderíamos instalar alguns bancos e criar uma pequena área de leitura no pátio durante os intervalos.",
    school: "Escola do Futuro SLLKO",
    image: "/img/biblioteca.jpg",
    likes: 25,
    comments: 8
  }
];

let posts = JSON.parse(localStorage.getItem("posts")) || defaultPosts;

function openCreatePost() {
  openModal("postModal");
}

function createPost() {
  const type = document.getElementById("postType").value;
  const title = document.getElementById("postTitle").value.trim();
  const description = document.getElementById("postDescription").value.trim();
  const image = document.getElementById("postImage").value.trim();
  const school = document.getElementById("postSchool").value.trim();

  if (!title || !description) {
    showToast("Preencha o título e a descrição.");
    return;
  }

  const post = {
    id: Date.now(),
    author: "Ana Silva",
    initials: "AS",
    type, title, description,
    school: school || "Minha escola",
    image, likes: 0, comments: 0
  };

  posts.unshift(post);
  saveData();
  renderFeed();
  closeModal("postModal");
  showToast("Publicação criada com sucesso!");

  document.getElementById("postTitle").value = "";
  document.getElementById("postDescription").value = "";
  document.getElementById("postImage").value = "";
  document.getElementById("postSchool").value = "";
}

function renderFeed() {
  const feed = document.getElementById("feed");
  if (!feed) return;
  feed.innerHTML = "";

  posts.forEach(post => {
    const tagClass = post.type === "problem" ? "tag-problem" : "tag-suggestion";
    const tagText = post.type === "problem" ? "Problema" : "Sugestão";

    feed.innerHTML += `
      <article class="post">
        <div class="post-header">
          <div class="avatar">${post.initials}</div>
          <div>
            <div class="post-author">${escapeHTML(post.author)}</div>
            <div class="post-meta">${escapeHTML(post.school)} • agora</div>
          </div>
        </div>
        <span class="tag ${tagClass}">${tagText}</span>
        <h2>${escapeHTML(post.title)}</h2>
        <p class="post-description">${escapeHTML(post.description)}</p>
        ${post.image ? `<img class="post-image" src="${escapeAttribute(post.image)}" alt="Imagem da publicação" />` : ""}
        <div class="post-actions">
          <button onclick="likePost(${post.id})">❤️ ${post.likes}</button>
          <button>💬 ${post.comments}</button>
          <button>↗️ Compartilhar</button>
        </div>
      </article>
    `;
  });
}

function likePost(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;
  post.likes++;
  saveData();
  renderFeed();
}

