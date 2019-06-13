export const login = () => import( /* webpackChunkName: "v-login" */ './auth/views/Login');

export const complaint = {
    index: () => import( /* webpackChunkName: "v-complaint-index" */ './complaint/views/Index')
};
