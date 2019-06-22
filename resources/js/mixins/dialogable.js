const dialogable = {
    props: {
        dialogableVisible: {
            type: Boolean,
            default: () => false
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
