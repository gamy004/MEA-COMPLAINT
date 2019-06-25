<template>
  <v-layout px-2 mb-1 align-center>
    <file-icon :mime="$fileitem_mixin_fileExtension"/>
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <a
          :href="file.url"
          target="_blank"
          class="body-2 ml-2 editor__filename text-truncate"
          v-on="on"
        >{{ $fileitem_mixin_displayName }}</a>
      </template>
      <span>{{ $fileitem_mixin_displayName }}</span>
    </v-tooltip>
    <span class="body-1 ml-2 text-no-wrap">{{ $fileitem_mixin_fileFormattedFilesize }}</span>
    <v-spacer></v-spacer>
    <span v-if="$fileitem_mixin_showProcessing" class="body-2">processing</span>
    <v-progress-linear
      v-if="$fileitem_mixin_showProgress"
      class="mx-2 editor__progress"
      v-model="$fileitem_mixin_uploadPercent"
    ></v-progress-linear>
    <v-btn icon small @click="$fileitem_mixin_removeFile">
      <v-icon small>close</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
import fileItemMixin from "../mixins/file-item-mixin";
import FileIcon from "./FileIcon";

export default {
  mixins: [fileItemMixin],

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

