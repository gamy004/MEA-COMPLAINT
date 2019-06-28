import {
    vuexable,
    vuex
} from './vuexable';

const complaintItemMixin = {
    mixins: [vuexable],

    props: {
        issueId: {
            type: [String, Number]
        }
    },

    computed: {
        $_complaint_item_mixin_complaint() {
            return this.$_vuexable_getByKey(
                this.issueId,
                vuex.modules.ISSUE
            )
        },

        $_complaint_item_mixin_complaintIssuer() {
            return this.$_complaint_item_mixin_complaint ? this.$_vuexable_getByKey(
                this.$_complaint_item_mixin_complaint.issued_by,
                vuex.modules.GROUP
            ) : null;
        },

        $_complaint_item_mixin_complaintEditable() {
            if (this.$_vuexable_auth.isAdmin) {
                return true;
            }

            return this.$_complaint_item_mixin_complaintIssuer && this.$_vuexable_auth ?
                this.$_complaint_item_mixin_complaintIssuer.issued_by === this.$_vuexable_auth.group_id : false;
        },

        $_complaint_item_mixin_complaintCategory() {
            return this.$_complaint_item_mixin_complaint ? this.$_vuexable_getByKey(
                this.$_complaint_item_mixin_complaint.issue_category_id,
                vuex.modules.ISSUE_CATEGORY
            ) : null;
        },

        $_complaint_item_mixin_complaintAttachments() {
            return this.$_complaint_item_mixin_complaint ? this.$_vuexable_getByKeys(
                this.$_complaint_item_mixin_complaint.attachments,
                vuex.modules.FILE
            ) : [];
        },

        $_complaint_item_mixin_hasAttachments() {
            return this.$_complaint_item_mixin_complaint ? this.$_complaint_item_mixin_complaint.attachments.length : false;
        }
    },

    methods: {
        ...vuex.mapWaitingActions(vuex.modules.ISSUE, {
            $_complaint_item_mixin_editComplaint: {
                action: vuex.actions.ISSUE.EDIT,
                loader: 'editing complaint'
            }
        }),

        async $_complaint_item_mixin_onEditComplaint(item) {
            const {
                id
            } = item;

            try {
                await this.$_complaint_item_mixin_editComplaint(item);
            } catch (error) {
                throw error;
            }

            this.$_vuexable_setState({
                    key: "dialog",
                    value: true
                },
                vuex.modules.ISSUE
            );

            this.$_vuexable_setEdit(id, vuex.modules.ISSUE);
        },
    }
}

export default complaintItemMixin;
