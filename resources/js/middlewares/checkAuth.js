import store from '../store';
import * as modules from "../stores/module-types";
import * as actions from "../stores/action-types";
import * as getters from "../stores/getter-types";
import * as mutations from '../stores/mutation-types';
import User from '../models/User';

async function checkAuth(to, from, next) {
    let authUser = store.getters[`${modules.USER}/${getters.GET_STATE}`]('auth');

    if (!authUser) {
        try {
            authUser = await User[actions.USER.GET_AUTH]();
        } catch (error) {
            throw error;
        }

        store.commit(mutations.SET_STATE, {
            key: 'auth',
            value: authUser
        });
    }

    if (authUser) {
        next();
    } else {
        next({
            path: '/login'
        });
    }
};

export default checkAuth;
