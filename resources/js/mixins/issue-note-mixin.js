import {
    vuex,
    vuexable
} from "./vuexable";
import issueNoteModule from "../stores/modules/issue-notes";
import {
    registerModules,
    unregisterModules
} from "../helpers";


const issueNoteMixin = {
    mixins: [vuexable],

    data() {
        return {
            vuex
        }
    },

    watch: {
        // "$route": "$_complaint_mixin_updateRouteParam",

        // activeComplaint: {
        //     immediate: true,
        //     handler(v) {
        //         if (!v) {
        //             const {
        //                 issue = null
        //             } = this.$route.params;

        //             if (issue) {
        //                 this[vuex.actions.ISSUE_NOTE.SHOW](issue);
        //             }
        //         }
        //     }
        // }
    },

    computed: {
        ...vuex.mapWaitingGetters({
            $_issue_note_mixin_isFetchingNote: "fetching issue notes",
        }),

        $_issue_note_mixin_issueNoteDialog() {
            return this.$_vuexable_getState("dialog", vuex.modules.ISSUE_NOTE);
        },

        $_issue_note_mixin_activeIssueId() {
            return this.$_vuexable_getState("active", vuex.modules.ISSUE);
        },

        $_issue_note_mixin_activeIssue() {
            return this.$_vuexable_getActive(vuex.modules.ISSUE);
        },

        $_issue_note_mixin_activeIssueNoteId() {
            return this.$_vuexable_getState("active", vuex.modules.ISSUE_NOTE);
        },

        $_issue_note_mixin_editingIssueNoteId() {
            return this.$_vuexable_getState("edit", vuex.modules.ISSUE_NOTE);
        },

        $_issue_note_mixin_activeIssueNote() {
            return this.$_vuexable_getActive(vuex.modules.ISSUE_NOTE);
        },

        $_issue_note_mixin_editingIssueNote() {
            return this.$_vuexable_getEdit(vuex.modules.ISSUE_NOTE);
        },

        $_issue_note_mixin_hasActiveIssueNote() {
            return !_.isNull(this.$_issue_note_mixin_activeIssueNoteId);
        },

        $_issue_note_mixin_hasEditingIssueNote() {
            return !_.isNull(this.$_issue_note_mixin_editingIssueNoteId);
        },

        $_issue_note_mixin_issueNoteRouteParam() {
            return this.$_issue_note_mixin_hasActiveIssueNote ? {
                "issue": this.$_issue_note_mixin_activeIssueId,
                "issue_note": this.$_issue_note_mixin_activeIssueNoteId
            } : {};
        },

        $_issue_note_mixin_complaintNotes() {
            return this.$_issue_note_mixin_activeIssue ? this.$_vuexable_getByKeys(
                this.$_issue_note_mixin_activeIssue.notes,
                vuex.modules.ISSUE_NOTE
            ) : [];
        }
    },

    methods: {
        ...vuex.mapWaitingActions(vuex.modules.ISSUE_NOTE, {
            [vuex.actions.ISSUE_NOTE.FETCH]: "fetching issue notes"
        }),

        $_issue_note_mixin_setDialog(value) {
            this.$_vuexable_setState({
                key: "dialog",
                value
            }, vuex.modules.ISSUE_NOTE);
        },

        $_issue_note_mixin_setEdit(v) {
            this.$_vuexable_setEdit(v, vuex.modules.ISSUE_NOTE);
        },

        $_issue_note_mixin_isEditingNote({
            id
        }) {
            return id === this.$_issue_note_mixin_editingIssueNoteId;
        }
    },

    beforeCreate() {
        registerModules(this.$store, {
            [vuex.modules.ISSUE_NOTE]: issueNoteModule,
        });
    }

    // beforeDestroy() {
    //     unregisterModules(this.$store, [
    //         vuex.modules.ISSUE,
    //         vuex.modules.GROUP,
    //         vuex.modules.ISSUE_STATUS,
    //         vuex.modules.ISSUE_CATEGORY
    //     ]);
    // }
};

export default issueNoteMixin;
