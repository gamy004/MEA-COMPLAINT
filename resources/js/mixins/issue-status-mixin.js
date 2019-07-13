import {
    vuex,
    vuexable
} from "./vuexable";

const issueStatusMixin = {
    mixins: [vuexable],

    computed: {
        ...vuex.mapWaitingGetters({
            $_issue_status_mixin_updatingIssue: "issueStatusMixin updating issue",
            $_issue_status_mixin_fetching: "issueCategoryMixin fetch action",
            $_issue_status_mixin_editing: "issueCategoryMixin edit action",
            $_issue_status_mixin_deleting: "issueCategoryMixin delete action",
            $_issue_status_mixin_restoring: "issueCategoryMixin restore action"
        }),

        $_issue_status_mixin_statuses() {
            return this.$_vuexable_getSortedValues(vuex.modules.ISSUE_STATUS);
        },

        $_issue_status_mixin_dialog: {
            get() {
                return this.$_vuexable_getState(
                    "dialog",
                    vuex.modules.ISSUE_STATUS
                );
            },

            set(value) {
                this.$_vuexable_setState({
                    key: "dialog",
                    value
                }, vuex.modules.ISSUE_STATUS);
            }
        },

        $_issue_status_mixin_pagination: {
            get() {
                return this.$_vuexable_getState("pagination", vuex.modules.ISSUE_STATUS);
            },
            set(pagination) {
                this.$_vuexable_setPagination(pagination, vuex.modules.ISSUE_STATUS);
            }
        },

        $_issue_status_mixin_totalItems() {
            return this.$_vuexable_getState("totalItems", vuex.modules.ISSUE_STATUS);
        },

        $_issue_status_mixin_edit: {
            get() {
                return this.$_vuexable_getEdit(
                    vuex.modules.ISSUE_STATUS
                );
            },

            set(value) {
                this.$_vuexable_setEdit(value, vuex.modules.ISSUE_STATUS);
            }
        },

        $_issue_status_mixin_isEditing() {
            return this.$_issue_status_mixin_edit !== undefined;
        },

        $_issue_status_mixin_active: {
            get() {
                return this.$_vuexable_getActive(
                    vuex.modules.ISSUE_STATUS
                );
            },

            set(value) {
                this.$_vuexable_setActive(value, vuex.modules.ISSUE_STATUS);
            }
        },

        $_issue_status_mixin_paginated_items() {
            return this.$_vuexable_getPaginatedValues(
                this.$_issue_status_mixin_pagination.page,
                vuex.modules.ISSUE_STATUS
            );
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
                loader: "issueStatusMixin fetch action"
            },
            $_issue_status_mixin_editStatus: {
                action: vuex.actions.ISSUE_STATUS.EDIT,
                loader: "issueStatusMixin edit action"
            },
            $_issue_status_mixin_deleteStatus: {
                action: vuex.actions.ISSUE_STATUS.DELETE,
                loader: "issueStatusMixin delete action"
            },
            $_issue_status_mixin_restoreStatus: {
                action: vuex.actions.ISSUE_STATUS.RESTORE,
                loader: "issueStatusMixin restore action"
            }
        }),

        $_issue_status_mixin_findStatus(statusId) {
            return this.$_vuexable_getByKey(statusId, vuex.modules.ISSUE_STATUS);
        },

        async $_issue_status_mixin_fetchStatuses() {
            try {
                return await this.$_issue_status_mixin_fetchStatus({
                    sort: ["-issue_statuses.default", "issue_statuses.status"]
                });
            } catch (error) {
                throw error;
            }
        },

        async $_issue_status_mixin_onEditStatus({
            id
        }) {
            let response;

            try {
                response = await this.$_issue_status_mixin_editStatus({
                    id
                });
            } catch (error) {
                throw error;
            }

            this.$_issue_status_mixin_edit = id;

            return response;
        },

        $_issue_status_mixin_makeStatusMenuItems(issue, cb = () => {}, errCb = () => {}) {
            let tempIssue = {
                ...issue
            };

            return _.orderBy(
                this.$_issue_status_mixin_statuses,
                ["default", "status"],
                ["desc", "asc"]
            ).map(({
                id,
                status,
                color
            }) => {
                return {
                    id,
                    status,
                    color,
                    text: status,
                    disabled: () => issue.issue_status_id === id,
                    onClick: async () => {
                        try {
                            await this.$_issue_status_mixin_updateComplaint({
                                id: issue.id,
                                issue_status_id: id,
                                includes: [
                                    'logs',
                                    'logs.status:sideload',
                                    'logs.status.configs'
                                ],
                                routeParam: {
                                    issue: issue.id
                                }
                            });
                        } catch (error) {
                            errCb(tempIssue, error);

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
