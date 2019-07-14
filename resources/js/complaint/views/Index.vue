<template>
  <v-layout row wrap>
    <v-flex xs12>
      <custom-toolbar
        id="complaintToolbar"
        class="bb-1 pb-0 grey lighten-4"
        absolute
        :items="items"
      >
        <template v-slot:extension>
          <v-layout row wrap>
            <v-flex xs12>
              <complaint-select-all-search class="grey lighten-4" @click:clear="unCheckAll" />
            </v-flex>
            <v-flex>
              <v-tabs v-model="tab" v-if="showTab" slider-color="deep-orange">
                <v-tab
                  v-for="(tab, tabIndex) in tabs"
                  :key="`tab-${tabIndex}`"
                  :href="`#tab-${tabIndex}`"
                >
                  <v-icon v-if="tab.icon">{{ tab.icon }}</v-icon>
                  <span v-if="tab.text" class="ml-3">{{ tab.text }}</span>
                </v-tab>
              </v-tabs>
            </v-flex>
          </v-layout>
        </template>
      </custom-toolbar>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="(tab, tabIndex) in tabs"
          :key="`tabItem-${tabIndex}`"
          :value="`tab-${tabIndex}`"
        >
          <complaint-list :type="tab.type" :active="isTabActive(`tab-${tabIndex}`)"></complaint-list>
        </v-tab-item>
      </v-tabs-items>
    </v-flex>

    <complaint-form
      v-if="hasEdittedComplaint && complaintDialog"
      :managable-module="vuex.modules.ISSUE"
      :managable-route-param="hasEdittedComplaint ? { issue: editingComplaintId } : {}"
      :managable-edit="hasEdittedComplaint"
      @saveDraft="$_alertable_alert('save_draft_success')"
      @submitDraft="$_alertable_alert('add_success')"
      @editSuccess="$_alertable_alert('edit_success')"
    />

    <v-dialog
      v-if="$_issue_report_mixin_report"
      v-model="$_issue_report_mixin_reportGenerate"
      persistent
      width="300"
    >
      <v-card color="deep-orange" dark>
        <v-card-text>
          <span class="body-2" v-t="'complaint.index.toolbar.generateReport.watingTerm'"></span>
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <dialog-inbox-config :dialogable-visible.sync="showConfig" />

    <message-alert
      key="alertComplaintIndex"
      :alertable-visible.sync="alertable_alert"
      :alertable-type="alertable_type"
      :alertable-messages="alertable_messages"
      :alertable-props="alertable_props"
    ></message-alert>
  </v-layout>
</template>

