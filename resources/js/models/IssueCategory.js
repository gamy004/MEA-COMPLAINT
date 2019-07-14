import BaseVuexModel from './BaseVuexModel';
import {
    actions,
    modules
} from '../constants';

class IssueCategory extends BaseVuexModel {
    constructor(data) {
        super({
            name: '',
            ...data
        });

        this.$store = modules.ISSUE_CATEGORY;
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

    static async [actions.ISSUE_CATEGORY.EDIT](data) {
        let response;

        try {
            response = await api.get('api:issue-categories.edit', {
                ...data,
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE_CATEGORY.STORE](props) {
        let response;

        try {
            response = await api.post('api:issue-categories.store', props);
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE_CATEGORY.UPDATE](props) {
        let response;

        try {
            response = await api.put('api:issue-categories.update', props);
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE_CATEGORY.DELETE](data) {
        let response;

        try {
            response = await api.delete('api:issue-categories.destroy', {
                ...data
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE_CATEGORY.RESTORE](data) {
        let response;

        try {
            response = await api.post('api:issue-categories.restore', {
                ...data
            });
        } catch (error) {
            throw error;
        }

        return response;
    }
}

export default IssueCategory;
