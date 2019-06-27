<template>
  <v-hover>
    <v-sheet class="file-sheet" elevation="2" width="180" height="120" slot-scope="{ hover }">
      <v-layout v-if="!hover" justify-center fill-height>
        <file-icon :mime="$fileitem_mixin_fileExtension" class="mr-1 mb-3"/>
      </v-layout>

      <v-sheet v-if="hover" class="d-flex justify-start file-sheet__overlay fill-height py-2 px-2">
        <v-layout align-start>
          <file-icon :mime="$fileitem_mixin_fileExtension" class="mr-1"/>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-layout column nowrap v-on="on">
                <div class="body-2 text-truncate pt-1">{{ $fileitem_mixin_displayName }}</div>
                <div class="caption text-no-wrap">{{ $fileitem_mixin_fileFormattedFilesize }}</div>
              </v-layout>
            </template>
            <span v-text="$fileitem_mixin_displayName"></span>
          </v-tooltip>
        </v-layout>

        <v-layout pl-3 align-end>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" tag="a" target="_blank" icon dark :href="file.url">
                <v-icon color="blue-grey darken-2">cloud_download</v-icon>
              </v-btn>
            </template>
            <span>Download</span>
          </v-tooltip>
        </v-layout>
      </v-sheet>

      <v-sheet
        v-else
        class="mt-auto d-flex align-center justify-start file-sheet__footer py-2 px-2"
        color="grey lighten-3"
      >
        <!-- <file-icon :mime="$fileitem_mixin_fileExtension" class="mr-1"/> -->
        <div class="body-2 text-truncate">{{ $fileitem_mixin_displayName }}</div>
      </v-sheet>
    </v-sheet>
  </v-hover>
</template>

<script>
import fileItemMixin from "../mixins/file-item-mixin";
import FileIcon from "./FileIcon";

export default {
  mixins: [fileItemMixin],

  components: {
    FileIcon
  }
};
</script>

<style lang="scss" scoped>
.file-sheet {
  margin-bottom: 1rem;

  &:not(:last-child) {
    margin-right: 1rem;
  }

  &__overlay {
    flex-direction: column;
    // .file-sheet {
    //   &__filename {
    //     overflow: hidden;
    //     display: -webkit-box;
    //     -webkit-line-clamp: 3;
    //     -webkit-box-orient: vertical;
    //   }
    // }
  }

  &__footer {
    bottom: 0;
    position: absolute;
    width: 100%;
  }
}
</style>
