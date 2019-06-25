import filemixin from "../mixins/filemixin";

const fileItemMixin = {
    mixins: [filemixin],

    props: {
        file: {
            type: Object,
            required: true
        }
    },

    methods: {
        $fileitem_mixin_removeFile() {
            this.$emit("remove", this.file);
        }
    },

    computed: {
        $fileitem_mixin_fileExtension() {
            return this.$_filemixin_getExtension(this.file);
        },

        $fileitem_mixin_fileFormattedFilesize() {
            return this.$_filemixin_getFormattedFilesize(this.file);
        },

        $fileitem_mixin_displayName() {
            return this.$_filemixin_getDisplayName(this.file);
        },

        $fileitem_mixin_showProgress() {
            return (
                !this.$_filemixin_isFileModel(this.file) &&
                !this.file.uploaded &&
                this.uploadPercent < 100
            );
        },

        $fileitem_mixin_showProcessing() {
            return (
                !this.$_filemixin_isFileModel(this.file) &&
                !this.file.uploaded &&
                this.uploadPercent >= 100
            );
        },

        $fileitem_mixin_uploadPercent() {
            let percentage = 0;

            if (this.file.multipartUploadPercent > 0) {
                percentage = this.file.multipartUploadPercent;
            }

            if (this.file.percentageUploaded > 0) {
                percentage = this.file.percentageUploaded;
            }

            return percentage;
        }
    }
};

export default fileItemMixin;
