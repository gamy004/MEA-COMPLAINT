import {
    actions
} from '../constants';

function parseFetch(context, {
    groups = [],
    total = 0,
    strategy = 'merge'
} = {}) {
    const {
        rootCommit,
        rootGetters,
        vuex,
        models
    } = context;

    rootCommit(
        vuex.mutations.STORE,
        vuex.modules.GROUP, {
            strategy,
            value: groups.map(x => new models.GROUP({
                ...x,
                context
            }))
        }
    );

    rootCommit(
        vuex.mutations.SET_STATE,
        vuex.modules.GROUP, {
            key: 'totalItems',
            value: !total ? rootGetters[`${vuex.modules.GROUP}/${vuex.getters.ALL_COUNT}`] : total
        }
    );

    // return {
    //     ...props,
    //     issues: issues.map(issue => new Complaint(issue))
    // }
};

function parseStore(context, {
    groups: group
} = {}) {
    const {
        vuex,
        rootGetters
    } = context;

    const oldGroup = rootGetters[
        `${vuex.modules.GROUP}/${vuex.getters.BY_KEY}`
    ](group.id) || null;

    if (oldGroup) {
        parseEdit(context, {
            groups: group
        });
    } else {
        const groups = [group];

        parseFetch(context, {
            groups,
            total: rootGetters[
                `${vuex.modules.GROUP}/${vuex.getters.GET_STATE}`
            ]('totalItems') + groups.length,
            strategy: 'merge'
        });
    }
};

function parseEdit(context, {
    groups: group
} = {}) {

    const {
        rootCommit,
        rootGetters,
        vuex,
        models
    } = context;

    const oldGroup = rootGetters[
        `${vuex.modules.GROUP}/${vuex.getters.BY_KEY}`
    ](group.id) || {};

    const updatedGroup = {
        ..._.cloneDeep(oldGroup.data),
        ...group
    };

    rootCommit(
        vuex.mutations.UPDATE,
        vuex.modules.GROUP, {
            key: group.id,
            value: new models.GROUP({
                ...updatedGroup,
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
        vuex.modules.GROUP, {
            id
        }
    );
};

export default {
    [actions.GROUP.FETCH]: parseFetch,
    [actions.GROUP.UPDATE]: parseEdit,
    [actions.GROUP.DELETE]: parseDelete,
    [actions.GROUP.RESTORE]: parseStore
}
