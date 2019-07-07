import base from './base';
import {
    vuex
} from '../../mixins/vuexable';
import User from '../../models/User';

const userStore = {
    state() {
        return {
            //
        };
    },

    getters: {
        //
    },

    actions: {
        async [vuex.actions.USER.SIGN_IN]({
            state,
            commit
        }, {
            username,
            password
        } = {}) {
            let authUser;

            try {
                authUser = await User[vuex.actions.USER.SIGN_IN](username, password);
            } catch (error) {
                throw error;
            }

            commit(vuex.mutations.SET_STATE, {
                key: 'auth',
                value: authUser
            }, {
                root: true
            });

            return authUser;
        },

        async [vuex.actions.USER.FETCH](context, params = {}) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'USER',
                    action: 'FETCH',
                    params
                });
            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.STORE](context, input) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'USER',
                    action: 'STORE',
                    params: input
                });
            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.UPDATE](context, input) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'USER',
                    action: 'UPDATE',
                    params: input
                });
            } catch (error) {
                throw error;
            }
        },
    },

    mutations: {
        //
    }
};

export default {
    namespaced: true,
    ...userStore,
    modules: {
        [vuex.modules.BASE]: base
    }
};
