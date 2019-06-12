export const login = () => import( /* webpackChunkName: "mea-login" */ './auth/views/Login');

export const complaint = {
    index: () => import( /* webpackChunkName: "mea-complaint-index" */ './complaint/views/Index')
}
