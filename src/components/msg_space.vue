<template>
  <div class="msg_container" :class="{'collapsed':!isBarOpenStore.isBarOpen}">
    <div class="func_buttons">
      <el-button plain @click="export_chat">Export Chat</el-button>
      <el-button plain @click="new_chat">New Chat</el-button>
    </div>
    <div id="msg">
      <div>
        <div v-for="(msg, index) in msgStore.Msg" :key="msg.id" class="msg-box">
          <div class="msg-content-box">
            <el-avatar>{{ msg.type }}</el-avatar>
            <div class="msg-content" v-html="formatMessageContent(msg.message)"></div>
          </div>
          <div class="box-bottom">
            <p>Time : {{ msg.time }}</p>
            <p>Order : {{ msg.id }}</p>
            <div class="bottom-func-button">
              <el-button size="small" color="rgb(233, 230, 221)" title="Copy" @click="CopyText(msg.id)"><el-icon>
                  <CopyDocument />
                </el-icon></el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIsBarOpenStore } from '@/stores/isBarOpen';
import { useMsgStore } from '@/stores/MsgStore';
import { reactive, ref, watch,onMounted,onUnmounted, nextTick } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import type { MarkedOptions, Renderer } from 'marked';

const isBarOpenStore = useIsBarOpenStore();
const msgStore = useMsgStore();


watch(() => msgStore.Msg, (newVal) => {
  saveMessagesToLocalStorage();
  nextTick(() => {
    scrollToBottom();
  });
});


function formatMessageContent(content: string) {
  // Create renderer with correct type
  const renderer = new marked.Renderer() as Renderer;

  // Fix the code method signature
  renderer.code = function ({ text, lang, escaped }: { text: string, lang?: string, escaped?: boolean }) {
    const language = lang || 'plaintext';
    const validLang = hljs.getLanguage(language) ? language : 'plaintext';
    const highlightedCode = hljs.highlight(text, { language: validLang, ignoreIllegals: true }).value;


    return `
      <div class="code-block-wrapper">
        <div class="code-header">
          ${language !== 'plaintext' ? `<span class="code-language">${language}</span>` : ''}
        </div>
        <pre ><code class="hljs language-${validLang}">${highlightedCode}</code></pre>
      </div>
    `;
  };

  // Fix MarkedOptions type
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    breaks: true,
    langPrefix: 'language-',
  } as MarkedOptions);

  return marked(content);
}


const copyTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      ElMessage.success('Copied to clipboard');
    }).catch(err => {
      ElMessage.error('Failed to copy to clipboard');
    });
};

