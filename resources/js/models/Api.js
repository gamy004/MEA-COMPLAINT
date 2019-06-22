import BaseModel from "./BaseModel";

function parseFilters(filters) {
    return _.transform(filters, (result, value, key) => {
        result.push({
            key,
            value
        });
    }, []);
}

function parse({
    filter_groups = [],
    filters = {},
    includes = [],
    map = [],
    sort = [],
    pagination = {},
    ...props
}) {
    let template = {
        params: {
            ...props
        }
    };

    if (!_.isEmpty(filter_groups)) {
        // Vue.set(
        //     template.params,
        //     'filter_groups',
        //     _.map(filter_groups, ({
        //         filters,
        //         or = false
        //     }) => {
        //         return {
        //             filters: parseFilterGroups(filters),
        //             or
        //         };
        //     })
        // );
        Vue.set(
            template.params,
            'filter_groups',
            filter_groups
        );
    }

    if (!_.isEmpty(filters)) {
        Vue.set(
            template.params,
            'filters',
            parseFilters(filters)
        );
    }

    if (!_.isEmpty(includes)) {
        Vue.set(
            template.params,
            'includes',
            includes
        );
    }

    if (!_.isEmpty(map)) {
        Vue.set(
            template.params,
            'map',
            map
        );
    }

    if (!_.isEmpty(sort)) {
        Vue.set(
            template.params,
            'sort',
            sort
        );
    }

    if (!_.isEmpty(pagination)) {
        template = parsePagination(template, pagination);
    }

    return template;
}

function parsePagination(template, {
    search = {
        keyword: '',
        fields: []
    },
    descending = false,
    rowsPerPage = 10,
    page = 1,
    sortBy = "id"
}) {
    const sortSym = descending ? "-" : "";

    const inSortArr = template.params.sort &&
        (
            template.params.sort.indexOf(`${sortSym}${sortBy}`) !== -1 ||
            template.params.sort.indexOf(`${sortBy}${sortSym}`) !== -1
        );

    if (!inSortArr) {
        let {
            sort = []
        } = template.params;

        sort.push(`${sortSym}${sortBy}`);

        Vue.set(
            template.params,
            'sort',
            sort
        );
    }

    if (rowsPerPage !== -1) {
        Vue.set(
            template.params,
            'page',
            page
        );

        Vue.set(
            template.params,
            'limit',
            rowsPerPage
        );
    }

    if (search.keyword &&
        search.keyword.length &&
        search.fields &&
        search.fields.length
    ) {
        Vue.set(
            template.params,
            'search',
            search
        );
    }

    return template;
}

class Api extends BaseModel {
    constructor() {
        super();

        this.route = route;
    }

    post(
        routeName, {
            routeParam = {},
            ...params
        } = {}
    ) {
        return this.call('post', routeName, {
            ...parse(params),
            routeParam
        });
    }

    get(
        routeName,
        properties = {}
    ) {
        return this.call('get', routeName, parse(properties));
    }

    put(
        routeName, {
            routeParam = {},
            ...params
        } = {}
    ) {
        return this.call('put', routeName, {
            ...parse(params),
            routeParam
        });
    }

    patch(
        routeName, {
            routeParam = {},
            ...params
        } = {}
    ) {
        return this.call('patch', routeName, {
            ...parse(params),
            routeParam
        });
    }

    delete(
        routeName, {
            routeParam = {},
            ...params
        } = {}
    ) {
        return this.call('delete', routeName, {
            ...parse(params),
            routeParam
        });
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
        } else {
            options = {
                ...options,
                ...params
            }
        }

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
