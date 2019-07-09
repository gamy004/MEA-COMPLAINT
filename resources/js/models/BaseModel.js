import {
    get,
    set,
    toggle,
    formatShortDateTime,
    formatLongDateTime
} from "../helpers";

class BaseModel {
    constructor({
        ...props
    } = {}) {
        let data = {
            id: null,
            created_at: null,
            updated_at: null,
            deleted_at: null,
            ...props
        };

        this.$original = {
            ...data
        };

        this.$data = {};
        this.$backup = {};

        this.data = {
            ...data
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
        this.backup = {
            ...this.$data,
            ...object
        };

        this.$data = {
            ...this.$data,
            ...object
        };

        for (let attribute in this.$data) {
            if (!this[attribute]) {
                Object.defineProperty(this, attribute, {
                    enumerable: true,
                    configurable: true,

                    get() {
                        return this.$data[attribute];
                    },

                    set(v) {
                        this.set(attribute, v);

                        return this;
                    }
                });
            }
        }

        return this;
    }

    get backup() {
        return get(this, '$backup', {});
    }

    set backup(object = {}) {
        this.$backup = {
            ...object
        };

        return this;
    }

    get shortUpdatedAt() {
        return formatShortDateTime(this.updated_at);
    }

    get longUpdatedAt() {
        return formatLongDateTime(this.updated_at);
    }
}

export default BaseModel;
