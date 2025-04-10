const WebSocket = require("ws");
const { v4: uuidv4 } = require("uuid");
const Message = require("../models/messageModel");

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });
  const activeConnections = new Map();

  // Heartbeat
  const heartbeatInterval = setInterval(() => {
    wss.clients.forEach((ws) => {
      if (!ws.isAlive) return ws.terminate();
      ws.isAlive = false;
      ws.ping();
    });
  }, 30000);

  wss.on("connection", (ws, req) => {
    const connectionId = uuidv4();
    ws.connectionId = connectionId;
    ws.isAlive = true;

    const clientInfo = {
      id: connectionId,
      ip: req.socket.remoteAddress,
      connectedAt: new Date(),
    };
    activeConnections.set(connectionId, clientInfo);

    ws.send(JSON.stringify({ type: "connection_established", data: { connectionId } }));

    ws.on("message", async (message) => {
      try {
        const data = JSON.parse(message);
        if (data.type === "send_message") {
          const { text, sender } = data;
          const newMessage = new Message({ text, sender });
          const savedMessage = await newMessage.save();

          broadcast(wss, {
            type: "new_message",
            data: savedMessage,
          });
        }
      } catch (err) {
        ws.send(JSON.stringify({ type: "error", data: err.message }));
      }
    });

    ws.on("pong", () => (ws.isAlive = true));
    ws.on("close", () => activeConnections.delete(connectionId));
    ws.on("error", () => activeConnections.delete(connectionId));
  });

  wss.on("close", () => clearInterval(heartbeatInterval));

  function broadcast(wss, message) {
    const msgString = JSON.stringify(message);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msgString);
      }
    });
  }

  return wss;
}

module.exports = setupWebSocket;
