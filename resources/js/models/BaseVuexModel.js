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

    update(key, value) {
        const {
            id = null
        } = this;

        if (id) {
            this.$context.commit(
                this.$context.vuex.mutations.UPDATE, {
                    id,
                    key,
                    value
                }
            );
        }
    }
}

export default BaseVuexModel;
