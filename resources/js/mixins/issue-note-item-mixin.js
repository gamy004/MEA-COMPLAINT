import {
    vuexable,
    vuex
} from './vuexable';

const issueNoteItemMixin = {
    mixins: [vuexable],

    props: {
        issueId: {
            type: [String, Number],
            required: true
        },

        noteId: {
            type: [String, Number],
            default: null
        },

        createdBy: {
            type: [String, Number],
            default: null
        }
    },

    computed: {
        ...vuex.mapWaitingGetters({
            $_issue_note_item_mixin_isFetchingEditIssueNote: 'editing note'
        }),

        $_issue_note_item_mixin_complaint() {
            return this.$_vuexable_getByKey(
                this.issueId,
                vuex.modules.ISSUE
            )
        },

        $_issue_note_item_mixin_noteItem() {
            return this.$_vuexable_getByKey(
                this.noteId,
                vuex.modules.ISSUE_NOTE
            )
        },

        $_issue_note_item_mixin_noteCreator() {
            return this.$_issue_note_item_mixin_noteItem ? this.$_vuexable_getByKey(
                this.$_issue_note_item_mixin_noteItem.created_by,
                vuex.modules.GROUP
            ) : null;
        },

        $_issue_note_item_mixin_complaintIssuer() {
            return this.$_issue_note_item_mixin_complaint ? this.$_vuexable_getByKey(
                this.$_issue_note_item_mixin_complaint.issued_by,
                vuex.modules.GROUP
            ) : null;
        },

        $_issue_note_item_mixin_noteAttachments() {
            return this.$_issue_note_item_mixin_noteItem ?
                this.$_vuexable_getByKeys(
                    this.$_issue_note_item_mixin_noteItem.attachments,
                    vuex.modules.FILE
                ) : [];
        },

        $_issue_note_item_mixin_hasAttachments() {
            return this.$_issue_note_item_mixin_noteAttachments.length > 0;
        },

        $_issue_note_item_mixin_noteEditable() {
            if (this.$_vuexable_auth.isAdmin) {
                return true;
            }

            return this.$_issue_note_item_mixin_noteItem && this.$_vuexable_auth ?
                this.$_issue_note_item_mixin_noteItem.created_by === this.$_vuexable_auth.group_id : false;
        },
    },

    methods: {
        ...vuex.mapWaitingActions(vuex.modules.ISSUE_NOTE, {
            $_issue_note_item_mixin_editIssueNote: {
                action: vuex.actions.ISSUE_NOTE.EDIT,
                loader: 'editing note'
            }
        }),

        async $_issue_note_item_mixin_onEditIssueNote(item) {
            const {
                id
            } = item;

            try {
                this.$_vuexable_setEdit(id, vuex.modules.ISSUE_NOTE);

                await this.$_issue_note_item_mixin_editIssueNote(item);
            } catch (error) {
                throw error;
            }
        },

        $_issue_note_item_mixin_setEdit(id) {
            this.$_vuexable_setEdit(id, vuex.modules.ISSUE_NOTE);
        }
    }
}

export default issueNoteItemMixin;
