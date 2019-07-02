
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

        <v-avatar v-else :color="status.color" size="12" class="status-indicator mr-1"></v-avatar>
      </transition>

      <span>{{ status.status }}</span>
    </v-flex>
  </v-layout>
</template>

<script>
import { vuex } from "../../mixins/vuexable";
import complaintItemMixin from "../../mixins/complaint-item-mixin";
import issueStatusMixin from "../../mixins/issue-status-mixin";

export default {
  name: "ComplaintStatus",

  mixins: [complaintItemMixin, issueStatusMixin],

  props: {
    statusId: {
      type: [String, Number],
      default: null
    }
  },

  computed: {
    status() {
      return this.$_issue_status_mixin_findStatus(this.statusId);
    }
  }
};
</script>
