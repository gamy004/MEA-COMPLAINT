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
    }
}

export default complaintItemMixin;
