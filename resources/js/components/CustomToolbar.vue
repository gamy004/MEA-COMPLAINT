<template>
  <v-toolbar id="complaintToolbar" tabs dense class="elevation-0">
    <template v-for="(item, i) in items">
      <v-checkbox
        v-if="item.select"
        :key="i"
        v-model="item.selected"
        class="shrink"
        :color="getColor(item)"
        :indeterminate="getIndeterminate(item)"
        hide-details
        @change="onEmit('onChange', $event, item, i)"
      ></v-checkbox>

      <v-menu v-else-if="item.menu" :key="i" :open-on-hover="item.hover" min-width="200" offset-y>
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

      <v-tooltip
        v-else-if="item.icon && item.text"
        :key="i"
        v-bind="item.tooltipAttr ? item.tooltipAttr : { bottom: true }"
      >
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
      <slot name="extension"></slot>
    </template>
  </v-toolbar>
</template>

<script>
import { onEmit } from "../helpers";

export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onEmit,

    hasIcon({ icon = "" } = {}) {
      return icon.length !== 0;
    },

    getIndeterminate(item) {
      return item.indeterminate ? item.indeterminate(item) : false;
    },

    getColor({ color = "accent" }) {
      return color;
    },

    getClasses({ classes = {} } = {}) {
      return classes;
    },

    getDisabledAttribute(item) {
      return item.disabled ? item.disabled() : false;
    }
  }
};
</script>
