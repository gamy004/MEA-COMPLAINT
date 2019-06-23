<template>
  <v-layout px-2 mb-1 align-center>
    <file-icon :mime="fileExtension"/>
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
    <span class="body-1 ml-2 text-no-wrap">{{ fileFormattedFilesize }}</span>
    <v-spacer></v-spacer>
    <span v-if="showProcessing" class="body-2">processing</span>
    <v-progress-linear v-if="showProgress" class="mx-2 editor__progress" v-model="uploadPercent"></v-progress-linear>
    <v-btn icon small @click="remove">
      <v-icon small>close</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
import filemixin from "../mixins/filemixin";
import FileIcon from "./FileIcon";

export default {
  mixins: [filemixin],

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
    fileExtension() {
      return this.$_filemixin_getExtension(this.file);
    },

    fileFormattedFilesize() {
      return this.$_filemixin_getFormattedFilesize(this.file);
    },

    displayName() {
      return this.$_filemixin_getDisplayName(this.file);
    },

    showProgress() {
      return (
        !this.$_filemixin_isFileModel(this.file) &&
        !this.file.uploaded &&
        this.uploadPercent < 100
      );
    },

    showProcessing() {
      return (
        !this.$_filemixin_isFileModel(this.file) &&
        !this.file.uploaded &&
        this.uploadPercent >= 100
      );
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

