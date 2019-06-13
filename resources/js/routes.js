import VueRouter from 'vue-router';
import multiguard from 'vue-router-multiguard';
import * as views from './views';
import * as constants from './constants';
import checkAuth from './middlewares/checkAuth';

Vue.use(VueRouter);

const routes = [{
        path: '/login',
        component: views.login
    },
    {
        path: '/complaint',
        beforeEnter: multiguard([checkAuth]),
        component: views.complaint.index
        // children: [{
        //     path: 'complaint',
        //     name: constants.views.COMPLAINT.INDEX,
        //     component: views.complaint.index
        // }]
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


// function isMatchedPath({
//     matched = []
// }) {
//     return matched.length > 0;
// }

// router.beforeEach((to, from, next) => {

//     // if (isRequired(to, 'guest')) {
//     //     return checkGuest(to, from, next);
//     // }

//     if (!isMatchedPath(to)) {
//         return next({
//             path: `/`
//         });
//     }

//     next();
// })

export default router;
