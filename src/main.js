import { createApp } from "vue";
import router from "./router";
import HomeShop from "./App.vue";
import MyLog from "./plugins/log";

const app = createApp(HomeShop);

app.use(router).mount("#home-shop");
app.use(MyLog)
