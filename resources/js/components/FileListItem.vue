<template>
    <v-layout px-2 mb-1 align-center>
        <file-icon :mime="file.extension"/>
        <v-tooltip top>
            <template v-slot:activator="{ on }">
                <a
                    :href="file.url"
                    class="body-2 ml-2 editor__filename text-truncate"
                    v-on="on"
                >{{ displayName }}</a>
            </template>
            <span>{{ displayName }}</span>
        </v-tooltip>
        <span class="body-1 ml-2 text-no-wrap">{{ file.formattedFilesize }}</span>
        <v-spacer></v-spacer>
        <span v-if="!file.uploaded && uploadPercent >= 100" class="body-2">processing</span>
        <v-progress-linear
            v-if="!file.uploaded"
            class="mx-2 editor__progress"
            v-model="uploadPercent"
        ></v-progress-linear>
        <v-btn icon small @click="remove">
            <v-icon small>close</v-icon>
        </v-btn>
    </v-layout>
</template>

<script>
    import FileIcon from "./FileIcon";

    export default {
        props: {
            file: {
                type: Object,
                required: true
            }
        },
        components: {
            FileIcon
        },
        methods: {
            remove() {
                this.$emit("remove", this.file);
            }
        },

        computed: {
            displayName() {
                return this.file.file.name;
            },
            uploadPercent() {
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
</script>

