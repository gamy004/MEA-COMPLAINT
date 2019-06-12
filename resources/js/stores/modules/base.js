import Vue from 'vue';
import {
    vuex
} from '../../mixins/vuexable';
import Api from '../../models/Api';
// import parsers from "../parsers";
// import models from "../models";

export default {
    state() {
        return {
            $api: new Api,
            collection: {},
            mapping: {},
            sortedIndex: [],
            sortedPaginateIndex: {},
            pagination: {
                search: {
                    keyword: '',
                    fields: []
                },
                descending: false,
                rowsPerPage: 10,
                page: 1,
                sortBy: "id",
                totalItems: 0
            },
            active: null
        };
    },

    actions: {
        // async [vuex.actions.QUERY](context, {
        //     query,
        //     args,
        //     payload
        // }) {
        //     const gql = await context.dispatch(
        //         `${vuex.modules.GATEWAYS}/${vuex.actions.GET_GQL}`,
        //         null, {
        //             root: true
        //         }
        //     );

        //     let response;

        //     try {
        //         response = await gql.query(
        //             query,
        //             args,
        //             payload
        //         );
        //     } catch (error) {
        //         console.log(error);
        //         throw "Cannot fetch data, please try again"
        //     }

        //     if (parsers.hasOwnProperty(query)) {
        //         parsers[query]({
        //             ...context,
        //             rootCommit: (fn, module = "", props = {}) => {
        //                 fn = vuex.mutations[fn];

        //                 if (module.length) {
        //                     fn = `${vuex.modules[module]}/${fn}`;
        //                 }

        //                 return context.commit(fn, {
        //                     ...props
        //                 }, {
        //                     root: true
        //                 });
        //             },
        //             args,
        //             vuex,
        //             models,
        //             parsers
        //         }, response.data);
        //     }

        //     return response;
        // }
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
        [vuex.getters.GET_STATE]: (state) => (key) => {
            if (state.hasOwnProperty(key)) {
                return state[key];
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
        [vuex.mutations.DELETE](state, id) {
            if (state.collection.hasOwnProperty(id)) {
                Vue.delete(state.collection, id);
            }
        },

        [vuex.mutations.CLEAR](state) {
            Vue.set(state, 'collection', {});
            Vue.set(state, 'sortedIndex', []);
            Vue.set(state, 'sortedPaginateIndex', {});
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
                sortBy: "id",
                totalItems: 0
            });
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

            value = _.cloneDeep(value);

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

        [vuex.mutations.STORE](state, {
            key = 'id',
            value = [],
            active = 0,
            method = 'keyBy',
            strategy = 'replace'
        }) {
            if (value.length) {
                value = _.cloneDeep(value);

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
                        } = state;

                        Vue.set(state, 'collection', {
                            ...oldCollection,
                            ...collection
                        });

                        Vue.set(state, 'sortedIndex', _.union(oldSortedIndex, sortedIndex));

                        break;

                    default:
                        Vue.set(state, 'collection', collection);

                        Vue.set(state, 'sortedIndex', sortedIndex);

                        break;
                }

                Vue.set(state.sortedPaginateIndex, pagination.page, sortedIndex);

                if (activeVaule.hasOwnProperty(key)) {
                    state.active = activeVaule[key];
                }
            }
        },

        [vuex.mutations.UPDATE](state, {
            id,
            key,
            value
        }) {
            let item = state.collection[id];

            if (item) {
                Vue.set(item, key, value);

                Vue.set(state.collection, id, item);
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
