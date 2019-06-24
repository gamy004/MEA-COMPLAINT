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

export function formatLongDateTime(date) {
    date = moment(date);

    return date.format('MMM D, Y, h:mm A');
}

export function getCorrectTextColor(hex) {
    /*
    Reference: https://codepen.io/davidhalford/pen/ywEva
    From this W3C document: http://www.webmasterworld.com/r.cgi?f=88&d=9769&url=http://www.w3.org/TR/AERT#color-contrast
    
    Color brightness is determined by the following formula: 
    ((Red value X 299) + (Green value X 587) + (Blue value X 114)) / 1000

    I know this could be more compact, but I think this is easier to read/explain.
    
    */

    threshold = 130; /* about half of 256. Lower threshold equals more dark text on dark background  */

    hRed = hexToR(hex);
    hGreen = hexToG(hex);
    hBlue = hexToB(hex);


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

    cBrightness = ((hRed * 299) + (hGreen * 587) + (hBlue * 114)) / 1000;
    if (cBrightness > threshold) {
        return "#000000";
    } else {
        return "#ffffff";
    }
}

export function onEmit(eventName, $event, item, ...indexes) {
    return item[eventName] ?
        item[eventName]($event, item, indexes) :
        () => ({});
}

export function mapTextValue(data, text, value) {
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
