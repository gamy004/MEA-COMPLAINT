import Vuex from 'vuex';
import * as modules from './stores/module-types';
import * as mutations from './stores/mutations';
import * as getters from './stores/getters';

// Modules
import user from './stores/modules/users';
import role from './stores/modules/roles';
import file from './stores/modules/files';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        meta: {},
        // mobileBreakPoint: 768,
        mobileBreakPoint: 1024,
        mini: false,
        windowSize: {
            x: 0,
            y: 0
        }
    },

    getters,

    mutations,

    modules: {
        [modules.USER]: user,
        [modules.ROLE]: role,
        [modules.FILE]: file
    },

    strict: debug,
    // plugins: [createPersistedState({
    //     storage: window.sessionStorage,
    //     paths: [
    //         'cart',
    //         'user'
    //     ]
    // })]
});

export default store;
