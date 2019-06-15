import {
    actions
} from '../constants';

function parseFetch(context, {
    issuer = [],
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
            value: issuer.map(x => new models.GROUP({
                ...x,
                context
            }))
        }
    );

    rootCommit(
        vuex.mutations.UPDATE_PAGINATION,
        vuex.modules.GROUP, {
            key: 'totalItems',
            value: !total ? issuer.length : total
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
