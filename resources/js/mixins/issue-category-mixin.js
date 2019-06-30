import {
    vuex,
    vuexable
} from "./vuexable";

const issueCategoryMixin = {
    mixins: [vuexable],

    computed: {
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
    },

    methods: {
        ...vuex.mapWaitingActions(vuex.modules.ISSUE_CATEGORY, {
            // $_issue_category_mixin_Create: {
            //     action: vuex.actions.ISSUE_CATEGORY.STORE,
            //     loader: "issueCategoryMixin store action"
            // },
            $_issue_category_mixin_Edit: {
                action: vuex.actions.ISSUE_CATEGORY.EDIT,
                loader: "issueCategoryMixin edit action"
            },
            // $_issue_category_mixin_Update: {
            //     action: vuex.actions.ISSUE_CATEGORY.UPDATE,
            //     loader: "issueCategoryMixin update action"
            // },
            $_issue_category_mixin_Delete: {
                action: vuex.actions.ISSUE_CATEGORY.DELETE,
                loader: "issueCategoryMixin delete action"
            },
            $_issue_category_mixin_Restore: {
                action: vuex.actions.ISSUE_CATEGORY.RESTORE,
                loader: "issueCategoryMixin restore action"
            }
        })
    }
};

export default issueCategoryMixin;
