import base from './base';
import {
    vuex
} from '../../mixins/vuexable';
import {
    filterIn
} from '../../helpers';

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
        async [vuex.actions.ISSUE.FETCH](context, params = {}) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE',
                    action: 'FETCH',
                    params: {
                        pagination: context.state.base.pagination,
                        ...params
                    }
                });
            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.ISSUE.SEARCH](context, params = {}) {
            let response;

            try {
                response = await context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE',
                    action: 'SEARCH',
                    params: {
                        pagination: context.state.base.pagination,
                        ...params
                    }
                });
            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.ISSUE.SHOW](context, issue) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE',
                    action: 'SHOW',
                    params: {
                        routeParam: {
                            issue
                        }
                    }
                });
            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.ISSUE.EDIT](context, {
            id: issue
        }) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE',
                    action: 'EDIT',
                    params: {
                        routeParam: {
                            issue
                        }
                    }
                });
            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.STORE](context, input) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE',
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
                    model: 'ISSUE',
                    action: 'UPDATE',
                    params: input
                });
            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.ISSUE.DELETE](context, {
            id: issue
        }) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE',
                    action: 'DELETE',
                    params: {
                        routeParam: {
                            issue
                        }
                    }
                });
            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.ISSUE.RESTORE](context, {
            id: issue
        }) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE',
                    action: 'RESTORE',
                    params: {
                        routeParam: {
                            issue
                        }
                    }
                });
            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.ISSUE.EXPORT](context, params) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE',
                    action: 'EXPORT',
                    params
                });
            } catch (error) {
                throw error;
            }
        },
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
    ...userStore,
    modules: {
        [vuex.modules.BASE]: base
    }
};
