import base from './base';
import {
    vuex
} from '../../mixins/vuexable';
// import Complaint from '../../models/Complaint';

const subGroupStore = {
    state() {
        return {
            //
        };
    },

    getters: {
        //
    },

    actions: {
        async [vuex.actions.SUB_GROUP.FETCH](context, params) {
            try {

                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'SUB_GROUP',
                    action: 'FETCH',
                    params
                });

            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.UPDATE](context, input) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'SUB_GROUP',
                    action: 'UPDATE',
                    params: input
                });
            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.DELETE](context, {
            id: group
        }) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'SUB_GROUP',
                    action: 'DELETE',
                    params: {
                        routeParam: {
                            group
                        }
                    }
                });
            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.SUB_GROUP.RESTORE](context, {
            id: group
        }) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'SUB_GROUP',
                    action: 'RESTORE',
                    params: {
                        routeParam: {
                            group
                        }
                    }
                });
            } catch (error) {
                throw error;
            }
        },
        // async [vuex.actions.ISSUE.FETCH]({
        //     state,
        //     commit
        // }) {
        //     try {
        //         let {
        //             issues = [], total = 0
        //         } = await Complaint[
        //             vuex.actions.ISSUE.FETCH
        //         ](state.base.pagination);

        //         commit(vuex.mutations.STORE, {
        //             value: issues
        //         });

        //         commit(vuex.mutations.UPDATE_PAGINATION, {
        //             key: 'totalItems',
        //             value: total
        //         });

        //         return issues;

        //     } catch (error) {
        //         throw error;
        //     }
        // }
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
    ...subGroupStore,
    modules: {
        [vuex.modules.BASE]: base
    }
};
