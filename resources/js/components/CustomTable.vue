<template>
  <v-layout column>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      :item-key="itemKey"
      :pagination.sync="paginationSync"
      :totalItems="computedTotalItems"
      :loading="showProgress"
      class="v-table--sticky-header"
      select-all
      :hide-headers="hideHeaders"
      :hide-actions="hideActions"
    >
      <v-progress-linear slot="progress" height="3" color="primary" indeterminate></v-progress-linear>

      <template slot="headers" slot-scope="props">
        <tr>
          <th v-show="selectable"></th>
          <!-- <th>
          <v-checkbox
            :input-value="props.all"
            :indeterminate="props.indeterminate"
            primary
            hide-details
            @click.stop="toggleAll"
          ></v-checkbox>
          </th>-->
          <th
            v-for="header in props.headers"
            :key="header.text"
            :class="getHeaderThClass(header)"
            @click="changeSort(header)"
          >
            <span v-if="isAlign(header, 'left')">{{ header.text }}</span>
            <v-icon v-if="isSortable(header)" small>arrow_upward</v-icon>
            <span v-if="isAlign(header, 'right')">{{ header.text }}</span>
          </th>

          <th v-if="showActions"></th>
        </tr>
      </template>

      <template slot="items" slot-scope="props">
        <tr class="v-table__tr" :active="props.selected" @click="onClickRow($event, props)">
          <td v-show="selectable">
            <v-checkbox ref="selectCheckBox" v-model="props.selected" primary hide-details></v-checkbox>
          </td>
          <slot name="items" :item="props.item">
            <td
              v-for="(header, headerIndex) in headers"
              :key="`${header.value}-${headerIndex}`"
              :class="getAlignClass(header.align)"
            >
              <!-- <span v-if="header.isDateTime">{{ formatDate(props.item[header.value]) }}</span> -->
              <span>{{ formatValue(props.item[header.value]) }}</span>
            </td>
          </slot>

          <td v-if="showActions" class="td__action">
            <v-menu bottom origin="center center" transition="scale-transition">
              <template v-slot:activator="{ on }">
                <v-btn icon dark v-on="on">
                  <v-icon>more_vert</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-tile
                  v-for="(action, i) in actions"
                  :key="i"
                  @click="emitAction(action, props.item, props.index)"
                >
                  <v-list-tile-title v-text="getTitle(action)"></v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </td>
        </tr>
      </template>
    </v-data-table>

    <div class="text-xs-center pt-2">
      <v-pagination
        v-model="$_tableable_mixin_pagination_page"
        :length="$_tableable_mixin_pagination_pages"
      ></v-pagination>
    </div>
  </v-layout>
</template>

<script>
import tableable from "../mixins/tableable";

export default {
  mixins: [tableable],

  methods: {
    getTitle(action) {
      return _.capitalize(action);
    },

    formatValue(value) {
      return !value ? "-" : value;
    }
  }
};
</script>
