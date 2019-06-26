<template>
  <v-layout row wrap>
    <v-flex xs12>
      <custom-toolbar id="showComplaintToolbar" v-if="activeComplaint" :items="items"></custom-toolbar>

      <v-layout align-center justify-center class="loading__wrapper">
        <v-flex xs12>
          <transition name="slide-y-reverse-transition" appear>
            <v-progress-circular
              v-if="$_complaint_mixin_isFetchingShowComplaint || isUpdatingStatus"
              :size="70"
              :width="7"
              color="deep-orange"
              indeterminate
            ></v-progress-circular>
          </transition>
        </v-flex>
      </v-layout>

      <v-layout class="content__wrapper" column pl-5>
        <v-flex xs12>
          <transition name="slide-y-reverse-transition" appear>
            <complaint-detail-card
              v-if="!$_complaint_mixin_isFetchingShowComplaint"
              :issue-id="$route.params.issue"
              class="pr-4"
            />
          </transition>
        </v-flex>

        <v-flex xs12>
          <v-btn color="light" @click="showRemarkForm">
            <v-icon>reply</v-icon>
            <span>Remark</span>
          </v-btn>
        </v-flex>
      </v-layout>
      <!-- <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="(tab, tabIndex) in tabs"
          :key="`tabItem-${tabIndex}`"
          :value="`tab-${tabIndex}`"
        >
          <complaint-list :type="tab.type" :active="isTabActive(`tab-${tabIndex}`)"></complaint-list>
        </v-tab-item>
      </v-tabs-items>-->
    </v-flex>

    <complaint-form
      v-if="complaintDialog"
      :managable-module="vuex.modules.ISSUE"
      :managable-route-param="complaintRouteParam"
      :managable-edit="hasActiveComplaint"
    />

    <message-alert
      key="alertComplaintShow"
      :alertable-visible.sync="alertable_alert"
      :alertable-type="alertable_type"
      :alertable-messages="alertable_messages"
      :alertable-props="alertable_props"
    ></message-alert>
  </v-layout>
</template>

<script>
import { vuex } from "../../mixins/vuexable";
import alertable from "../../mixins/alertable";
import CustomToolbar from "../../components/CustomToolbar";
import MessageAlert from "../../components/MessageAlert";
import ComplaintForm from "../components/ComplaintForm";
import complaintMixin from "../../mixins/complaint-mixin";
import ComplaintStatus from "../components/ComplaintStatus";
import ComplaintDetailCard from "../components/ComplaintDetailCard";

export default {
  mixins: [alertable, complaintMixin],

  components: {
    CustomToolbar,
    MessageAlert,
    ComplaintForm,
    ComplaintDetailCard
  },

  data() {
    return {
      remarkDialog:  false,
      alertable_messages: {
        update_status_success: {
          text: "Complaint Status was updated successfully.",
          type: "success"
        }
      }
    };
  },

  computed: {
    ...vuex.mapWaitingGetters({
      isUpdatingStatus: "updating complaint status"
    }),

    items() {
      return [
        {
          icon: "arrow_back",
          text: "Back to Inbox",
          onClick: () => {
            this.$router.go(-1);
          }
        },
        {
          icon: "archive",
          text: "Archive",
          onClick: async () => {
            // archive complaint

            // go back
            this.$router.go(-1);
          }
        },
        {
          icon: "delete",
          text: "Delete",
          onClick: async () => {
            // delete complaint

            // go back
            this.$router.go(-1);
          }
        },
        { divider: true },
        {
          menu: true,
          component: () => ComplaintStatus,
          componentProps: () => {
            return {
              issueId: this.activeComplaintId
            };
          },
          menuItems: this.statusesItems
        },
        { spacer: true },
        {
          icon: "keyboard_arrow_left",
          text: "Newer",
          disabled: () => this.$_paginatable_isFirstPage,
          onClick: () => {
            this.$_paginatable_toPrevPage();
          }
        },
        {
          icon: "keyboard_arrow_right",
          text: "Older",
          disabled: () => this.$_paginatable_isLastPage,
          onClick: () => {
            this.$_paginatable_toNextPage();
          }
        },
        { icon: "settings", text: "Settings" }
      ];
    },

    statuses() {
      return this.$_vuexable_getSortedValues(vuex.modules.ISSUE_STATUS);
    },

    statusesItems() {
      return this.statuses.map(({ id, status }) => {
        return {
          text: status,
          disabled: () => this.activeComplaint.issue_status_id === id,
          onClick: async () => {
            await this[vuex.actions.UPDATE]({
              id: this.activeComplaintId,
              issue_status_id: id,
              includes: [],
              routeParam: {
                issue: this.activeComplaintId
              }
            });

            this.$_alertable_alert("update_status_success");
          }
        };
      });
    }
  },

  methods: {
    ...vuex.mapWaitingActions(vuex.modules.ISSUE, {
      [vuex.actions.UPDATE]: "updating complaint status"
    }),

    showRemarkForm() {
      this.remarkDialog = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  &__wrapper {
    height: calc(100% - 60px);
    overflow: auto;
    background: white;
  }
}
</style>
