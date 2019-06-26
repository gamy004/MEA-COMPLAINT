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
        complaint() {
            return this.$_vuexable_getByKey(
                this.issueId,
                vuex.modules.ISSUE
            )
        },

        complaintCategory() {
            return this.complaint ? this.$_vuexable_getByKey(
                this.complaint.issue_category_id,
                vuex.modules.ISSUE_CATEGORY
            ) : null;
        },

        complaintAttachments() {
            return this.complaint ? this.$_vuexable_getByKeys(
                this.complaint.attachments,
                vuex.modules.FILE
            ) : [];
        },

        hasAttachments() {
            return this.complaint ? this.complaint.attachments.length : false;
        }
    }
}

export default complaintItemMixin;
