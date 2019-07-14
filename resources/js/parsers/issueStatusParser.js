import {
    actions
} from '../constants';

function parseFetch(context, {
    issue_statuses = [],
    total = 0,
    strategy = 'replace'
} = {}) {
    const {
        rootCommit,
        rootGetters,
        vuex,
        models
    } = context;

    rootCommit(
        vuex.mutations.STORE,
        vuex.modules.ISSUE_STATUS, {
            strategy,
            value: issue_statuses.map(x => new models.ISSUE_STATUS({
                ...x,
                context
            }))
        }
    );

    rootCommit(
        vuex.mutations.SET_STATE,
        vuex.modules.ISSUE_STATUS, {
            key: 'totalItems',
            value: !total ? rootGetters[
                `${vuex.modules.ISSUE_STATUS}/${vuex.getters.ALL_COUNT}`
            ] : total
        }
    );
};

function parseStore(context, {
    issue_statuses: issue_status
} = {}) {

    const {
        vuex,
        rootGetters
    } = context;

    const oldStatus = rootGetters[
        `${vuex.modules.ISSUE_STATUS}/${vuex.getters.BY_KEY}`
    ](issue_status.id) || null;

    if (oldStatus) {
        parseEdit(context, {
            issue_statuses: issue_status
        });
    } else {
        const issue_statuses = [issue_status];

        parseFetch(context, {
            issue_statuses,
            total: rootGetters[
                `${vuex.modules.ISSUE_STATUS}/${vuex.getters.GET_STATE}`
            ]('totalItems') + issue_statuses.length,
            strategy: 'merge'
        });
    }
};

function parseEdit(context, {
    issue_statuses: issue_status
} = {}) {

    const {
        rootCommit,
        rootGetters,
        vuex,
        models
    } = context;

    const oldStatus = rootGetters[
        `${vuex.modules.ISSUE_STATUS}/${vuex.getters.BY_KEY}`
    ](issue_status.id) || {};

    const updatedStatus = {
        ..._.cloneDeep(oldStatus.data),
        ...issue_status
    };

    rootCommit(
        vuex.mutations.UPDATE,
        vuex.modules.ISSUE_STATUS, {
            key: issue_status.id,
            value: new models.ISSUE_STATUS({
                ...updatedStatus,
                context
            })
        }
    );
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
        vuex.modules.ISSUE_STATUS, {
            id
        }
    );
};

export default {
    [actions.ISSUE_STATUS.FETCH]: parseFetch,
    [actions.ISSUE_STATUS.STORE]: parseStore,
    [actions.ISSUE_STATUS.UPDATE]: parseEdit,
    [actions.ISSUE_STATUS.UPDATE_STATUS]: parseEdit,
    [actions.ISSUE_STATUS.DELETE]: parseDelete,
    [actions.ISSUE_STATUS.RESTORE]: parseStore
}
