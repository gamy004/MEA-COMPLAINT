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
                includes: ["creator:sideload"],
                ...props,
            });
        } catch (error) {
            throw error;
        }

        return response;
    }
}

export default IssueNote;
