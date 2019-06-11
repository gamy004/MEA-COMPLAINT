import BaseModel from './BaseModel';
import Error from './Error';

class Form extends BaseModel {
    constructor({
        ...props
    }) {
        super({
            $isSubmitting: false,
            ...props
        });

        if (!this.errors) {
            this.errors = Error.make();
        }

        if (!this.api) {
            this.api = window.api;
        }
    }

    static make({
        ...props
    } = {}) {
        return new Form({
            ...props
        });
    }

    /**
     * Record fresh data into form
     * @param  Object data as a key vaule pair
     */
    record({
        ...data
    }) {
        this.data = {
            ...data
        };

        return this;
    }

    reset() {
        this.data = {
            ...this.backup
        };

        this.errors.clear();

        return this;
    }

    saveBackup() {
        this.backup = {
            ...this.data
        };

        return this;
    }

    /**
     * Determine that the form's data has changed
     */
    get isChanged() {
        const {
            backup,
            data
        } = this;

        return !_.isEqual(data, backup);
    }

    /**
     * Check form is empty or not
     */
    get isEmpty() {
        return _.isEmpty(this.data);
    }

    /**
     * Get submitting value
     */
    get isSubmitting() {
        return this.$isSubmitting;
    }

    // /**
    //  * Check form has some data
    //  */
    // get any() {
    //     return Object.values(this.data).some(el => {
    //         if (Array.isArray(el)) {
    //             return el.length !== 0
    //         }

    //         return el.length !== 0 || el.trim()
    //     })
    // }

    /**
     * Check form has specified field
     */
    has(field) {
        return this.hasOwnProperty(field);
    }

    post(routeName, properties = {}) {
        return this.submit('post', routeName, properties);
    }

    put(routeName, properties = {
        params: {},
        routeParam: {}
    }) {
        return this.submit('put', routeName, properties);
    }

    patch(routeName, properties = {
        params: {},
        routeParam: {}
    }) {
        return this.submit('patch', routeName, properties);
    }

    delete(routeName, properties = {
        params: {},
        routeParam: {}
    }) {
        return this.submit('delete', routeName, properties);
    }

    async submit(method, routeName, {
        params = {},
        routeParam = {}
    } = {}) {
        let res;

        try {
            const data = this.getData(params);

            this.errors.clear();

            this.toggle('$isSubmitting');

            res = await this.api.call(method, routeName, {
                ...data,
                routeParam
            });
        } catch (error) {
            if (error.data) {
                const {
                    data
                } = error;

                this.errors.record(data);
                console.log(this.errors);

            }

            throw error;
        } finally {
            this.toggle('$isSubmitting');
        }

        return res;
    }

    async persist(cb) {
        let res;

        try {
            this.errors.clear();

            this.toggle('$isSubmitting');

            res = await cb;
        } catch (error) {
            console.error(error);

            if (error.response) {
                const data = error.response.data;
                this.errors.record(data);
            }

            throw error;
        } finally {
            this.toggle('$isSubmitting');
        }

        return res;
    }
}

export default Form;
