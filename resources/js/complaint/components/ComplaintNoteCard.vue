<template>
  <v-layout>
    <v-flex xs12>
      <v-card flat light class="complaint-note-card" :class="noteClasses">
        <v-progress-linear
          v-if="!displayInformation && $_issue_note_item_mixin_isFetchingEditIssueNote"
          key="loadingComplaintEditNotes"
          :indeterminate="true"
          color="info"
        ></v-progress-linear>

        <v-card-title primary-title>
          <v-layout align-center>
            <div>
              <span
                v-if="displayInformation"
                class="body-2"
              >Remark by: {{ $_issue_note_item_mixin_noteCreator ? $_issue_note_item_mixin_noteCreator.name : "Admin" }}</span>

              <v-btn
                icon
                v-if="$_issue_note_item_mixin_noteItem && !displayInformation"
                small
                @click.prevent.stop="onCloseEdit"
              >
                <v-icon small>arrow_back</v-icon>
              </v-btn>

              <span
                v-if="!displayInformation"
                class="body-2"
              >To: {{ $_issue_note_item_mixin_complaintIssuer ? $_issue_note_item_mixin_complaintIssuer.name : "Admin" }}</span>

              <!-- <v-btn
                icon
                v-if="displayInformation && $_issue_note_item_mixin_noteEditable"
                class="complaint-detail-card__edit-icon"
                small
                @click.prevent.stop="onEdit"
              >
                <v-icon small>edit</v-icon>
              </v-btn>-->
            </div>

            <v-spacer />

            <v-layout v-if="displayInformation" align-center justify-end no-wrap>
              <v-icon
                v-if="$_issue_note_item_mixin_hasAttachments"
                small
                class="mr-1 complaint-detail__attachment-icon"
              >attachment</v-icon>

              <span
                v-if="$_issue_note_item_mixin_noteItem"
                class="body-2"
              >{{ $_issue_note_item_mixin_noteItem.longUpdatedAt }}</span>

              <more-vert-menu
                v-if="$_issue_note_item_mixin_noteEditable"
                :items="menuItems"
                class="complaint-note-card__action-menu"
              />
            </v-layout>
          </v-layout>
        </v-card-title>

        <v-card-text v-if="displayInformation && $_issue_note_item_mixin_noteItem" class="pt-0">
          <v-sheet v-html="$_issue_note_item_mixin_noteItem.description" />
        </v-card-text>

        <v-divider
          v-if="displayInformation && $_issue_note_item_mixin_hasAttachments"
          class="mx-3 mb-3"
        ></v-divider>

        <v-card-text
          v-if="displayInformation && $_issue_note_item_mixin_hasAttachments"
          class="pt-0"
        >
          <v-subheader class="body-2 px-0">Attachments</v-subheader>

          <v-layout row wrap>
            <template
              v-for="(attachment, attachmentIndex) in $_issue_note_item_mixin_noteAttachments"
            >
              <file-sheet-item
                :file="attachment"
                :key="`complaintNoteAttachment-${attachmentIndex}`"
              />
            </template>
          </v-layout>
        </v-card-text>

        <v-card-text v-if="!displayInformation" class="pt-0 mb-3">
          <custom-editor
            v-model="formDescription"
            :show-toolbar.sync="showFormatting"
            :full-screen="false"
            :min-height="150"
            :max-height="350"
            @editor:drop="dropFiles"
            @editor:dragover="dragover"
            @editor:dragleave="dragleave"
            @change="onChange"
          >
            <!-- file list here -->
            <file-list
              class="editor__filelist editor__filelist--front px-2"
              v-if="uploadable_uploader && noteAttachments.length"
              :files="noteAttachments"
              :uploader="uploadable_uploader"
              @remove="onFileRemoved"
            />

            <file-list
              class="editor__filelist editor__filelist--back px-2"
              v-if="uploadable_uploader && $_uploadable_uploaderFiles.length"
              :files="$_uploadable_uploaderFiles"
              :uploader="uploadable_uploader"
            />
          </custom-editor>

          <v-card-actions>
            <custom-toolbar :items="[]" class="elevation-0">
              <template v-slot:left>
                <v-btn
                  small
                  color="primary"
                  class="ml-1 mr-2 complaint-form__btn-submit"
                  @click.prevent.stop="onSubmit"
                  :loading="form.isSubmitting"
                  :disabled="uploadable_uploading || !canSubmitNote || !form.isChanged"
                >{{ managableEdit ? "Update" : "Send" }}</v-btn>

                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      medium
                      v-on="on"
                      class="clickable mr-2"
                      @click.prevent.stop="showFormatting = !showFormatting"
                    >text_format</v-icon>
                  </template>
                  <span>Formatting options</span>
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
                      <span>Upload files</span>
                    </v-tooltip>
                  </template>
                </uploader>

                <v-spacer></v-spacer>

                <v-tooltip v-if="!$_issue_note_item_mixin_noteItem" top>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on" @click="onRemove" class="mr-2">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </template>
                  <span>Discard draft</span>
                </v-tooltip>
              </template>
            </custom-toolbar>
          </v-card-actions>
        </v-card-text>
        <!-- <v-divider v-if="$_complaint_item_mixin_hasAttachments"></v-divider>

    <v-card-text v-if="$_complaint_item_mixin_hasAttachments" class="pt-0">
      <v-subheader class="px-0">Attachments</v-subheader>

      <v-layout row wrap>
        <template v-for="(attachment, attachmentIndex) in $_complaint_item_mixin_complaintAttachments">
          <file-sheet-item :file="attachment" :key="`complaintAttachment-${attachmentIndex}`"/>
        </template>
      </v-layout>
        </v-card-text>-->
      </v-card>
    </v-flex>

    <message-alert
      key="alertComplaintNoteCard"
      :alertable-visible.sync="alertable_alert"
      :alertable-type="alertable_type"
      :alertable-messages="alertable_messages"
      :alertable-props="alertable_props"
    ></message-alert>
  </v-layout>
