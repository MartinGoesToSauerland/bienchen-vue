import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from "./helpers/store";
import LoadingSpinner from "./components/LoadingSpinner.vue";

import './assets/main.css'

const app = createApp(App)

app
    .use(router)
    .provide( '$store', store )
    .component("LoadingSpinner", LoadingSpinner)
    .mount('#app')
