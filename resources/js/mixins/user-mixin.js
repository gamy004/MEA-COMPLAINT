import {
    vuex,
    vuexable
} from "./vuexable";
import {
    mapTextValue
} from "../helpers";

export const userMixin = {
    mixins: [vuexable],

    computed: {
        ...vuex.mapWaitingGetters({
            $_user_mixin_fetching: "userMixin fetch action",
            $_user_mixin_editing: "userMixin edit action",
            $_user_mixin_deleting: "userMixin delete action",
            $_user_mixin_restoring: "userMixin restore action",
            $_user_mixin_fetchingRole: "userMixin fetch roles action"
        }),

        $_user_mixin_statuses() {
            return this.$_vuexable_getSortedValues(vuex.modules.USER);
        },

        $_user_mixin_dialog: {
            get() {
                return this.$_vuexable_getState(
                    "dialog",
                    vuex.modules.USER
                );
            },

            set(value) {
                this.$_vuexable_setState({
                    key: "dialog",
                    value
                }, vuex.modules.USER);
            }
        },

        $_user_mixin_pagination: {
            get() {
                return this.$_vuexable_getState("pagination", vuex.modules.USER);
            },
            set(pagination) {
                this.$_vuexable_setPagination(pagination, vuex.modules.USER);
            }
        },

        $_user_mixin_totalItems() {
            return this.$_vuexable_getState("totalItems", vuex.modules.USER);
        },

        $_user_mixin_edit: {
            get() {
                return this.$_vuexable_getEdit(
                    vuex.modules.USER
                );
            },

            set(value) {
                this.$_vuexable_setEdit(value, vuex.modules.USER);
            }
        },

        $_user_mixin_isEditing() {
            return this.$_user_mixin_edit !== undefined;
        },

        $_user_mixin_active: {
            get() {
                return this.$_vuexable_getActive(
                    vuex.modules.USER
                );
            },

            set(value) {
                this.$_vuexable_setActive(value, vuex.modules.USER);
            }
        },

        $_user_mixin_paginated_items() {
            return this.$_vuexable_getPaginatedValues(
                this.$_user_mixin_pagination.page,
                vuex.modules.USER
            );
        },

        $_user_mixin_availableRoles() {
            const roles = this.$_vuexable_getSortedValues(vuex.modules.ROLE);

            return roles ? mapTextValue(roles, "role", "id") : [];
        },
    },

    methods: {
        ...vuex.mapWaitingActions(vuex.modules.USER, {
            $_user_mixin_fetchUser: {
                action: vuex.actions.USER.FETCH,
                loader: "userMixin fetch action"
            },
            $_user_mixin_editUser: {
                action: vuex.actions.USER.EDIT,
                loader: "userMixin edit action"
            },
            $_user_mixin_deleteUser: {
                action: vuex.actions.USER.DELETE,
                loader: "userMixin delete action"
            },
            $_user_mixin_restoreUser: {
                action: vuex.actions.USER.RESTORE,
                loader: "userMixin restore action"
            }
        }),

        ...vuex.mapWaitingActions(vuex.modules.ROLE, {
            $_user_mixin_fetchRole: {
                action: vuex.actions.ROLE.FETCH,
                loader: "userMixin fetch roles action"
            }
        }),

        $_user_mixin_findUser(statusId) {
            return this.$_vuexable_getByKey(statusId, vuex.modules.USER);
        },

        async $_user_mixin_fetchUsers() {
            try {
                return await this.$_user_mixin_fetchUser({
                    sort: ["-users.username", "users.name"]
                });
            } catch (error) {
                throw error;
            }
        },

        async $_user_mixin_onEditUser({
            id
        }) {
            let response;

            try {
                response = await this.$_user_mixin_editUser({
                    id
                });
            } catch (error) {
                throw error;
            }

            this.$_user_mixin_edit = id;

            return response;
        },

        // $_user_mixin_makeUserMenuItems(issue, cb = () => {}) {
        //     let tempIssue = {
        //         ...issue
        //     };

        //     return _.orderBy(
        //         this.$_user_mixin_statuses,
        //         ["default", "status"],
        //         ["desc", "asc"]
        //     ).map(({
        //         id,
        //         status,
        //         color
        //     }) => {
        //         return {
        //             id,
        //             status,
        //             color,
        //             text: status,
        //             disabled: () => issue.issue_status_id === id,
        //             onClick: async () => {
        //                 try {
        //                     await this.$_user_mixin_updateComplaint({
        //                         id: issue.id,
        //                         issue_status_id: id,
        //                         includes: [],
        //                         routeParam: {
        //                             issue: issue.id
        //                         }
        //                     });
        //                 } catch (error) {
        //                     throw error;
        //                 }

        //                 this.$set(tempIssue, 'issue_status_id', id);

        //                 return cb(tempIssue, status);
        //             }
        //         };
        //     });
        // }
    }
};
