
<template>
  <v-layout class="complaint-status" v-if="$_complaint_item_mixin_complaint">
    <v-flex xs12>
      <transition name="slide-x-transition">
        <v-progress-circular
          v-if="$_issue_status_mixin_isFetchingStatuses"
          indeterminate
          color="info"
          size="10"
        ></v-progress-circular>

        <v-avatar v-else color="indigo accent-3" size="10" class="status-indicator mr-1"></v-avatar>
      </transition>

      <span>{{ $_complaint_item_mixin_complaint.currentStatus }}</span>
    </v-flex>
  </v-layout>
</template>

<script>
import { vuex } from "../../mixins/vuexable";
import complaintItemMixin from "../../mixins/complaint-item-mixin";
import issueStatusMixin from "../../mixins/issue-status-mixin";

export default {
  mixins: [complaintItemMixin, issueStatusMixin],

  mounted() {
    this.$_issue_status_mixin_fetchStatuses();
  }
};
</script>
