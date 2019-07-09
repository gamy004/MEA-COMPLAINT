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

export function formatDateFile(date) {
    date = moment(date);

    return date.format('L');
}

export function formatShortDateTime(date, {
    transform = true
} = {}) {
    let today = moment();

    // let yesterday = moment().subtract(1, 'days');

    date = moment(date);

    if (transform && today.isSame(date, 'd')) {
        return date.format('LT น.'); // for eng
    }

    // if (transform && yesterday.isSame(date, 'd')) {
    //     return _.upperCase('yesterday');
    // }

    return today.isSame(date, 'year') ? date.format('D MMM') : date.format('D MMM YYYY');
}

export function formatLongDateTime(date) {
    date = moment(date);

    return date.format('MMM D, Y, LT น.');
}

export function getCorrectTextColor(hex) {
    /*
    Reference: https://codepen.io/davidhalford/pen/ywEva
    From this W3C document: http://www.webmasterworld.com/r.cgi?f=88&d=9769&url=http://www.w3.org/TR/AERT#color-contrast

    Color brightness is determined by the following formula:
    ((Red value X 299) + (Green value X 587) + (Blue value X 114)) / 1000

    I know this could be more compact, but I think this is easier to read/explain.

    */
    let threshold = 160; /* about half of 256. Lower threshold equals more dark text on dark background  */

    let hRed = hexToR(hex);
    let hGreen = hexToG(hex);
    let hBlue = hexToB(hex);


    function hexToR(h) {
        return parseInt((cutHex(h)).substring(0, 2), 16)
    }

    function hexToG(h) {
        return parseInt((cutHex(h)).substring(2, 4), 16)
    }

    function hexToB(h) {
        return parseInt((cutHex(h)).substring(4, 6), 16)
    }

    function cutHex(h) {
        return (h.charAt(0) == "#") ? h.substring(1, 7) : h
    }

    let cBrightness = ((hRed * 299) + (hGreen * 587) + (hBlue * 114)) / 1000;

    if (cBrightness > threshold) {
        return "#000000FF";
    } else {
        return "#FFFFFFFF";
    }
}

export function contrastText(rgb) {
    // check if we are receiving an element or element background-color
    if (typeof rgb !== 'string') {
        return;
    }

    // @TODO check for HEX value
    // All browsers should return an rgb value so this isn't critical

    // Strip everything except the integers eg. "rgb(" and ")" and " "

    rgb = rgb.split(/\(([^)]+)\)/)[1].replace(/ /g, '');

    // map RGB values to variables
    var r = parseInt(rgb.split(',')[0], 10),
        g = parseInt(rgb.split(',')[1], 10),
        b = parseInt(rgb.split(',')[2], 10),
        a;

    // if RGBA, map alpha to variable (not currently in use)
    if (rgb.split(',')[3] !== null) {
        a = parseInt(rgb.split(',')[3], 10);
    }

    // calculate contrast of color (standard grayscale algorithmic formula)
    var contrast = (Math.round(r * 299) + Math.round(g * 587) + Math.round(b * 114)) / 1000;

    return (contrast >= 128) ? '#222222' : '#000000';
}

export function onEmit(eventName, $event, item, ...indexes) {
    return item[eventName] ?
        item[eventName]($event, item, indexes) :
        () => ({});
}

export function mapTextValue(data, text = 'id', value = 'id') {
    return _.map(data, (x) => ({
        text: x[text],
        value: x[value]
    }));
}

export function hasRootModule(store, moduleName) {
    return store._modules.root._children[moduleName] !== undefined;
}

export function registerModules(store, modules = {}) {
    for (const key in modules) {
        if (modules.hasOwnProperty(key)) {
            const mod = modules[key];

            if (!hasRootModule(store, key)) {
                store.registerModule(key, mod);
            }
        }
    }
}

export function unregisterModules(store, modules = []) {
    modules.forEach(mod => {
        if (hasRootModule(store, mod)) {
            store.unregisterModule(mod);
        }
    })
}

export function filterIn(key, value) {
    return {
        key,
        value,
        operator: "in"
    };
}

export function filterNotIn(key, value) {
    return {
        key,
        value,
        operator: "in",
        not: true
    };
}

export function filterContains(key, value) {
    return {
        key,
        value,
        operator: "ct"
    };
}

export function filterNotContains(key, value) {
    return {
        key,
        value,
        operator: "ct",
        not: true
    };
}
