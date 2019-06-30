import {
    vuex,
    vuexable
} from "./vuexable";

const issueCategoryMixin = {
    mixins: [vuexable],

    computed: {
        ...vuex.mapWaitingGetters({
            $_issue_category_mixin_fetching: "issueCategoryMixin fetch action",
            $_issue_category_mixin_editing: "issueCategoryMixin edit action",
            $_issue_category_mixin_deleting: "issueCategoryMixin delete action",
            $_issue_category_mixin_restoring: "issueCategoryMixin restore action"
        }),

        $_issue_category_mixin_dialog: {
            get() {
                return this.$_vuexable_getState(
                    "dialog",
                    vuex.modules.ISSUE_CATEGORY
                );
            },

            set(value) {
                this.$_vuexable_setState({
                    key: "dialog",
                    value
                }, vuex.modules.ISSUE_CATEGORY);
            }
        },

        $_issue_category_mixin_pagination: {
            get() {
                return this.$_vuexable_getState("pagination", vuex.modules.ISSUE_CATEGORY);
            },
            set(pagination) {
                this.$_vuexable_setPagination(pagination, vuex.modules.ISSUE_CATEGORY);
            }
        },

        $_issue_category_mixin_edit: {
            get() {
                return this.$_vuexable_getEdit(
                    vuex.modules.ISSUE_CATEGORY
                );
            },

            set(value) {
                this.$_vuexable_setEdit(value, vuex.modules.ISSUE_CATEGORY);
            }
        },

        $_issue_category_mixin_isEditing() {
            return this.$_issue_category_mixin_edit !== undefined;
        },

        $_issue_category_mixin_active: {
            get() {
                return this.$_vuexable_getActive(
                    vuex.modules.ISSUE_CATEGORY
                );
            },

            set(value) {
                this.$_vuexable_setActive(value, vuex.modules.ISSUE_CATEGORY);
            }
        },

        $_issue_category_mixin_issue_paginated_items() {
            return this.$_vuexable_getPaginatedValues(
                this.$_issue_category_mixin_pagination.page,
                vuex.modules.ISSUE_CATEGORY
            );
        }
    },

    methods: {
        ...vuex.mapWaitingActions(vuex.modules.ISSUE_CATEGORY, {
            $_issue_category_mixin_fetchCategory: {
                action: vuex.actions.ISSUE_CATEGORY.FETCH,
                loader: "issueCategoryMixin fetch action"
            },
            $_issue_category_mixin_editCategory: {
                action: vuex.actions.ISSUE_CATEGORY.EDIT,
                loader: "issueCategoryMixin edit action"
            },
            // $_issue_category_mixin_Update: {
            //     action: vuex.actions.ISSUE_CATEGORY.UPDATE,
            //     loader: "issueCategoryMixin update action"
            // },
            $_issue_category_mixin_deleteCategory: {
                action: vuex.actions.ISSUE_CATEGORY.DELETE,
                loader: "issueCategoryMixin delete action"
            },
            $_issue_category_mixin_restoreCategory: {
                action: vuex.actions.ISSUE_CATEGORY.RESTORE,
                loader: "issueCategoryMixin restore action"
            }
        }),

        async $_issue_category_mixin_onPaginationUpdate(newPagination) {
            const original = this.$_issue_category_mixin_pagination;

            if (
                this.$_vuexable_shouldUpdatePagination(
                    newPagination,
                    vuex.modules.ISSUE_CATEGORY
                )
            ) {
                this.$_issue_category_mixin_pagination = {
                    ...original,
                    ...newPagination
                };

                return await this.$_issue_category_mixin_fetchCategory({
                    pagination: this.$_issue_category_mixin_pagination
                });
            }
        },

        async $_issue_category_mixin_onEditCategory({
            id
        }) {
            let response;

            try {
                response = await this.$_issue_category_mixin_editCategory({
                    id
                });
            } catch (error) {
                throw error;
            }

            this.$_issue_category_mixin_edit = id;

            return response;
        }
    }
};

export default issueCategoryMixin;
