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

            return this.managableEdit ? actions.UPDATE : actions.STORE;
        },

        $_managable_action() {
            return this.managableEdit ? 'edit' : 'add';
        },

        $_managable_actionButton() {
            const action = this.managableEdit ? 'update' : 'create';

            return this.$t(`general.${action}`);
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
            this.syncEdit(!this.managableEdit);
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
                this.$emit('form:error', form);

                throw error;
            }

            this.$emit('form:submitted', form);

            const action = this.managableEdit ? 'update' : 'create';

            this.$emit(`form:${action}`, form);

            return form;
        }
    }
}

export default managable;
