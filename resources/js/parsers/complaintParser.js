import {
    actions
} from '../constants';

function parseFetch(context, {
    issues = [],
    recipients: groups = [],
    status: issue_statuses = [],
    attachments: files = [],
    total = 0,
    strategy = 'replace'
} = {}) {
    const {
        rootCommit,
        rootGetters,
        vuex,
        models,
        parsers
    } = context;

    parsers.GROUP[vuex.actions.GROUP.FETCH](context, {
        groups
    });

    parsers.ISSUE_STATUS[vuex.actions.ISSUE_STATUS.FETCH](context, {
        issue_statuses
    });

    parsers.FILE[vuex.actions.FILE.FETCH](context, {
        files
    });

    rootCommit(
        vuex.mutations.STORE,
        vuex.modules.COMPLAINT, {
            value: issues.map(issue => new models.COMPLAINT({
                ...issue,
                context
            })),
            strategy
        }
    )

    rootCommit(
        vuex.mutations.SET_STATE,
        vuex.modules.COMPLAINT, {
            key: 'totalItems',
            value: !total ? rootGetters[`${vuex.modules.COMPLAINT}/${vuex.getters.ALL_COUNT}`] : total
        }
    );
};

function parseEdit(context, {
    issues: issue,
    recipients: groups = [],
    status: issue_statuses = [],
    attachments: files = []
} = {}) {

    const {
        rootCommit,
        rootGetters,
        vuex,
        models,
        parsers
    } = context;

    parsers.GROUP[vuex.actions.GROUP.FETCH](context, {
        groups
    });

    parsers.ISSUE_STATUS[vuex.actions.ISSUE_STATUS.FETCH](context, {
        issue_statuses
    });

    parsers.FILE[vuex.actions.FILE.FETCH](context, {
        files
    });

    const oldComplaint = rootGetters[
        `${vuex.modules.COMPLAINT}/${vuex.getters.BY_KEY}`
    ](issue.id) || {};

    const updatedCompaint = _.merge({
        ...oldComplaint.data
    }, issue);

    rootCommit(
        vuex.mutations.UPDATE,
        vuex.modules.COMPLAINT, {
            key: issue.id,
            value: new models.COMPLAINT({
                ...updatedCompaint,
                context
            })
        }
    );
};

function parseStore(context, {
    issues: issue,
    recipients = [],
    status = [],
    attachments = []
} = {}) {

    const {
        vuex,
        rootGetters
    } = context;

    const issues = [issue];

    parseFetch(context, {
        issues,
        recipients,
        status,
        attachments,
        total: rootGetters[
            `${vuex.modules.COMPLAINT}/${vuex.getters.GET_STATE}`
        ]('totalItems') + issues.length,
        strategy: 'merge'
    });
};

function parseDelete(context, {
    id
} = {}) {

    const {
        rootCommit,
        vuex
    } = context;

    rootCommit(
        vuex.mutations.DELETE,
        vuex.modules.COMPLAINT, {
            id
        }
    );
};

export default {
    [actions.COMPLAINT.FETCH]: parseFetch,
    [actions.COMPLAINT.SHOW]: parseStore,
    [actions.COMPLAINT.EDIT]: parseEdit,
    [actions.COMPLAINT.UPDATE]: parseEdit,
    [actions.COMPLAINT.STORE]: parseStore,
    [actions.COMPLAINT.DELETE]: parseDelete,
    [actions.COMPLAINT.RESTORE]: parseStore
}
