import { defineStore } from "pinia";
import { ref } from 'vue';

export const useAPI_infoStore = defineStore('API_info', () => { 
    let api_port = ref('');
    let api_key = ref('');
    let model_name = ref('');

    function setPort(port: string) {
        api_port.value = port;
    }
    function setKey(key: string) {
        api_key.value = key;
    }
    function getPort() {
        return api_port.value;
    }
    function getKey() {
        return api_key.value;
    }
    function getModelName() {
        return model_name.value;
    }
    function setModelName(name: string) {
        model_name.value = name;
    }
    return {
        api_port,
        api_key,
        model_name,
        setPort,
        setKey,
        getPort,
        getKey,
        getModelName,
        setModelName
    }
});