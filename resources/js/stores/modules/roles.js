import base from './base';
import {
    vuex
} from '../../mixins/vuexable';

const roleStore = {
    state() {
        return {
            //
        };
    },

    getters: {
        //
    },

    actions: {
        async [vuex.actions.ROLE.FETCH](context, params = {}) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'ROLE',
                    action: 'FETCH',
                    params
                });
            } catch (error) {
                throw error;
            }
        },

        // async [vuex.actions.ROLE.EDIT](context, {
        //     id: issue_status
        // }) {
        //     try {
        //         return await context.dispatch(vuex.actions.REQUEST, {
        //             model: 'ROLE',
        //             action: 'EDIT',
        //             params: {
        //                 routeParam: {
        //                     issue_status
        //                 }
        //             }
        //         });
        //     } catch (error) {
        //         throw error;
        //     }
        // },

        // async [vuex.actions.STORE](context, params = {}) {
        //     try {
        //         return context.dispatch(vuex.actions.REQUEST, {
        //             model: 'ROLE',
        //             action: 'STORE',
        //             params
        //         });
        //     } catch (error) {
        //         throw error;
        //     }
        // },

        // async [vuex.actions.UPDATE](context, params = {}) {
        //     try {
        //         return context.dispatch(vuex.actions.REQUEST, {
        //             model: 'ROLE',
        //             action: 'UPDATE',
        //             params
        //         });
        //     } catch (error) {
        //         throw error;
        //     }
        // },

        // async [vuex.actions.ROLE.DELETE](context, {
        //     id: issue_status
        // }) {
        //     try {
        //         return await context.dispatch(vuex.actions.REQUEST, {
        //             model: 'ROLE',
        //             action: 'DELETE',
        //             params: {
        //                 routeParam: {
        //                     issue_status
        //                 }
        //             }
        //         });
        //     } catch (error) {
        //         throw error;
        //     }
        // },

        // async [vuex.actions.ROLE.RESTORE](context, {
        //     id: issue_status
        // }) {
        //     try {
        //         return await context.dispatch(vuex.actions.REQUEST, {
        //             model: 'ROLE',
        //             action: 'RESTORE',
        //             params: {
        //                 routeParam: {
        //                     issue_status
        //                 }
        //             }
        //         });
        //     } catch (error) {
        //         throw error;
        //     }
        // },

        // async [vuex.actions.STORE]({
        //     commit,
        //     dispatch
        // }, {
        //     form,
        //     routeParam
        // }) {
        //     let v;

        //     try {
        //         v = await API.create(form, routeParam);
        //     } catch (error) {
        //         dispatch(`${vuex.modules.SNACKBAR}/${vuex.actions.TOAST}`, {
        //             text: error,
        //             color: 'error'
        //         }, {
        //             root: true
        //         });

        //         throw error;
        //     }

        //     const {
        //         response
        //     } = v, {
        //         user
        //     } = response.data,
        //         authUser = new Auth(user);

        //     commit(vuex.mutations.STORE, {
        //         value: [authUser],
        //         strategy: "merge"
        //     });

        //     dispatch(`${vuex.modules.SNACKBAR}/${vuex.actions.TOAST}`, {
        //         text: 'User is created successfully'
        //     }, {
        //         root: true
        //     });

        //     return v;
        // },

        // async [vuex.actions.UPDATE]({
        //     commit,
        //     dispatch
        // }, {
        //     form,
        //     routeParam
        // }) {
        //     let v;

        //     try {
        //         v = await API.update(form, routeParam);
        //     } catch (error) {
        //         dispatch(`${vuex.modules.SNACKBAR}/${vuex.actions.TOAST}`, {
        //             text: error,
        //             color: 'error'
        //         }, {
        //             root: true
        //         });

        //         throw error;
        //     }

        //     const {
        //         response
        //     } = v, {
        //         user
        //     } = response.data,
        //         authUser = new Auth(user);

        //     commit(vuex.mutations.STORE, {
        //         value: [authUser],
        //         strategy: "merge"
        //     });

        //     dispatch(`${vuex.modules.SNACKBAR}/${vuex.actions.TOAST}`, {
        //         text: 'User is updated successfully'
        //     }, {
        //         root: true
        //     });

        //     return v;
        // }
    },

    mutations: {
        //
    }
};

export default {
    namespaced: true,
    ...roleStore,
    modules: {
        [vuex.modules.BASE]: base
    }
};
