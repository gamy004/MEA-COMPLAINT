<template>
  <v-timeline-item fill-dot small :color="statusColor">
    <v-layout pt-3>
      <v-flex xs3>
        <strong>5pm</strong>
      </v-flex>
      <v-flex>
        <strong>New Icon</strong>
        <div class="caption">Mobile App</div>
      </v-flex>
    </v-layout>
  </v-timeline-item>
</template>

<script>
import complaintItemMixin from "../../mixins/complaint-item-mixin";
import { vuex, vuexable } from '../../mixins/vuexable';
export default {
  props: ["item"],

  mixins: [complaintItemMixin, vuexable],

  computed: {
      logStatus() {
          return this.$_vuexable_getByKey(
              this.item.issue_status_id,
              vuex.modules.ISSUE_STATUS
          );
      },

      statusColor() {
          return this.logStatus ? this.logStatus.getColorByTime(this.item.created_at) : "#C3C3C3FF";
      }
  }
};
</script>
