import {
    vuex,
    vuexable
} from "./vuexable";

const menuable = {
    mixins: [vuexable],

    data() {
        return {
            drawer: false,
            items: [],
        };
    },

    computed: {
        ...vuex.mapState(["mini", "mobileBreakPoint", "windowSize"]),

        ...vuex.mapGetters(["isMobile"]),

        matchedRoute() {
            const {
                matched = []
            } = ({} = this.$route);

            return matched;
        }
    },

    methods: {
        isActive(route) {
            return this.matchedRoute.some(({
                meta
            }) => {
                return route === meta.route;
            });
        },

        setMenuItems(items) {
            this.items = items;
        },

        getMenuItems() {
            return this.items;
        },

        onResize(evt) {
            this.updateWindowSize({
                x: window.innerWidth,
                y: window.innerHeight
            });
        },

        updateWindowSize({
            x,
            y
        }) {
            // if (x === this.windowSize.x) return;

            const mini = x <= this.mobileBreakPoint,
                windowSize = {
                    x,
                    y
                };

            this.$_vuexable_setState({
                key: "mini",
                value: mini
            });
            this.$_vuexable_setState({
                key: "windowSize",
                value: windowSize
            });
        }
    },

    created() {
        this.updateWindowSize({
            x: window.innerWidth,
            y: window.innerHeight
        });

        this.drawer = !this.isMobile;
    }
}

export default menuable;
