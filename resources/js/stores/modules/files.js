import base from './base';
import {
    vuex
} from '../../mixins/vuexable';
// import Complaint from '../../models/Complaint';

const FileStore = {
    state() {
        return {
            //
        };
    },

    getters: {
        //
    },

    actions: {
        async [vuex.actions.FILE.FETCH](context, params) {
            try {

                context.dispatch(vuex.actions.REQUEST, {
                    model: 'FILE',
                    action: 'FETCH',
                    params
                });

            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.FILE.DELETE](context, {
            id: file
        }) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'FILE',
                    action: 'DELETE',
                    params: {
                        routeParam: {
                            file
                        }
                    }
                });
            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.FILE.DELETE_BY_PATH](context, {
            upload_path
        }) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'FILE',
                    action: 'DELETE_BY_PATH',
                    params: {
                        upload_path
                    }
                });
            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.FILE.RESTORE](context, {
            id: file
        }) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'FILE',
                    action: 'RESTORE',
                    params: {
                        routeParam: {
                            file
                        }
                    }
                });
            } catch (error) {
                throw error;
            }
        },
        // async [vuex.actions.COMPLAINT.FETCH]({
        //     state,
        //     commit
        // }) {
        //     try {
        //         let {
        //             issues = [], total = 0
        //         } = await Complaint[
        //             vuex.actions.COMPLAINT.FETCH
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
    ...FileStore,
    modules: {
        [vuex.modules.BASE]: base
    }
};
