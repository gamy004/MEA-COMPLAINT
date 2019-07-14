import BaseVuexModel from './BaseVuexModel';
import {
    actions,
    modules
} from '../constants';

class Group extends BaseVuexModel {
    constructor(data) {
        super({
            name: '',
            ...data
        });

        this.$store = modules.GROUP;
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

    static async [actions.GROUP.UPDATE](data) {
        let response;

        try {
            response = await api.put('api:groups.update', {
                ...data,
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.GROUP.DELETE](data) {
        let response;

        try {
            response = await api.delete('api:groups.destroy', {
                ...data
            });
        } catch (error) {
            throw error;
        }

        return response;
    }
}

export default Group;
