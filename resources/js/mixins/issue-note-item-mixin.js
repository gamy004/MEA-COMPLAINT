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
        }
    },

    computed: {
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
    }
}

export default issueNoteItemMixin;