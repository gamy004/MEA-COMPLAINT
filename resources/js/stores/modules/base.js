import Vue from 'vue';
import {
    vuex
} from '../../mixins/vuexable';
import parsers from "../../parsers";
import models from "../../models";

export default {
    state() {
        return {
            collection: {},
            mapping: {},
            selected: {},
            sortedIndex: [],
            sortedPaginateIndex: {},
            paginateIndex: {},
            filter_groups: [
                // default to => { filters: [{ key: "", value: "", operator: "", not: false }], or: false }
            ],
            pagination: {
                search: {
                    keyword: '',
                    fields: []
                },
                descending: false,
                rowsPerPage: 10,
                page: 1,
                sortBy: "id"
            },
            totalItems: 0,
            active: null,
            edit: null,
            dialog: false
        };
    },

    actions: {
        async [vuex.actions.REQUEST](context, {
            model,
            action,
            params = {}
        }) {
            const requestModel = models[model];

            if (!requestModel) {
                throw `Please Register model ${model}`;
            }

            const requestAction = vuex.actions[model][action];

            if (!requestModel.hasOwnProperty(requestAction)) {
                throw `Model doesn't have required method ${action}`;
            }

            let response;

            // console.log(requestModel, requestAction);

            try {
                response = await requestModel[requestAction](params);
            } catch (error) {
                throw error;
            }

            if (parsers.hasOwnProperty(model) &&
                parsers[model].hasOwnProperty(requestAction)
            ) {
                parsers[model][requestAction]({
                    ...context,
                    rootCommit: (fn, module = "", props = {}) => {
                        if (module.length) {
                            fn = `${module}/${fn}`;
                        }

                        return context.commit(fn, {
                            ...props
                        }, {
                            root: true
                        });
                    },
                    params,
                    vuex,
                    models,
                    parsers
                }, response.data);
            }

            return response;
        }
    },

    getters: {
        [vuex.getters.ALL]: ({
            collection
        }) => (collection),
        [vuex.getters.ALL_COUNT]: (state, getters) => (getters[vuex.getters.ALL_KEYS].length),
        [vuex.getters.ALL_KEYS]: (state, getters) => (Object.keys(getters[vuex.getters.ALL])),
        [vuex.getters.ALL_VALUES]: (state, getters) => (Object.values(getters[vuex.getters.ALL])),
        [vuex.getters.SORTED_KEYS]: ({
            sortedIndex
        }) => (sortedIndex),
        [vuex.getters.SORTED_VALUES]: (state, getters) => {
            const {
                sortedIndex
            } = state;

            return sortedIndex.map(key => getters[vuex.getters.BY_KEY](key));
        },
        [vuex.getters.PAGINATED_VALUES]: (state, getters) => (page = null) => {
            const {
                pagination,
                sortedPaginateIndex
            } = state;

            page = _.isNull(page) ? pagination.page : page;

            const sortedIndex = sortedPaginateIndex.hasOwnProperty(page) ?
                sortedPaginateIndex[page] : [];

            return sortedIndex.map(key => getters[vuex.getters.BY_KEY](key));
        },
        [vuex.getters.BY_KEY]: (state) => (key) => {
            return state.collection.hasOwnProperty(key) ? state.collection[key] : null;
        },
        [vuex.getters.BY_KEYS]: (state, getters) => (keys = []) => {
            let result = keys.reduce((res, key) => {
                res.push(
                    getters[vuex.getters.BY_KEY](key)
                );

                return res;
            }, []);

            return result.filter(Boolean);
        },
        [vuex.getters.ACTIVE]: (state, getters) => {
            const v = getters[vuex.getters.ALL],
                {
                    active
                } = state;

            if (active !== null && v.hasOwnProperty(active)) {
                return v[active];
            }
        },
        [vuex.getters.EDIT]: (state, getters) => {
            const v = getters[vuex.getters.ALL],
                {
                    edit
                } = state;

            if (edit !== null && v.hasOwnProperty(edit)) {
                return v[edit];
            }
        },
        [vuex.getters.ACTIVE_SLUG]: (state, getters) => (key) => {
            const v = getters[vuex.getters.ACTIVE];

            return _.kebabCase(v[key]);
        },
        [vuex.getters.ACTIVE_VALUES]: (state, getters) => {
            const v = getters[vuex.getters.ALL];

            return _.find(v, (o) => getters[vuex.getters.IS_ACTIVE](o));
        },
        [vuex.getters.IS_ACTIVE]: (state) => (key) => {
            const {
                active
            } = state;

            return key == active;
        },
        [vuex.getters.GET_SLUG]: (state, getters) => (key, value) => {
            const v = getters[vuex.getters.ALL];

            return _.find(v, (o) => _.kebabCase(o[key]) === _.kebabCase(value));
        },
        [vuex.getters.GET_STATE]: (state) => (key, attr = null) => {
            if (state.hasOwnProperty(key)) {
                return attr !== null ? state[key][attr] : state[key];
            }
        },
        [vuex.getters.GET_MAPPING]: (state) => ({
            module,
            key = null
        }) => {
            if (state.mapping[module]) {
                if (key) {
                    return state.mapping[module][key];
                } else {
                    return state.mapping[module];
                }
            }
        },
    },

    mutations: {
        [vuex.mutations.INCREASE](state, {
            key,
            value = 1
        } = {}) {
            if (state.hasOwnProperty(key) && _.isNumber(state[key])) {
                Vue.set(state, key, state[key] + value);
            }
        },

        [vuex.mutations.DECREASE](state, {
            key,
            value = 1
        } = {}) {
            if (state.hasOwnProperty(key) && _.isNumber(state[key])) {
                Vue.set(state, key, state[key] - value);
            }
        },

        [vuex.mutations.DELETE](state, {
            id
        }) {
            if (state.collection.hasOwnProperty(id)) {
                const targetPage = state.paginateIndex[id];

                const sortedIndex = state.sortedIndex.indexOf(id);

                if (sortedIndex !== -1) {
                    state.sortedIndex.splice(sortedIndex, 1);
                }

                const sortedPaginatedIndex = state.sortedPaginateIndex[targetPage].indexOf(id);

                if (sortedPaginatedIndex !== -1) {
                    state.sortedPaginateIndex[targetPage].splice(sortedPaginatedIndex, 1);
                }

                Vue.delete(state.paginateIndex, id);

                Vue.delete(state.collection, id);

                Vue.set(state, 'totalItems', state.totalItems - 1);
            }
        },

        [vuex.mutations.CLEAR](state) {
            Vue.set(state, 'collection', {});
            Vue.set(state, 'sortedIndex', []);
            Vue.set(state, 'sortedPaginateIndex', {});
            Vue.set(state, 'paginateIndex', {});
            Vue.set(state, 'active', null);
        },

        [vuex.mutations.CLEAR_PAGINATION](state) {
            Vue.set(state, 'pagination', {
                search: {
                    keyword: '',
                    fields: []
                },
                descending: false,
                rowsPerPage: 10,
                page: 1,
                sortBy: "id"
            });

            Vue.set(state, 'totalItems', 0);
        },

        [vuex.mutations.SET](state, {
            key,
            value
        }) {
            Vue.set(state.collection, key, value);
        },

        [vuex.mutations.SET_MAPPING](state, {
            module,
            key = null,
            value,
            strategy = 'replace'
        }) {
            if (!state.mapping[module]) {
                Vue.set(state.mapping, module, {});
            }

            if (key && !state.mapping[module][key]) {
                Vue.set(state.mapping[module], key, {});
            }

            let objKey = `${module}`;

            if (key) {
                objKey += `.${key}`;
            }

            switch (strategy) {
                case 'merge':
                    const oldMapping = _.get(state.mapping, objKey);

                    if (key) {
                        Vue.set(state.mapping[module], key, {
                            ...oldMapping,
                            ...value
                        });
                    } else {
                        Vue.set(state.mapping, module, {
                            ...oldMapping,
                            ...value
                        });
                    }

                    break;

                default:
                    if (key) {
                        Vue.set(state.mapping[module], key, value);
                    } else {
                        Vue.set(state.mapping, module, value);
                    }
                    break;
            }
        },

        [vuex.mutations.SET_ACTIVE](state, value) {
            state.active = value;
        },

        [vuex.mutations.SET_EDIT](state, value) {
            state.edit = value;
        },

        [vuex.mutations.STORE](state, {
            key = 'id',
            value = [],
            active = 0,
            method = 'keyBy',
            strategy = 'replace'
        }) {
            const {
                pagination
            } = state,
            activeVaule = value[active],
                collection = _[method](value, key),
                sortedIndex = _.map(value, key);

            switch (strategy) {
                case 'merge':
                    const {
                        collection: oldCollection,
                            sortedIndex: oldSortedIndex
                    } = state,

                    oldSortedPaginateIndex = state.sortedPaginateIndex[pagination.page] || [];

                    // Vue.set(state, 'collection', {
                    //     ...oldCollection,
                    //     ...collection
                    // });

                    Vue.set(state, 'collection', _.merge(collection, oldCollection));

                    const mergedSortedIndex = _.union(sortedIndex, oldSortedIndex);

                    Vue.set(state, 'sortedIndex', mergedSortedIndex);

                    const mergedSortedPaginatedIndex = _.union(sortedIndex, oldSortedPaginateIndex);

                    Vue.set(state.sortedPaginateIndex, pagination.page, mergedSortedPaginatedIndex);

                    // Vue.set(state, 'collection', _.merge(oldCollection, collection));

                    // const mergedSortedIndex = _.union(oldSortedIndex, sortedIndex);

                    // Vue.set(state, 'sortedIndex', mergedSortedIndex);

                    // const mergedSortedPaginatedIndex = _.union(oldSortedPaginateIndex, sortedIndex);

                    // Vue.set(state.sortedPaginateIndex, pagination.page, mergedSortedPaginatedIndex);

                    break;

                default:
                    Vue.set(state, 'collection', collection);

                    Vue.set(state, 'sortedIndex', sortedIndex);

                    Vue.set(state, 'sortedPaginateIndex', {});

                    Vue.set(state, 'paginateIndex', {});

                    Vue.set(state.sortedPaginateIndex, pagination.page, sortedIndex);

                    break;
            }

            if (state.sortedPaginateIndex[pagination.page]) {
                state.sortedPaginateIndex[pagination.page].forEach(element => {
                    Vue.set(state.paginateIndex, element, pagination.page);
                });
            }
            // Don't set active
            // if (activeVaule.hasOwnProperty(key)) {
            //     state.active = activeVaule[key];
            // }
        },

        [vuex.mutations.UPDATE](state, {
            key,
            value,
            attr = null,
            state: updateState = false
        }) {
            if (!updateState && state.collection.hasOwnProperty(key)) {
                if (attr !== null) {
                    Vue.set(state.collection[key], attr, value);
                } else {
                    Vue.set(state.collection, key, value);
                }
            }

            if (updateState && state.hasOwnProperty(key)) {
                if (attr !== null) {
                    Vue.set(state[key], attr, value);
                } else {
                    Vue.set(state, key, value);
                }
            }
        },

        [vuex.mutations.SET_PAGINATION](state, pagination) {
            if (!_.isEqual(state.pagination, pagination)) {
                Vue.set(state, 'pagination', {
                    ...state.pagination,
                    ...pagination
                });
            }
        },

        [vuex.mutations.UPDATE_PAGINATION](state, {
            key,
            value
        }) {
            Vue.set(state.pagination, key, value);
        },

        [vuex.mutations.MAP_PAGINATION](state, {
            page,
            data,
            key = 'id'
        }) {
            Vue.set(
                state.paginationMap,
                page,
                _.map(data, key)
            );
        },

        [vuex.mutations.SET_STATE](state, {
            key,
            value
        }) {
            Vue.set(state, key, value);
        }
    }
};
