<template>
  <v-layout v-if="dialog" class="complaint-form__wrapper" :class="complaintFormClasses">
    <v-flex xs12>
      <v-card class="complaint-form">
        <v-toolbar card dense color="blue-grey darken-2" dark class="complaint-form__head-toolbar">
          <v-icon>arrow_back</v-icon>
          <v-toolbar-title>Complaint</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip v-if="!isMobile" bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                small
                v-on="on"
                class="clickable mx-2"
                @click="toggleFullScreen"
              >{{ fullScreenIcon }}</v-icon>
            </template>
            <span>Full-screen</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon small v-on="on" class="clickable">close</v-icon>
            </template>
            <span>Save &amp; close</span>
          </v-tooltip>
        </v-toolbar>
        <v-form>
          <v-layout>
            <v-flex xs4>
              <v-autocomplete
                class="complaint-form__input-recipient"
                v-model="form.issue_category_id"
                :items="storeCategories"
                label="Category"
                cache-items
                :loading="isFetchingFormCategory"
                full-width
                hide-details
                hide-no-data
                hide-selected
                single-line
                @focus="onFocusInputCategory"
              ></v-autocomplete>
            </v-flex>

            <v-flex xs8>
              <v-autocomplete
                class="complaint-form__input-recipient"
                v-model="form.recipients"
                :items="storeRecipients"
                small-chips
                label="To"
                cache-items
                :loading="isFetchingFormRecipient"
                full-width
                hide-details
                hide-no-data
                hide-selected
                multiple
                single-line
                @focus="onFocusInputRecipient"
              ></v-autocomplete>
            </v-flex>
          </v-layout>

          <v-divider></v-divider>

          <v-text-field label="Subject" v-model="form.subject" single-line full-width hide-details></v-text-field>
          <v-divider></v-divider>
          <!-- <v-textarea
        v-model="title"
        class="complaint__description"
        label="Message"
        full-width
        single-line
        no-resize
          ></v-textarea>-->
          <custom-editor
            v-model="form.description"
            :show-toolbar.sync="showFormatting"
            :full-screen="fullScreen"
            @editor:drop="dropFiles"
            @editor:dragover="dragover"
            @editor:dragleave="dragleave"
          >
            <!-- file list here -->
            <file-list
              class="editor__filelist px-2"
              v-if="uploader"
              :files="uploaderFiles"
              :uploader="uploader"
            />

            <file-list
              class="editor__filelist px-2"
              v-if="uploader"
              :files="uploadedFiles"
              :uploader="uploader"
            />
          </custom-editor>

          <!-- <v-layout v-if="uploader" row wrap class="editor__filelist">
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
          </v-layout>-->

          <v-layout row wrap class="complaint-form__footer">
            <v-flex xs12>
              <v-layout align-center>
                <custom-toolbar :items="customToolbarItems" class="bg-transparent elevation-0">
                  <template v-slot:left>
                    <v-btn small color="primary" class="mr-2 complaint-form__btn-submit">send</v-btn>

                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-icon
                          medium
                          v-on="on"
                          class="clickable mr-2"
                          @click="toggleshowFormatting"
                        >text_format</v-icon>
                      </template>
                      <span>Formatting options</span>
                    </v-tooltip>

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

                    <v-spacer></v-spacer>

                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on" class="clickable">delete</v-icon>
                      </template>
                      <span>Discard draft</span>
                    </v-tooltip>
                  </template>
                </custom-toolbar>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import CustomEditor from "../../components/CustomEditor";
import uploadable from "../../mixins/uploadable";
import CustomToolbar from "../../components/CustomToolbar";
// import FileIcon from "../../components/FileIcon";
import FileList from "../../components/FileList";
import { toggle, mapTextValue } from "../../helpers";
import { vuex, vuexable } from "../../mixins/vuexable";

