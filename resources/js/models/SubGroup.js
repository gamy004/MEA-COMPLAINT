import BaseVuexModel from './BaseVuexModel';
import {
    actions
} from '../constants';

class SubGroup extends BaseVuexModel {
    constructor(data) {
        super({
            name: '',
            ...data
        });
    }

    static async [actions.SUB_GROUP.FETCH]({
        filters = [],
        ...props
    } = {}) {
        let response;

        try {
            response = await api.get('api:groups.index', {
                filter_groups: [{
                    filters: [{
                        key: "parent_id",
                        value: null,
                        not: true
                    }, ...filters]
                }],
                ...props
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.SUB_GROUP.UPDATE](data) {
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

    static async [actions.SUB_GROUP.DELETE](data) {
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

export default SubGroup;
