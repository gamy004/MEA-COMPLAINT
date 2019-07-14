import base from './base';
import {
    vuex
} from '../../mixins/vuexable';
// import Complaint from '../../models/Complaint';

const StatusStore = {
    state() {
        return {
            //
        };
    },

    getters: {
        //
    },

    actions: {
        async [vuex.actions.ISSUE_STATUS.FETCH](context, params = {}) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE_STATUS',
                    action: 'FETCH',
                    params
                });
            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.ISSUE_STATUS.EDIT](context, {
            id: issue_status
        }) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE_STATUS',
                    action: 'EDIT',
                    params: {
                        routeParam: {
                            issue_status
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
                    model: 'ISSUE_STATUS',
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
                    model: 'ISSUE_STATUS',
                    action: 'UPDATE',
                    params
                });
            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.ISSUE_STATUS.DELETE](context, {
            id: issue_status
        }) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE_STATUS',
                    action: 'DELETE',
                    params: {
                        routeParam: {
                            issue_status
                        }
                    }
                });
            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.ISSUE_STATUS.RESTORE](context, {
            id: issue_status
        }) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE_STATUS',
                    action: 'RESTORE',
                    params: {
                        routeParam: {
                            issue_status
                        }
                    }
                });
            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.ISSUE_STATUS.UPDATE_DEFAULT](context, {
            id: issue_status
        }) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE_STATUS',
                    action: 'UPDATE_DEFAULT',
                    params: {
                        routeParam: {
                            issue_status
                        }
                    }
                });
            } catch (error) {
                throw error;
            }
        },

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
    ...StatusStore,
    modules: {
        [vuex.modules.BASE]: base
    }
};
