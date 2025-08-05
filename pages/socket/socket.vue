<template>
  <div class="socket-client">
    <h2>Vue 3 Socket.io 客户端</h2>
    
    <!-- 连接状态 -->
    <div class="connection-status" :class="{ connected: isConnected }">
      <span>连接状态: {{ isConnected ? '已连接' : '未连接' }}</span>
      <span v-if="isConnected" class="connection-id">ID: {{ socketId }}</span>
    </div>
    
    <!-- 控制按钮 -->
    <div class="controls">
      <input 
        type="text" 
        v-model="serverUrl" 
        placeholder="服务器地址"
        :disabled="isConnected"
        class="server-url"
      >
      <button @click="connect" :disabled="isConnected">连接</button>
      <button @click="disconnect" :disabled="!isConnected">断开连接</button>
    </div>
    
    <!-- 消息区域 -->
    <div class="message-area">
      <div class="message-list">
        <div v-for="(msg, index) in messages" :key="index" class="message" :class="{ incoming: msg.incoming }">
          <div class="message-meta">
            <span class="sender">{{ msg.sender }}</span>
            <span class="time">{{ formatTime(msg.timestamp) }}</span>
          </div>
          <div class="message-content">{{ msg.content }}</div>
        </div>
      </div>
      
      <!-- 消息输入 -->
      <div class="message-input">
        <input 
          type="text" 
          v-model="newMessage" 
          placeholder="输入消息..."
          @keyup.enter="sendMessage"
          :disabled="!isConnected"
        >
        <button @click="sendMessage" :disabled="!isConnected || !newMessage.trim()">
          发送
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { io } from 'socket.io-client';

// 状态管理
const serverUrl = ref('http://localhost:3000');
const socket = ref(null);
const isConnected = ref(false);
const socketId = ref('');
const messages = ref([]);
const newMessage = ref('');

// 格式化时间
const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString();
};

// 添加消息到列表
const addMessage = (content, sender = '系统', incoming = false) => {
  messages.value.push({
    content,
    sender,
    timestamp: Date.now(),
    incoming
  });
  
  // 自动滚动到底部
  setTimeout(() => {
    const messageList = document.querySelector('.message-list');
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  }, 0);
};

// 连接到服务器
const connect = () => {
  if (!serverUrl.value.trim()) {
    addMessage('请输入服务器地址', '系统');
    return;
  }
  
  // 建立连接
  socket.value = io(serverUrl.value, {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000
  });
  
  // 连接成功
  socket.value.on('connect', () => {
    isConnected.value = true;
    socketId.value = socket.value.id;
    addMessage(`成功连接到服务器 (ID: ${socket.value.id})`);
  });
  
  // 接收消息
  socket.value.on('message', (data) => {
    addMessage(data, '服务器', true);
  });
  
  // 连接错误
  socket.value.on('connect_error', (error) => {
    addMessage(`连接错误: ${error.message}`, '系统');
  });
  
  // 重连尝试
  socket.value.on('reconnect_attempt', (attempt) => {
    addMessage(`正在尝试重连 (第 ${attempt} 次)`, '系统');
  });
  
  // 断开连接
  socket.value.on('disconnect', (reason) => {
    isConnected.value = false;
    socketId.value = '';
    addMessage(`已断开连接: ${reason}`, '系统');
    
    // 如果不是主动断开连接，尝试重连
    if (reason === 'io server disconnect') {
      socket.value.connect();
    }
  });
};

// 断开连接
const disconnect = () => {
  if (socket.value) {
    socket.value.disconnect();
    socket.value = null;
    isConnected.value = false;
    socketId.value = '';
    addMessage('已主动断开连接', '系统');
  }
};

// 发送消息
const sendMessage = () => {
  const message = newMessage.value.trim();
  if (!message || !socket.value) return;
  
  // 发送消息到服务器
  socket.value.emit('message', message);
  addMessage(message, '我');
  
  // 清空输入框
  newMessage.value = '';
};

// 组件卸载时断开连接
onUnmounted(() => {
  if (socket.value) {
    socket.value.disconnect();
  }
});
</script>

<style scoped>
.socket-client {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  border-radius: 8px;
}

h2 {
  text-align: center;
  color: #333;
}

.connection-status {
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  background-color: #f8d7da;
  color: #721c24;
  text-align: center;
  transition: all 0.3s ease;
}

.connection-status.connected {
  background-color: #d4edda;
  color: #155724;
}

.connection-id {
  margin-left: 10px;
  font-size: 0.8em;
  opacity: 0.8;
}

.controls {
  display: flex;
  gap: 10px;
  margin: 15px 0;
  align-items: center;
}

.server-url {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:enabled {
  background-color: #007bff;
  color: white;
}

button:enabled:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}

.message-area {
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.message-list {
  height: 400px;
  overflow-y: auto;
  padding: 10px;
  background-color: #f9f9f9;
}

.message {
  margin-bottom: 10px;
  padding: 8px 12px;
  border-radius: 4px;
  max-width: 70%;
}

.message.incoming {
  background-color: #e9f5ff;
  margin-right: auto;
}

.message:not(.incoming) {
  background-color: #d4edda;
  margin-left: auto;
}

.message-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  font-size: 0.8em;
  color: #666;
}

.message-content {
  word-wrap: break-word;
}

.message-input {
  display: flex;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #ddd;
}

.message-input input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  outline: none;
}

.message-input input:focus {
  border-color: #007bff;
}

.message-input button {
  border-radius: 0 4px 4px 0;
}
</style>
