<template>
  <v-layout class="complaint-list" :class="isMobileClasses" row wrap>
    <v-flex xs12>
      <v-progress-linear
        v-if="$_complaint_mixin_isFetchingComplaint || $_issue_search_mixin_isSearchingComplaint"
        key="complaintLoading"
        color="deep-orange accent-2"
        :indeterminate="true"
      ></v-progress-linear>

      <transition v-else name="slide-y-transition" mode="out-in">
        <v-list
          v-if="$_paginatable_currentPaginatedList.length"
          key="complaintList"
          :three-line="isMobile"
          :class="isMobileClasses"
        >
          <template v-for="(item, itemIndex) in $_paginatable_currentPaginatedList">
            <complaint-list-item
              :key="`complaint-${itemIndex}`"
              :item="item"
              @archive="onArchiveItem(item, itemIndex)"
              @edit="onEditItem(item, itemIndex)"
              @update:status="onUpdateStatusItem"
              @delete="onDeleteItem(item, itemIndex)"
            />
          </template>
        </v-list>

        <v-layout v-else column align-center mt-5>
          <v-icon size="80" color="grey lighten-2">inbox</v-icon>
          <v-flex shrink>
            <div class="subheading">ไม่พบข้อร้องเรียน</div>
          </v-flex>
        </v-layout>
      </transition>
    </v-flex>

    <message-alert
      key="alertComplaintList"
      :alertable-visible.sync="alertable_alert"
      :alertable-type="alertable_type"
      :alertable-messages="alertable_messages"
      :alertable-props="alertable_props"
      :alertable-timeout="5000"
    ></message-alert>
  </v-layout>
</template>

<script>
import alertable from "../../mixins/alertable";
import paginatable from "../../mixins/paginatable";
import { vuex, vuexable } from "../../mixins/vuexable";
import ComplaintListItem from "./ComplaintListItem";
import MessageAlert from "../../components/MessageAlert";
import { issueSearchMixin } from "../../mixins/issue-search-mixin";
import { views } from "../../constants";
import complaintMixin from "../../mixins/complaint-mixin";

