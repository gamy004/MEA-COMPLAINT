import uploader from "vuejs-uploader";

const uploadable = {
    props: {
        endpoint: {
            type: String,
            default: () => (route('api:file.upload'))
        },

        multipart: {
            type: Boolean,
            default: true
        },

        multiple: {
            type: Boolean,
            default: false
        },

        avatar: {
            type: String,
            default: ""
        }
    },

    components: {
        uploader
    },

    data() {
        return {
            uploading: false,
            uploadProgress: null
        };
    },

    computed: {
        isIndeterminate() {
            return _.isNull(this.uploadProgress);
        },
        progressAdditionalProps() {
            let props = {};

            if (!this.isIndeterminate) {
                this.$set(props, "value", this.uploadProgress);
            }

            return props;
        }
    },

    methods: {
        onStartUpload() {
            this.uploading = true;
        },
        onChunkUploaded({
            totalParts
        }, currentChunk) {
            this.uploadProgress = (currentChunk / totalParts) * 100;
        },
        onFileUploaded({
            file,
            response
        } = {}) {
            const {
                url = ""
            } = response.meta;

            // if (url.length) {
            //     this.sync("avatar", url);
            // }

            this.stopUploading();

            this.$emit("fileUploaded", {
                file,
                response
            });
        },
        onUploadError(error) {
            console.log(error);
            this.stopUploading();
        },
        stopUploading() {
            this.uploading = false;
            this.uploadProgress = null;
        }
    }
};

export default uploadable;
