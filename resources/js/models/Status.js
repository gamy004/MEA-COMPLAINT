import BaseVuexModel from './BaseVuexModel';

class Status extends BaseVuexModel {
    constructor(data) {
        super({
            status: '',
            ...data
        });
    }
}

export default Status;
