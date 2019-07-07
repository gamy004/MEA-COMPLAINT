import BaseVuexModel from './BaseVuexModel';
import {
    actions
} from '../constants';

class Role extends BaseVuexModel {
    constructor(data) {
        super({
            name: '',
            ...data
        });
    }

    static async [actions.ROLE.FETCH](props) {
        let response;

        try {
            response = await api.get('api:roles.index', {
                select: ["roles:id,role"],
                sort: ["role"],
                ...props
            });
        } catch (error) {
            throw error;
        }

        return response;
    }
}

export default Role;
