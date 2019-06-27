import {
    actions
} from '../constants';

function parseFetch(context, {
    issues = [],
    recipients: groups = [],
    status: issue_statuses = [],
    notes: issue_notes = [],
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

    parsers.ISSUE_NOTE[vuex.actions.ISSUE_NOTE.FETCH](context, {
        issue_notes
    });

    rootCommit(
        vuex.mutations.STORE,
        vuex.modules.ISSUE, {
            value: issues.map(issue => new models.ISSUE({
                ...issue,
                context
            })),
            strategy
        }
    )

    rootCommit(
        vuex.mutations.SET_STATE,
        vuex.modules.ISSUE, {
            key: 'totalItems',
            value: !total ? rootGetters[`${vuex.modules.ISSUE}/${vuex.getters.ALL_COUNT}`] : total
        }
    );
};

function parseEdit(context, {
    issues: issue,
    recipients: groups = [],
    status: issue_statuses = [],
    notes: issue_notes = [],
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

    parsers.ISSUE_NOTE[vuex.actions.ISSUE_NOTE.FETCH](context, {
        issue_notes
    });

    parsers.FILE[vuex.actions.FILE.FETCH](context, {
        files
    });

    const oldComplaint = rootGetters[
        `${vuex.modules.ISSUE}/${vuex.getters.BY_KEY}`
    ](issue.id) || {};

    const updatedCompaint = _.merge({
        ...oldComplaint.data
    }, issue);

    rootCommit(
        vuex.mutations.UPDATE,
        vuex.modules.ISSUE, {
            key: issue.id,
            value: new models.ISSUE({
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
    notes = [],
    attachments = []
} = {}) {

    const {
        vuex,
        rootGetters
    } = context;

    const oldComplaint = rootGetters[
        `${vuex.modules.ISSUE}/${vuex.getters.BY_KEY}`
    ](issue.id) || null;

    if (oldComplaint) {
        parseEdit(context, {
            issues: issue,
            recipients,
            status,
            notes,
            attachments
        });
    } else {
        const issues = [issue];

        parseFetch(context, {
            issues,
            recipients,
            status,
            notes,
            attachments,
            total: rootGetters[
                `${vuex.modules.ISSUE}/${vuex.getters.GET_STATE}`
            ]('totalItems') + issues.length,
            strategy: 'merge'
        });
    }
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
        vuex.modules.ISSUE, {
            id
        }
    );
};

export default {
    [actions.ISSUE.FETCH]: parseFetch,
    [actions.ISSUE.SHOW]: parseStore,
    [actions.ISSUE.EDIT]: parseEdit,
    [actions.ISSUE.UPDATE]: parseEdit,
    [actions.ISSUE.STORE]: parseStore,
    [actions.ISSUE.DELETE]: parseDelete,
    [actions.ISSUE.RESTORE]: parseStore
}
