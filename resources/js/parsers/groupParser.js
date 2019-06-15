import {
    actions
} from '../constants';

function parseFetch(context, {
    groups = [],
    total = 0
} = {}) {
    const {
        rootCommit,
        vuex,
        models
    } = context;

    rootCommit(
        vuex.mutations.STORE,
        vuex.modules.GROUP, {
            value: groups.map(x => new models.GROUP({
                ...x,
                context
            }))
        }
    );

    rootCommit(
        vuex.mutations.UPDATE_PAGINATION,
        vuex.modules.GROUP, {
            key: 'totalItems',
            value: !total ? groups.length : total
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