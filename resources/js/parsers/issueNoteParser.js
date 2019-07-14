import {
    actions
} from '../constants';

function parseFetch(context, {
    issue_notes = [],
    creator: groups = [],
    attachments: files = [],
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

    parsers.FILE[vuex.actions.FILE.FETCH](context, {
        files
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

function parseStore(context, {
    issue_notes: issue_note,
    creator = [],
    attachments = []
} = {}) {

    const {
        vuex,
        rootGetters,
        rootCommit
    } = context;

    const oldNote = rootGetters[
        `${vuex.modules.ISSUE_NOTE}/${vuex.getters.BY_KEY}`
    ](issue_note.id) || null;

    if (oldNote) {
        parseEdit(context, {
            issue_notes: issue_note,
            creator,
            attachments
        });
    } else {
        const issue_notes = [issue_note];

        parseFetch(context, {
            issue_notes,
            creator,
            attachments,
            total: rootGetters[
                `${vuex.modules.ISSUE_NOTE}/${vuex.getters.GET_STATE}`
            ]('totalItems') + issue_notes.length,
            strategy: 'merge'
        });

        const complaint = rootGetters[
            `${vuex.modules.ISSUE}/${vuex.getters.BY_KEY}`
        ](issue_note.issue_id);

        if (complaint) {
            const {
                notes = []
            } = complaint;
            // update new note index to complaint
            rootCommit(
                vuex.mutations.UPDATE,
                vuex.modules.ISSUE, {
                    key: complaint.id,
                    value: Array.from(new Set([...notes, issue_note.id])),
                    attr: 'notes'
                }
            );
        }
    }
};

function parseEdit(context, {
    issue_notes: issue_note,
    creator: groups = [],
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

    parsers.FILE[vuex.actions.FILE.FETCH](context, {
        files
    });

    const oldNote = rootGetters[
        `${vuex.modules.ISSUE_NOTE}/${vuex.getters.BY_KEY}`
    ](issue_note.id) || {};

    const updatedNote = {
        ..._.cloneDeep(oldNote.data),
        ...issue_note
    };

    rootCommit(
        vuex.mutations.UPDATE,
        vuex.modules.ISSUE_NOTE, {
            key: issue_note.id,
            value: new models.ISSUE_NOTE({
                ...updatedNote,
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
        vuex.modules.ISSUE_NOTE, {
            id
        }
    );
};

export default {
    [actions.ISSUE_NOTE.FETCH]: parseFetch,
    [actions.ISSUE_NOTE.STORE]: parseStore,
    [actions.ISSUE_NOTE.UPDATE]: parseEdit,
    [actions.ISSUE_NOTE.DELETE]: parseDelete,
    [actions.ISSUE_NOTE.RESTORE]: parseStore
}
