import base from './base';
import {
    vuex
} from '../../mixins/vuexable';
import Complaint from '../../models/Complaint';

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
        async [vuex.actions.COMPLAINT.FETCH](context) {
            try {

                context.dispatch(vuex.actions.REQUEST, {
                    model: 'COMPLAINT',
                    action: 'FETCH',
                    params: context.state.base.pagination
                });

                // let {
                //     issues = [], issuer = [], total = 0
                // } = await Complaint[
                //     vuex.actions.COMPLAINT.FETCH
                // ](state.base.pagination);

                // commit(vuex.mutations.STORE, {
                //     value: issues
                // });

                // commit(vuex.mutations.STORE, {
                //     value: issues
                // });

                // commit(vuex.mutations.UPDATE_PAGINATION, {
                //     key: 'totalItems',
                //     value: total
                // });

                // return issues;

            } catch (error) {
                throw error;
            }
        }
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