const htmlToTextWithParser = (html: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

const CopyText = (msgId: number) => {
  const msg = msgStore.Msg.find(msg => msg.id === msgId);
    if (msg) {
      const textToCopy = htmlToTextWithParser(msg.message);
      copyTextToClipboard(textToCopy);
    }
};


const export_chat = () => {
  ElMessageBox.prompt('请输入文件名：', '导出聊天记录', {
    confirmButtonText: '导出',
    cancelButtonText: '取消',
    inputValue: 'chat_export',
    inputPattern: /.+/,
    inputErrorMessage: '文件名不能为空'
  }).then(({ value }) => {
    const filename = value.endsWith('.html') ? value : `${value}.html`;

    // 构建 HTML 内容
    const htmlContent = `
    <html>
      <head>
        <title>聊天记录导出</title>
        <style>
          body { font-family: Arial, sans-serif; }
          .msg-box { margin-bottom: 20px; padding: 10px; border: 1px solid #ccc; border-radius: 5px; }
          .msg-content-box { display: flex; align-items: center; }
          .el-avatar { margin-right: 10px; }
          .msg-content { flex-grow: 1; }
          .box-bottom { font-size: 12px; color: #999; margin-top: 10px; }
        </style>
      </head>
      <body>
        ${msgStore.Msg.map(msg => `
          <div class="msg-box">
            <div class="msg-content-box">
              <div class="el-avatar">${msg.type}</div>
              <div class="msg-content">
                ${msg.message} <!-- 直接插入已转换的 HTML 内容 -->
              </div>
            </div>
            <div class="box-bottom">
              <p>时间: ${msg.time}</p>
              <p>序号: ${msg.id}</p>
            </div>
          </div>
        `).join('')}
      </body>
    </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }).catch(() => {
    ElMessage.info('已取消');
  });
};

const new_chat = () => {
  ElMessageBox.confirm('Are you sure to clear all messages? This will not export the chat history.', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning',
  }).then(() => {
    msgStore.clearMessages();
    saveMessagesToLocalStorage();
    ElMessage.success('Cleared');
  }).catch(() => {
    ElMessage.info('Canceled');
  });
}

const scrollToBottom=()=>{
  const msg = document.getElementById('msg');
  if(msg){
    msg.scrollTop = msg.scrollHeight;
  }
}

//保存到本地
const saveMessagesToLocalStorage = () => {
  console.log('saveMessagesToLocalStorage');
  localStorage.setItem('Msg', JSON.stringify(msgStore.Msg));
}

//从本地读取
const loadMessagesFromLocalStorage = () => {
  const messagesFromLocalStorage = localStorage.getItem('Msg');
  if (messagesFromLocalStorage) {
    const parsedMessages = JSON.parse(messagesFromLocalStorage);
    msgStore.pushBeforeMsgs(parsedMessages);
  }
}

onMounted(() => {
  loadMessagesFromLocalStorage();
  window.addEventListener('beforeunload', saveMessagesToLocalStorage);
  nextTick(() => {
    scrollToBottom();
  });
})

onUnmounted(() => {
  window.removeEventListener('beforeunload', saveMessagesToLocalStorage);
})

</script>

<style scoped>
.msg_container{
    background-color:rgb(250, 238, 216);
    position: fixed;
    top:10px;
    right: 10px;
    bottom: 100px;
    left: 210px;
    border-radius: 10px;
    box-shadow: 10px 5px 5px rgba(94, 93, 93, 0.1);
    height: calc(100% - 110px);
    width: calc(100% - 220px);
    transition: all 0.5s ease-in-out;
    display: flex;
    flex-direction: column;
}

.collapsed{
    left: 90px;
    width: calc(100% - 110px);
}

.func_buttons{
    display: flex;
    flex-direction: row;
    justify-content:right;
    padding: 10px;
    gap: 10px;
    background-color: rgb(237, 213, 182);
    border-radius:10px 10px 0px 0px;
}
.func_buttons .el-button:hover{
    background-color: rgb(238, 207, 167);
    color: black;
}
.msg-box{
  display: flex;
    flex-direction: column;
    width: 80%;
    margin: 10px 20px;
    animation: fadeIn 0.3s ease-in-out;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 10px 5px 5px rgba(33, 12, 12, 0.1);
    background-color: rgb(233, 230, 221);
}
.msg-content-box{
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 5px 5px;
  background-color: rgb(233, 230, 221);
}
.msg-content{
  display: flex;
  flex-direction: column;
  min-height: 40px;
  background-color: rgb(233, 230, 221);
  width: 100%;
  padding: 5px 5px;
}

.content-text{
  padding: 7px 5px;
  background-color: rgb(233, 230, 221);
  min-height: 40px;
  display: flex;
  flex-direction: row;
  width: 100%;
}
.el-avatar{
  width: 45px;
  height: 45px;
  border-radius: 50%;
  flex-shrink: 0;
}
.msg-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  word-break: break-word;
  border-radius: 8px;
  background-color: none;
  font-size: 15px;
}
.box-bottom {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 12px;
  color: #999;
  margin-top: 4px;
  padding: 0 12px;
}
.box-bottom p {
  margin: 0;
  padding: 0;
  font-size:small;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
#msg{
  flex:1;
  overflow-y: auto;
  padding: 10px;
}
#msg::-webkit-scrollbar {
  width: 6px;
}

#msg::-webkit-scrollbar-track {
  background: transparent;
}

#msg::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.bottom-func-button {
  display: flex;
  gap: 5px;
}

/* 添加代码高亮相关样式 */
:deep(pre) {
  background-color: #c1c3c4;
  border-radius: 6px;
  padding: 16px;
  overflow: auto;
  margin: 8px 0;
}

:deep(code) {
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
  font-size: 14px;
  line-height: 1.5;
}

:deep(.hljs) {
  display: block;
  overflow-x: auto;
  padding: 1em;
  color: #333;
  background: #c1c3c4;
}
:deep(.code-block-wrapper) {
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  overflow: hidden;
  padding: 0;
}
:deep(.code-header) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #c1c3c4;
  padding: 8px 16px;
}
:deep(.copy-button) {
  display: flex;
  gap: 8px;
  background-color: #bdd4de;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}
/* 让代码块在消息内容中保持合适的宽度 */
:deep(.msg-content pre) {
  width: 100%;
  max-width: 100%;
  white-space: pre-wrap;
}
</style>