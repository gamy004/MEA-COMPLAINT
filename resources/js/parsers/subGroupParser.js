import {
    actions
} from '../constants';

function parseFetch(context, {
    groups = [],
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
        vuex.modules.SUB_GROUP, {
            strategy,
            value: groups.map(x => new models.SUB_GROUP({
                ...x,
                context
            }))
        }
    );

    rootCommit(
        vuex.mutations.SET_STATE,
        vuex.modules.SUB_GROUP, {
            key: 'totalItems',
            value: !total ? rootGetters[`${vuex.modules.SUB_GROUP}/${vuex.getters.ALL_COUNT}`] : total
        }
    );

    // return {
    //     ...props,
    //     issues: issues.map(issue => new Complaint(issue))
    // }
};

export default {
    [actions.SUB_GROUP.FETCH]: parseFetch
}