export default {
  props: {
    type: String,
    active: {
      type: Boolean,
      default: () => false
    }
  },

  mixins: [alertable, paginatable, vuexable, complaintMixin, issueSearchMixin],

  components: {
    ComplaintListItem,
    MessageAlert
  },

  data() {
    return {
      vuex,
      warningDelete: false,
      alertable_messages: {
        error: "Cannot delete complaint, please try again.",
        update_status_success: {
          text: "Complaint Status was updated successfully",
          type: "success"
        },
        remove: {
          text: "Complaint moved to Trash",
          actions: [
            {
              text: "Undo",
              handler: async ({ item, itemIndex }) => {
                await this[vuex.actions.ISSUE.RESTORE](item);
                this.$_alertable_alert("undo");
              }
            }
          ]
        },
        archive_success: {
          text: "Complaint moved to Archive",
          actions: [
            {
              text: "Undo",
              handler: async ({ item, itemIndex }) => {
                await this[vuex.actions.ISSUE.RESTORE](item);
                this.$_alertable_alert("undo");
              }
            }
          ]
        },
        undo: "Action undone"
      }
    };
  },

  watch: {
    auth: {
      immediate: true,
      deep: true,
      handler({ inbox_settings = null } = {}) {
        const rowsPerPage = this.authSettingPerPage;

        if (rowsPerPage === this.$_paginatable_rowsPerPage) return;

        this.$_paginatable_pagination = {
          rowsPerPage
        };
      }
    },

    async $_paginatable_rowsPerPage(v) {
      if (
        !this.$_issue_search_mixin_searchFiltersVuex.length &&
        !this.$_issue_search_mixin_stateSearchKeyword.length
      ) {
        await this.callFetch();
      }
    },

    async $_paginatable_currentPage(v) {
      if (
        !this.$_issue_search_mixin_searchFiltersVuex.length &&
        !this.$_issue_search_mixin_stateSearchKeyword.length
      ) {
        await this.callFetch();

        this.$router.push({
          name: views.ISSUE.INDEX,
          query: {
            ...this.$route.query,
            page: this.$_paginatable_currentPage
          }
        });
      }
    },

    async $_paginatable_descending(v, ov) {
      if (
        v !== ov &&
        !this.$_issue_search_mixin_searchFiltersVuex.length &&
        !this.$_issue_search_mixin_stateSearchKeyword.length
      ) {
        await this.callFetch();

        this.$router.push({
          name: views.ISSUE.INDEX,
          query: {
            ...this.$route.query,
            descending: this.$_paginatable_descending
          }
        });
      }
    },

    $route: "onRouteChange"
  },

  computed: {
    $_paginatable_module() {
      return vuex.modules.ISSUE;
    },

    ...vuex.mapState(["auth"]),

    ...vuex.mapGetters(["isMobile", "isMobileClasses"]),

    authSettingPerPage() {
      let { inbox_settings = null } = this.auth;
      let rowsPerPage = 10;

      if (inbox_settings) {
        inbox_settings = JSON.parse(inbox_settings);

        rowsPerPage = inbox_settings.rowsPerPage;
      }

      return rowsPerPage;
    }

    // ...vuex.mapWaitingGetters({
    //   isFetchingComplaint: [vuex.actions.ISSUE.FETCH]
    // })
  },

  methods: {
    ...vuex.mapWaitingActions(vuex.modules.ISSUE, [
      // vuex.actions.ISSUE.FETCH,
      vuex.actions.ISSUE.EDIT,
      vuex.actions.ISSUE.DELETE,
      vuex.actions.ISSUE.RESTORE,
      vuex.actions.ISSUE.ARCHIVE
    ]),

    callFetch() {
      return this[vuex.actions.ISSUE.FETCH]();
    },

    async onArchiveItem(item, itemIndex) {
      const { id } = item;

      try {
        await this[vuex.actions.ISSUE.ARCHIVE](item);
      } catch (error) {
        throw error;
      }

      this.$_alertable_alert("archive_success", { item, itemIndex });
    },

    async onEditItem(item, itemIndex) {
      const { id } = item;

      try {
        await this[vuex.actions.ISSUE.EDIT](item);
      } catch (error) {
        throw error;
      }

      this.$_vuexable_setState(
        {
          key: "dialog",
          value: true
        },
        vuex.modules.ISSUE
      );

      this.$_vuexable_setEdit(id, vuex.modules.ISSUE);
    },

    async onUpdateStatusItem() {
      this.$_alertable_alert("update_status_success");
    },

    async onDeleteItem(item, itemIndex) {
      try {
        await this[vuex.actions.ISSUE.DELETE](item);

        this.$_alertable_alert("remove", { item, itemIndex });
      } catch (error) {
        this.$_alertable_alert("error");

        throw error;
      }
    },

    async onRouteChange() {
      if (
        !this.$route.query.q &&
        !this.$route.query.page &&
        !this.$route.query.descending
      ) {
        let descending = true;

        if (this.$route.query.hasOwnProperty("descending")) {
          descending = this.$route.query.descending == "true";
        }

        // let isDescendingChange = descending !== this.$_paginatable_descending;

        this.$_paginatable_pagination = {
          sortBy: "updated_at",
          page: this.$route.query.page || 1,
          descending,
          rowsPerPage: this.authSettingPerPage
        };

        // if (!isDescendingChange) {
        await this.callFetch();
        // }
      }
    }
  },

  async mounted() {
    this.callFetch = _.debounce(this.callFetch, 300);

    if (!this.$route.query.q) {
      let descending = true;

      if (this.$route.query.hasOwnProperty("descending")) {
        descending = this.$route.query.descending == "true";
      }

      // let isDescendingChange = descending !== this.$_paginatable_descending;

      this.$_paginatable_pagination = {
        sortBy: "updated_at",
        page: this.$route.query.page || 1,
        descending,
        rowsPerPage: this.authSettingPerPage
      };

      // if (!isDescendingChange) {
      await this.callFetch();
      // }
    }
  }
};
</script>

<style lang="scss">
.complaint-list {
  &.is-mobile {
    margin-bottom: 35px;
  }

  .v-list {
    padding-top: 0;
    padding-bottom: 0;

    &--three-line {
      &.is-mobile {
        .v-list__tile {
          align-items: flex-start;
          height: 120px;
          padding-top: 8px;
          padding-bottom: 8px;

          &__sub-title {
            white-space: nowrap;
            display: block;
          }
        }
      }
    }
  }

  &__sub-title {
    // display: flex;

    * {
      margin: 0 !important;
    }
  }
}
</style>
