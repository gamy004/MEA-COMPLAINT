<template>
  <v-card flat light>
    <v-card-title primary-title>
      <v-layout align-baseline row wrap>
        <div>
          <v-layout align-start>
            <div class="headline">{{ $_complaint_item_mixin_complaint.title }}</div>
            <v-chip v-if="$_complaint_item_mixin_complaintCategory" small class="ml-1">
              <span>{{ $_complaint_item_mixin_complaintCategory.category }}</span>
            </v-chip>
            <v-btn
              icon
              v-if="$_complaint_item_mixin_complaintEditable"
              class="complaint-detail-card__edit-icon"
              @click.prevent.stop="$_complaint_item_mixin_onEditComplaint($_complaint_item_mixin_complaint)"
            >
              <v-icon>edit</v-icon>
            </v-btn>
          </v-layout>
          <span class="caption">to {{ $_complaint_item_mixin_complaint.joinedRecipientName }}</span>
          <!-- <span>Listen to your favorite artists and albums whenever and wherever, online and offline.</span> -->
        </div>

        <v-spacer/>

        <v-layout align-start justify-end no-wrap>
          <v-icon
            v-if="$_complaint_item_mixin_hasAttachments"
            small
            class="mr-1 complaint-detail__attachment-icon"
          >attachment</v-icon>

          <span class="caption">{{ $_complaint_item_mixin_complaint.longUpdatedAt }}</span>
        </v-layout>
      </v-layout>
    </v-card-title>

    <v-card-text>
      <v-sheet v-html="$_complaint_item_mixin_complaint.description"></v-sheet>
    </v-card-text>

    <v-divider v-if="$_complaint_item_mixin_hasAttachments" class="mx-3"></v-divider>

    <v-card-text v-if="$_complaint_item_mixin_hasAttachments" class="pt-0">
      <v-subheader class="caption px-0">Attachments</v-subheader>

      <v-layout row wrap>
        <template
          v-for="(attachment, attachmentIndex) in $_complaint_item_mixin_complaintAttachments"
        >
          <file-sheet-item :file="attachment" :key="`complaintAttachment-${attachmentIndex}`"/>
        </template>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import complaintItemMixin from "../../mixins/complaint-item-mixin";
import FileSheetItem from "../../components/FileSheetItem";

export default {
  mixins: [complaintItemMixin],

  components: {
    FileSheetItem
  }
};
</script>

<style lang="scss" scoped>
.complaint-detail {
  &-card {
    &__edit-icon {
      top: -8px;
    }
  }
}
</style>
