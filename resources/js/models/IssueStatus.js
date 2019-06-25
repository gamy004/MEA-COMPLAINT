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
}

export default Status;
