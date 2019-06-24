<template>
  <v-layout row wrap>
    <v-flex xs12>
      <custom-toolbar id="complaintToolbar" :items="items">
        <template v-slot:extension>
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
      v-if="complaintDialog"
      :managable-module="vuex.modules.COMPLAINT"
      :managable-route-param="complaintRouteParam"
      :managable-edit="hasActiveComplaint"
    />
  </v-layout>
</template>

<script>
import ComplaintList from "../components/ComplaintList";
import CustomToolbar from "../../components/CustomToolbar";
import ComplaintForm from "../components/ComplaintForm";
// import { vuex } from "../../mixins/vuexable";
import complaintMixin from "../../mixins/complaint-mixin";
import { onEmit } from "../../helpers";
// import complaintModule from "../../stores/modules/complaints";
// import groupModule from "../../stores/modules/groups";
// import statusModule from "../../stores/modules/statuses";
// import issueCategoryModule from "../../stores/modules/issue-categories";
export default {
  mixins: [complaintMixin],

  components: {
    ComplaintList,
    CustomToolbar,
    ComplaintForm
  },

  data() {
    return {
      items: [
        {
          select: true,
          selected: false,
          color: "deep-orange",
          indeterminate: item => {
            return item.selected && !this.$_paginatable_isSelectedAll;
          },
          onChange: value => {
            this.$_paginatable_selectAll(value);
          },

          onPaginatedListChange: (value, item, indexes) => {
            const itemIndex = indexes[0];

            this.$set(
              this.items[itemIndex],
              "selected",
              this.$_paginatable_someSelected
            );
          }

          // onPageChange: (page, item, indexes) => {
          //   const itemIndex = indexes[0];

          //   this.items[itemIndex].updateSeleted(itemIndex);
          // },

          // onDescendingChange: (page, item, indexes) => {
          //   const itemIndex = indexes[0];

          //   this.items[itemIndex].updateSeleted(itemIndex);
          // }
        },
        {
          menu: true,
          icon: "arrow_drop_down",
          classes: {
            "complaint-selection-menu": true
          },
          menuItems: [
            { text: "All" },
            { text: "None" },
            { text: "Read" },
            { text: "Unread" },
            { text: "Starred" },
            { text: "Unstarred" }
          ]
        },
        { icon: "replay", text: "Refresh" },
        { icon: "more_vert" },
        { spacer: true },
        {
          menu: true,
          hover: true,
          html: () => {
            return this.$_paginatable_currentPageRange;
          },
          menuItems: [
            {
              text: "Newest",
              disabled: () => {
                return this.$_paginatable_descending;
              },
              onClick: () => {
                this.$_paginatable_descending = true;
              }
            },
            {
              text: "Oldest",
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
      ],

      tab: null,
      showTab: false,
      tabs: [
        {
          icon: "inbox",
          text: "Primary",
          type: "primary"
        }
      ]
    };
  },

  watch: {
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

  methods: {
    isTabActive(key) {
      return this.tab === key;
    }
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
  .v-toolbar__content {
    border-bottom: 1px solid #E0E0E0;
  }

  .v-toolbar__extension {
    padding: 0;

    .v-tabs__item {
      padding-right: 5rem;

      &:first-child {
        padding-left: 1rem;
      }

      &:last-child {
        padding-left: 1rem;
      }
    }
  }
}

.complaint-selection-menu {
  width: 30px;
  margin-left: -0.5rem;
}
</style>


