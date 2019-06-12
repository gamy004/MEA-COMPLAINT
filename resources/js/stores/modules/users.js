import base from './base';
import {
    vuex
} from '../../mixins/vuexable';

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
        async [vuex.actions.USER.AUTHORIZE]({
            commit
        }, {
            username,
            password
        } = {}) {

            let response;

            try {
                response = await state.$api.post({
                    params: {
                        username,
                        password
                    }
                });
            } catch (error) {
                throw error;
            }

            const {
                user
            } = response.data;
            // authUsers = users.map(user => new Auth(user));

            return user;
            // commit(vuex.mutations.STORE, {
            //     value: authUsers
            // });

            // commit(`${vuex.mutations.SET_PAGINATION}`, {
            //     ...pagination,
            //     totalItems: !total ? authUsers.length : total
            // });

            // return authUsers;
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
