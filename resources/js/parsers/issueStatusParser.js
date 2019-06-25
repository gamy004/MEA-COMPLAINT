import {
    actions
} from '../constants';

function parseFetch(context, {
    issue_statuses = [],
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
        vuex.modules.ISSUE_STATUS, {
            strategy,
            value: issue_statuses.map(x => new models.ISSUE_STATUS({
                ...x,
                context
            }))
        }
    );

    rootCommit(
        vuex.mutations.SET_STATE,
        vuex.modules.ISSUE_STATUS, {
            key: 'totalItems',
            value: !total ? rootGetters[
                `${vuex.modules.ISSUE_STATUS}/${vuex.getters.ALL_COUNT}`
            ] : total
        }
    );

    // return {
    //     ...props,
    //     issues: issues.map(issue => new Complaint(issue))
    // }
};

export default {
    [actions.ISSUE_STATUS.FETCH]: parseFetch
}
