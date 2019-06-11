import {
    get,
    set,
    toggle
} from "../helpers";

class BaseModel {
    constructor({
        ...props
    } = {}) {
        this.$original = {
            ...props
        };
        this.$data = {};
        this.$backup = {};

        this.data = {
            ...props
        };
    }

    get(key, defval = null) {
        return get(this.$data, key, defval);
    }

    set(key, value) {
        set(this.$data, key, value);

        return this;
    }

    toggle(key) {
        toggle(this, key);

        return this;
    }

    has(key) {
        return this.get(key) !== null;
    }

    remember(key, value, reset = false) {
        if (!this.has(key) || reset) {
            this.set(key, value);
        }

        return this.get(key);
    }

    get data() {
        return get(this, '$data', {});
    }

    getData(filters = []) {
        let {
            data
        } = this;

        if (filters.length) {
            let filteredData = {};

            filters.forEach(field => {
                if (data.hasOwnProperty(field)) {
                    filteredData[field] = data[field];
                }
            });

            return filteredData;
        }

        return data;
    }

    set data(object = {}) {
        this.$backup = {
            ...this.$data
        };

        this.$data = {
            ...this.$data,
            ...object
        };

        for (let attribute in this.$data) {
            Object.defineProperty(this, attribute, {
                get() {
                    return this.get(attribute);
                },

                set(v) {
                    this.set(attribute, v);

                    return this;
                }
            })
        }

        return this;
    }
}

export default BaseModel;
