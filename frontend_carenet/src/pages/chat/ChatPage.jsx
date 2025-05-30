import React, { useState, useEffect, useRef } from "react";
import { Layout, List, Input, Button, Avatar, Select, Empty } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
import io from "socket.io-client";

const { Sider, Content } = Layout;
const { Option } = Select;

const mockUsers = {
  admin: [
    {
      _id: "admin1",
      fullname: "Admin One",
      email: "admin1@example.com",
      avatar: null,
      role: "admin",
    },
    {
      _id: "admin2",
      fullname: "Admin Two",
      email: "admin2@example.com",
      avatar: null,
      role: "admin",
    },
  ],
  organization: [
    {
      _id: "org1",
      fullname: "CareNet Org",
      email: "org1@example.com",
      avatar: null,
      role: "organization",
    },
    {
      _id: "org2",
      fullname: "Hope Foundation",
      email: "org2@example.com",
      avatar: null,
      role: "organization",
    },
  ],
  user: [
    {
      _id: "user1",
      fullname: "User One",
      email: "user1@example.com",
      avatar: null,
      role: "user",
    },
    {
      _id: "user2",
      fullname: "User Two",
      email: "user2@example.com",
      avatar: null,
      role: "user",
    },
  ],
};

const mockChats = [
  { _id: "chat1", participants: [{ _id: "user1" }, { _id: "admin1" }] },
  { _id: "chat2", participants: [{ _id: "user1" }, { _id: "org1" }] },
  { _id: "chat3", participants: [{ _id: "user1" }, { _id: "user2" }] },
];

const mockMessages = [
  {
    _id: "msg1",
    chatId: "chat1",
    sender: { _id: "user1" },
    message: "Xin chào Admin!",
    createdAt: "2025-05-23T11:30:00Z",
  },
  {
    _id: "msg2",
    chatId: "chat1",
    sender: { _id: "admin1" },
    message: "Chào bạn!",
    createdAt: "2025-05-23T11:31:00Z",
  },
  {
    _id: "msg3",
    chatId: "chat2",
    sender: { _id: "user1" },
    message: "CareNet, bạn khỏe không?",
    createdAt: "2025-05-23T11:32:00Z",
  },
  {
    _id: "msg4",
    chatId: "chat2",
    sender: { _id: "org1" },
    message: "Khỏe, cảm ơn bạn!",
    createdAt: "2025-05-23T11:33:00Z",
  },
  {
    _id: "msg5",
    chatId: "chat3",
    sender: { _id: "user1" },
    message: "Hey, User Two!",
    createdAt: "2025-05-23T11:34:00Z",
  },
  {
    _id: "msg6",
    chatId: "chat3",
    sender: { _id: "user2" },
    message: "Hi, what's up?",
    createdAt: "2025-05-23T11:35:00Z",
  },
];

const ChatPage = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("user");
  const [searchText, setSearchText] = useState("");
  const socket = useRef();
  const scrollRef = useRef();

  const currentUser = { _id: "user1" };

  const styles = {
    layout: {
      height: "370px",
      width: "900px",
      margin: "auto",
      background: "#f5f5f5",
    },
    sider: { background: "#fff", padding: "8px", width: 180 },
    content: { background: "#fff", margin: "8px", padding: "8px" },
    messageList: {
      height: "300px",
      overflowY: "auto",
      padding: "8px",
      background: "#f9f9f9",
      borderRadius: "4px",
    },
    message: (isSender) => ({
      display: "flex",
      justifyContent: isSender ? "flex-end" : "flex-start",
      marginBottom: 6,
    }),
    messageBubble: (isSender) => ({
      background: isSender ? "#1890ff" : "#f0f2f5",
      color: isSender ? "#fff" : "#000",
      padding: "4px 8px",
      borderRadius: "8px",
      maxWidth: "80%",
      fontSize: "12px",
    }),
    input: { display: "flex", marginTop: 8 },
  };

  useEffect(() => {
    socket.current = io("http://localhost:5000");
    socket.current.on("newMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => socket.current.disconnect();
  }, []);

  useEffect(() => {
    setUsers(mockUsers[selectedRole] || []);
  }, [selectedRole]);

  useEffect(() => {
    if (currentChat) {
      setMessages(mockMessages.filter((msg) => msg.chatId === currentChat._id));
    }
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !currentChat) return;
    const messageData = {
      _id: `msg${Date.now()}`,
      chatId: currentChat._id,
      sender: { _id: currentUser._id },
      message: newMessage,
      createdAt: new Date().toISOString(),
    };
    socket.current.emit("sendMessage", messageData);
    setMessages([...messages, messageData]);
    setNewMessage("");
  };

  const handleSelectUser = (userId) => {
    const chat = mockChats.find(
      (c) =>
        c.participants.some((p) => p._id === currentUser._id) &&
        c.participants.some((p) => p._id === userId)
    );
    if (chat) {
      setCurrentChat(chat);
    } else {
      const newChat = {
        _id: `chat${Date.now()}`,
        participants: [{ _id: currentUser._id }, { _id: userId }],
      };
      mockChats.push(newChat);
      setCurrentChat(newChat);
    }
  };

  return (
    <Layout style={styles.layout}>
      <Sider style={styles.sider}>
        <Select
          style={{ width: "100%", marginBottom: 6 }}
          value={selectedRole}
          onChange={setSelectedRole}
          size="small"
        >
          <Option value="user">Người dùng</Option>
          <Option value="admin">Admin</Option>
          <Option value="organization">Tổ chức</Option>
        </Select>
        <Input.Search
          placeholder="Tìm..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: 6 }}
          size="small"
        />
        <List
          dataSource={users.filter((user) =>
            user.fullname?.toLowerCase().includes(searchText.toLowerCase())
          )}
          renderItem={(user) => (
            <List.Item
              onClick={() => handleSelectUser(user._id)}
              style={{ cursor: "pointer", padding: "4px" }}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src={user.avatar} icon={<UserOutlined />} size={24} />
                }
                title={
                  <span style={{ fontSize: "12px" }}>{user.fullname}</span>
                }
              />
            </List.Item>
          )}
        />
      </Sider>
      <Layout>
        <Content style={styles.content}>
          {currentChat ? (
            <>
              <div style={styles.messageList}>
                {messages.map((message) => (
                  <div
                    key={message._id}
                    style={styles.message(
                      message.sender._id === currentUser._id
                    )}
                    ref={scrollRef}
                  >
                    <div
                      style={styles.messageBubble(
                        message.sender._id === currentUser._id
                      )}
                    >
                      <div>{message.message}</div>
                      <div style={{ fontSize: 8, opacity: 0.6 }}>
                        {new Date(message.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={styles.input}>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onPressEnter={handleSendMessage}
                  placeholder="Tin nhắn..."
                  style={{ marginRight: 6, fontSize: "12px" }}
                  size="small"
                />
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSendMessage}
                  size="small"
                >
                  Gửi
                </Button>
              </div>
            </>
          ) : (
            <Empty description="Chọn người dùng" imageStyle={{ height: 60 }} />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ChatPage;
