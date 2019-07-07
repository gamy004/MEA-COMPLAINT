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
    computed: {
        $_vuexable_auth() {
            return this.$store.state["auth"];
        }
    },
    methods: {
        $_vuexable_getState(key, module = '') {
            return this.$_vuexable_getter(getters.GET_STATE, module, key);
        },

        $_vuexable_getStateAttr(key, attr, module = '') {
            return this.$_vuexable_getter(getters.GET_STATE, module, key, attr);
        },

        $_vuexable_getByKey(key, module = '') {
            return this.$_vuexable_getter(getters.BY_KEY, module, key);
        },

        $_vuexable_getByKeys(keys, module = '') {
            return this.$_vuexable_getter(getters.BY_KEYS, module, keys);
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

        $_vuexable_getActive(module = '') {
            return this.$_vuexable_getter(getters.ACTIVE, module);
        },

        $_vuexable_setActive(key, module = '') {
            return this.$_vuexable_commit(
                mutations.SET_ACTIVE,
                module,
                key
            );
        },

        $_vuexable_getEdit(module = '') {
            return this.$_vuexable_getter(getters.EDIT, module);
        },

        $_vuexable_setEdit(key, module = '') {
            return this.$_vuexable_commit(
                mutations.SET_EDIT,
                module,
                key
            );
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
            key,
            value,
            attr = null,
            state = false
        }, module = '') {
            this.$_vuexable_commit(
                mutations.UPDATE,
                module, {
                    attr,
                    key,
                    value,
                    state
                }
            );

            return this;
        },

        $_vuexable_updateState({
            key,
            value,
            attr = null
        }, module = '') {
            return this.$_vuexable_commit(
                mutations.UPDATE,
                module, {
                    attr,
                    key,
                    value,
                    state: true
                }
            );
        },

        $_vuexable_updatePagination({
            key,
            value
        }, module = '') {
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

        $_vuexable_getSortedValues(module = '') {
            return this.$_vuexable_getter(
                getters.SORTED_VALUES,
                module
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
            console.log(newPagination, oldPagination);

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
