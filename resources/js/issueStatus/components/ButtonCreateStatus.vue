<template>
  <v-btn color="deep-orange" flat dark small @click="$_issue_status_mixin_dialog = true">
    <v-icon class="mr-1">add</v-icon>
    <span>New Status</span>
  </v-btn>
</template>

<script>
import issueStatusMixin from "../../mixins/issue-status-mixin";

export default {
  mixins: [issueStatusMixin]
};
</script>

