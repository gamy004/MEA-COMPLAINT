import {
    actions
} from '../constants';

function parseFetch(context, {
    roles = [],
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
        vuex.modules.ROLE, {
            strategy,
            value: roles.map(x => new models.ROLE({
                ...x,
                context
            }))
        }
    );

    rootCommit(
        vuex.mutations.SET_STATE,
        vuex.modules.ROLE, {
            key: 'totalItems',
            value: !total ? rootGetters[`${vuex.modules.ROLE}/${vuex.getters.ALL_COUNT}`] : total
        }
    );
};

export default {
    [actions.ROLE.FETCH]: parseFetch
}
