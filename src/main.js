import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import http from './test'
console.log(http, 'http')

createApp(App).mount("#app");
