import BaseModel from "./BaseModel";

class Api extends BaseModel {
    constructor() {
        super();

        this.route = route;
    }

    post(
        routeName,
        properties = {}
    ) {
        return this.call('post', routeName, properties);
    }

    get(
        routeName,
        properties = {}
    ) {
        return this.call('get', routeName, properties);
    }

    put(
        routeName,
        properties = {}
    ) {
        return this.call('put', routeName, properties);
    }

    patch(
        routeName,
        properties = {}
    ) {
        return this.call('patch', routeName, properties);
    }

    delete(
        routeName,
        properties = {}
    ) {
        return this.call('delete', routeName, properties);
    }

    async call(method, routeName, {
        params = {},
        routeParam = {},
        ...props
    } = {}) {

        let url = this.route(routeName, routeParam),
            v;

        let options = {
            ...props
        };

        if (method === 'get') {
            options = {
                ...options,
                params,
                paramsSerializer: window.$paramSerializer
            };
        }
        console.log(options);

        try {
            v = await axios[method](url, options);
        } catch (error) {
            const {
                response
            } = error;

            throw response;
        }

        return v;
    }
}

export default Api;
