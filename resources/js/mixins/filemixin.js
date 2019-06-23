import File from "../models/File";
const mapping = {
    display_name: "display_name",
    extension: "mime",
    formatted_filesize: "formatted_size"
};

const filemixin = {
    methods: {
        $_filemixin_isFileModel(obj) {
            return obj instanceof File;
        },

        $_filemixin_getDisplayName(obj, fb_key = 'file.name') {
            return this.$_filemixin_isFileModel(obj) ?
                obj[mapping.display_name] :
                _.get(obj, fb_key);
        },

        $_filemixin_getExtension(obj, fb_key = 'extension') {
            return this.$_filemixin_isFileModel(obj) ?
                obj[mapping.extension] :
                _.get(obj, fb_key);
        },

        $_filemixin_getFormattedFilesize(obj, fb_key = 'formattedFilesize') {
            return this.$_filemixin_isFileModel(obj) ?
                obj[mapping.formatted_filesize] :
                _.get(obj, fb_key);
        },
    }
}

export default filemixin;
