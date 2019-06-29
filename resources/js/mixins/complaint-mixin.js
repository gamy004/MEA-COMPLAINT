import {
    vuex,
    vuexable
} from "./vuexable";
import paginatable from "./paginatable";
import complaintModule from "../stores/modules/complaints";
import groupModule from "../stores/modules/groups";
import statusModule from "../stores/modules/issue-statuses";
import issueCategoryModule from "../stores/modules/issue-categories";
import issueNoteModule from "../stores/modules/issue-notes";
import {
    registerModules,
    unregisterModules
} from "../helpers";


const complaintMixin = {
    mixins: [paginatable, vuexable],

    data() {
        return {
            vuex
        }
    },

    watch: {
        "$route": "$_complaint_mixin_updateRouteParam"
    },

    computed: {
        ...vuex.mapWaitingGetters({
            $_complaint_mixin_isFetchingShowComplaint: "fetching show complaint",
        }),

        $_paginatable_module() {
            return this.vuex.modules.ISSUE;
        },

        complaintDialog() {
            return this.$_vuexable_getState("dialog", vuex.modules.ISSUE);
        },

        activeComplaintId() {
            return this.$_vuexable_getState("active", vuex.modules.ISSUE);
        },

        editingComplaintId() {
            return this.$_vuexable_getState("edit", vuex.modules.ISSUE);
        },

        activeComplaint() {
            return this.$_vuexable_getActive(vuex.modules.ISSUE);
        },

        editingComplaint() {
            return this.$_vuexable_getEdit(vuex.modules.ISSUE);
        },

        hasActiveComplaint() {
            return !_.isNull(this.activeComplaintId);
        },

        hasEdittedComplaint() {
            return !_.isNull(this.editingComplaintId);
        },

        complaintRouteParam() {
            return this.hasActiveComplaint ? {
                issue: this.activeComplaintId
            } : {};
        }
    },

    methods: {
        ...vuex.mapWaitingActions(vuex.modules.ISSUE, {
            [vuex.actions.ISSUE.SHOW]: "fetching show complaint"
        }),

        $_complaint_mixin_updateRouteParam() {
            const {
                issue = null
            } = this.$route.params;

            this.$_complaint_mixin_setActive(issue);
        },

        $_complaint_mixin_setActive(value) {
            this.$_vuexable_setActive(
                value,
                vuex.modules.ISSUE
            );
        },

        $_complaint_mixin_setEdit(value) {
            this.$_vuexable_setEdit(
                value,
                vuex.modules.ISSUE
            );
        },

        $_complaint_mixin_setDialog(value) {
            this.$_vuexable_setState({
                    key: "dialog",
                    value
                },
                vuex.modules.ISSUE
            );
        }
    },

    beforeCreate() {
        registerModules(this.$store, {
            [vuex.modules.ISSUE]: complaintModule,
            [vuex.modules.GROUP]: groupModule,
            [vuex.modules.ISSUE_STATUS]: statusModule,
            [vuex.modules.ISSUE_CATEGORY]: issueCategoryModule,
            [vuex.modules.ISSUE_NOTE]: issueNoteModule,
        });
    },

    created() {
        this.$_complaint_mixin_updateRouteParam();
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

export default complaintMixin;
