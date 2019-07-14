import {
    actions
} from '../constants';

function parseFetch(context, {
    users = [],
    roles = [],
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

    parsers.ROLE[vuex.actions.ROLE.FETCH](context, {
        roles,
        strategy: 'merge'
    });

    rootCommit(
        vuex.mutations.STORE,
        vuex.modules.USER, {
            strategy,
            value: users.map(x => new models.USER({
                ...x,
                context
            }))
        }
    );

    rootCommit(
        vuex.mutations.SET_STATE,
        vuex.modules.USER, {
            key: 'totalItems',
            value: !total ? rootGetters[
                `${vuex.modules.USER}/${vuex.getters.ALL_COUNT}`
            ] : total
        }
    );
};

function parseStore(context, {
    users: user,
    roles = []
} = {}) {

    const {
        vuex,
        rootGetters
    } = context;

    const oldStatus = rootGetters[
        `${vuex.modules.USER}/${vuex.getters.BY_KEY}`
    ](user.id) || null;

    if (oldStatus) {
        parseEdit(context, {
            users: user,
            roles
        });
    } else {
        const users = [user];

        parseFetch(context, {
            users,
            roles,
            total: rootGetters[
                `${vuex.modules.USER}/${vuex.getters.GET_STATE}`
            ]('totalItems') + users.length,
            strategy: 'merge'
        });
    }
};

function parseEdit(context, {
    users: user,
    roles = []
} = {}) {

    const {
        rootState,
        rootCommit,
        rootGetters,
        vuex,
        models,
        parsers
    } = context;

    // const {
    //     auth
    // } = rootState;

    // if (auth.id === user.id) {
    //     const updatedAuth = _.merge({
    //         ..._.cloneDeep(auth.data)
    //     }, user);

    //     rootCommit(vuex.mutations.SET_STATE, "", {
    //         key: 'auth',
    //         value: new models.USER({
    //             ...updatedAuth,
    //             context
    //         })
    //     });
    // }

    const oldUser = rootGetters[
        `${vuex.modules.USER}/${vuex.getters.BY_KEY}`
    ](user.id) || {};

    const updatedUser = {
        ..._.cloneDeep(oldUser.data),
        ...user
    };

    parsers.ROLE[vuex.actions.ROLE.FETCH](context, {
        roles,
        strategy: 'merge'
    });

    rootCommit(
        vuex.mutations.UPDATE,
        vuex.modules.USER, {
            key: user.id,
            value: new models.USER({
                ...updatedUser,
                context
            })
        }
    );
};

function parseUpdateConfig(context, {
    users: user
} = {}) {

    const {
        rootState,
        rootCommit,
        vuex,
        models
    } = context;

    const {
        auth
    } = rootState;

    if (auth.id === user.id) {
        const updatedAuth = {
            ..._.cloneDeep(auth.data),
            ...user
        };

        rootCommit(vuex.mutations.SET_STATE, "", {
            key: 'auth',
            value: new models.USER({
                ...updatedAuth,
                context
            })
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
        vuex.modules.USER, {
            id
        }
    );
};

export default {
    [actions.USER.FETCH]: parseFetch,
    [actions.USER.STORE]: parseStore,
    [actions.USER.EDIT]: parseEdit,
    [actions.USER.UPDATE]: parseEdit,
    [actions.USER.UPDATE_CONFIG]: parseUpdateConfig,
    [actions.USER.DELETE]: parseDelete,
    [actions.USER.RESTORE]: parseStore
}
