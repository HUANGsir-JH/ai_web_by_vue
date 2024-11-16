import { ref } from "vue";
import { defineStore } from "pinia";

export const useHistoryPath = defineStore('historytPath', () => {
  const historytPath = ref(""); // 历史文件文件夹路径
  const htmlFiles = ref<string[]>([]); // 存储 HTML 文件名数组

  // 设置历史路径
  const setHistoryPath = (path: string) => {
    historytPath.value = path;
  };

  // 获取历史路径
  const getHistoryPath = () => {
    return historytPath.value;
  };

  // 获取文件夹下的所有 HTML 文件
  const getHtmlFiles = (files: FileList | null) => {
    if (!files) return;
    const htmlFilesArray: string[] = [];
    
    // 遍历上传的文件列表，筛选出 HTML 文件
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.name.endsWith('.html')) {
        htmlFilesArray.push(file.name);
      }
    }
    
    // 更新存储的 HTML 文件列表
    htmlFiles.value = htmlFilesArray;
  };

  return {
    setHistoryPath,
    getHistoryPath,
    getHtmlFiles,
    htmlFiles
  };
});
