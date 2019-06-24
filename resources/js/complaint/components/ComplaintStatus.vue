
<template>
  <v-layout class="complaint-status" v-if="complaint">
    <v-flex xs12>
      <v-avatar color="indigo accent-3" size="10" class="status-indicator mr-1"></v-avatar>

      <span>{{ complaint.currentStatus }}</span>
    </v-flex>
  </v-layout>
</template>

<script>
import complaintItemMixin from "../../mixins/complaint-item-mixin";

export default {
  mixins: [complaintItemMixin]
};
</script>

