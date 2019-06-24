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

        <v-layout justify-end>
          <span class="caption">{{ complaint.longUpdatedAt }}</span>
          <!-- <span>Listen to your favorite artists and albums whenever and wherever, online and offline.</span> -->
        </v-layout>
      </v-layout>
    </v-card-title>
    <v-card-actions>
      <v-sheet v-html="complaint.description"></v-sheet>
    </v-card-actions>
  </v-card>
</template>

<script>
import complaintItemMixin from "../../mixins/complaint-item-mixin";

export default {
  mixins: [complaintItemMixin]
};
</script>

