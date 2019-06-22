import {
    actions
} from '../constants';

function parseFetch(context, {
    groups = [],
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
        vuex.modules.GROUP, {
            strategy,
            value: groups.map(x => new models.GROUP({
                ...x,
                context
            }))
        }
    );

    rootCommit(
        vuex.mutations.SET_STATE,
        vuex.modules.GROUP, {
            key: 'totalItems',
            value: !total ? rootGetters[`${vuex.modules.GROUP}/${vuex.getters.ALL_COUNT}`] : total
        }
    );

    // return {
    //     ...props,
    //     issues: issues.map(issue => new Complaint(issue))
    // }
};

export default {
    [actions.GROUP.FETCH]: parseFetch
}
