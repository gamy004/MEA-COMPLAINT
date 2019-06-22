import {
    vuex,
    vuexable
} from "./vuexable";

const managable = {
    mixins: [vuexable],

    props: {
        managableModule: {
            type: String,
            default: ''
        },
        managableRouteParam: {
            type: Object,
            default: () => ({})
        },
        managableEdit: {
            type: Boolean,
            default: () => false
        }
    },

    data() {
        return {
            managable_valid: true
        };
    },

    computed: {
        $_managable_storeAction() {
            let {
                actions
            } = vuex;

            return this.edit ? actions.UPDATE : actions.STORE;
        },

        $_managable_action() {
            return this.edit ? 'edit' : 'add';
        }
    },

    methods: {
        disableEdit() {
            this.syncEdit(false);
        },

        enableEdit() {
            this.syncEdit(true);
        },

        toggleEdit() {
            this.syncEdit(!this.edit);
        },

        syncEdit(v) {
            this.$emit("update:managable-edit", v);
        },

        syncRouteParam(v) {
            this.$emit("update:managable-route-param", v);
        },

        async $_managable_submitForm(form, params = []) {
            const {
                managableRouteParam: routeParam
            } = this;

            try {
                await form.persist(
                    this.$_vuexable_dispatch, {
                        params,
                        routeParam
                    },
                    this.$_managable_storeAction,
                    this.managableModule
                );
            } catch (error) {
                throw error;
            }

            this.$emit('form:submitted', form);

            return form;
        }
    }
}

export default managable;
