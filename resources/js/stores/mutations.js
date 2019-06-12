// rootCommits

// export const set = (state, {
//     key,
//     value
// }) => {
//     state[key] = value;
// };

export const setMeta = (state, {
    key,
    value
}) => {
    if (!state.meta._links) {
        state.meta._links = [];
    }

    state.meta._links[key] = value;
};

export const setState = (state, {
    key,
    value
}) => {
    Vue.set(state, key, value);
};

export const toggleState = (state, key) => {
    if (state.hasOwnProperty(key) && _.isBoolean(state[key])) {
        Vue.set(state, key, !state[key]);
    }
};
