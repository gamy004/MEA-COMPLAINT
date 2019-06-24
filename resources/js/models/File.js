import BaseVuexModel from './BaseVuexModel';
import {
    actions,
    modules
} from '../constants';

class File extends BaseVuexModel {
    constructor(data) {
        super({
            name: '',
            ...data
        });

        this.$store = modules.FILE;
    }

    static async [actions.FILE.FETCH](props) {
        let response;

        try {
            response = await api.get('api:files.index', props);
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.FILE.DELETE](data) {
        let response;

        try {
            response = await api.delete('api:files.destroy', {
                ...data
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.FILE.RESTORE](data) {
        let response;

        try {
            response = await api.post('api:files.restore', {
                ...data
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.FILE.DELETE_BY_PATH](data) {
        let response;

        try {
            response = await api.post('api:files.destroy-by-path', {
                ...data
            });
        } catch (error) {
            throw error;
        }

        return response;
    }
}

export default File;
