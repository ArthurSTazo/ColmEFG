function toggleNotifications() {
  document.getElementById("notificationPanel").classList.toggle("show");
}

function createNotification(message) {
  const container = document.getElementById("notifications");
  container.innerHTML =
    `<div class="notification-item">🔔 ${escapeHTML(message)}</div>` +
    container.innerHTML;
  document.getElementById("notificationCount").innerText = "1";
}