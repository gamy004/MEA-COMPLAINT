<template>
  <v-layout row wrap class="filelist">
    <template v-for="(file, index) in files">
      <v-flex xs12 :key="`${$_filemixin_getDisplayName(file)}-${index}`">
        <file-list-item :file="file" @remove="removeFile(file, index)"/>
      </v-flex>
    </template>
  </v-layout>
</template>

<script>
import FileListItem from "./FileListItem";
import filemixin from "../mixins/filemixin";
import { vuex, vuexable } from "../mixins/vuexable";

export default {
  mixins: [filemixin, vuexable],

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

      if (this.$_filemixin_isFileModel(file) || uploaded) {
        // send request to delete temp or delete file in db
        files.splice(index, 1);
        this.$emit("update:files", [...files]);
        this.$emit("remove", file, files);
      } else {
        this.uploader.removeFile(file);
      }
    }
  }
};
</script>

