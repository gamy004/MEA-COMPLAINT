import base from './base';
import {
    vuex
} from '../../mixins/vuexable';

const IssueCategoryStore = {
    state() {
        return {
            //
        };
    },

    getters: {
        //
    },

    actions: {
        async [vuex.actions.ISSUE_CATEGORY.FETCH](context, params = {}) {
            try {
                return context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE_CATEGORY',
                    action: 'FETCH',
                    params
                });
            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.ISSUE_CATEGORY.EDIT](context, {
            id: issue_category
        }) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE_CATEGORY',
                    action: 'EDIT',
                    params: {
                        routeParam: {
                            issue_category
                        }
                    }
                });
            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.STORE](context, params = {}) {
            try {
                return context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE_CATEGORY',
                    action: 'STORE',
                    params
                });
            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.UPDATE](context, params = {}) {
            try {
                return context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE_CATEGORY',
                    action: 'UPDATE',
                    params
                });
            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.ISSUE_CATEGORY.DELETE](context, {
            id: issue_category
        }) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE_CATEGORY',
                    action: 'DELETE',
                    params: {
                        routeParam: {
                            issue_category
                        }
                    }
                });
            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.ISSUE_CATEGORY.RESTORE](context, {
            id: issue_category
        }) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE_CATEGORY',
                    action: 'RESTORE',
                    params: {
                        routeParam: {
                            issue_category
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
    ...IssueCategoryStore,
    modules: {
        [vuex.modules.BASE]: base
    }
};
