import {
    vuex,
    vuexable
} from "./vuexable";

const issueStatusMixin = {
    mixins: [vuexable],

    computed: {
        ...vuex.mapWaitingGetters({
            $_issue_status_mixin_isUpdating: "issueStatusMixin updating issue",
            $_issue_status_mixin_isFetchingStatuses: "issueStatusMixin fetching statuses"
        }),

        $_issue_status_mixin_activeIssue() {
            return this.$_vuexable_getActive(vuex.modules.ISSUE);
        },

        $_issue_status_mixin_activeIssueId() {
            const {
                id = null
            } = this.$_issue_status_mixin_activeIssue;

            return id;
        },

        $_issue_status_mixin_activeIssueStatusId() {
            const {
                issue_status_id = null
            } = this.$_issue_status_mixin_activeIssue;

            return issue_status_id;
        },

        $_issue_status_mixin_statuses() {
            return this.$_vuexable_getSortedValues(vuex.modules.ISSUE_STATUS);
        }
    },

    methods: {
        ...vuex.mapWaitingActions(vuex.modules.ISSUE, {
            $_issue_status_mixin_updateComplaint: {
                action: vuex.actions.UPDATE,
                loader: "issueStatusMixin updating issue"
            }
        }),

        ...vuex.mapWaitingActions(vuex.modules.ISSUE_STATUS, {
            $_issue_status_mixin_fetchStatus: {
                action: vuex.actions.ISSUE_STATUS.FETCH,
                loader: "issueStatusMixin fetching statuses"
            }
        }),

        async $_issue_status_mixin_fetchStatuses() {
            try {
                return await this.$_issue_status_mixin_fetchStatus({
                    select: ["issue_statuses:id,status,default"],
                    sort: ["-issue_statuses.default", "issue_statuses.status"]
                });
            } catch (error) {
                throw error;
            }
        },

        $_issue_status_mixin_makeStatusMenuItems(issue, cb = () => {}) {
            let tempIssue = {
                ...issue
            };

            return _.orderBy(
                this.$_issue_status_mixin_statuses,
                ["default", "status"],
                ["desc", "asc"]
            ).map(({
                id,
                status
            }) => {
                return {
                    text: status,
                    disabled: () => issue.issue_status_id === id,
                    onClick: async () => {
                        try {
                            await this.$_issue_status_mixin_updateComplaint({
                                id: issue.id,
                                issue_status_id: id,
                                includes: [],
                                routeParam: {
                                    issue: issue.id
                                }
                            });
                        } catch (error) {
                            throw error;
                        }

                        this.$set(tempIssue, 'issue_status_id', id);

                        return cb(tempIssue, status);
                    }
                };
            });
        }
    }
};

export default issueStatusMixin;
