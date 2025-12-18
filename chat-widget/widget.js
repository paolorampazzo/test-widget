(function () {
  // Prevent loading twice
  if (window.__CHAT_WIDGET_LOADED__) return;
  window.__CHAT_WIDGET_LOADED__ = true;

  // Read config from script tag
  const script = document.currentScript;
  const API_URL = script.dataset.apiUrl;

  if (!API_URL) {
    console.error("Chat widget: data-api-url is required");
    return;
  }

  // Inject styles
  const style = document.createElement("style");
  style.innerHTML = `
    #chat-widget-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #2563eb;
      color: white;
      border-radius: 50%;
      width: 56px;
      height: 56px;
      border: none;
      cursor: pointer;
      font-size: 22px;
      z-index: 9999;
    }

    #chat-widget {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 320px;
      height: 420px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
      display: none;
      flex-direction: column;
      font-family: system-ui, sans-serif;
      z-index: 9999;
    }

    #chat-header {
      padding: 12px;
      font-weight: bold;
      background: #2563eb;
      color: white;
      border-radius: 12px 12px 0 0;
    }

    #chat-messages {
      flex: 1;
      padding: 10px;
      overflow-y: auto;
      font-size: 14px;
    }

    .chat-msg {
      margin-bottom: 8px;
    }

    .user {
      text-align: right;
      color: #111;
    }

    .bot {
      text-align: left;
      color: #2563eb;
    }

    #chat-input {
      border: none;
      border-top: 1px solid #eee;
      padding: 10px;
      font-size: 14px;
      outline: none;
    }
  `;
  document.head.appendChild(style);

  // Create UI
  const btn = document.createElement("button");
  btn.id = "chat-widget-btn";
  btn.innerText = "💬";

  const widget = document.createElement("div");
  widget.id = "chat-widget";
  widget.innerHTML = `
    <div id="chat-header">Chat</div>
    <div id="chat-messages"></div>
    <input id="chat-input" placeholder="Type a message..." />
  `;

  document.body.appendChild(btn);
  document.body.appendChild(widget);

  // Toggle widget
  btn.onclick = () => {
    widget.style.display =
      widget.style.display === "flex" ? "none" : "flex";
  };

  const input = widget.querySelector("#
