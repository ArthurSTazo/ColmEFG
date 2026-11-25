/* ============================================
   ALTERNAR ABAS (login / cadastro)
============================================ */
function switchTab(tab) {
  const isLogin = tab === "login";

  document.getElementById("tabLogin").classList.toggle("active", isLogin);
  document.getElementById("tabRegister").classList.toggle("active", !isLogin);

  document.getElementById("loginForm").classList.toggle("hidden", !isLogin);
  document.getElementById("registerForm").classList.toggle("hidden", isLogin);

  clearMessage();
}


/* ============================================
   MOSTRAR / ESCONDER SENHA
============================================ */
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const isPassword = input.type === "password";

  input.type = isPassword ? "text" : "password";
  btn.textContent = isPassword ? "🙈" : "👁️";
}


/* ============================================
   MENSAGENS
============================================ */
function showMessage(text, type = "error") {
  const el = document.getElementById("message");
  el.textContent = text;
  el.className = "message show " + type;
}

function clearMessage() {
  const el = document.getElementById("message");
  el.className = "message";
  el.textContent = "";
}


/* ============================================
   LOGIN
============================================ */
function handleLogin(event) {
  event.preventDefault();

  const email = document
    .getElementById("loginEmail")
    .value
    .trim()
    .toLowerCase();

  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    showMessage("Preencha e-mail e senha.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email);

  if (!user) {
    showMessage("E-mail não cadastrado. Crie uma conta.");
    return;
  }

  if (user.password !== password) {
    showMessage("Senha incorreta. Tente novamente.");
    return;
  }

  // Salva a sessão
  const session = {
    name: user.name,
    email: user.email,
    school: user.school,
    initials: getInitials(user.name)
  };

  localStorage.setItem("currentUser", JSON.stringify(session));

  showMessage(
    `Bem-vindo(a), ${user.name.split(" ")[0]}! Redirecionando...`,
    "success"
  );

  setTimeout(() => {
    window.location.href = "index.html";
  }, 900);
}


/* ============================================
   CADASTRO
============================================ */
function handleRegister(event) {
  event.preventDefault();

  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim().toLowerCase();
  const school = document.getElementById("regSchool").value.trim();
  const password = document.getElementById("regPassword").value;
  const confirm = document.getElementById("regConfirm").value;

  if (!name || !email || !school || !password) {
    showMessage("Preencha todos os campos.");
    return;
  }

  if (password.length < 6) {
    showMessage("A senha precisa ter pelo menos 6 caracteres.");
    return;
  }

  if (password !== confirm) {
    showMessage("As senhas não coincidem.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some(u => u.email === email)) {
    showMessage("Este e-mail já está cadastrado. Faça login.");
    return;
  }

  users.push({ name, email, school, password });
  localStorage.setItem("users", JSON.stringify(users));

  showMessage("Conta criada com sucesso! Faça login.", "success");

  setTimeout(() => {
    switchTab("login");
    document.getElementById("loginEmail").value = email;
    document.getElementById("loginPassword").focus();
  }, 1200);
}


/* ============================================
   LOGIN SOCIAL (mock)
============================================ */
function socialLogin(provider) {
  showMessage(
    `Login com ${provider} ainda não está disponível. Use e-mail e senha.`
  );
}


/* ============================================
   UTILITÁRIOS
============================================ */
function getInitials(fullName) {
  const parts = fullName.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}


/* ============================================
   AUTO-LOGIN
   Se o usuário já estiver logado, vai direto pro index
============================================ */
document.addEventListener("DOMContentLoaded", () => {
  const current = localStorage.getItem("currentUser");

  if (current) {
    window.location.href = "index.html";
  }
});