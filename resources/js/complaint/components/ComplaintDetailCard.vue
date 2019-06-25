<template>
  <v-card flat light>
    <v-card-title primary-title>
      <v-layout>
        <div>
          <div class="headline">{{ complaint.title }}</div>
          <span class="caption">to {{ complaint.joinedRecipientName }}</span>
          <!-- <span>Listen to your favorite artists and albums whenever and wherever, online and offline.</span> -->
        </div>

        <v-spacer/>

        <v-layout align-baseline justify-end no-wrap>
          <v-icon v-if="hasAttachments" class="mr-1 complaint-detail__attachment-icon">attachment</v-icon>

          <span class="caption">{{ complaint.longUpdatedAt }}</span>
          <!-- <span>Listen to your favorite artists and albums whenever and wherever, online and offline.</span> -->
        </v-layout>
      </v-layout>
    </v-card-title>

    <v-card-text>
      <v-sheet v-html="complaint.description"></v-sheet>
    </v-card-text>

    <v-divider v-if="hasAttachments"></v-divider>

    <v-card-text v-if="hasAttachments" class="pt-0">
      <v-subheader class="px-0">Attachments</v-subheader>

      <v-layout row wrap>
        <template v-for="(attachment, attachmentIndex) in complaintAttachments">
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
  &__attachment-icon {
    top: 7px;
    position: relative;
  }
}
</style>


