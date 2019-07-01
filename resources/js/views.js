export const auth = {
    login: () => import( /* webpackChunkName: "mea-auth-login" */ './auth/views/Login'),
    index: () => import( /* webpackChunkName: "mea-auth-index" */ './auth/views/Index')
};

export const complaint = {
    index: () => import( /* webpackChunkName: "mea-complaint-index" */ './complaint/views/Index'),
    show: () => import( /* webpackChunkName: "mea-complaint-show" */ './complaint/views/Show'),
};

export const issueCategory = {
    index: () => import( /* webpackChunkName: "mea-category-index" */ './issueCategory/views/Index')
}

export const issueStatus = {
    index: () => import( /* webpackChunkName: "mea-status-index" */ './issueStatus/views/Index')
}
