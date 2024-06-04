class WebSocketManager {
  constructor(token) {
    this.ws = null;
    this.messageListeners = [];
    this.isConnected = false;
    this.isAuthenticated = false;
    this.token = token;
  }

  connect() {
    this.ws = new WebSocket("ws://localhost:5000");

    this.ws.onopen = () => {
      this.isConnected = true;
      console.log("WebSocket connection established.");

      // Gửi thông điệp xác thực chứa token ngay sau khi kết nối
      const authMessage = { type: "authenticate", token: this.token };
      this.ws.send(JSON.stringify(authMessage));
    };

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      // Xử lý thông điệp xác thực
      if (message.type === "authenticated") {
        if (message.success) {
          this.isAuthenticated = true;
          console.log("WebSocket authenticated.");
        } else {
          console.error("WebSocket authentication failed.");
          this.ws.close();
        }
      }

      // Gọi các callback đã đăng ký nếu đã xác thực thành công
      if (this.isAuthenticated) {
        this.messageListeners.forEach((callback) => callback(message));
      }
    };

    this.ws.onclose = () => {
      this.isConnected = false;
      this.isAuthenticated = false;
      console.log("WebSocket connection closed.");
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  sendAction(action) {
    if (this.isConnected && this.ws.readyState === WebSocket.OPEN) {
      if (this.isAuthenticated) {
        const payload = { ...action };
        this.ws.send(JSON.stringify(payload));
      } else {
        console.error("WebSocket is not authenticated.");
      }
    } else {
      console.error("WebSocket is not connected.");
    }
  }

  addMessageListener(callback) {
    this.messageListeners.push(callback);
  }

  removeMessageListener(callback) {
    this.messageListeners = this.messageListeners.filter(
      (listener) => listener !== callback
    );
  }
}

export default WebSocketManager;
