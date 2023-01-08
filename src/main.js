import { createApp } from "vue";
// import router from "./router";
import HomeShop from "./App.vue";
import MyLog from "./plugins/log";

const app = createApp(HomeShop);

app.use(MyLog).mount("#home-shop");
// app.use(router);
