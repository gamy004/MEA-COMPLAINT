import {
    actions
} from '../constants';

function parseFetch(context, {
    issue_notes = [],
    creator: groups = [],
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

    rootCommit(
        vuex.mutations.STORE,
        vuex.modules.ISSUE_NOTE, {
            strategy,
            value: issue_notes.map(x => new models.ISSUE_NOTE({
                ...x,
                context
            }))
        }
    );

    rootCommit(
        vuex.mutations.SET_STATE,
        vuex.modules.ISSUE_NOTE, {
            key: 'totalItems',
            value: !total ? rootGetters[`${vuex.modules.ISSUE_NOTE}/${vuex.getters.ALL_COUNT}`] : total
        }
    );
};

export default {
    [actions.ISSUE_NOTE.FETCH]: parseFetch
}
