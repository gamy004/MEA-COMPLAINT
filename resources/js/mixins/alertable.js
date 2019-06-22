const alertable = {
    props: {
        alertableVisible: {
            type: Boolean,
            default: () => false
        },
        alertableTimeout: {
            type: Number,
            default: () => 2000
        },
        alertableAutoClose: {
            type: Boolean,
            default: () => false
        }
    },

    data: () => ({
        alertable_alert: false,
        alertable_type: "success",
        alertable_messages: {}
    }),

    computed: {
        $_alertable_message() {
            return this.alertable_messages[this.alertable_type] || "";
        }
    },

    methods: {
        $_alertable_alert(type) {
            this.alertable_alert = true;
            this.alertable_type = type;
        }
    }
}

export default alertable;
