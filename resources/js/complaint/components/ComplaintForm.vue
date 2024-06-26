<template>
  <v-layout v-if="dialog" class="complaint-form__wrapper" :class="complaintFormClasses">
    <v-flex xs12>
      <v-card class="complaint-form">
        <v-toolbar card dense color="blue-grey darken-4" dark class="complaint-form__head-toolbar">
          <v-toolbar-title v-t="'complaint.index.form.title'"></v-toolbar-title>

          <transition name="fade-x-transition">
            <span v-if="savingDraft" class="ml-1 body-1">{{ $t('general.savingDraft') }}</span>
          </transition>

          <v-spacer></v-spacer>

          <v-tooltip v-if="!isMobile && fullScreenable" bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                small
                v-on="on"
                class="clickable mx-2"
                @click.prevent.stop="toggleFullScreen"
              >{{ fullScreenIcon }}</v-icon>
            </template>
            <span v-t="'complaint.index.form.fullScreen'"></span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                small
                v-on="on"
                class="clickable"
                @click.prevent.stop="closeComplaintForm"
              >close</v-icon>
            </template>
            <span v-t="'general.saveAndClose'"></span>
          </v-tooltip>
        </v-toolbar>

        <v-form>
          <v-layout>
            <v-flex xs4>
              <v-autocomplete
                class="complaint-form__input-recipient"
                v-model="form.issue_category_id"
                :items="storeCategories"
                :label="$t('complaint.index.form.category')"
                cache-items
                :loading="isFetchingFormCategory"
                full-width
                hide-details
                hide-no-data
                hide-selected
                single-line
                @focus="onFocusInputCategory"
                @change="onChange"
              ></v-autocomplete>
            </v-flex>

            <v-flex xs8>
              <v-autocomplete
                class="complaint-form__input-recipient"
                v-model="form.recipients"
                :items="storeRecipients"
                small-chips
                :label="$t('complaint.index.form.to')"
                cache-items
                :loading="isFetchingFormRecipient"
                full-width
                :hide-details="!form.errors.has('recipients')"
                hide-no-data
                hide-selected
                multiple
                single-line
                :error="form.errors.has('recipients')"
                :error-messages="form.errors.getError('recipients')"
                @focus="onFocusInputRecipient"
                @change="onChange"
              ></v-autocomplete>
            </v-flex>
          </v-layout>

          <v-divider></v-divider>

          <v-text-field
            :label="$t('complaint.index.form.subject')"
            v-model="form.subject"
            single-line
            full-width
            hide-details
            @input="onChange"
          ></v-text-field>

          <v-divider></v-divider>

          <custom-editor
            v-model="formDescription"
            :show-toolbar.sync="showFormatting"
            :full-screen="fullScreen"
            @editor:drop="dropFiles"
            @editor:dragover="dragover"
            @editor:dragleave="dragleave"
            @editor:input="onChange"
          >
            <!-- file list here -->
            <file-list
              class="editor__filelist editor__filelist--front px-2"
              v-if="uploadable_uploader"
              :files="complaintAttachments"
              :uploader="uploadable_uploader"
              @remove="onFileRemoved"
            />

            <file-list
              v-if="uploadable_uploader"
              class="editor__filelist editor__filelist--back px-2"
              :files="$_uploadable_uploaderFiles"
              :uploader="uploadable_uploader"
            />
          </custom-editor>

          <v-layout row wrap class="complaint-form__footer">
            <v-flex xs12>
              <v-layout align-center>
                <custom-toolbar :items="customToolbarItems" class="elevation-0">
                  <template v-slot:left>
                    <v-btn
                      small
                      color="primary"
                      class="mr-2 complaint-form__btn-submit"
                      @click.prevent.stop="onSubmit"
                      :loading="form.isSubmitting"
                      :disabled="uploadable_uploading"
                    >{{ submitBtnText }}</v-btn>

                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-icon
                          medium
                          v-on="on"
                          class="clickable mr-2"
                          @click.prevent.stop="toggleshowFormatting"
                        >text_format</v-icon>
                      </template>
                      <span v-t="'general.formatOptions'"></span>
                    </v-tooltip>

                    <uploader
                      :ref="uploadable_uploaderRef"
                      :end-point="endpoint"
                      :multipart="multipart"
                      :show-errors="false"
                      :max-uploads="999"
                      multiple
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
                          <span v-t="'general.uploadFile'"></span>
                        </v-tooltip>
                      </template>
                    </uploader>

                    <v-spacer></v-spacer>

                    <!-- <v-tooltip top v-if="form.id && form.draft">
                      <template v-slot:activator="{ on }">
                        <v-btn icon>
                          <v-icon v-on="on" class="clickable">delete</v-icon>
                        </v-btn>
                      </template>
                      <span v-t="'general.discardDraft'"></span>
                    </v-tooltip>-->
                  </template>
                </custom-toolbar>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card>
    </v-flex>

    <!-- <warning-dialog :dialogable-visible.sync="warning" @click:accept="onDiscard">
      <template v-slot:header>
        <span v-t="'complaint.index.form.warningDiscard.title'"></span>
      </template>

      <template v-slot:message>
        <span v-t="'complaint.index.form.warningDiscard.desc'"></span>
      </template>
    </warning-dialog>-->

    <warning-dialog
      :dialogable-visible.sync="warningSubmit"
      @click:accept="onSubmit(true)"
      :cancel-text="$t('general.no')"
      :accept-text="$t('general.yes')"
    >
      <template v-slot:header>
        <span v-t="'complaint.index.form.warningSubmit.title'"></span>
      </template>

      <template v-slot:message>
        <span v-t="'complaint.index.form.warningSubmit.desc'"></span>
      </template>
    </warning-dialog>

    <message-alert
      key="alertComplaintForm"
      :alertable-visible.sync="alertable_alert"
      :alertable-type="alertable_type"
      :alertable-messages="alertable_messages"
      :alertable-props="alertable_props"
    ></message-alert>
  </v-layout>
