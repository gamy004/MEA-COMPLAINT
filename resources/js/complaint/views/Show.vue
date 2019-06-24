<template>
  <v-layout row wrap>
    <v-flex xs12>
      <custom-toolbar id="showComplaintToolbar" :items="items"></custom-toolbar>

      <v-layout align-center justify-center class="loading__wrapper">
        <v-flex xs12>
          <transition name="slide-y-reverse-transition" appear>
            <v-progress-circular
              v-if="$_complaint_mixin_isFetchingShowComplaint"
              :size="70"
              :width="7"
              color="deep-orange"
              indeterminate
            ></v-progress-circular>
          </transition>
        </v-flex>
      </v-layout>

      <v-layout class="content__wrapper">
        <v-flex xs12>
          <transition name="slide-y-reverse-transition" appear>
            <complaint-detail-card
              v-if="!$_complaint_mixin_isFetchingShowComplaint"
              :issue-id="$route.params.issue"
              class="fill-height pl-5 pr-4"
            />
          </transition>
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
      :managable-module="vuex.modules.COMPLAINT"
      :managable-route-param="complaintRouteParam"
      :managable-edit="hasActiveComplaint"
    />
  </v-layout>
</template>

<script>
import CustomToolbar from "../../components/CustomToolbar";
import ComplaintForm from "../components/ComplaintForm";
import complaintMixin from "../../mixins/complaint-mixin";
import ComplaintStatus from "../components/ComplaintStatus";
import ComplaintDetailCard from "../components/ComplaintDetailCard";

export default {
  mixins: [complaintMixin],

  components: {
    CustomToolbar,
    ComplaintForm,
    ComplaintDetailCard
  },

  data() {
    return {
      test: false,
      items: [
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
          menuItems: [
            {
              text: "Newest",
              disabled: () => {
                return false;
              },
              onClick: () => {
                //
              }
            },
            {
              text: "Oldest",
              disabled: () => {
                return false;
              },
              onClick: () => {
                //
              }
            }
          ]
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
      ]
    };
  },

  computed: {
    //
  }
};
</script>

<style lang="scss" scoped>
.content {
  &__wrapper {
    height: calc(100% - 60px);
    overflow: auto;
  }
}
</style>


