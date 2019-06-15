import BaseModel from './BaseModel';

class BaseVuexModel extends BaseModel {
    constructor({
        context,
        ...data
    }) {
        super({
            ...data
        });

        this.$context = context;
    }
}

export default BaseVuexModel;
