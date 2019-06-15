export function get(data, key, defval = null) {
    return _.get(data, key, defval);
}

export function set(data, key = '', value = null) {
    if (typeof key == 'object' && !value) {
        for (const k in key) {
            if (key.hasOwnProperty(k)) {
                _.set(data, k, get(key, k));
            }
        }
    } else if (value === null) {
        data = key;
    } else {
        _.set(data, key, value);
    }
}

export function toggle(data, key = '') {
    if (data.hasOwnProperty(key)) {
        data[key] = !data[key];
    }

    return data;
}

export function formatShortDateTime(date, {
    transform = true
} = {}) {
    let today = moment();

    // let yesterday = moment().subtract(1, 'days');

    date = moment(date);

    if (transform && today.isSame(date, 'd')) {
        return date.format('h:mm A');
    }

    // if (transform && yesterday.isSame(date, 'd')) {
    //     return _.upperCase('yesterday');
    // }

    return date.format('MMM D');
}
