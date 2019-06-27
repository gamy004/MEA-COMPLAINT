<template>
  <v-card v-if="$_issue_note_item_mixin_noteItem" flat light class="complaint-note-card">
    <v-card-title primary-title>
      <v-layout>
        <div>
          <span class="caption">Remark by: {{ $_issue_note_item_mixin_noteCreator.name }}</span>
        </div>

        <v-spacer/>

        <v-layout align-baseline justify-end no-wrap>
          <!-- <v-icon v-if="$_complaint_item_mixin_hasAttachments" class="mr-1 complaint-detail__attachment-icon">attachment</v-icon> -->

          <span class="caption">{{ $_issue_note_item_mixin_noteItem.longUpdatedAt }}</span>
          <!-- <span>Listen to your favorite artists and albums whenever and wherever, online and offline.</span> -->
        </v-layout>
      </v-layout>
    </v-card-title>

    <v-card-text>
      <v-sheet v-html="$_issue_note_item_mixin_noteItem.description"></v-sheet>
    </v-card-text>

    <!-- <v-divider v-if="$_complaint_item_mixin_hasAttachments"></v-divider>

    <v-card-text v-if="$_complaint_item_mixin_hasAttachments" class="pt-0">
      <v-subheader class="px-0">Attachments</v-subheader>

      <v-layout row wrap>
        <template v-for="(attachment, attachmentIndex) in $_complaint_item_mixin_complaintAttachments">
          <file-sheet-item :file="attachment" :key="`complaintAttachment-${attachmentIndex}`"/>
        </template>
      </v-layout>
    </v-card-text> -->
  </v-card>

  <v-card v-else light :elevation="3">
    <v-card-title primary-title>
      <v-layout>
        <div>
          <span class="caption">To: ...</span>
        </div>
      </v-layout>
    </v-card-title>

    <v-card-text>
      <custom-editor
          v-model="formDescription"
          :show-toolbar.sync="showFormatting"
          :full-screen="false"
          @editor:drop="dropFiles"
          @editor:dragover="dragover"
          @editor:dragleave="dragleave"
          @change="onChange"
      />
    </v-card-text>

    <!-- <v-divider v-if="$_complaint_item_mixin_hasAttachments"></v-divider>

    <v-card-text v-if="$_complaint_item_mixin_hasAttachments" class="pt-0">
      <v-subheader class="px-0">Attachments</v-subheader>

      <v-layout row wrap>
        <template v-for="(attachment, attachmentIndex) in $_complaint_item_mixin_complaintAttachments">
          <file-sheet-item :file="attachment" :key="`complaintAttachment-${attachmentIndex}`"/>
        </template>
      </v-layout>
    </v-card-text> -->
    <v-card-actions>
      <custom-toolbar :items="[]" class="elevation-0">
        <template v-slot:left>
            <v-btn
                small
                color="primary"
                class="mr-2 complaint-form__btn-submit"
                @click.prevent.stop="onSubmit"
                :loading="form.isSubmitting"
                :disabled="uploadable_uploading"
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

            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-icon v-on="on" class="clickable">delete</v-icon>
                </template>
                <span>Discard draft</span>
            </v-tooltip>
        </template>
      </custom-toolbar>
    </v-card-actions>
  </v-card>
</template>

<script>
import issueNoteItemMixin from '../../mixins/issue-note-item-mixin';
import { vuex } from '../../mixins/vuexable';
import managable from '../../mixins/managable';
import uploadable from '../../mixins/uploadable';
import CustomEditor from '../../components/CustomEditor';
import CustomToolbar from '../../components/CustomToolbar';

export default {
    mixins: [issueNoteItemMixin, managable, uploadable],

    components: {
      CustomEditor,
      CustomToolbar
    },

    data() {
      return {
        form: vuex.models.FORM.make({
            description: "",
            uploaded_files: []
        }),
        showFormatting: false
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
    },

    methods: {
      onChange() {

      }
    }
}
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
}
</style>
