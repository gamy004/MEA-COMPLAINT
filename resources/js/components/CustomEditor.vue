<template>
  <div
    class="editor-container"
    @drop.stop.prevent="dropFiles"
    @dragover.stop.prevent="dragover"
    @dragleave="dragleave"
  >
    <!-- <editor api-key="2p4wbftum5afmu5eugdcvsugrwvv6ivinukanpci7rgi9oru" v-model="data"></editor> -->
    <editor
      api-key="2p4wbftum5afmu5eugdcvsugrwvv6ivinukanpci7rgi9oru"
      v-model="data"
      :init="config"
    ></editor>

    <!-- file list here -->
    <v-layout v-if="uploader" row wrap class="editor__filelist">
      <template v-for="(uploadfile, index) in uploaderFiles">
        <v-flex xs12 :key="`fileupload-${index}`">
          <v-layout px-2 mb-1 align-center>
            <file-icon :mime="uploadfile.extension"/>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <a
                  href="#"
                  class="body-2 ml-2 editor__filename text-truncate"
                  v-on="on"
                >{{ uploadfile.file.name }}</a>
              </template>
              <span>{{ uploadfile.file.name }}</span>
            </v-tooltip>
            <span class="body-1 ml-2 text-no-wrap">{{ uploadfile.formattedFilesize }}</span>
            <v-spacer></v-spacer>
            <v-progress-linear
              class="mx-2 editor__progress"
              v-model="uploadfile.multipartUploadPercent"
            ></v-progress-linear>
            <v-btn icon small @click="removeFile(uploadfile)">
              <v-icon small>close</v-icon>
            </v-btn>
          </v-layout>
        </v-flex>
      </template>

      <template v-for="(uploadedfile, index) in uploadedFiles">
        <v-flex xs12 :key="`fileuploaded-${index}`">
          <v-layout px-2 mb-1 align-center>
            <file-icon :mime="uploadedfile.extension"/>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <a
                  :href="uploadedfile.url"
                  :download="uploadedfile.file.name"
                  class="body-2 ml-2 editor__filename text-truncate"
                  v-on="on"
                >{{ uploadedfile.file.name }}</a>
              </template>
              <span>{{ uploadedfile.file.name }}</span>
            </v-tooltip>
            <span class="body-1 ml-2 text-no-wrap">{{ uploadedfile.formattedFilesize }}</span>
            <v-spacer></v-spacer>
            <v-btn icon small @click="removeFile(uploadedfile)">
              <v-icon small>close</v-icon>
            </v-btn>
          </v-layout>
        </v-flex>
      </template>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <div class="custom-toolbar"></div>
      </v-flex>

      <v-flex xs12>
        <v-layout align-center>
          <v-btn small flat color="primary">send</v-btn>

          <uploader
            ref="uploader"
            :end-point="endpoint"
            :multipart="multipart"
            :multiple="true"
            :show-errors="false"
            :max-uploads="999"
            @startUpload="onStartUpload"
            @chunkUploaded="onChunkUploaded"
            @fileUploaded="onFileUploaded"
            @error="onUploadError"
          >
            <template slot="browse-btn">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">attach_file</v-icon>
                </template>
                <span>Upload files</span>
              </v-tooltip>
            </template>
          </uploader>

          <custom-toolbar :items="customToolbarItems"/>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
// import tinymce from "tinymce/tinymce";

// A theme is also required
// import "tinymce/themes/silver";

// // Any plugins you want to use has to be imported
// import 'tinymce/plugins/paste';
// import 'tinymce/plugins/link';
import uploadable from "../mixins/uploadable";
import Editor from "@tinymce/tinymce-vue";
import CustomToolbar from "./CustomToolbar";
import FileIcon from "./FileIcon";

export default {
  mixins: [uploadable],

  components: {
    Editor,
    CustomToolbar,
    FileIcon
  },

  data() {
    return {
      data: "<h1>Hello World!!</h1>",
      uploader: null,
      uploadedFiles: [],
      customToolbarItems: [
        // {
        //   icon: "attach_file",
        //   text: "Upload files",
        //   tooltipAttr: { top: true }
        // }
      ],
      config: {
        paste_data_images: true,
        inline: true,
        resize: false,
        fixed_toolbar_container: ".custom-toolbar",
        menubar: false,
        // toolbar: "undo redo | styleselect | bold italic | outdent indent",
        toolbar_drawer: "sliding"
      }
    };
  },

  watch: {
    uploaderFiles: {
      deep: true,
      handler(files = []) {
        if (!this.uploader.isUploadDisabled) {
          this.uploader.upload();
        }
      }
    }
  },

  computed: {
    uploaderFiles() {
      return this.uploader ? this.uploader.getFiles : [];
    }
  },

  methods: {
    onClickUploader() {
      console.log(this.$refs.uploader);
    },

    removeFile(file) {
      this.uploader.removeFile(file);
    },

    dropFiles(event) {
      this.uploader.dropFiles(event);
    },

    dragover(event) {
      this.uploader.dragover(event);
      // console.log(event);
    },

    dragleave(event) {
      this.uploader.dragleave(event);
      // console.log(event);
    },

    onFileUploaded({ file, response } = {}) {
      const { url = "" } = response.meta;

      for (const key in response.meta) {
        if (response.meta.hasOwnProperty(key)) {
          const element = response.meta[key];

          this.$set(file, key, element);
        }
      }

      this.uploadedFiles.push(file);
      // if (url.length) {
      //     this.sync("avatar", url);
      // }

      // this.stopUploading();

      // this.$emit("fileUploaded", {
      //   file,
      //   response
      // });
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.uploader = this.$refs.uploader;
    });
  }
};
</script>

<style lang="scss">
.editor-container {
  .vuejs-uploader {
    &__btn--clear,
    &__btn--upload,
    &__queue {
      display: none;
    }
  }

  .editor {
    &__progress {
      width: 25%;
    }

    &__filename {
      max-width: 50%;
    }

    &__filelist {
      max-height: 30vw;
      overflow: auto;
    }
  }
}
</style>
