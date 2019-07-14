import BaseVuexModel from './BaseVuexModel';
import {
    actions,
    modules
} from '../constants';

class Complaint extends BaseVuexModel {
    constructor(data) {
        super({
            subject: '',
            description: '',
            issued_by: null,
            referenced_to: null,
            issue_status_id: null,
            issue_category_id: null,
            starred: false,
            ...data
        });

        this.$store = modules.ISSUE;
    }

    static async [actions.ISSUE.FETCH](props = {}) {
        let response;

        try {
            response = await api.get('api:issues.index', {
                includes: [
                    'issuer:sideload',
                    'recipients:sideload',
                    'status:sideload',
                    'attachments:sideload',
                    'category:sideload'
                ],
                ...props
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE.SEARCH](props = {}) {
        let response;

        try {
            response = await api.get('api:issues.search', {
                includes: [
                    'issuer:sideload',
                    'recipients:sideload',
                    'status:sideload',
                    'attachments:sideload',
                    'category:sideload'
                ],
                ...props
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE.FETCH_SEARCH](props = {}) {
        let response;

        try {
            response = await api.get('api:issues.fetch-search', {
                select: ["issues:id"],
                ...props
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
                includes: [
                    'issuer:sideload',
                    'recipients:sideload',
                    'status:sideload',
                    'attachments:sideload',
                    'category:sideload',
                    'notes:ids',
                    'logs',
                    'logs.status:sideload',
                    'logs.status.configs',
                ],
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
                includes: [
                    'issuer:sideload',
                    'recipients:sideload',
                    'status:sideload',
                    'attachments:sideload',
                    'category:sideload',
                    // 'notes:ids'
                ],
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
                includes: [
                    'issuer:sideload',
                    'recipients:sideload',
                    'status:sideload',
                    'attachments:sideload',
                    'category:sideload',
                    // 'notes:ids'
                ],
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
                includes: [
                    'issuer:sideload',
                    'recipients:sideload',
                    'status:sideload',
                    'attachments:sideload',
                    'category:sideload',
                    'logs',
                    'logs.status:sideload',
                    'logs.status.configs'
                    // 'notes:ids'
                ],
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

    static async [actions.ISSUE.FORCE_DELETE](data) {
        let response;

        try {
            response = await api.delete('api:issues.force-delete', {
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
                includes: [
                    'issuer:sideload',
                    'recipients:sideload',
                    'status:sideload',
                    'attachments:sideload',
                    'category:sideload',
                    'notes:ids',
                    'logs',
                    'logs.status:sideload',
                    'logs.status.configs'
                ]
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE.ARCHIVE](data) {
        let response;

        try {
            response = await api.put('api:issues.archive', {
                ...data
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE.EXPORT](data) {
        let response;

        try {
            response = await axios.get(route('api:export.issues'), {
                params: {
                    ...data,
                    includes: ["notes", "notes.creator", "recipients", "issuer", "status", "category"]
                },
                paramsSerializer: window.$paramSerializer,
                responseType: 'blob',
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE.EXPORT_SEARCH](data) {
        let response;

        try {
            response = await axios.get(route('api:export.search-issues'), {
                params: {
                    ...data,
                    includes: ["notes", "notes.creator", "recipients", "issuer", "status", "category"]
                },
                paramsSerializer: window.$paramSerializer,
                responseType: 'blob',
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

    get complaintIssuer() {
        let {
            issued_by = null
        } = this;

        let issuer = "Admin";

        if (issued_by) {
            const {
                vuex,
                rootGetters
            } = this.$context;

            const group = rootGetters[
                `${vuex.modules.GROUP}/${vuex.getters.BY_KEY}`
            ](issued_by);

            issuer = group.name || "Anonymous";
        }

        return issuer;
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

    get statusColor() {
        let color = '#E0E0E0FF';

        const {
            vuex,
            rootGetters
        } = this.$context, {
            issue_status_id = null,
            status_updated_at = null
        } = this;

        if (issue_status_id) {
            const status = rootGetters[
                `${vuex.modules.ISSUE_STATUS}/${vuex.getters.BY_KEY}`
            ](issue_status_id);

            if (status) {
                color = status.getColorByTime(status_updated_at);
            }
        }

        return color;
    }

    get currentStatus() {
        let currentStatus = "";

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
