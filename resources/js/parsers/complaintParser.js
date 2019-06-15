import {
    actions
} from '../constants';

function parseFetch(context, {
    issues = [],
    recipients: groups = [],
    status: statuses = [],
    total = 0
} = {}) {
    const {
        rootCommit,
        vuex,
        models,
        parsers
    } = context;

    parsers.GROUP[vuex.actions.GROUP.FETCH](context, {
        groups
    });

    parsers.STATUS[vuex.actions.STATUS.FETCH](context, {
        statuses
    });

    rootCommit(
        vuex.mutations.STORE,
        vuex.modules.COMPLAINT, {
            value: issues.map(issue => new models.COMPLAINT({
                ...issue,
                context
            })),
            strategy: 'merge'
        }
    )

    rootCommit(
        vuex.mutations.SET_STATE,
        vuex.modules.COMPLAINT, {
            key: 'totalItems',
            value: !total ? issues.length : total
        }
    );

    // return {
    //     ...props,
    //     issues: issues.map(issue => new Complaint(issue))
    // }
};

export default {
    [actions.COMPLAINT.FETCH]: parseFetch
}
