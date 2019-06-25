<template>
  <v-sheet elevation="1" class="d-flex" width="180" height="120">
    <v-sheet class="mt-auto d-flex file-sheet__footer py-2" color="grey lighten-3">
      <file-icon :mime="fileExtension"/>
    </v-sheet>
  </v-sheet>
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

  computed: {
    fileExtension() {
      return this.$_filemixin_getExtension(this.file);
    }
  }
};
</script>

<style lang="scss" scoped>
.file-sheet {
  &__footer {
    // border-top: 1px solid rgba(0, 0, 0, 0.5);
  }
}
</style>
