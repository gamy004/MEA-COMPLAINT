import VueRouter from 'vue-router';
import multiguard from 'vue-router-multiguard';
import * as views from './views';
import * as constants from './constants';
import checkAuth from './middlewares/checkAuth';

Vue.use(VueRouter);

const routes = [{
        path: '/login',
        component: views.auth.login
    },
    {
        path: '/',
        beforeEnter: multiguard([checkAuth]),
        component: views.auth.index,
        children: [{
                path: 'complaints',
                name: constants.views.COMPLAINT.INDEX,
                component: views.complaint.index
            },
            {
                path: 'complaints/:issue',
                name: constants.views.COMPLAINT.SHOW,
                component: views.complaint.show
            }
        ]
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
