// script.js
document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user-message");
  input.value = "";
  botReply(message);
}

function addMessage(text, className) {
  const chat = document.getElementById("chat-container");
  const msg = document.createElement("div");
  msg.className = className;
  msg.textContent = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

async function botReply(input) {
    try {
      const response = await fetch("https://advanced-ai-backend.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });
      const data = await response.json();
      addMessage(data.reply, "bot-message");
    } catch (error) {
      addMessage("Oops! The bot is currently unavailable.", "bot-message");
      console.error(error);
    }
  }
  

function handleQuickReply(topic) {
  document.getElementById("user-input").value = topic;
  sendMessage();
}
