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

    static async [actions.COMPLAINT.EDIT](data) {
        let response;

        try {
            response = await api.get('api:issues.edit', {
                ...data,
                includes: ['recipients:sideload', 'status:sideload']
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.COMPLAINT.STORE](data) {
        let response;

        try {
            response = await api.post('api:issues.store', {
                ...data,
                includes: ['recipients:sideload', 'status:sideload']
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.COMPLAINT.DELETE](data) {
        let response;

        try {
            response = await api.delete('api:issues.destroy', {
                ...data
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.COMPLAINT.RESTORE](data) {
        let response;

        try {
            response = await api.post('api:issues.restore', {
                ...data,
                includes: ['recipients:sideload', 'status:sideload']
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    get topic() {
        let {
            subject = null, description = null
        } = this;

        subject = !_.isNull(subject) ? subject : "(no subject)";

        let topic = `<strong style="color:#333;">${subject}</strong>`;

        if (!_.isNull(description)) {
            description = description.replace(/(<([^>]+)>)/ig, "");

            topic += `&nbsp;-&nbsp;<span>${description}</span>`;
        }

        return topic;
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

    async markStarred() {
        this.update('starred', !this.starred);

        // send request update
    }
}

export default Complaint;
