<template>
  <v-card v-if="$_issue_note_item_mixin_noteItem" flat light>
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
  </v-card>
</template>

<script>
import issueNoteItemMixin from '../../mixins/issue-note-item-mixin';
import { vuex } from '../../mixins/vuexable';
import managable from '../../mixins/managable';
import uploadable from '../../mixins/uploadable';
import CustomEditor from '../../components/CustomEditor';

export default {
    mixins: [issueNoteItemMixin, managable, uploadable],

    components: {
      CustomEditor
    },

    data() {
      return {
        form: vuex.models.FORM.make({
            description: "",
            uploaded_files: []
        })
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
