<template>
  <v-layout row wrap>
    <v-flex xs12>
      <!-- <v-toolbar id="complaintToolbar" tabs dense class="elevation-0">
        <template v-for="(item, i) in items">
          <v-checkbox
            v-if="item.select"
            :key="i"
            v-model="item.selected"
            class="shrink"
            :color="getColor(item)"
            :indeterminate="item.indeterminate(item)"
            hide-details
            @change="onEmit('onChange', $event, item, i)"
          ><span v-if="item.text" v-html="item.text"></span></v-checkbox>

          <v-menu
            v-else-if="item.menu"
            :key="i"
            :open-on-hover="item.hover"
            min-width="200"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-icon v-if="hasIcon(item)" v-text="item.icon" :class="getClasses(item)" v-on="on"></v-icon>

              <v-btn v-else-if="item.customActivator" flat :class="getClasses(item)" v-on="on">
                <div class="caption text-lowercase" v-html="item.customActivator()"></div>
              </v-btn>

              <div v-else v-html="item.text" :class="getClasses(item)" v-on="on"></div>
            </template>

            <v-list v-if="item.menuItems" dense>
              <v-list-tile
                v-for="(menuItem, menuIndex) in item.menuItems"
                :key="`menuItem-${i}--${menuIndex}`"
                :disabled="getDisabledAttribute(menuItem)"
                @click="onEmit('onClick', $event, menuItem, i, menuIndex)"
              >
                <v-list-tile-title class="pl-4">{{ menuItem.text }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>

          <v-spacer v-else-if="item.spacer" :key="i"/>

          <v-tooltip v-else-if="item.icon && item.text" :key="i" bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                icon
                small
                :disabled="getDisabledAttribute(item)"
                @click="onEmit('onClick', $event, item, i)"
              >
                <v-icon>{{ item.icon }}</v-icon>
              </v-btn>
            </template>
            <span>{{ item.text }}</span>
          </v-tooltip>

          <v-btn v-else-if="item.icon" :key="i" icon small>
            <v-icon>{{ item.icon }}</v-icon>
          </v-btn>

          <span v-else :key="i" v-text="item.text"></span>
        </template>

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
      </v-toolbar>-->
      <custom-toolbar :items="items">
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
  </v-layout>
</template>

<script>
import ComplaintList from "../components/ComplaintList";
import CustomToolbar from "../../components/CustomToolbar";
import { vuex } from "../../mixins/vuexable";
import paginatable from "../../mixins/paginatable";
import complaintModule from "../../stores/modules/complaints";
import groupModule from "../../stores/modules/groups";
import statusModule from "../../stores/modules/statuses";
export default {
  mixins: [paginatable],

  components: {
    ComplaintList,
    CustomToolbar
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
          customActivator: () => {
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
        this.onEmit("onPaginatedListChange", paginatedList, item, index);
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
    $_paginatable_module() {
      return vuex.modules.COMPLAINT;
    }
  },

  methods: {
    isTabActive(key) {
      return this.tab === key;
    },

    // getColor({ color = "accent" }) {
    //   return color;
    // },

    // hasIcon({ icon = "" } = {}) {
    //   return icon.length !== 0;
    // },

    // getClasses({ classes = {} } = {}) {
    //   return classes;
    // },

    // getDisabledAttribute(item) {
    //   return item.disabled ? item.disabled() : false;
    // },

    onEmit(eventName, $event, item, ...indexes) {
      return item[eventName]
        ? item[eventName]($event, item, indexes)
        : () => ({});
    }
  },

  beforeCreate() {
    this.$store.registerModule(vuex.modules.COMPLAINT, complaintModule);
    this.$store.registerModule(vuex.modules.GROUP, groupModule);
    this.$store.registerModule(vuex.modules.STATUS, statusModule);
  },

  beforeDestroy() {
    this.$store.unregisterModule(vuex.modules.COMPLAINT);
    this.$store.unregisterModule(vuex.modules.GROUP);
    this.$store.unregisterModule(vuex.modules.STATUS);
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


