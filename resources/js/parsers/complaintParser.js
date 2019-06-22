import {
    actions
} from '../constants';

function parseFetch(context, {
    issues = [],
    recipients: groups = [],
    status: statuses = [],
    total = 0,
    strategy = 'merge'
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

function parseStore(context, {
    issues,
    recipients: groups = [],
    status: statuses = []
} = {}) {

    const {
        vuex,
        rootGetters
    } = context;

    issues = [issues];

    parseFetch(context, {
        issues,
        groups,
        statuses,
        total: rootGetters[`${vuex.modules.COMPLAINT}/${vuex.getters.GET_STATE}`]('totalItems') + issues.length
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
    [actions.COMPLAINT.STORE]: parseStore,
    [actions.COMPLAINT.DELETE]: parseDelete,
    [actions.COMPLAINT.RESTORE]: parseStore
}
