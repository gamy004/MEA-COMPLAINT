import BaseVuexModel from './BaseVuexModel';
import {
    actions,
    modules
} from '../constants';
import {
    formatShortDateTime,
    formatLongDateTime
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

        this.$store = modules.COMPLAINT;
    }

    static async [actions.COMPLAINT.FETCH](pagination) {
        let response;

        try {
            response = await api.get('api:issues.index', {
                pagination,
                includes: ['recipients:sideload', 'status:sideload', 'attachments:sideload']
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.COMPLAINT.SHOW](data) {
        let response;

        try {
            response = await api.get('api:issues.show', {
                includes: ['recipients:sideload', 'status:sideload', 'attachments:sideload'],
                ...data,
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
                includes: ['recipients:sideload', 'status:sideload', 'attachments:sideload'],
                ...data,
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
                includes: ['recipients:sideload', 'status:sideload', 'attachments:sideload'],
                ...data,
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.COMPLAINT.UPDATE](data) {
        let response;

        try {
            response = await api.put('api:issues.update', {
                includes: ['recipients:sideload', 'status:sideload', 'attachments:sideload'],
                ...data,
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

    get title() {
        let {
            subject = null
        } = this;

        return !_.isNull(subject) ? subject : "(no subject)";
    }

    get stripContent() {
        let {
            description = null
        } = this;

        if (!_.isNull(description)) {
            description = description.replace(/(<([^>]+)>)/ig, "");
        }

        return description;
    }

    get topic() {
        let {
            title,
            stripContent
        } = this;

        let topic = `<strong style="color:#333;">${title}</strong>`;

        if (stripContent) {
            topic += `&nbsp;-&nbsp;<span>${stripContent}</span>`;
        }

        return topic;
    }

    get shortUpdatedAt() {
        return formatShortDateTime(this.updated_at);
    }

    get longUpdatedAt() {
        return formatLongDateTime(this.updated_at);
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

            if (currentStatus) {
                currentStatus = currentStatus.status;
            }
        }

        return currentStatus;
    }

    async markStarred() {
        this.update('starred', !this.starred);

        // send request update
    }
}

export default Complaint;
