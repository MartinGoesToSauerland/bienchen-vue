import { reactive } from 'vue'

export const store = reactive({
    isLoading: false,

    isLoading(value) {
        this.isLoading = value;
    },
});