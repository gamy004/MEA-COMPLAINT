const vmodelable = {
    props: ['vModel'],

    model: {
        prop: 'vModel',
        event: 'change'
    },

    data() {
        return {
            vmodelable_vmodel: this.vModel
        };
    },

    watch: {
        vModel: {
            deep: true,
            immediate: true,
            handler(v) {
                this.vmodelable_vmodel = v;
            }
        }
    },

    methods: {
        $_vmodelable_sync(v) {
            this.$emit('change', v);
        }
    }
}

export default vmodelable;
