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
            });

            return authUser;
        },

        async [vuex.actions.STORE]({
            commit,
            dispatch
        }, {
            form,
            routeParam
        }) {
            let v;

            try {
                v = await API.create(form, routeParam);
            } catch (error) {
                dispatch(`${vuex.modules.SNACKBAR}/${vuex.actions.TOAST}`, {
                    text: error,
                    color: 'error'
                }, {
                    root: true
                });

                throw error;
            }

            const {
                response
            } = v, {
                user
            } = response.data,
                authUser = new Auth(user);

            commit(vuex.mutations.STORE, {
                value: [authUser],
                strategy: "merge"
            });

            dispatch(`${vuex.modules.SNACKBAR}/${vuex.actions.TOAST}`, {
                text: 'User is created successfully'
            }, {
                root: true
            });

            return v;
        },

        async [vuex.actions.UPDATE]({
            commit,
            dispatch
        }, {
            form,
            routeParam
        }) {
            let v;

            try {
                v = await API.update(form, routeParam);
            } catch (error) {
                dispatch(`${vuex.modules.SNACKBAR}/${vuex.actions.TOAST}`, {
                    text: error,
                    color: 'error'
                }, {
                    root: true
                });

                throw error;
            }

            const {
                response
            } = v, {
                user
            } = response.data,
                authUser = new Auth(user);

            commit(vuex.mutations.STORE, {
                value: [authUser],
                strategy: "merge"
            });

            dispatch(`${vuex.modules.SNACKBAR}/${vuex.actions.TOAST}`, {
                text: 'User is updated successfully'
            }, {
                root: true
            });

            return v;
        }
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