</template>

<script>
import CustomEditor from "../../components/CustomEditor";
import WarningDialog from "../../components/WarningDialog";
import MessageAlert from "../../components/MessageAlert";
import uploadable from "../../mixins/uploadable";
import CustomToolbar from "../../components/CustomToolbar";
import FileList from "../../components/FileList";
import { toggle, mapTextValue } from "../../helpers";
import { vuex } from "../../mixins/vuexable";
import alertable from "../../mixins/alertable";
import managable from "../../mixins/managable";

export default {
  props: {
    fullScreenable: {
      type: Boolean,
      default: true
    },

    isFullScreen: {
      type: Boolean,
      default: false
    }
  },

  mixins: [alertable, managable, uploadable],

  components: {
    CustomEditor,
    WarningDialog,
    MessageAlert,
    CustomToolbar,
    FileList
  },

  data() {
    return {
      form: vuex.models.FORM.make({
        subject: "",
        description: "",
        draft: 0,
        issue_category_id: null,
        recipients: [],
        uploaded_files: []
      }),
      uploadable_uploaderRef: "complaintForm__uploadable_uploader",
      customToolbarItems: [],
      showFormatting: false,
      savingDraft: false,
      fullScreen: this.isFullScreen,
      warning: false,
      warningSubmit: false,
      alertable_messages: {
        undo: this.$t("alertMessages.undo"),
        restore_error: {
          text: this.$t("alertMessages.undo_error"),
          type: "error"
        },
        error: this.$t("alertMessages.complaintForm.submit_error"),

        delete_file_success: {
          text: this.$t("alertMessages.file.delete_success"),
          actions: [
            {
              text: this.$t("general.undo"),
              handler: async ({ file }) => {
                await this.onFileRestore(file);
                this.$_alertable_alert("undo");
              }
            }
          ]
        },
        delete_file_error: {
          text: this.$t("alertMessages.file.delete_error"),
          type: "error"
        },
        delete_uploadfile_success: {
          text: this.$t("alertMessages.uploadFile.delete_success"),
          type: "success"
        }
      }
    };
  },

  watch: {
    dialog(v) {
      if (v) {
        this.$_uploadable_UpdateUploader();
      }
    },

    isMobile: {
      immediate: true,
      handler(v) {
        if (this.fullScreenable) {
          this.fullScreen = v;
        }
      }
    },

    activeComplaint: {
      immediate: true,
      handler(complaint) {
        if (complaint) {
          this.form = vuex.models.FORM.make({
            ...complaint.data,
            uploaded_files: []
          });
        }
      }
    },

    $_uploadable_metaData: {
      deep: true,
      handler(uploadable_metaData = []) {
        this.form.set("uploaded_files", uploadable_metaData);
      }
    }
  },

  computed: {
    ...vuex.mapGetters(["isMobile"]),

    ...vuex.mapWaitingGetters({
      isFetchingFormRecipient: "fetching form recipients",
      isFetchingFormCategory: "fetching form categories"
    }),

    dialog: {
      get() {
        return this.$_vuexable_getState("dialog", vuex.modules.ISSUE);
      },

      set(value) {
        this.$_vuexable_setState(
          {
            key: "dialog",
            value
          },
          vuex.modules.ISSUE
        );

        this.$_vuexable_setEdit(null, vuex.modules.ISSUE);
      }
    },

    activeComplaint() {
      return this.$_vuexable_getEdit(vuex.modules.ISSUE);
    },

    activeComplaintFiles() {
      return this.activeComplaint
        ? this.$_vuexable_getByKeys(
            this.activeComplaint.attachments,
            vuex.modules.FILE
          )
        : [];
    },

    complaintAttachments() {
      return [...this.activeComplaintFiles, ...this.uploadable_uploadedFiles];
    },

    formDescription: {
      get(v) {
        return this.form.description;
      },

      set(v) {
        if (this.form) {
          this.form.set("description", v);
        }
      }
    },

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

    fullScreenIcon() {
      return this.fullScreen ? "fullscreen_exit" : "fullscreen";
    },

    complaintFormClasses() {
      return {
        "is-fullscreen": this.fullScreen || this.isMobile
      };
    },

    submitBtnText() {
      let action = "send";

      if (this.managableEdit && !this.form.draft) {
        action = "update";
      }

      return this.$t(`general.${action}`);
    }
  },

  methods: {
    ...vuex.mapWaitingActions(vuex.modules.ISSUE, [vuex.actions.ISSUE.FETCH]),

    ...vuex.mapWaitingActions(vuex.modules.GROUP, {
      [vuex.actions.GROUP.FETCH]: "fetching form recipients"
    }),

    ...vuex.mapWaitingActions(vuex.modules.ISSUE_CATEGORY, {
      [vuex.actions.ISSUE_CATEGORY.FETCH]: "fetching form categories"
    }),

    ...vuex.mapWaitingActions(vuex.modules.FILE, {
      [vuex.actions.FILE.RESTORE]: "restoring file"
    }),

    toggleshowFormatting() {
      toggle(this, "showFormatting");

      return this;
    },
    toggleFullScreen() {
      toggle(this, "fullScreen");

      return this;
    },

    async closeComplaintForm() {
      if ((!this.form.id && this.form.isChanged) || this.form.draft) {
        await this.saveDraft();

        // await this[vuex.actions.ISSUE.FETCH]();
      }

      this.dialog = false;

      this.form = null;

      // if (!this.form.id && this.form.isChanged) {
      //   this.warning = true;

      //   return;
      // } else {
      //   this.dialog = false;
      //   this.form = null;
      // }
    },

    onDiscard() {
      this.warning = false;
      this.dialog = false;
      this.form = null;
    },

    onFocusInputRecipient(event) {
      this.form.errors.clear("recipients");
      this.fetchRecipient();
    },

    async fetchRecipient() {
      let response,
        select = ["groups:id,name"],
        sort = ["name"];

      try {
        response = await this[vuex.actions.GROUP.FETCH]({
          select,
          sort
        });
      } catch (error) {}
    },

    onFocusInputCategory() {
      this.fetchCategory();
    },

    onChange() {
      if (!this.form || !this.form.draft) return;

      window.onbeforeunload = () => {
        return "to remind that you made some change";
      };
    },

    clearOnChange() {
      if (window.onbeforeunload) {
        window.onbeforeunload = null;
      }
    },

    async saveDraft() {
      let response;
      if (this.form) {
        if (this.form.id && !this.form.draft) return;

        this.savingDraft = true;

        try {
          this.form.set("draft", 1);

          ({ response } = await this.submitComplaintForm());
        } catch (error) {
          throw error;
        } finally {
          this.savingDraft = false;
        }

        this.$emit("saveDraft");

        const { issues: issue } = response.data;

        this.$_vuexable_setEdit(issue.id, vuex.modules.ISSUE);

        return response;
      }
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
    },

    async onSubmit(force = false) {
      if (force || this.validateSubjectAndDescription()) {
        const isSavedFromDraft = this.form.draft;

        this.form.set("draft", 0);

        await this.submitComplaintForm();

        if (isSavedFromDraft) {
          this.$emit("submitDraft");

          // await this[vuex.actions.ISSUE.FETCH]();
        } else {
          this.$emit(`${this.$_managable_action}Success`);
        }

        this.dialog = false;
        // this.$_alertable_alert(`${this.$_managable_action}_success`);

        // this.$emit("updated");
      }
    },

    async submitComplaintForm() {
      const { form, $_uploadable_metaData = [] } = this;

      if ($_uploadable_metaData.length) {
        form.set("uploaded_files", $_uploadable_metaData);
      }

      let v;

      try {
        v = await this.$_managable_submitForm(form, [
          "id",
          "subject",
          "description",
          "draft",
          "issue_category_id",
          "recipients",
          "attachments",
          "uploaded_files"
        ]);
      } catch (error) {
        this.$_alertable_alert("error");

        throw error;
      }

      this.$_uploadable_reset();
      this.clearOnChange();
      this.resetComplaintForm();

      return v;
    },

    validateSubjectAndDescription() {
      const subject = !_.isNull(this.form.subject) ? this.form.subject : "";
      const description = !_.isNull(this.form.description)
        ? this.form.description
        : "";

      if (!subject.length && !description.length) {
        this.warningSubmit = true;
      }

      return !this.warningSubmit;
    },

    resetComplaintForm() {
      this.form = vuex.models.FORM.make({
        subject: "",
        description: "",
        draft: 0,
        issue_category_id: null,
        recipients: [],
        uploaded_files: []
      });
    },

    async onFileRemoved(file, index, files) {
      if (file.id) {
        try {
          // await this.$_vuexable_dispatch(
          //   vuex.actions.FILE.DELETE,
          //   vuex.modules.FILE,
          //   file
          // );
          const { form } = this;
          const attachments = [...form.attachments];
          const fileIndex = attachments.indexOf(file.id);

          attachments.splice(fileIndex, 1);

          form.set("attachments", attachments);

          this.activeComplaint.update("attachments", attachments);

          form.set("includes", []);

          await this.$_managable_submitForm(form, [
            "id",
            "attachments",
            "includes"
          ]);

          this.$_alertable_alert("delete_file_success", { file });
        } catch (error) {
          this.$_alertable_alert("delete_file_error");
          throw error;
        }
      } else {
        const uploadedFileIndex = _.findIndex(this.uploadable_uploadedFiles, [
          "upload_path",
          file.upload_path
        ]);

        this.uploadable_uploadedFiles.splice(uploadedFileIndex, 1);

        this.$_alertable_alert("delete_uploadfile_success");
      }
    },

    async onFileRestore(file) {
      try {
        await this[vuex.actions.FILE.RESTORE](file);
      } catch (error) {
        this.$_alertable_alert("restore_error");
        throw error;
      }

      try {
        const { form } = this;

        const attachments = [...form.attachments, file.id];

        form.set("attachments", attachments);

        this.activeComplaint.update("attachments", attachments);

        form.set("includes", []);

        await this.$_managable_submitForm(form, [
          "id",
          "attachments",
          "includes"
        ]);
      } catch (error) {
        this.$_alertable_alert("error");
        throw error;
      }
    }
  }
};
</script>

<style lang="scss">
.complaint-form {
  overflow: hidden;

  &__wrapper {
    width: 625px;
    height: auto !important;
    position: fixed;
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
      width: 20%;
    }

    &__filename {
      max-width: 45%;
    }

    &__filelist {
      // max-height: 10vw;
      // overflow: auto;
      width: 100%;
      background: white;

      &--front {
        z-index: 2;
      }

      &--back {
        z-index: 1;
      }
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
        }

        .v-select {
          __selections {
            max-height: 100px;
            overflow: auto;
          }
        }
      }

      .editor {
        &__filelist {
          // max-height: 15vh !important;
          align-items: flex-end;
          // position: absolute;
          // bottom: 50px;
        }
      }
    }
  }

  &__btn-submit {
    margin-top: 4px !important;
  }
}
</style>
