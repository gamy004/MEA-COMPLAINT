const dialogable = {
    props: {
        dialogableVisible: {
            type: Boolean,
            default: () => false
        },
        dialogableTimeout: {
            type: Number,
            default: () => 2000
        },
        dialogableAutoClose: {
            type: Boolean,
            default: () => false
        }
    },

    data: () => ({
        dialogable_timer: null
    }),

    watch: {
        dialog(v) {
            if (v && this.dialogableAutoClose) {
                clearTimeout(this.dialogable_timer);

                this.dialogable_timer = setTimeout(() => {
                    this.dialog = false;
                }, this.dialogableTimeout);
            }
        }
    },

    computed: {
        dialog: {
            get() {
                return this.dialogableVisible;
            },
            set(v) {
                this.$_dialogable_syncVisible(v);
            }
        }
    },

    methods: {
        $_dialogable_openDialog() {
            this.$_dialogable_syncVisible(true);
        },

        $_dialogable_closeDialog() {
            this.$_dialogable_syncVisible(false);
        },

        $_dialogable_toggleDialog() {
            this.$_dialogable_syncVisible(!this.dialogableVisible);
        },

        $_dialogable_syncVisible(v) {
            this.$emit("update:dialogable-visible", v);
        },
    }
}

export default dialogable;
