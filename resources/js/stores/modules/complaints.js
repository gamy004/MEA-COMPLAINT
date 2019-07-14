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
        async [vuex.actions.ISSUE.FETCH](context, params = {}) {
            let {
                type = null
            } = context.state.base;

            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE',
                    action: 'FETCH',
                    params: {
                        pagination: context.state.base.pagination,
                        type: type ? type : "inbox",
                        ...params
                    }
                });
            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.ISSUE.SEARCH](context, params = {}) {
            let response;

            let {
                filter_groups = [], type = null
            } = context.state.base;

            // let merged_filter_groups = [];

            // if (!filter_groups.length && global_filters.length) {
            //     console.log(1);

            //     merged_filter_groups = [{
            //         filters: [...global_filters]
            //     }];
            // }

            // if (filter_groups.length && global_filters.length) {
            //     console.log(2);

            //     merged_filter_groups = filter_groups.map(({
            //         filters = [],
            //         ...props
            //     }) => {
            //         return {
            //             ...props,
            //             filters: [
            //                 ...filters,
            //                 ...global_filters
            //             ]
            //         };
            //     });
            // }

            // console.log(merged_filter_groups);

            try {
                response = await context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE',
                    action: 'SEARCH',
                    params: {
                        pagination: context.state.base.pagination,
                        filter_groups,
                        type: type ? type : "inbox",
                        ...params
                    }
                });
            } catch (error) {
                throw error;
            }
        },

        async [vuex.actions.ISSUE.FETCH_SEARCH](context, params = {}) {
            let response;

            try {
                response = await context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE',
                    action: 'FETCH_SEARCH',
                    params: {
                        pagination: {
                            ...context.state.base.pagination,
                            rowsPerPage: -1
                        },
                        filter_groups: context.state.base.filter_groups,
                        ...params
                    }
                });
            } catch (error) {
                throw error;
            }

            return response;
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

        async [vuex.actions.ISSUE.FORCE_DELETE](context, {
            id: issue
        }) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE',
                    action: 'FORCE_DELETE',
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

        async [vuex.actions.ISSUE.ARCHIVE](context, {
            id: issue
        }) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE',
                    action: 'ARCHIVE',
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

        async [vuex.actions.ISSUE.EXPORT_SEARCH](context, params) {
            try {
                return await context.dispatch(vuex.actions.REQUEST, {
                    model: 'ISSUE',
                    action: 'EXPORT_SEARCH',
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
