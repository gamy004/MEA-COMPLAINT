import store from '../store';
import * as modules from "../stores/module-types";
import * as actions from "../stores/action-types";
import * as mutations from '../stores/mutation-types';

async function checkAuth(to, from, next) {
    let v;

    try {
        v = await store.dispatch(`${modules.USER}/${actions.FETCH}`)
    } catch (error) {
        throw error;
    }

    // const isLogin = store.getters['user/isAuth'];

    // if (isLogin) {
    // 	next()
    // } else {
    // 	store.commit(`${SIGN_IN_MODAL}/${RESET}`)
    // 	store.commit(`${SIGN_IN_MODAL}/${OPEN_MODAL}`)
    // }
};

export default checkAuth;
