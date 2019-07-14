import {
    actions
} from '../constants';

function parseFetch(context, {
    groups = [],
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
        vuex.modules.SUB_GROUP, {
            strategy,
            value: groups.map(x => new models.SUB_GROUP({
                ...x,
                context
            }))
        }
    );

    rootCommit(
        vuex.mutations.SET_STATE,
        vuex.modules.SUB_GROUP, {
            key: 'totalItems',
            value: !total ? rootGetters[`${vuex.modules.SUB_GROUP}/${vuex.getters.ALL_COUNT}`] : total
        }
    );

    // return {
    //     ...props,
    //     issues: issues.map(issue => new Complaint(issue))
    // }
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
        `${vuex.modules.SUB_GROUP}/${vuex.getters.BY_KEY}`
    ](group.id) || {};

    const updatedGroup = {
        ..._.cloneDeep(oldGroup.data),
        ...group
    };

    rootCommit(
        vuex.mutations.UPDATE,
        vuex.modules.SUB_GROUP, {
            key: group.id,
            value: new models.SUB_GROUP({
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
        vuex.modules.SUB_GROUP, {
            id
        }
    );
};

export default {
    [actions.SUB_GROUP.FETCH]: parseFetch,
    [actions.SUB_GROUP.UPDATE]: parseEdit,
    [actions.SUB_GROUP.DELETE]: parseDelete,
}
