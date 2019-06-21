import {
    actions
} from '../constants';

function parseFetch(context, {
    issue_categories = [],
    total = 0
} = {}) {
    const {
        rootCommit,
        vuex,
        models
    } = context;
    console.log(issue_categories);

    rootCommit(
        vuex.mutations.STORE,
        vuex.modules.ISSUE_CATEGORY, {
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
            value: !total ? issue_categories.length : total
        }
    );

    // return {
    //     ...props,
    //     issues: issues.map(issue => new Complaint(issue))
    // }
};

export default {
    [actions.ISSUE_CATEGORY.FETCH]: parseFetch
}
