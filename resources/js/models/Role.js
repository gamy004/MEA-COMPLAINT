import BaseVuexModel from './BaseVuexModel';
import {
    actions,
    modules
} from '../constants';

class Role extends BaseVuexModel {
    constructor(data) {
        super({
            name: '',
            ...data
        });

        this.$store = modules.ROLE;
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
