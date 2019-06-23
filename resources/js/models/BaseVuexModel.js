import BaseModel from './BaseModel';

class BaseVuexModel extends BaseModel {
    constructor({
        context,
        ...data
    }) {
        super({
            ...data
        });

        this.$store = '';
        this.$context = context;
    }

    update(attr, value) {
        const {
            id: key = null
        } = this;

        if (key) {
            this.$context.rootCommit(
                this.$context.vuex.mutations.UPDATE,
                this.$store, {
                    key,
                    attr,
                    value
                }
            );
        }
    }
}

export default BaseVuexModel;
