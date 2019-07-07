import BaseVuexModel from './BaseVuexModel';
import {
    actions
} from '../constants';

class Group extends BaseVuexModel {
    constructor(data) {
        super({
            name: '',
            ...data
        });
    }

    static async [actions.GROUP.FETCH](props) {
        let response;

        try {
            response = await api.get('api:groups.index', {
                filters: {
                    parent_id: null
                },
                ...props
            });
        } catch (error) {
            throw error;
        }

        return response;
    }
}

export default Group;
