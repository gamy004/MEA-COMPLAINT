import BaseVuexModel from './BaseVuexModel';
import {
    actions
} from '../constants';

class Status extends BaseVuexModel {
    constructor(data) {
        super({
            status: '',
            ...data
        });

        this.groupedConfigs = [];

        this.$updateGroupConfig();
    }

    static async [actions.ISSUE_STATUS.FETCH](props) {
        let response;

        try {
            response = await api.get('api:issue-statuses.index', {
                includes: ["configs"],
                ...props
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE_STATUS.EDIT](data) {
        let response;

        try {
            response = await api.get('api:issue-statuses.edit', {
                includes: ["configs"],
                ...data
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE_STATUS.STORE](props) {
        let response;

        try {
            response = await api.post('api:issue-statuses.store', {
                includes: ["configs"],
                ...props
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE_STATUS.UPDATE](props) {
        let response;

        try {
            response = await api.put('api:issue-statuses.update', {
                includes: ["configs"],
                ...props
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE_STATUS.DELETE](data) {
        let response;

        try {
            response = await api.delete('api:issue-statuses.destroy', {
                ...data
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE_STATUS.RESTORE](data) {
        let response;

        try {
            response = await api.post('api:issue-statuses.restore', {
                includes: ["configs"],
                ...data
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    $updateGroupConfig() {
        let {
            configs = []
        } = this;

        if (configs.length) {
            this.groupedConfigs = _(configs).sortBy("duration").groupBy("unit").value();
        }
        console.log(this.groupedConfigs);

        return this;
    }
}

export default Status;
