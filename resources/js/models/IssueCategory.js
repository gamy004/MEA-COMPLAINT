import BaseVuexModel from './BaseVuexModel';
import {
    actions
} from '../constants';

class IssueCategory extends BaseVuexModel {
    constructor(data) {
        super({
            name: '',
            ...data
        });
    }

    static async [actions.ISSUE_CATEGORY.FETCH](props) {
        let response;

        try {
            response = await api.get('api:issue-categories.index', props);
        } catch (error) {
            throw error;
        }

        return response;
    }
}

export default IssueCategory;
