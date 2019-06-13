export const auth = {
    login: () => import( /* webpackChunkName: "mea-auth-login" */ './auth/views/Login'),
    index: () => import( /* webpackChunkName: "mea-auth-index" */ './auth/views/Index')
};

export const complaint = {
    index: () => import( /* webpackChunkName: "mea-complaint-index" */ './complaint/views/Index')
};
