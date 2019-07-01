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
    }

    static async [actions.ISSUE_STATUS.FETCH](props) {
        let response;

        try {
            response = await api.get('api:issue-statuses.index', props);
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE_STATUS.EDIT](data) {
        let response;

        try {
            response = await api.get('api:issue-statuses.edit', {
                ...data,
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE_STATUS.STORE](props) {
        let response;

        try {
            response = await api.post('api:issue-statuses.store', props);
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE_STATUS.UPDATE](props) {
        let response;

        try {
            response = await api.put('api:issue-statuses.update', props);
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
                ...data
            });
        } catch (error) {
            throw error;
        }

        return response;
    }
}

export default Status;
