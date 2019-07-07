<template>
  <v-layout class="complaint-list" :class="isMobileClasses" row wrap>
    <v-flex xs12>
      <transition name="slide-y-transition" mode="out-in">
        <v-progress-linear
          v-if="$_complaint_mixin_isFetchingComplaint || $_issue_search_mixin_isSearchingComplaint"
          key="complaintLoading"
          :indeterminate="true"
        ></v-progress-linear>

        <v-list v-else key="complaintList" :three-line="isMobile" :class="isMobileClasses">
          <template v-for="(item, itemIndex) in $_paginatable_currentPaginatedList">
            <complaint-list-item
              :key="`complaint-${itemIndex}`"
              :item="item"
              @edit="onEditItem(item, itemIndex)"
              @update:status="onUpdateStatusItem"
              @delete="onDeleteItem(item, itemIndex)"
            />
          </template>
        </v-list>
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
              handler: ({ item, itemIndex }) => {
                this[vuex.actions.ISSUE.RESTORE](item);
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
        let rowsPerPage = 10;

        if (inbox_settings) {
          inbox_settings = JSON.parse(inbox_settings);

          rowsPerPage = inbox_settings.rowsPerPage;
        }

        if (rowsPerPage === this.$_paginatable_rowsPerPage) return;

        let descending = true;

        if (this.$route.query.hasOwnProperty("descending")) {
          descending = this.$route.query.descending == "true";
        }

        this.$_paginatable_pagination = {
          sortBy: "updated_at",
          page: this.$route.query.page || 1,
          descending,
          rowsPerPage
        };
      }
    },

    $_paginatable_pagination: {
      immediate: true,
      deep: true,
      async handler(v, ov) {
        if (this.active) {
          console.log("ComplaintList pagination changed: ", v);

          // if (!this.$_vuexable_shouldUpdatePagination(v, vuex.modules.ISSUE))
          //   return;

          const { $_issue_search_mixin_searchFiltersVuex = [] } = this;

          if ($_issue_search_mixin_searchFiltersVuex.length) {
            await this.$_issue_search_mixin_searchComplaint();
          } else {
            await this.callFetch();
          }

          this.$router.push({
            name: views.ISSUE.INDEX,
            query: {
              ...this.$route.query,
              page: this.$_paginatable_currentPage,
              descending: this.$_paginatable_descending
            }
          });
        }
      }
    }
  },

  computed: {
    $_paginatable_module() {
      return vuex.modules.ISSUE;
    },

    ...vuex.mapState(["auth"]),

    ...vuex.mapGetters(["isMobile", "isMobileClasses"])

    // ...vuex.mapWaitingGetters({
    //   isFetchingComplaint: [vuex.actions.ISSUE.FETCH]
    // })
  },

  methods: {
    ...vuex.mapWaitingActions(vuex.modules.ISSUE, [
      // vuex.actions.ISSUE.FETCH,
      vuex.actions.ISSUE.EDIT,
      vuex.actions.ISSUE.DELETE,
      vuex.actions.ISSUE.RESTORE
    ]),

    callFetch() {
      return this[vuex.actions.ISSUE.FETCH]();
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
    display: flex;

    * {
      margin: 0 !important;
    }
  }
}
</style>
