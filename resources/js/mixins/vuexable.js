import {
    mapState,
    mapGetters,
    mapActions
} from "vuex";

import {
    mapWaitingActions,
    mapWaitingGetters
} from "vue-wait";

import {
    modules,
    getters,
    mutations,
    actions
} from "../constants";

import models from "../models";

export const vuex = {
    mapState,
    mapGetters,
    mapActions,
    mapWaitingActions,
    mapWaitingGetters,
    modules,
    getters,
    mutations,
    actions,
    models
};

export const vuexable = {
    methods: {
        $_vuexable_getState(key, module = '') {
            return this.$_vuexable_getter(getters.GET_STATE, module, key);
        },

        $_vuexable_getByKey(key, module = '') {
            return this.$_vuexable_getter(getters.BY_KEY, module, key);
        },

        $_vuexable_getByKeys(key, module = '') {
            return this.$_vuexable_getter(getters.BY_KEYS, module, key);
        },

        $_vuexable_getMapping(mapModule, {
            key = null,
            module = ''
        }) {
            return this.$_vuexable_getter(getters.GET_MAPPING, module, {
                module: mapModule,
                key
            });
        },

        $_vuexable_setState({
            key,
            value
        }, module = '') {
            return this.$_vuexable_commit(mutations.SET_STATE,
                module, {
                    key,
                    value
                });
        },

        $_vuexable_setPagination(pagination, module = '') {
            this.$_vuexable_commit(
                mutations.SET_PAGINATION,
                module,
                pagination
            );

            return this;
        },

        $_vuexable_update({
            id,
            key,
            value
        }, module = '') {
            this.$_vuexable_commit(
                mutations.UPDATE,
                module, {
                    id,
                    key,
                    value
                }
            );

            return this;
        },

        $_vuexable_updatePagination({
            key,
            value
        }, module = '') {
            console.log(key);

            this.$_vuexable_commit(
                mutations.UPDATE_PAGINATION,
                module, {
                    key,
                    value
                }
            );

            return this;
        },

        $_vuexable_getPaginatedValues(page = null, module = '') {
            return this.$_vuexable_getter(
                getters.PAGINATED_VALUES,
                module,
                page
            );
        },

        // $_vuexable_shouldUpdatePagination({
        //   descending: newDescending,
        //   page: newPage,
        //   limit: newLimit,
        //   orderBy: newOrderBy,
        //   search: newSearch,
        //   skip: newSkip,
        //   after: newAfter,
        //   before: newBefore
        // }, {
        //   descending: oldDescending,
        //   page: oldPage,
        //   limit: oldLimit,
        //   orderBy: oldOrderBy,
        //   search: oldSearch,
        //   skip: oldSkip,
        //   after: oldAfter,
        //   before: oldBefore
        // }) {
        //   return !_.isEqual(newDescending, oldDescending) ||
        //     !_.isEqual(newPage, oldPage) ||
        //     !_.isEqual(newLimit, oldLimit) ||
        //     !_.isEqual(newOrderBy, oldOrderBy) ||
        //     !_.isEqual(newSearch.keyword, oldSearch.keyword) ||
        //     !_.isEqual(newSearch.fields, oldSearch.fields)
        // },

        $_vuexable_shouldUpdatePagination(newPagination, module = '') {
            const oldPagination = this.$_vuexable_getState("pagination", module);

            return !_.isEqual(newPagination, oldPagination);
        },

        $_vuexable_getSlug(key, value, module = '') {
            return this.$_vuexable_getter(
                getters.GET_SLUG,
                module,
                key,
                value
            );
        },

        $_vuexable_toggleState(key, module = '') {
            return this.$_vuexable_commit(
                mutations.TOGGLE_STATE,
                module,
                key
            );
        },

        $_vuexable_storeModule(fn, module) {
            if (module.length) {
                fn = `${module}/${fn}`;
            }

            return fn;
        },

        $_vuexable_getter(fn, module = '', ...props) {
            if (props.length) {
                return this.$store.getters[
                    this.$_vuexable_storeModule(fn, module)
                ](...props);
            } else {
                return this.$store.getters[this.$_vuexable_storeModule(fn, module)];
            }
        },

        $_vuexable_commit(fn, module = '', ...props) {
            this.$store.commit(this.$_vuexable_storeModule(fn, module), ...props);

            return this;
        },

        async $_vuexable_dispatch(fn, module = '', ...props) {
            return await this.$store.dispatch(this.$_vuexable_storeModule(fn, module), ...props);
        }
    }
};

export default vuexable;
