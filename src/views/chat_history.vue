<template>
    <div class="history-box" :class="{ 'collapsed': !isBarOpenStore.isBarOpen }">
        <div class="file-list">
            <div class="dir-input">
                <el-upload class="dir-input" multiple="true" :before-upload="handleFileChange" accept=".html"
                    show-file-list="false"><el-button size="large">Upload your history files</el-button></el-upload>
            </div>
            <!--history list-->
            <div class="single-file-list">
                <ul>
                    <li v-for="(file, index) in file_list" :key="index" @click="selectFile(index)"
                        :class="{ 'selected': currentFileIndex === index }">{{ file.name }}
                        <el-button type="danger" size="small" @click.stop="delFile(index)" class="el-button"><el-icon>
                                <Delete />
                            </el-icon></el-button>
                    </li>
                </ul>
            </div>
        </div>
        <!--file content-->
        <div class="file-content" id="output">
            <div v-if="currentFileIndex!=null">
                <h3>{{ file_list[currentFileIndex].name }}</h3>
                <div v-html="sanitizeHTML(file_list[currentFileIndex].content)"></div>
            </div>
            <div v-else>
                <h3>Click on a file to view its content</h3>
            </div>
        </div>
    </div>
</template>    

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { useIsBarOpenStore } from '@/stores/isBarOpen';

const isBarOpenStore = useIsBarOpenStore()

const file_list = reactive<{ name: string; content:string}[]>([])

/**
 * 处理文件上传
 * @param file - 上传的文件
 * @returns boolean - 返回 false 阻止默认上传行为
 */
const handleFileChange = async (file: File) => {
    try {
        const content = await readFileContent(file);
        file_list.push({ name: file.name, content });
    } catch (error) {
        console.error('读取文件失败:', error);
    }
    return false; // 阻止默认上传行为
};

/**
 * 异步读取文件内容
 * @param file - 文件对象
 * @returns Promise<string> - 文件内容
 */
const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            resolve(content);
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsText(file);
    });
};

/**
 * 过滤 HTML 标签
 * @param html - HTML 字符串
 * @returns string - 过滤后的 HTML 字符串
 */
const sanitizeHTML = (html: string): string => {
    return html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
};

const delFile = (index: number) => {
    file_list.splice(index, 1);
    saveFilesToLocalStorage();
    if (currentFileIndex.value === index) {
        currentFileIndex.value = null; // 关闭当前文件
    }
}

const currentFileIndex = ref<number | null>(null);
const selectFile = (index: number) => {
    currentFileIndex.value = index;
}

const saveFilesToLocalStorage=()=>{
    localStorage.setItem('file_list', JSON.stringify(file_list));
}

const loadFilesFromLocalStorage=()=>{
    const files = localStorage.getItem('file_list');
    if (files) {
        file_list.push(...JSON.parse(files));
    }
}

onMounted(() => {
    //console.log('mounted')
    loadFilesFromLocalStorage()
})

onUnmounted(() => {
    //console.log('unmounted')
    saveFilesToLocalStorage()
})

</script>

<style scoped>

.history-box {
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items: center;
    position: fixed;
    top: 15px;
    bottom: 10px;
    right: 10px;
    height: 95vh;
    width: 82vw;
    box-shadow: 10px 10px 5px #888888;
    border-radius: 10px;
    background-color: rgb(127, 168, 168);
    transition: all 0.5s ease-in-out;
}
.history-box.collapsed {
    left: 90px;
    width: calc(100% - 100px);
}
.file-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    height: 100%;
    background-color: rgb(127, 168, 168);
    border-radius: 10px;
}
.dir-input {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    border-radius: 10px 0 0 0;
    background-color: #888888;
    height: 50px;
}
.single-file-list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgb(224, 227, 227);
    border-radius: 0 0 0 10px;
    overflow-y: auto;
}
.single-file-list ul {
    padding: 0;
    margin: 0;
    width: 100%;
    list-style: none;
    overflow-y: auto;
}
.single-file-list li {
    display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        padding: 5px;
        margin: 5px auto;
        padding-left: 10px;
        background-color: #f3d9bc;
        border-radius: 5px;
        color: #110707;
    transition: all 0.2s ease-in-out;
}
.single-file-list ::v-deep li.selected { /* v-deep  用于穿透作用域 */
    background-color: #4cc2dd;
    color: white;
}
.single-file-list li .el-button {
    position: relative;
    right: 5px;
}
/* .single-file-list li:hover {
    background-color: #676f69;
    color: white;
} */
.file-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    height: 100%;
    background-color: rgb(235, 229, 228);
    border-radius: 0 10px 10px 0;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #676f69 #888888;
}

@media (max-width: 768px) {
    .history-box {
        width: calc(100% - 100px);
        right: 5px;
    }
    .history-box.collapsed {
        left: 90px;
        width: calc(100% - 90px);
    }
    .el-input {
        width: 150px;
    }
    .file-list {
        width: 40%;
    }
    .file-content {
        width: 60%;
    }
}
</style>