import BaseModel from './BaseModel';
import {
    actions
} from '../constants';

class Complaint extends BaseModel {
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
    }

    static async [actions.COMPLAINT.FETCH](pagination) {
        let response;

        try {
            response = await api.get('api:issues.index', {
                pagination
            });
        } catch (error) {
            throw error;
        }

        const {
            issues = [],
                ...props
        } = response.data;

        return {
            ...props,
            issues: issues.map(issue => new Complaint(issue))
        }
    }
}

export default Complaint;