<script>
import ComplaintList from "../components/ComplaintList";
import ComplaintReportGenerator from "../components/ComplaintReportGenerator";
import CustomToolbar from "../../components/CustomToolbar";
import MessageAlert from "../../components/MessageAlert";
import ComplaintForm from "../components/ComplaintForm";
import ComplaintSelectAllSearch from "../components/ComplaintSelectAllSearch";
import DialogInboxConfig from "../components/DialogInboxConfig";
import complaintMixin from "../../mixins/complaint-mixin";
import { onEmit } from "../../helpers";
import issueStatusMixin from "../../mixins/issue-status-mixin";
import issueReportMixin from "../../mixins/issue-report-mixin";
import { vuex, vuexable } from "../../mixins/vuexable";
import { issueSearchMixin } from "../../mixins/issue-search-mixin";
import alertable from "../../mixins/alertable";
// import complaintModule from "../../stores/modules/complaints";
// import groupModule from "../../stores/modules/groups";
// import statusModule from "../../stores/modules/statuses";
// import issueCategoryModule from "../../stores/modules/issue-categories";
export default {
  mixins: [
    alertable,
    complaintMixin,
    issueStatusMixin,
    issueSearchMixin,
    issueReportMixin,
    vuexable
  ],

  components: {
    ComplaintList,
    ComplaintReportGenerator,
    CustomToolbar,
    ComplaintForm,
    ComplaintSelectAllSearch,
    DialogInboxConfig,
    MessageAlert
  },

  data() {
    return {
      tab: null,
      showTab: false,
      showConfig: false,
      tabs: [
        {
          icon: "inbox",
          text: this.$t("complaint.index.toolbar.primary"),
          type: "primary"
        }
      ],

      alertable_messages: {
        add_success: {
          text: this.$t("alertMessages.complaintForm.create_success"),
          type: "success"
        },
        save_draft_success: this.$t(
          "alertMessages.complaintForm.save_draft_success"
        ),
        edit_success: {
          text: this.$t("alertMessages.complaintForm.update_success"),
          type: "success"
        }
      }
    };
  },

  watch: {
    "$route.query": {
      immediate: true,
      handler: "onRouteQueryChange"
    },

    tabs: {
      immediate: true,
      handler(v) {
        setTimeout(() => {
          this.showTab = true; // slider problem
        }, 200);
      }
    },

    $_paginatable_currentPaginatedList(paginatedList) {
      this.items.forEach((item, index) => {
        onEmit("onPaginatedListChange", paginatedList, item, index);
      });
    }

    // $_paginatable_currentPage(page) {
    //   this.items.forEach((item, index) => {
    //     this.onEmit("onPageChange", page, item, index);
    //   });
    // },

    // $_paginatable_descending(descending) {
    //   this.items.forEach((item, index) => {
    //     this.onEmit("onDescendingChange", descending, item, index);
    //   });
    // }
  },

  computed: {
    checkBoxItem() {
      return !this.$route.query.type
        ? {
            select: true,
            selected: false,
            color: "deep-orange",
            indeterminate: item => {
              return (
                this.$_paginatable_someSelected &&
                !this.$_paginatable_isSelectedAll
              );
            },

            onChange: value => {
              this.$_paginatable_selectAll(value);

              const { $_paginatable_currentPaginatedList = [] } = this;

              const selectedIds = _.map(
                $_paginatable_currentPaginatedList,
                "id"
              );

              this.$_paginatable_syncSelected(selectedIds, value);
            },

            onPaginatedListChange: (value, item, indexes) => {
              const itemIndex = indexes[0]; // get checkbox item

              this.$_paginatable_updatedSelected();

              this.$set(
                this.items[itemIndex],
                "selected",
                this.$_paginatable_someSelected
              );
            }
          }
        : {};
    },
    items() {
      return [
        this.checkBoxItem,
        // {
        //   menu: true,
        //   icon: "arrow_drop_down",
        //   classes: {
        //     "complaint-selection-menu": true
        //   },
        //   menuItems: [
        //     { text: "All" },
        //     { text: "None" },
        //     { text: "Read" },
        //     { text: "Unread" },
        //     { text: "Starred" },
        //     { text: "Unstarred" }
        //   ]
        // },
        {
          icon: "replay",
          text: this.$t("general.refresh"),
          onClick: () => {
            const { $_issue_search_mixin_searchFiltersVuex = [] } = this;

            if ($_issue_search_mixin_searchFiltersVuex.length) {
              this.$_issue_search_mixin_searchComplaint();
            } else {
              this[vuex.actions.ISSUE.FETCH]();
            }
          }
        },
        { spacer: true },
        // {
        //   component: () => ComplaintSelectAllSearch
        // },
        { spacer: true },
        {
          menu: true,
          hover: true,
          html: () => {
            return this.$_paginatable_currentPageRange;
          },
          menuItems: [
            {
              text: this.$t("general.newest"),
              disabled: () => {
                return this.$_paginatable_descending;
              },
              onClick: () => {
                this.$_paginatable_descending = true;
              }
            },
            {
              text: this.$t("general.oldest"),
              disabled: () => {
                return !this.$_paginatable_descending;
              },
              onClick: () => {
                this.$_paginatable_descending = false;
              }
            }
          ]
        },
        {
          icon: "keyboard_arrow_left",
          //   text: "Newer",
          disabled: () => this.$_paginatable_isFirstPage,
          onClick: () => {
            this.$_paginatable_toPrevPage();
          }
        },
        {
          icon: "keyboard_arrow_right",
          //   text: "Older",
          disabled: () => this.$_paginatable_isLastPage,
          onClick: () => {
            this.$_paginatable_toNextPage();
          }
        },
        {
          menu: true,
          minwidth: "250",
          icon: "mdi-application-export",
          text: this.$t("complaint.index.toolbar.generateReport.tooltip"),
          // component: () => ComplaintReportGenerator,
          // componentProps: () => {
          //   return {
          //     issueId: this.activeComplaintId
          //   };
          // },
          menuItems: [
            {
              text: this.$t("complaint.index.toolbar.generateReport.subheader"),
              subheading: true
            },
            {
              text: this.$t(
                "complaint.index.toolbar.generateReport.by.selected"
              ),
              disabled: () => !this.vuexSomeSelectedValues,
              onClick: () => {
                this.$_issue_report_mixin_generateCurrentSelected();
              }
            },
            {
              text: this.$t("complaint.index.toolbar.generateReport.by.filter"),
              onClick: () => {
                this.$_issue_report_mixin_generateCurrentFilter();
              }
            },
            {
              text: this.$t(
                "complaint.index.toolbar.generateReport.by.thisWeek"
              ),
              onClick: () => {
                this.$_issue_report_mixin_generateThisWeekReport();
              }
            },
            {
              text: this.$t(
                "complaint.index.toolbar.generateReport.by.thisMonth"
              ),
              onClick: () => {
                this.$_issue_report_mixin_generateThisMonthReport();
              }
            },
            { divider: true },
            { component: () => ComplaintReportGenerator }
          ]
        },
        {
          icon: "settings",
          text: this.$t("complaint.index.toolbar.inboxConfigs.tooltip"),
          onClick: () => {
            this.showConfig = true;
          }
        }
      ];
    },
    vuexSelected: {
      get() {
        return this.$_vuexable_getState("selected", vuex.modules.ISSUE);
      },

      set(value) {
        this.$_vuexable_setState(
          { key: "selected", value },
          vuex.modules.ISSUE
        );

        return this;
      }
    },
    vuexSelectedValues() {
      return Object.values(this.vuexSelected);
    },

    vuexSomeSelectedValues() {
      return _.some(this.vuexSelectedValues, Boolean);
    }
  },

  methods: {
    isTabActive(key) {
      return this.tab === key;
    },

    unCheckAll() {
      this.$set(this.items[0], "selected", false);
    },

    onRouteQueryChange({ type = null } = {}) {
      let global_filters = [];

      switch (type) {
        case "archive":
          global_filters = [
            { key: "archive", value: 1 },
            { key: "deleted_at", value: null }
          ];
          break;

        case "trash":
          global_filters = [
            { key: "archive", value: 0 },
            { key: "deleted_at", value: null, not: true }
          ];
          break;
      }

      this.$_vuexable_setState(
        {
          key: "type",
          value: type
        },
        vuex.modules.ISSUE
      );

      this.$_vuexable_setState(
        {
          key: "global_filters",
          value: global_filters
        },
        vuex.modules.ISSUE
      );
    }
  },

  created() {
    this.$_issue_status_mixin_fetchStatuses();
  }
};
</script>

<style lang="stylus">
#complaintSelectController {
  .v-input--checkbox {
    align-items: center;
  }
}

#complaintToolbar {
  position: sticky;
  top: 64px;
  z-index: 2;

  .v-toolbar__content {
    border-bottom: 1px solid #E0E0E0;
    padding: 0 16px;
  }

  .v-toolbar__extension {
    padding: 0;
    height: auto !important;

    .v-tabs__item {
      padding-right: 5rem;

      &:first-child {
        padding-left: 16px;
      }

      &:last-child {
        padding-left: 16px;
      }
    }
  }
}

.complaint-selection-menu {
  width: 30px;
  margin-left: -0.5rem;
}

@media only screen and (max-width: 1024px) {
  #complaintToolbar {
    top: 57px;
  }
}
</style>
