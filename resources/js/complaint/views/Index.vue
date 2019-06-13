<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-toolbar id="complaintToolbar" tabs dense class="elevation-0">
        <template v-for="(item, i) in items">
          <v-btn-toggle
            v-if="item.select"
            v-model="item.selected"
            :key="i"
            id="complaintSelectController"
            class="bg-transparent"
          >
            <v-checkbox
              id="complaintSelectAll"
              v-model="item.selectedAll"
              color="deep-orange"
              hide-details
            ></v-checkbox>
            <v-menu offset-y bottom min-width="200" id="complaintSelectTypeMenu">
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" id="complaintSelectTypeMenuActivator">arrow_drop_down</v-icon>
              </template>
              <v-list dense>
                <v-list-tile
                  v-for="(menu, menuIndex) in item.menus"
                  :key="`menu-${menuIndex}`"
                  @click
                >
                  <v-list-tile-title class="pl-4">{{ menu.text }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-btn-toggle>

          <v-spacer v-else-if="item.spacer" :key="i"/>

          <v-tooltip v-else-if="item.text" :key="i" bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon small>
                <v-icon>{{ item.icon }}</v-icon>
              </v-btn>
            </template>
            <span>{{ item.text }}</span>
          </v-tooltip>

          <v-btn v-else :key="i" icon small>
            <v-icon>{{ item.icon }}</v-icon>
          </v-btn>
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
      </v-toolbar>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="(tab, tabIndex) in tabs"
          :key="`tabItem-${tabIndex}`"
          :value="`tab-${tabIndex}`"
        >
          <v-card flat>
            <v-card-text v-text="tab.content"></v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      source: "",
      items: [
        {
          select: true,
          selected: null,
          selectedAll: false,
          menus: [
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
        { icon: "keyboard_arrow_left", text: "Newer" },
        { icon: "keyboard_arrow_right", text: "Older" },
        { icon: "settings", text: "Settings" }
      ],

      tab: null,
      showTab: false,
      tabs: [
        {
          icon: "inbox",
          text: "Primary",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
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

#complaintSelectTypeMenuActivator {
  width: 30px;
  margin-left: -0.5rem;
}
</style>


