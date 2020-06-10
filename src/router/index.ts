import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";
import HomePage from "../views/HomePage.vue";
import i18n from "../i18n";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        redirect: `/${i18n.locale}`
    },
    {
        path: "/:lang",
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: "/",
                name: "HomePage",
                component: () =>
                    import(/* webpackChunkName: "about" */ "../views/HomePage.vue")
            },
            {
                path: "about",
                name: "About",
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import(/* webpackChunkName: "about" */ "../views/About.vue")
            },
            {
                path: "contacts",
                name: "Contacts",
                component: () =>
                    import(/* webpackChunkName: "contacts" */ "../views/Contacts.vue")
            }
        ]
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
