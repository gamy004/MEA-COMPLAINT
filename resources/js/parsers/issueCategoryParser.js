import {
    actions
} from '../constants';

function parseFetch(context, {
    issue_categories = [],
    total = 0,
    strategy = 'merge'
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

export default {
    [actions.ISSUE_CATEGORY.FETCH]: parseFetch
}
