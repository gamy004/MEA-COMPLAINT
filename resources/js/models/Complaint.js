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

    static async [actions.ISSUE.SHOW](data) {
        let response;

        try {
            response = await api.get('api:issues.show', {
                includes: [
                    'recipients:sideload',
                    'status:sideload',
                    'attachments:sideload',
                    'category:sideload',
                    'issuer:sideload',
                    'notes:ids'
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
                includes: [
                    'recipients:sideload',
                    'status:sideload',
                    'attachments:sideload',
                    'category:sideload',
                    'issuer:sideload',
                    'notes:ids'
                ]
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

    get issuer() {
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
        let color = '#C3C3C3FF';

        const {
            vuex,
            rootGetters
        } = this.$context, {
            issue_status_id = null
        } = this;

        if (issue_status_id) {
            const status = rootGetters[
                `${vuex.modules.ISSUE_STATUS}/${vuex.getters.BY_KEY}`
            ](issue_status_id);

            if (status) {
                color = status.color;

                let {
                    groupedConfigs = {}
                } = status;;

                if (Object.keys(groupedConfigs).length > 0) {
                    const units = [
                        "minutes",
                        "hours",
                        "days",
                        "weeks",
                        "months",
                        "years"
                    ];

                    units.forEach(unit => {
                        if (groupedConfigs[unit]) {
                            for (let index = 0; index < groupedConfigs[unit].length; index++) {
                                const config = groupedConfigs[unit][index];
                                const currentMoment = moment();
                                const configMoment = moment(this.created_at).add(config.duration, config.unit);

                                // console.log(
                                //     this.created_at,
                                //     configMoment.toString(),
                                //     currentMoment.toString(),
                                //     configMoment.isBefore(currentMoment),
                                //     config.duration,
                                //     config.unit
                                // );

                                if (configMoment.isBefore(currentMoment)) {
                                    color = config.color;
                                    continue;
                                } else {
                                    break;
                                }
                            }
                        }
                    })
                }
            }
        }

        return color;
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
