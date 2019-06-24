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
                vuex.modules.COMPLAINT
            )
        }
    }
}

export default complaintItemMixin;