export default {
  mixins: [uploadable, vuexable],

  components: {
    CustomEditor,
    CustomToolbar,
    FileList
  },

  data() {
    return {
      dialog: true,
      form: vuex.models.FORM.make({
        subject: "",
        description: "",
        issue_category_id: null,
        recipients: []
      }),
      // selected: ["Trevor Handsen"],
      uploader: null,
      uploadedFiles: [],
      customToolbarItems: [],
      showFormatting: false,
      fullScreen: false,
      items: ["Trevor Handsen", "Alex Nelson"],
      title:
        "Hi,\nI just wanted to check in and see if you had any plans the upcoming weekend. We are thinking of heading up to Napa"
    };
  },

  watch: {
    uploaderFiles: {
      deep: true,
      handler(files = []) {
        if (this.uploader && !this.uploader.isUploadDisabled) {
          this.uploader.upload();
        }
      }
    }
  },

  computed: {
    ...vuex.mapGetters(["isMobile"]),

    ...vuex.mapWaitingGetters({
      isFetchingFormRecipient: "fetching form recipients",
      isFetchingFormCategory: "fetching form categories"
    }),

    storeCategories() {
      const categories = this.$_vuexable_getter(
        vuex.getters.SORTED_VALUES,
        vuex.modules.ISSUE_CATEGORY
      );

      return mapTextValue(categories, "category", "id");
    },

    storeRecipients() {
      const recipients = this.$_vuexable_getter(
        vuex.getters.SORTED_VALUES,
        vuex.modules.GROUP
      );

      return mapTextValue(recipients, "name", "id");
    },

    uploaderFiles() {
      return this.uploader
        ? this.uploader.getFiles.filter(file => {
            return !file.uploaded;
          })
        : [];
    },
    fullScreenIcon() {
      return this.fullScreen ? "fullscreen_exit" : "fullscreen";
    },
    complaintFormClasses() {
      return {
        "is-fullscreen": this.fullScreen || this.isMobile
      };
    }
  },

  methods: {
    ...vuex.mapWaitingActions(vuex.modules.GROUP, {
      [vuex.actions.GROUP.FETCH]: "fetching form recipients"
    }),

    ...vuex.mapWaitingActions(vuex.modules.ISSUE_CATEGORY, {
      [vuex.actions.ISSUE_CATEGORY.FETCH]: "fetching form categories"
    }),

    removeFile(file) {
      this.uploader.removeFile(file);
    },

    onFileUploaded({ file, response } = {}) {
      const { url = "" } = response.meta;

      for (const key in response.meta) {
        if (response.meta.hasOwnProperty(key)) {
          const element = response.meta[key];

          this.$set(file, key, element);
        }
      }

      this.$set(file, "uploaded", true);

      this.uploadedFiles.push(file);
      // if (url.length) {
      //     this.sync("avatar", url);
      // }

      // this.stopUploading();

      // this.$emit("fileUploaded", {
      //   file,
      //   response
      // });
    },

    dropFiles(event) {
      this.uploader.dropFiles(event);
    },

    dragover(event) {
      this.uploader.dragover(event);
    },

    dragleave(event) {
      this.uploader.dragleave(event);
    },

    toggleshowFormatting() {
      toggle(this, "showFormatting");

      return this;
    },
    toggleFullScreen() {
      toggle(this, "fullScreen");

      return this;
    },

    onFocusInputRecipient(event) {
      this.fetchRecipient();
    },

    async fetchRecipient() {
      let response,
        filters = {},
        select = ["groups:id,name"],
        sort = ["name"];

      try {
        response = await this[vuex.actions.GROUP.FETCH]({
          filters,
          select,
          sort
        });
      } catch (error) {}
    },

    onFocusInputCategory() {
      this.fetchCategory();
    },

    async fetchCategory() {
      let response,
        filters = {},
        select = ["issue_categories:id,category"],
        sort = ["category"];

      try {
        response = await this[vuex.actions.ISSUE_CATEGORY.FETCH]({
          filters,
          select,
          sort
        });
      } catch (error) {}
    }
  },

  created() {
    this.$nextTick(() => {
      this.uploader = this.$refs.uploader;
    });
  }
};
</script>

<style lang="scss">
.complaint-form {
  &__wrapper {
    width: 625px;
    height: auto !important;
    position: absolute;
    right: 15px;
    bottom: 0;
    z-index: 5;
  }

  .mce-content-body {
    min-height: 266px;
    height: 30vw;
    overflow: auto;
    padding: 0 8px;
  }

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

  .v-toolbar {
    border-bottom: none !important;

    &__content {
      padding: 8px 24px;
    }
  }

  &__head-toolbar {
    .v-toolbar {
      &__content {
        height: 40px;
      }
    }
  }

  &__wrapper {
    &.is-fullscreen {
      background-color: rgba(0, 0, 0, 0.5);
      height: 100%;
      left: 0;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 4;

      .complaint-form {
        position: fixed;
        top: 0 !important;
        left: 0 !important;
        bottom: 0 !important;
        right: 0 !important;
        width: 80vw !important;
        height: 88vh !important;
        margin: auto;

        &__footer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding-bottom: 8px;
        }
      }

      .editor {
        &__filelist {
          max-height: 15vh !important;
        }
      }
    }
  }

  &__btn-submit {
    margin-top: 4px !important;
  }
}
</style>


