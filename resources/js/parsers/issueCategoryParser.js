import {
    actions
} from '../constants';

function parseFetch(context, {
    issue_categories = [],
    total = 0,
    strategy = 'replace'
} = {}) {
    const {
        rootCommit,
        rootGetters,
        vuex,
        models
    } = context;

    rootCommit(
        vuex.mutations.STORE,
        vuex.modules.ISSUE_CATEGORY, {
            strategy,
            value: issue_categories.map(x => new models.ISSUE_CATEGORY({
                ...x,
                context
            }))
        }
    );

    rootCommit(
        vuex.mutations.SET_STATE,
        vuex.modules.ISSUE_CATEGORY, {
            key: 'totalItems',
            value: !total ? rootGetters[`${vuex.modules.ISSUE_CATEGORY}/${vuex.getters.ALL_COUNT}`] : total
        }
    );
};

function parseStore(context, {
    issue_categories: issue_category
} = {}) {

    const {
        vuex,
        rootGetters
    } = context;

    const oldCategory = rootGetters[
        `${vuex.modules.ISSUE_CATEGORY}/${vuex.getters.BY_KEY}`
    ](issue_category.id) || null;

    if (oldCategory) {
        parseEdit(context, {
            issue_categories: issue_category
        });
    } else {
        const issue_categories = [issue_category];

        parseFetch(context, {
            issue_categories,
            total: rootGetters[
                `${vuex.modules.ISSUE_CATEGORY}/${vuex.getters.GET_STATE}`
            ]('totalItems') + issue_categories.length,
            strategy: 'merge'
        });
    }
};

function parseEdit(context, {
    issue_categories: issue_category
} = {}) {

    const {
        rootCommit,
        rootGetters,
        vuex,
        models,
        parsers
    } = context;

    const oldCategory = rootGetters[
        `${vuex.modules.ISSUE_CATEGORY}/${vuex.getters.BY_KEY}`
    ](issue_category.id) || {};

    const updatedCategory = _.merge({
        ...oldCategory.data
    }, issue_category);

    rootCommit(
        vuex.mutations.UPDATE,
        vuex.modules.ISSUE_CATEGORY, {
            key: issue_category.id,
            value: new models.ISSUE({
                ...updatedCategory,
                context
            })
        }
    );
};

function parseDelete(context, {
    id
} = {}) {

    const {
        rootCommit,
        vuex
    } = context;

    rootCommit(
        vuex.mutations.DELETE,
        vuex.modules.ISSUE_CATEGORY, {
            id
        }
    );
};

export default {
    [actions.ISSUE_CATEGORY.FETCH]: parseFetch,
    [actions.ISSUE_CATEGORY.STORE]: parseStore,
    [actions.ISSUE_CATEGORY.UPDATE]: parseEdit,
    [actions.ISSUE_CATEGORY.DELETE]: parseDelete,
    [actions.ISSUE_CATEGORY.RESTORE]: parseStore
}
