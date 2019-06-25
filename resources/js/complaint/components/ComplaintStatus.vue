
<template>
  <v-layout class="complaint-status" v-if="complaint">
    <v-flex xs12>
      <transition name="slide-x-transition">
        <v-progress-circular v-if="isFetchingStatuses" indeterminate color="info" size="10"></v-progress-circular>

        <v-avatar v-else color="indigo accent-3" size="10" class="status-indicator mr-1"></v-avatar>
      </transition>

      <span>{{ complaint.currentStatus }}</span>
    </v-flex>
  </v-layout>
</template>

<script>
import { vuex } from "../../mixins/vuexable";
import complaintItemMixin from "../../mixins/complaint-item-mixin";

export default {
  mixins: [complaintItemMixin],

  methods: {
    ...vuex.mapWaitingActions(vuex.modules.ISSUE_STATUS, [
      vuex.actions.ISSUE_STATUS.FETCH
    ]),

    async fetchStatuses() {
      try {
        await this[vuex.actions.ISSUE_STATUS.FETCH]({
          select: ["issue_statuses:id,status,default"],
          sort: ["-issue_statuses.default", "issue_statuses.status"]
        });
      } catch (error) {}
    }
  },

  computed: {
    ...vuex.mapWaitingGetters({
      isFetchingStatuses: [vuex.actions.ISSUE_STATUS.FETCH]
    })
  },

  mounted() {
    this.fetchStatuses();
  }
};
</script>

