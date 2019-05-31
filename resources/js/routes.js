import VueRouter from 'vue-router';
import * as views from './views';

Vue.use(VueRouter);

const routes = [{
        path: '/login',
        component: views.login
    },
    // {
    //     path: '/reset-password',
    //     component: Bar
    // }
];

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes,
    linkActiveClass: 'is-active',
});

export default router;
