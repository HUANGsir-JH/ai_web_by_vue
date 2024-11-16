import { defineStore } from "pinia";
import { ref } from "vue";

export const useIsBarOpenStore = defineStore('isBarOpen', () => {
    const isBarOpen = ref(true);

    function toggleBar(value:boolean) {
        isBarOpen.value = value;
    }
    return {
        isBarOpen,
        toggleBar
    }
})