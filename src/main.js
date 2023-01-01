import { createApp } from "vue";
import router from "./router";
import HomeShop from "./App.vue";
import MyLog from "./plugins/log";

const app = createApp(HomeShop);
// import './assets/main.css'

app.use(MyLog).use(router).mount("#home-shop");
