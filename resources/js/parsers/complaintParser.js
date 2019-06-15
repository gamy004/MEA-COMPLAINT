import {
    actions
} from '../constants';

function parseFetch(context, {
    issues = [],
    total = 0,
    ...props
} = {}) {
    const {
        rootCommit,
        vuex,
        models,
        parsers
    } = context;

    parsers.GROUP[vuex.actions.GROUP.FETCH](context, {
        ...props
    });

    rootCommit(
        vuex.mutations.STORE,
        vuex.modules.COMPLAINT, {
            value: issues.map(issue => new models.COMPLAINT({
                ...issue,
                context
            }))
        }
    )

    rootCommit(
        vuex.mutations.UPDATE_PAGINATION,
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
