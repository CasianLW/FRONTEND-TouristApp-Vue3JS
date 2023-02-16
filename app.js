import Home from "./components/Home.js";
import LocationPage from "./components/LocationPage.js";
import PlacePage from "./components/PlacePage.js";
import NotFound from "./components/NotFound.js";

import MenuComponent from "./components/shared/MenuComponent.js";

const routes = [
  // { path: "/", redirect: "/locations" },
  { path: "/", component: Home },
  { path: "/locations/:id", component: LocationPage },
  // { path: "/locations/:id/places", component: LocationPage },
  { path: "/places/:id", component: PlacePage },
  // { path: "/places/:id(\\d)", component: PlacePage },

  // 404
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
});

const app = Vue.createApp({});

app.use(router);
app.component("MenuComponent", MenuComponent);

app.mount("#app");
