import VueRouter from 'vue-router';
import multiguard from 'vue-router-multiguard';
import * as views from './views';
import * as constants from './constants';
import checkAuth from './middlewares/checkAuth';

Vue.use(VueRouter);

const routes = [{
        path: '/login',
        name: constants.views.USER.LOGIN,
        component: views.auth.login
    },
    {
        path: '/',
        beforeEnter: multiguard([checkAuth]),
        component: views.auth.index,
        children: [{
                path: '',
                name: constants.views.ISSUE.INDEX,
                component: views.complaint.index,
                meta: {
                    route: constants.views.ISSUE.INDEX
                }
            }, {
                path: 'complaints',
                name: constants.views.ISSUE.INDEX,
                component: views.complaint.index,
                meta: {
                    route: constants.views.ISSUE.INDEX
                }
            },
            {
                path: 'complaints/:issue',
                name: constants.views.ISSUE.SHOW,
                component: views.complaint.show,
                meta: {
                    route: constants.views.ISSUE.INDEX
                }
            },
            {
                path: 'categories',
                name: constants.views.ISSUE_CATEGORY.INDEX,
                component: views.issueCategory.index,
                meta: {
                    route: constants.views.ISSUE_CATEGORY.INDEX
                }
            },
            {
                path: 'statuses',
                name: constants.views.ISSUE_STATUS.INDEX,
                component: views.issueStatus.index,
                meta: {
                    route: constants.views.ISSUE_STATUS.INDEX
                }
            },
            {
                path: 'users',
                name: constants.views.USER.INDEX,
                component: views.user.index,
                meta: {
                    route: constants.views.USER.INDEX
                }
            },
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
