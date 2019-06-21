<template>
  <v-layout row wrap class="filelist">
    <template v-for="(file, index) in files">
      <v-flex xs12 :key="`${file.file.name}-${index}`">
        <file-list-item :file="file" @remove="removeFile(file, index)"/>
      </v-flex>
    </template>
  </v-layout>
</template>

<script>
import FileListItem from "./FileListItem";

export default {
  props: {
    uploader: {
      type: Object,
      required: true
    },
    files: {
      type: Array,
      default: () => []
    }
  },

  components: {
    FileListItem
  },

  methods: {
    removeFile(file, index) {
      let { uploaded = false } = file,
        { files } = this;

      if (uploaded) {
        files.splice(index, 1);

        this.$emit("update:files", [...files]);
      } else {
        this.uploader.removeFile(file);
      }
    }
  }
};
</script>

