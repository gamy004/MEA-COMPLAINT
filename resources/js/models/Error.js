import BaseModel from './BaseModel';

class Error extends BaseModel {
    constructor({
        errors = {}
    } = {}) {
        super();

        this.data = {
            errors
        };
    }

    static make({
        errors = {}
    } = {}) {
        return new Error({
            errors
        });
    }

    record(newErrors) {
        this.clear();

        this.data = newErrors;

        return this;
    }

    all() {
        return this.errors;
    }

    getError(error) {
        return this.errors.hasOwnProperty(error) ?
            this.errors[error] :
            this.get(`errors.${error}`, []);
    }

    has(error) {
        return this.errors.hasOwnProperty(error);
    }

    clear(error) {
        if (error) {
            if (!_.isArray(error)) {
                error = [error];
            }

            this.errors = _.omit(this.errors, error);
        } else {
            this.errors = {};
        }

        return this;
    }
}

export default Error;
