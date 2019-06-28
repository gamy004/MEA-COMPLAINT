import uploader from "vuejs-uploader";

const uploadable = {
    props: {
        endpoint: {
            type: String,
            default: () => (route('api:files.upload'))
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
            uploadable_uploaderRef: 'uploadable_uploader',
            uploadable_uploader: null,
            uploadable_uploading: false,
            uploadable_uploadedFiles: []
        };
    },

    computed: {
        $_uploadable_uploaderFiles() {
            return this.uploadable_uploader ?
                this.uploadable_uploader.getFiles : [];
            // this.uploadable_uploader.getFiles.filter(file => {
            //     return !file.uploaded;
            // }) : [];
        },

        $_uploadable_metaData() {
            return this.uploadable_uploadedFiles.reduce(
                (acc, {
                    file,
                    hash_name,
                    filesize: size,
                    formattedFilesize: formatted_size,
                    upload_path
                }) => {
                    acc.push({
                        display_name: file.name,
                        hash_name,
                        size,
                        formatted_size,
                        upload_path
                    });

                    return acc;
                }, []
            );
        },

        $_uploadable_hasUploadedFiles() {
            return this.uploadable_uploadedFiles.length;
        }
    },

    watch: {
        $_uploadable_uploaderFiles: {
            handler(files = []) {
                if (this.uploadable_uploader) {
                    this.uploadable_uploading = files.length !== 0;

                    this.uploadable_uploader.upload();
                }
            }
        },

        // uploadable_uploadedFiles: {
        //     deep: true,
        //     handler(files = []) {
        //         console.log(files);

        //     }
        // }
    },

    methods: {
        onStartUpload() {
            // this.uploading = true;
        },

        onChunkUploaded({
            totalParts
        }, currentChunk) {
            // this.uploadProgress = (currentChunk / totalParts) * 100;
        },

        onUploadError(error) {
            this.stopUploading();
        },

        stopUploading() {
            // this.uploading = false;
            // this.uploadProgress = null;
            // this.this.uploadable_totalFiles = 0;
        },

        dropFiles(event) {
            this.uploadable_uploader.dropFiles(event);
        },

        dragover(event) {
            this.uploadable_uploader.dragover(event);
        },

        dragleave(event) {
            this.uploadable_uploader.dragleave(event);
        },

        removeFile(file) {
            this.uploadable_uploader.removeFile(file);
        },

        onFileUploaded({
            file,
            response
        } = {}) {
            for (const key in response.meta) {
                if (response.meta.hasOwnProperty(key)) {
                    const element = response.meta[key];

                    this.$set(file, key, element);
                }
            }

            this.stopUploading();

            this.$set(file, "uploaded", true);

            this.uploadable_uploadedFiles.push(file);

            this.uploadable_uploadedFiles = Array.from(
                new Set(this.uploadable_uploadedFiles)
            );

            this.$emit("fileUploaded", {
                file,
                response
            });
        },

        $_uploadable_UpdateUploader() {
            this.$nextTick(() => {
                this.uploadable_uploader = this.$refs[this.uploadable_uploaderRef];
            });
        },

        $_uploadable_reset() {
            this.uploadable_uploadedFiles = [];
            this.uploadable_uploading = false;
            this.$_uploadable_UpdateUploader();
        }
    },

    created() {
        this.$_uploadable_UpdateUploader();
    }
};

export default uploadable;
