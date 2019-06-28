import BaseVuexModel from './BaseVuexModel';
import {
    actions
} from '../constants';

class IssueNote extends BaseVuexModel {
    constructor(data) {
        super({
            description: '',
            attachments: [],
            ...data
        });
    }

    static async [actions.ISSUE_NOTE.FETCH](props) {
        let response;

        try {
            response = await api.get('api:issue-notes.index', {
                includes: ["creator:sideload", "attachments:sideload"],
                ...props,
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE_NOTE.EDIT](data) {
        let response;

        try {
            response = await api.get('api:issue-notes.edit', {
                includes: ["creator:sideload", "attachments:sideload"],
                ...data,
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE_NOTE.STORE](data) {
        let response;

        try {
            response = await api.post('api:issue-notes.store', {
                includes: ["creator:sideload", "attachments:sideload"],
                ...data,
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE_NOTE.UPDATE](data) {
        let response;

        try {
            response = await api.put('api:issue-notes.update', {
                includes: ["creator:sideload", "attachments:sideload"],
                ...data,
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE_NOTE.DELETE](data) {
        let response;

        try {
            response = await api.delete('api:issue-notes.destroy', {
                ...data
            });
        } catch (error) {
            throw error;
        }

        return response;
    }
}

export default IssueNote;
