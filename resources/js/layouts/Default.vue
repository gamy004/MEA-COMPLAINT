<template>
  <v-app id="meaDefault">
    <add-complaint-btn v-if="isMobile" />

    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      class="grey lighten-4"
      app
      :mobile-break-point="mobileBreakPoint"
    >
      <v-list dense class="grey lighten-4">
        <add-complaint-btn v-if="!isMobile" />

        <template v-for="(item, i) in items">
          <v-layout v-if="item.heading" :key="i" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex v-if="item.route" xs6 class="text-xs-right">
              <v-btn small flat @click="gotoPage(item.route)">edit</v-btn>
            </v-flex>
          </v-layout>

          <v-divider v-else-if="item.divider" :key="i" dark class="my-3"></v-divider>

          <v-list-tile v-else :key="i" @click="gotoPage(item.route)">
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

      <v-text-field
        flat
        solo
        color="deep-orange"
        hide-details
        label="Search complaint"
        prepend-inner-icon="search"
      >
        <template #append>
          <complaint-search-filter :dialogable-visible.sync="searchFilter" />
        </template>
      </v-text-field>

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
    </v-content>
  </v-app>
</template>

<script>
import layoutable from "../mixins/layoutable";
import complaintMixin from "../mixins/complaint-mixin";
import AddComplaintBtn from "../complaint/components/AddComplaintBtn";
import ComplaintForm from "../complaint/components/ComplaintForm";
import ComplaintSearchFilter from "../complaint/components/ComplaintSearchFilter";
import { views } from "../constants";

export default {
  mixins: [layoutable, complaintMixin],

  components: {
    AddComplaintBtn,
    ComplaintForm,
    ComplaintSearchFilter
  },

  data() {
    return {
      searchFilter: false,
      filtered: false,
      items: [
        {
          icon: "inbox",
          text: "Inbox",
          route: { name: views.ISSUE.INDEX }
        },
        {
          icon: "start",
          text: "Starred",
          route: { name: views.ISSUE.INDEX }
        },
        {
          icon: "lightbulb_outline",
          text: "Notes",
          route: { name: views.ISSUE.INDEX }
        },
        { divider: true },
        {
          icon: "send",
          text: "Sent",
          route: { name: views.ISSUE.INDEX }
        },
        {
          icon: "drafts",
          text: "Drafts",
          route: { name: views.ISSUE.INDEX }
        },
        {
          icon: "archive",
          text: "Archive",
          route: { name: views.ISSUE.INDEX }
        },
        {
          icon: "delete",
          text: "Trash",
          route: { name: views.ISSUE.INDEX }
        },
        { divider: true },
        { heading: "Admin Management" },
        {
          icon: "category",
          text: "Categories",
          route: { name: views.ISSUE_CATEGORY.INDEX }
        },
        {
          icon: "bookmarks",
          text: "Statuses",
          route: { name: views.ISSUE_STATUS.INDEX }
        }
        //   { icon: "chat_bubble", text: "Trash" },
        //   { icon: "help", text: "Help" },
        //   { icon: "phonelink", text: "App downloads" },
        //   { icon: "keyboard", text: "Keyboard shortcuts" }
      ]
    };
  },

  methods: {
    gotoPage({ name, params = {} } = {}) {
      this.$router.push({
        name,
        params
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
}
</style>