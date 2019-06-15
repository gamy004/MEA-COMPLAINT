import BaseVuexModel from './BaseVuexModel';
import {
    actions
} from '../constants';
import {
    formatShortDateTime
} from '../helpers'

class Complaint extends BaseVuexModel {
    constructor(data) {
        super({
            subject: '',
            description: '',
            issued_by: null,
            referenced_to: null,
            issue_status_id: null,
            starred: false,
            ...data
        });
    }

    static async [actions.COMPLAINT.FETCH](pagination) {
        let response;

        try {
            response = await api.get('api:issues.index', {
                pagination,
                includes: ['recipients:sideload', 'status:sideload']
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    get topic() {
        return `<strong style="color:#333;">${this.subject}</strong>&nbsp;-&nbsp;<span>${this.description}</span>`
    }

    get shortUpdatedAt() {
        return formatShortDateTime(this.updated_at);
    }

    get joinedRecipientName() {
        const {
            vuex,
            rootGetters
        } = this.$context, {
                recipients = []
            } = this,
            allNames = _.map(
                rootGetters[`${vuex.modules.GROUP}/${vuex.getters.BY_KEYS}`](recipients),
                'name'
            );


        return allNames.join(', ');
    }

    get currentStatus() {
        let currentStatus = '';

        const {
            vuex,
            rootGetters
        } = this.$context, {
            status = null
        } = this;

        if (status) {
            currentStatus = rootGetters[
                `${vuex.modules.STATUS}/${vuex.getters.BY_KEY}`
            ](status);

            currentStatus = currentStatus.status;
        }

        return currentStatus;
    }
}

export default Complaint;
