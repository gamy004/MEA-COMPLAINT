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

        this.$store = modules.ISSUE;
    }

    static async [actions.ISSUE.FETCH](pagination) {
        let response;

        try {
            response = await api.get('api:issues.index', {
                pagination,
                includes: [
                    'recipients:sideload',
                    'status:sideload',
                    'attachments:sideload',
                    'category:sideload'
                ]
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE.SHOW](data) {
        let response;

        try {
            response = await api.get('api:issues.show', {
                includes: ['recipients:sideload', 'status:sideload', 'attachments:sideload',
                'category:sideload'],
                ...data,
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE.EDIT](data) {
        let response;

        try {
            response = await api.get('api:issues.edit', {
                includes: ['recipients:sideload', 'status:sideload', 'attachments:sideload',,
                'category:sideload'],
                ...data,
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE.STORE](data) {
        let response;

        try {
            response = await api.post('api:issues.store', {
                includes: ['recipients:sideload', 'status:sideload', 'attachments:sideload',
                'category:sideload'],
                ...data,
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE.UPDATE](data) {
        let response;

        try {
            response = await api.put('api:issues.update', {
                includes: ['recipients:sideload', 'status:sideload', 'attachments:sideload',
                'category:sideload'],
                ...data,
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE.DELETE](data) {
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

    static async [actions.ISSUE.RESTORE](data) {
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
            issue_status_id = null
        } = this;

        if (issue_status_id) {
            currentStatus = rootGetters[
                `${vuex.modules.ISSUE_STATUS}/${vuex.getters.BY_KEY}`
            ](issue_status_id);

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
