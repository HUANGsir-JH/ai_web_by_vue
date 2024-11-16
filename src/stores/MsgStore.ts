import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useMsgStore = defineStore('Msg', () => {
    let Msgs = reactive<{ id:number; type: 'User'|'AI'|'Wrong'; time: string; message: string }[]>([]);
    // type : user | assistant
    let id = ref(0);
    function addMessage(type: 'User'|'AI'|'Wrong', message: any) {
        Msgs.push({ id: id.value, type, time: getCurrentDateTime(), message });
        id.value++;
    }

    function getBeforeMessage() { 
        let msgs = [];
        let i = 0;
        for (i = 0; i < Msgs.length; i++) { 
            if (Msgs[i].type == 'User') {
                msgs.push(Msgs[i].message);
            }
            else if (Msgs[i].type == 'AI') {
                msgs.push(Msgs[i].message);
            }
            else {
                msgs.pop();
            }
        }
        return msgs.join('/n');
    }

    function getCurrentDateTime() {
        const now = new Date();
        return now.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    }

    function clearMessages() {
        Msgs.splice(0, Msgs.length);
        id.value = 0;
    }

    function getMessages() {
        return Msgs;
    }

    return { Msg: Msgs, addMessage, clearMessages, getMessages, getBeforeMessage };
});

