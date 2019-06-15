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
}

export default Group;
