const enumTypes = ["success", "info", "warning", "error"];

const alertable = {
    props: {
        alertableType: {
            type: String,
            default: 'info'
        },
        alertableVisible: {
            type: Boolean,
            default: () => false
        },
        alertableMessages: {
            type: Object,
            default: () => ({})
        },
        alertableProps: {
            type: Object,
            default: () => ({})
        },
        alertableTimeout: {
            type: Number,
            default: () => 2000
        },
        alertableAutoClose: {
            type: Boolean,
            default: () => true
        },
        alertablePosition: {
            type: String,
            default: 'bottom-left'
        }
    },

    data() {
        return {
            alertable_timer: null,
            alertable_alert: false,
            alertable_type: "info",
            alertable_messages: {},
            alertable_props: {}
        };
    },

    watch: {
        alert(v) {
            if (v && this.alertableAutoClose) {
                this.$_alertable_updateTimer();
            }
        }
    },

    computed: {
        alert: {
            get() {
                return this.alertableVisible;
            },
            set(v) {
                this.$emit('update:alertable-visible', v);
            }
        },

        $_alertable_message() {
            let message = this.alertableMessages[this.alertableType] || "";

            if (message && message.hasOwnProperty('text')) {
                message = message.text;
            }

            return message;
        },

        $_alertable_actions() {
            let actions = [],
                message = this.alertableMessages[this.alertableType] || "";

            if (message && message.hasOwnProperty('actions')) {
                actions = message.actions;
            }

            return actions;
        },

        $_alertable_classes() {
            return {
                [this.alertablePosition]: true
            };
        },

        $_alertable_matchedType() {
            return enumTypes.indexOf(this.alertableType) !== -1;
        },

        $_alertable_context() {
            return this.$_alertable_matchedType ? this.alertableType : undefined;
        },

        $_alertable_color() {
            const messageType = this.alertableMessages[this.alertableType];

            let color = this.$_alertable_matchedType ? this.alertableType : "blue-grey darken-4";

            if (messageType && messageType.type) {
                color = messageType.type;
            }

            return color;
        },

        $_alertable_action_color() {
            const messageType = this.alertableMessages[this.alertableType];

            let actionColor = this.$_alertable_matchedType ? "white" : "indigo lighten-3";

            if (messageType && messageType.color) {
                actionColor = messageType.color;
            }

            return actionColor;
        }
    },

    methods: {
        $_alertable_alert(type, props = {}) {
            this.alertable_type = type;
            this.alert = true;
            this.alertable_alert = true;
            this.alertable_props = {
                ...props
            };
        },

        $_alertable_updateTimer() {
            clearTimeout(this.alertable_timer);

            this.alertable_timer = setTimeout(() => {
                this.alert = false;
                this.alertable_alert = false;
            }, this.alertableTimeout);
        }
    }
}

export default alertable;
