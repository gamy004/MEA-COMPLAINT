<template>
  <v-dialog v-model="reportDialog" width="600">
    <template #activator="{ on }">
      <v-layout v-on="on" class="pl-3">
        <v-list-tile-action class="complaint-report-generator__action">
          <v-icon color="deep-orange">date_range</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Pick Date</v-list-tile-title>
        </v-list-tile-content>
      </v-layout>
    </template>

    <v-card v-if="report">
      <v-card-title class="headline pb-0" primary-title>Generate by</v-card-title>

      <v-card-text class="pt-0">
        <v-radio-group v-model="reportType" row>
          <v-radio
            v-for="(type, typeIndex) in reportTypes"
            :key="`report-type-${typeIndex}`"
            :label="type.label"
            :value="type.value"
            color="deep-orange"
          ></v-radio>
        </v-radio-group>

        <v-date-picker
          :key="`picker-${reportType}`"
          v-model="reportVModel"
          multiple
          full-width
          landscape
          class="mt-3"
          :type="reportType"
          header-color="has-gradient"
          color="deep-orange"
        ></v-date-picker>
      </v-card-text>

      <v-card-actions class="py-3">
        <v-spacer></v-spacer>
        <v-btn flat @click.prevent.stop="reportDialog = false">Cancel</v-btn>
        <v-btn color="deep-orange" dark class="mr-2" @click.prevent.stop="generateReport">Generate</v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-if="report" v-model="reportGenerate" persistent width="300">
      <v-card color="deep-orange" dark>
        <v-card-text>
          Generating report, please stand by
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
import FileSaver from "file-saver";
import { vuexable, vuex } from "../../mixins/vuexable";
import { filterContains, formatDateFile } from "../../helpers";

export default {
  mixins: [vuexable],

  computed: {
    report() {
      return this.$_vuexable_getState("report", vuex.modules.ISSUE) || {};
    },

    reportTypes() {
      const { types = [] } = this.report;

      return types;
    },

    reportType: {
      get() {
        const { reportType = "date" } = this.report;

        return reportType;
      },

      set(reportType) {
        this.$_vuexable_setState(
          {
            key: "report",
            value: {
              ...this.report,
              reportType
            }
          },
          vuex.modules.ISSUE
        );
      }
    },

    isTypeDate() {
      return this.reportType === "date";
    },

    reportVModel: {
      get() {
        const data = this.isTypeDate ? "dates" : "months";

        return this.report[data] || [];
      },

      set(v) {
        const data = this.isTypeDate ? "dates" : "months";

        this.$_vuexable_setState(
          {
            key: "report",
            value: {
              ...this.report,
              [data]: v
            }
          },
          vuex.modules.ISSUE
        );
      }
    },

    reportGenerate: {
      get() {
        const { generate = false } = this.report;

        return generate;
      },

      set(generate) {
        this.$_vuexable_setState(
          {
            key: "report",
            value: {
              ...this.report,
              generate
            }
          },
          vuex.modules.ISSUE
        );
      }
    },

    reportDialog: {
      get() {
        const { dialog = false } = this.report;

        return dialog;
      },

      set(dialog) {
        this.$_vuexable_setState(
          {
            key: "report",
            value: {
              ...this.report,
              dialog
            }
          },
          vuex.modules.ISSUE
        );
      }
    }
  },

  methods: {
    ...vuex.mapWaitingActions(vuex.modules.ISSUE, [vuex.actions.ISSUE.EXPORT]),

    async generateReport() {
      this.reportDialog = false;
      this.reportGenerate = true;

      let content;

      try {
        const ranges = this.reportVModel;

        content = await this[vuex.actions.ISSUE.EXPORT]({
          filter_groups: [
            {
              filters: ranges.map(x => filterContains("created_at", x))
            }
          ],
          sort: ["-created_at"]
        });
      } catch (error) {
        throw error;
      }

      const currentDate = new Date();

      FileSaver.saveAs(
        content.data,
        `ComplaintReport_${formatDateFile(currentDate)}`
      );
    }
  },

  mounted() {
    this.$_vuexable_setState(
      {
        key: "report",
        value: {
          reportType: "date",
          types: [
            { label: "Date", value: "date" },
            { label: "Month", value: "month" }
          ],
          dates: [],
          months: [],
          dialog: false,
          generate: false
        }
      },
      vuex.modules.ISSUE
    );
  }
};
</script>

<style lang="scss">
.complaint-report-generator {
  &__action {
    padding-left: 7px;
    min-width: 40px;
  }
}
</style>
