import base from './base';
import {
    vuex
} from '../../mixins/vuexable';

const IssueNoteStore = {
    state() {
        return {
            //
        };
    },

    getters: {
        //
    },

    actions: {
        async [vuex.actions.ISSUE_NOTE.FETCH](context, params = {}) {
            try {

                context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE_NOTE',
                    action: 'FETCH',
                    params
                });

            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.ISSUE_NOTE.EDIT](context, {
            id: issue_note
        }) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE_NOTE',
                    action: 'EDIT',
                    params: {
                        routeParam: {
                            issue_note
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
                    model: 'ISSUE_NOTE',
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
                    model: 'ISSUE_NOTE',
                    action: 'UPDATE',
                    params: input
                });
            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.ISSUE_NOTE.DELETE](context, {
            id: issue_note
        }) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE_NOTE',
                    action: 'DELETE',
                    params: {
                        routeParam: {
                            issue_note
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
    ...IssueNoteStore,
    modules: {
        [vuex.modules.BASE]: base
    }
};
