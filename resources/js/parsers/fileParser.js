import {
    actions
} from '../constants';

function parseFetch(context, {
    files = [],
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
        vuex.modules.FILE, {
            strategy,
            value: files.map(x => new models.FILE({
                ...x,
                context
            }))
        }
    );

    rootCommit(
        vuex.mutations.SET_STATE,
        vuex.modules.FILE, {
            key: 'totalItems',
            value: !total ? rootGetters[
                `${vuex.modules.FILE}/${vuex.getters.ALL_COUNT}`
            ] : total
        }
    );
};

function parseStore(context, {
    files: file
} = {}) {

    const {
        vuex,
        rootGetters
    } = context;

    const files = [file];

    parseFetch(context, {
        files,
        total: rootGetters[
            `${vuex.modules.FILE}/${vuex.getters.GET_STATE}`
        ]('totalItems') + files.length,
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
        vuex.modules.FILE, {
            id
        }
    );
};

export default {
    [actions.FILE.FETCH]: parseFetch,
    [actions.FILE.RESTORE]: parseStore,
    [actions.FILE.DELETE]: parseDelete
}
