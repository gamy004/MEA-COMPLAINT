<template>
  <v-app id="meaDefault">
    <add-complaint-btn v-if="isMobile" />

    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      class="grey lighten-4 pl-2"
      app
      :width="256"
      :mobile-break-point="mobileBreakPoint"
    >
      <v-list dense class="grey lighten-4">
        <add-complaint-btn v-if="!isMobile" class="add-complaint__button--main" />

        <template v-for="(item, i) in defaultItems">
          <v-layout v-if="item.heading" :key="i" row align-center>
            <v-flex :class="item.route ? 'xs6' : 'xs12'">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>

            <v-flex v-if="item.route" xs6 class="text-xs-right">
              <v-btn small flat @click="gotoPage(item.route)">edit</v-btn>
            </v-flex>
          </v-layout>

          <v-divider v-else-if="item.divider" :key="i" dark class="my-3"></v-divider>

          <v-list-tile
            v-else
            :key="i"
            @click="item.onClick ? item.onClick(item) : gotoPage(item.route)"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar id="toolbarLayoutDefault" class="elevation-0 bb-1" app fixed clipped-left>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>

      <span class="title ml-3 mr-5">
        MEA
        <span class="font-weight-light">Complaint</span>
      </span>

      <complaint-search-filter
        :dialogable-visible.sync="searchFilter"
        @alert:invalidSearchForm="$_alertable_alert('invalidSearchForm')"
        @alert:searchError="$_alertable_alert('searchError')"
      />

      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height pa-0 class="grey lighten-4" v-resize="onResize">
        <slot />

        <complaint-form
          v-if="!hasEdittedComplaint && complaintDialog"
          :managable-module="vuex.modules.ISSUE"
          :managable-route-param="{}"
          :managable-edit="false"
        />
      </v-container>

      <message-alert
        key="alertDefault"
        :alertable-visible.sync="alertable_alert"
        :alertable-type="alertable_type"
        :alertable-messages="alertable_messages"
        :alertable-props="alertable_props"
      ></message-alert>
    </v-content>
  </v-app>
</template>

<script>
import alertable from "../mixins/alertable";
import layoutable from "../mixins/layoutable";
import complaintMixin from "../mixins/complaint-mixin";
import AddComplaintBtn from "../complaint/components/AddComplaintBtn";
import ComplaintForm from "../complaint/components/ComplaintForm";
import ComplaintSearchFilter from "../complaint/components/ComplaintSearchFilter";
import MessageAlert from "../components/MessageAlert";
import { views } from "../constants";
import { issueSearchMixin } from "../mixins/issue-search-mixin";
import { vuex } from "../mixins/vuexable";

export default {
  mixins: [alertable, layoutable, complaintMixin, issueSearchMixin],

  components: {
    AddComplaintBtn,
    ComplaintForm,
    ComplaintSearchFilter,
    MessageAlert
  },

  data() {
    return {
      searchFilter: false,
      filtered: false,
      alertable_messages: {
        invalidSearchForm: {
          text: this.$t("alertMessages.searchComplaint.invalidQuery")
        },
        searchError: {
          text: this.$t("alertMessages.searchComplaint.error"),
          type: "error"
        }
      }
    };
  },

  computed: {
    ...vuex.mapState(["auth"]),

    defaultItems() {
      const baseItems = [
        {
          icon: "inbox",
          text: this.$t("sidebar.inbox"),
          route: { name: views.ISSUE.INDEX },
          onClick: item => {
            this.resetStateAndGotoRoute(item);
          }
        },
        { divider: true },
        {
          icon: "drafts",
          text: this.$t("sidebar.draft"),
          route: {
            name: views.ISSUE.INDEX,
            query: {
              type: "draft"
            }
          }
        },
        {
          icon: "archive",
          text: this.$t("sidebar.archive"),
          route: {
            name: views.ISSUE.INDEX,
            query: {
              type: "archive"
            }
          },
          onClick: item => {
            this.resetStateAndGotoRoute(item);
          }
        },
        {
          icon: "delete",
          text: this.$t("sidebar.trash"),
          route: {
            name: views.ISSUE.INDEX,
            query: {
              type: "trash"
            }
          },
          onClick: item => {
            this.resetStateAndGotoRoute(item);
          }
        }
      ];

      const adminItems = this.auth.isAdmin
        ? [
            { divider: true },
            { heading: this.$t("sidebar.adminSection") },
            {
              icon: "category",
              text: this.$t("sidebar.categories"),
              route: { name: views.ISSUE_CATEGORY.INDEX }
            },
            {
              icon: "bookmarks",
              text: this.$t("sidebar.statuses"),
              route: { name: views.ISSUE_STATUS.INDEX }
            },
            {
              icon: "group",
              text: this.$t("sidebar.usersAndGroups"),
              route: { name: views.USER.INDEX }
            }
          ]
        : [];

      return [...baseItems, ...adminItems];
    }
  },

  methods: {
    resetStateAndGotoRoute(item) {
      this.$_issue_search_mixin_clearState();

      this.gotoPage(item.route);
    },

    gotoPage({ name, params = {}, query = {} } = {}) {
      this.$router.push({
        name,
        params,
        query
      });
    }
  }
};
</script>

<style lang="stylus">
#meaDefault {
  .v-navigation-drawer__border {
    display: none;
  }

  .v-toolbar {
    &.bb-1 {
      border-bottom: 1px solid #E0E0E0;
    }
  }

  #toolbarLayoutDefault {
    .title + * {
      margin-left: 4rem;
    }
  }

  .add-complaint {
    &__button {
      &--main {
        left: -5px;
      }
    }
  }
}
</style>