</template>

<script>
import alertable from "../../mixins/alertable";
import issueNoteItemMixin from "../../mixins/issue-note-item-mixin";
import { vuex } from "../../mixins/vuexable";
import managable from "../../mixins/managable";
import uploadable from "../../mixins/uploadable";
import CustomEditor from "../../components/CustomEditor";
import CustomToolbar from "../../components/CustomToolbar";
import FileList from "../../components/FileList";
import FileSheetItem from "../../components/FileSheetItem";
import MessageAlert from "../../components/MessageAlert";
import MoreVertMenu from "../../components/MoreVertMenu";

export default {
  mixins: [alertable, issueNoteItemMixin, managable, uploadable],

  components: {
    CustomEditor,
    CustomToolbar,
    FileList,
    FileSheetItem,
    MessageAlert,
    MoreVertMenu
  },

  data() {
    return {
      form: vuex.models.FORM.make({
        issue_id: this.issueId,
        created_by: this.createdBy,
        description: "",
        attachments: [],
        uploaded_files: []
      }),
      showFormatting: false,
      alertable_messages: {
        error: "Cannot create note, please try again",

        delete_file_success: {
          text: "Attachment was deleted successfully",
          type: "success",
          color: "white",
          actions: [
            {
              text: "Undo",
              handler: async ({ file }) => {
                this.onFileRestore(file);
              }
            }
          ]
        },
        delete_uploadfile_success: {
          text: "Uploaded file was deleted successfully",
          type: "success"
        },
        action_done: {
          text: "Action undone"
        }
      },
      menuItems: [
        { action: "Edit", handler: item => this.onEdit(item) },
        { action: "Delete", handler: item => this.onDelete(item) }
      ]
    };
  },

  watch: {
    displayInformation(v) {
      if (!v) {
        this.$_uploadable_UpdateUploader();
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

    noteAttachments() {
      return [
        ...this.$_issue_note_item_mixin_noteAttachments,
        ...this.uploadable_uploadedFiles
      ];
    },

    displayInformation() {
      return this.noteId !== null && !this.managableEdit;
    },

    noteClasses() {
      const elevation = this.displayInformation ? 0 : 3;

      return {
        [`elevation-${elevation}`]: true,
        "mt-3": !this.displayInformation
      };
    },

    canSubmitNote() {
      return (
        this.formDescription.length > 0 ||
        this.uploadable_uploadedFiles.length > 0
      );
    }
  },

  methods: {
    onChange() {},

    async onEdit() {
      this.form = vuex.models.FORM.make({
        ...this.$_issue_note_item_mixin_noteItem.data,
        uploaded_files: []
      });

      await this.$_issue_note_item_mixin_onEditIssueNote(
        this.$_issue_note_item_mixin_noteItem
      );
    },

    async onDelete() {
      const { id } = this.$_issue_note_item_mixin_noteItem;

      this.$emit("delete", { id });
    },

    onCloseEdit() {
      this.$_issue_note_item_mixin_setEdit(null);
    },

    onSubmit() {
      if (this.canSubmitNote) {
        return this.submitComplaintNote();
      }
    },

    async submitComplaintNote() {
      const { form, $_uploadable_metaData = [] } = this;

      // if ($_uploadable_metaData.length) {
      //   form.set("uploaded_files", $_uploadable_metaData);
      // }

      let v;

      try {
        v = await this.$_managable_submitForm(form, [
          "id",
          "description",
          "issue_id",
          "created_by",
          "attachments",
          "uploaded_files"
        ]);
      } catch (error) {
        this.$_alertable_alert("error");

        throw error;
      }

      // this.$_alertable_alert(`${this.$_managable_action}_success`);

      return this.resetComplaintNoteForm();
    },

    resetComplaintNoteForm() {
      this.form.reset();

      this.$_uploadable_reset();
    },

    onRemove(event) {
      this.$emit("remove", this.form.data);
    },

    async onFileRemoved(file, index, files) {
      if (file.id) {
        try {
          const { form } = this;
          const attachments = [...form.attachments];
          const fileIndex = attachments.indexOf(file.id);

          attachments.splice(fileIndex, 1);

          form.set("attachments", attachments);

          this.$_issue_note_item_mixin_noteItem.update(
            "attachments",
            attachments
          );

          form.set("includes", []);

          await this.$_managable_submitForm(form, [
            "id",
            "attachments",
            "includes"
          ]);

          this.$_alertable_alert("delete_file_success", { file });
        } catch (error) {
          console.log(error);
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

        const { form } = this;

        const attachments = [...form.attachments, file.id];

        form.set("attachments", attachments);

        this.$_issue_note_item_mixin_noteItem.update(
          "attachments",
          attachments
        );

        form.set("includes", []);

        await this.$_managable_submitForm(form, [
          "id",
          "attachments",
          "includes"
        ]);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss">
.complaint-note-card {
  .vuejs-uploader {
    &__btn--clear,
    &__btn--upload,
    &__queue {
      display: none;
    }
  }

  .tox-toolbar-overlord {
    bottom: 90px;
  }

  .v-toolbar__content {
    padding: 0 6px;
  }

  &__action-menu {
    margin-right: -1.5rem;
  }
}
</style>
