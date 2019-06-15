import {
    actions
} from '../constants';

function parseFetch(context, {
    statuses = [],
    total = 0
} = {}) {
    const {
        rootCommit,
        vuex,
        models
    } = context;

    rootCommit(
        vuex.mutations.STORE,
        vuex.modules.STATUS, {
            value: statuses.map(x => new models.STATUS({
                ...x,
                context
            }))
        }
    );

    rootCommit(
        vuex.mutations.SET_STATE,
        vuex.modules.STATUS, {
            key: 'totalItems',
            value: !total ? statuses.length : total
        }
    );

    // return {
    //     ...props,
    //     issues: issues.map(issue => new Complaint(issue))
    // }
};

export default {
    [actions.STATUS.FETCH]: parseFetch
}
