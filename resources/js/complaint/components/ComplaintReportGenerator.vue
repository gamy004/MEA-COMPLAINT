<template>
  <v-dialog v-model="$_issue_report_mixin_reportDialog" width="600">
    <template #activator="{ on }">
      <v-layout v-on="on" class="pl-3">
        <v-list-tile-action class="complaint-report-generator__action">
          <v-icon color="deep-orange">date_range</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title v-t="'complaint.index.toolbar.generateReport.by.date'"></v-list-tile-title>
        </v-list-tile-content>
      </v-layout>
    </template>

    <v-card v-if="$_issue_report_mixin_report">
      <v-card-title
        class="headline pb-0"
        primary-title
        v-t="'complaint.index.toolbar.generateReport.dateheader'"
      ></v-card-title>

      <v-card-text class="pt-0">
        <v-radio-group v-model="$_issue_report_mixin_reportType" row>
          <v-radio
            v-for="(type, typeIndex) in $_issue_report_mixin_reportTypes"
            :key="`report-type-${typeIndex}`"
            :label="type.label"
            :value="type.value"
            color="deep-orange"
          ></v-radio>
        </v-radio-group>

        <v-date-picker
          :key="`picker-${$_issue_report_mixin_reportType}`"
          v-model="$_issue_report_mixin_reportVModel"
          multiple
          full-width
          landscape
          class="mt-3"
          :locale="$i18n.locale"
          :type="$_issue_report_mixin_reportType"
          header-color="has-gradient"
          color="deep-orange"
        ></v-date-picker>
      </v-card-text>

      <v-card-actions class="py-3">
        <v-spacer></v-spacer>
        <v-btn
          flat
          @click.prevent.stop="$_issue_report_mixin_reportDialog = false"
        >{{ $t('general.cancel') }}</v-btn>
        <v-btn
          color="deep-orange"
          :dark="$_issue_report_mixin_reportVModel.length > 0"
          class="mr-2"
          :disabled="!$_issue_report_mixin_reportVModel.length > 0"
          @click.prevent.stop="$_issue_report_mixin_generateReport($_issue_report_mixin_reportVModel)"
        >{{ $t('general.export') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import issueReportMixin from "../../mixins/issue-report-mixin";

export default {
  mixins: [issueReportMixin]
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
