<template>
  <v-timeline-item fill-dot small :color="statusColor">
    <v-layout pt-3>
      <v-flex xs3>
        <strong>{{ item.ended_at !== null ? shortStartedTime : $t('general.present') }}</strong>
      </v-flex>
      <v-flex class="ml-1">
        <strong>{{ logStatus.status }}</strong>
        <div
          v-if="item.started_at !== null"
          class="caption"
        >{{ $t('general.start') }}: {{ startedTime }}</div>
        <div
          v-if="item.ended_at !== null"
          class="caption"
        >{{ $t('general.end') }}: {{ longEndedTime }}</div>
        <div v-if="statusExceedTime" class="caption">{{ statusExceedTime }}</div>
      </v-flex>
    </v-layout>
  </v-timeline-item>
</template>

<script>
import complaintItemMixin from "../../mixins/complaint-item-mixin";
import { vuex, vuexable } from "../../mixins/vuexable";
import { formatShortDateTime, formatLongDateTime } from "../../helpers";

// const timeMapping = {
//   minutes: "นาที",
//   hours: "ชั่วโมง",
//   days: "วัน",
//   weeks: "สัปดาห์",
//   months: "เดือน",
//   years: "ปี"
// };

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

    statusConfig() {
      return this.logStatus
        ? this.logStatus.getConfigByTime(
            this.item.created_at,
            this.item.ended_at
          )
        : null;
    },

    statusColor() {
      return this.statusConfig ? this.statusConfig.color : "#E0E0E0FF";
    },

    statusExceedTime() {
      let time = "";

      const { statusConfig = null } = this;

      if (statusConfig) {
        const unit = this.$t(`time.${statusConfig.unit}`);

        time = `${this.$t("general.exceed")} ${statusConfig.duration} ${unit}`;
      }

      return time;
    },

    startedTime() {
      return formatLongDateTime(this.item.started_at);
    },

    shortStartedTime() {
      return formatShortDateTime(this.item.started_at);
    },

    shortEndedTime() {
      return formatShortDateTime(this.item.ended_at);
    },

    longEndedTime() {
      return formatLongDateTime(this.item.ended_at);
    }
  }
};
</script>
