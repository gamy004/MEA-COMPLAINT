<template>
  <v-toolbar tabs dense class="custom-toolbar elevation-0">
    <slot name="left"></slot>

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

      <v-compoment
        v-else-if="!item.menu && item.component"
        :key="i"
        :is="item.component()"
        v-bind="item.componentProps ? item.componentProps() : {}"
      ></v-compoment>

      <v-menu
        v-else-if="item.menu"
        :key="i"
        :open-on-hover="item.hover"
        :min-width="item.minwidth || 200"
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-icon
            color="grey darken-4"
            v-if="hasIcon(item)"
            v-text="item.icon"
            :class="getClasses(item)"
            v-on="on"
          ></v-icon>

          <v-btn
            v-else-if="item.html || item.component"
            flat
            :class="getClasses(item)"
            v-on="on"
            @click.prevent.stop="item.onClick ? item.onClick($event, item, i) : () => {}"
          >
            <div v-if="item.html" class="caption text-lowercase" v-html="item.html()"></div>

            <v-compoment
              v-else-if="item.component"
              :is="item.component()"
              v-bind="item.componentProps ? item.componentProps() : {}"
            ></v-compoment>
          </v-btn>

          <div v-else v-html="item.text" :class="getClasses(item)" v-on="on"></div>
        </template>

        <v-list v-if="item.menuItems" dense>
          <v-list-tile
            v-for="(menuItem, menuIndex) in item.menuItems"
            :key="`menuItem-${i}--${menuIndex}`"
            :disabled="getDisabledAttribute(menuItem)"
            :class="getMenuItemClassAttribute(menuItem)"
            @click="onEmit('onClick', $event, menuItem, i, menuIndex)"
          >
            <v-subheader v-if="menuItem.subheading" class="body-2 pl-4" v-text="item.text" disabled></v-subheader>

            <v-divider v-else-if="menuItem.divider" />

            <v-compoment
              v-else-if="menuItem.component"
              :is="menuItem.component()"
              v-bind="menuItem.componentProps ? menuItem.componentProps() : {}"
            ></v-compoment>

            <v-list-tile-title v-else class="pl-4">{{ menuItem.text }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-spacer v-else-if="item.spacer" :key="i" />

      <v-divider v-else-if="item.divider" vertical class="custom-toolbar__divider" :key="i" />

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

      <v-btn v-else-if="item.icon" :key="i" icon small :class="getClasses(item)">
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>

      <span v-else :key="i" v-text="item.text" :class="getClasses(item)"></span>
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
    },

    getMenuItemClassAttribute(item) {
      return {
        "is-divider": item.divider
      };
    }
  }
};
</script>

<style lang="scss">
.custom-toolbar {
  background: white !important;
  padding-bottom: 8px;
  z-index: 1;

  &__divider {
    min-height: 45%;
    max-height: 45%;
    align-self: center;
  }
}

.v-list {
  .is-divider {
    .v-list {
      &__tile {
        padding: 0;
        height: 1px;
      }
    }
  }
}
</style>
