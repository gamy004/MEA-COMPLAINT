// global Getters

export const getMeta = state => rel => {
    return state.meta._links.hasOwnProperty(rel) &&
        state.meta._links[rel] ?
        state.meta._links[rel] :
        null;
};

export function isMobile(state) {
    const {
        mobileBreakPoint,
        windowSize
    } = state;

    return windowSize.x <= mobileBreakPoint;
};

export function showOverlay(state, getters) {
    return !state.mini && getters.isMobile;
}
