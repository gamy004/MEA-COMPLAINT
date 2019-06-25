import {
    vuex,
    vuexable
} from "./vuexable";
import paginatable from "./paginatable";
import complaintModule from "../stores/modules/complaints";
import groupModule from "../stores/modules/groups";
import statusModule from "../stores/modules/issue-statuses";
import issueCategoryModule from "../stores/modules/issue-categories";
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
        "$route": "$_complaint_mixin_updateRouteParam",

        activeComplaint: {
            immediate: true,
            handler(v) {
                if (!v) {
                    const {
                        issue = null
                    } = this.$route.params;

                    if (issue) {
                        this[vuex.actions.COMPLAINT.SHOW](issue);
                    }
                }
            }
        }
    },

    computed: {
        ...vuex.mapWaitingGetters({
            $_complaint_mixin_isFetchingShowComplaint: "fetching show complaint",
        }),

        $_paginatable_module() {
            return this.vuex.modules.COMPLAINT;
        },

        complaintDialog() {
            return this.$_vuexable_getState("dialog", vuex.modules.COMPLAINT);
        },

        activeComplaintId() {
            return this.$_vuexable_getState("active", vuex.modules.COMPLAINT);
        },

        activeComplaint() {
            return this.$_vuexable_getActive(vuex.modules.COMPLAINT);
        },

        hasActiveComplaint() {
            return !_.isNull(this.activeComplaintId);
        },

        complaintRouteParam() {
            return this.hasActiveComplaint ? {
                issue: this.activeComplaintId
            } : {};
        }
    },

    methods: {
        ...vuex.mapWaitingActions(vuex.modules.COMPLAINT, {
            [vuex.actions.COMPLAINT.SHOW]: "fetching show complaint"
        }),

        $_complaint_mixin_updateRouteParam() {
            if (this.$route.params.issue) {
                this.$_vuexable_setActive(
                    this.$route.params.issue,
                    vuex.modules.COMPLAINT
                );
            }
        }
    },

    beforeCreate() {
        registerModules(this.$store, {
            [vuex.modules.COMPLAINT]: complaintModule,
            [vuex.modules.GROUP]: groupModule,
            [vuex.modules.ISSUE_STATUS]: statusModule,
            [vuex.modules.COMPLAINT_CATEGORY]: issueCategoryModule
        });
    },

    created() {
        this.$_complaint_mixin_updateRouteParam();
    }

    // beforeDestroy() {
    //     unregisterModules(this.$store, [
    //         vuex.modules.COMPLAINT,
    //         vuex.modules.GROUP,
    //         vuex.modules.ISSUE_STATUS,
    //         vuex.modules.COMPLAINT_CATEGORY
    //     ]);
    // }
};

export default complaintMixin;
