
<template>
  <v-layout class="complaint-status" v-if="$_complaint_item_mixin_complaint">
    <v-flex xs12>
      <transition name="slide-x-transition">
        <v-progress-circular
          v-if="$_issue_status_mixin_fetching"
          indeterminate
          color="info"
          size="10"
        ></v-progress-circular>

        <v-avatar v-else :color="statusColor" size="12" class="status-indicator mr-1"></v-avatar>
      </transition>

      <span>{{ statusText }}</span>
    </v-flex>
  </v-layout>
</template>

<script>
import { vuex } from "../../mixins/vuexable";
import complaintItemMixin from "../../mixins/complaint-item-mixin";
import issueStatusMixin from "../../mixins/issue-status-mixin";

export default {
  mixins: [complaintItemMixin, issueStatusMixin],

  computed: {
    statusColor() {
      let color = "#E0E0E0FF";

      if (this.$_complaint_item_mixin_complaint) {
        color = this.$_complaint_item_mixin_complaint.statusColor;
      }

      return color;
    },

    statusText() {
      let text = this.$t("general.anonymousStatus");

      if (this.$_complaint_item_mixin_complaint) {
        const { currentStatus = null } = this.$_complaint_item_mixin_complaint;

        if (currentStatus && currentStatus.length) {
          text = currentStatus;
        }
      }

      return text;
    }
  }
};
</script>
