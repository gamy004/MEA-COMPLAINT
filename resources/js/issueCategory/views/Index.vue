<template>
  <v-layout>
    <v-flex xs12>
      <v-card flat white class="fill-height">
        <v-card-title class="pa-0">
          <custom-toolbar :items="toolbars" class="py-0 bb-1"></custom-toolbar>
        </v-card-title>

        <v-card-text class="pa-0">
          <custom-table
            v-model="selected"
            :headers="headers"
            :items="$_issue_category_mixin_issue_paginated_items"
            item-key="text"
            :total-items="pagination.totalItems"
            :pagination="$_issue_category_mixin_pagination"
            :loading="$_issue_category_mixin_fetching"
            :selectable="false"
            :multiple-select="false"
            hide-actions
            @update:pagination="onPaginationChange"
          />
          <!-- <v-data-table
            :headers="headers"
            :items="desserts"
            :search="search"
            hide-actions
            :pagination.sync="pagination"
          >
            <template v-slot:items="props">
              <td>{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.calories }}</td>
              <td class="text-xs-right">{{ props.item.fat }}</td>
              <td class="text-xs-right">{{ props.item.carbs }}</td>
              <td class="text-xs-right">{{ props.item.protein }}</td>
              <td class="text-xs-right">{{ props.item.iron }}</td>
            </template>
          </v-data-table>
          <div class="text-xs-center pt-2">
            <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
          </div>-->
        </v-card-text>
      </v-card>
    </v-flex>

    <dialog-create-update-category
      :dialogable-visible.sync="$_issue_category_mixin_dialog"
      :managable-module="vuex.modules.ISSUE_CATEGORY"
      :managable-route-param="routeParam"
      :managable-edit="false"
    />
  </v-layout>
</template>

<script>
import CustomToolbar from "../../components/CustomToolbar";
import CustomTable from "../../components/CustomTable";
import issueCategoryMixin from "../../mixins/issue-category-mixin";
import { vuex } from "../../mixins/vuexable";
import ButtonCreateCategory from "../components/ButtonCreateCategory";
import DialogCreateUpdateCategory from "../components/DialogCreateUpdateCategory";
import { views } from "../../constants";

export default {
  mixins: [issueCategoryMixin],

  components: {
    CustomToolbar,
    DialogCreateUpdateCategory,
    CustomTable
  },

  data() {
    return {
      vuex,
      pagination: {},
      selected: [],
      headers: [
        {
          text: "Category",
          align: "left",
          sortable: true,
          value: "category"
        }
      ]
    };
  },

  computed: {
    toolbars() {
      return [
        { text: "Categories", classes: { title: true } },
        { spacer: true },
        { component: () => ButtonCreateCategory }
      ];
    },

    routeParam() {
      return this.$_issue_category_mixin_isEditing
        ? {
            issue_category: this.$_issue_category_mixin_edit.id
          }
        : {};
    }
  },

  methods: {
    async onPaginationChange(newPagination) {
      await this.$_issue_category_mixin_onPaginationUpdate(newPagination);

      this.$router.push({
        name: views.ISSUE_CATEGORY.INDEX,
        query: {
          page: newPagination.page,
          descending: newPagination.descending
        }
      });
    }
  },

  created() {
    this.$_issue_category_mixin_pagination = {
      sortBy: "category",
      page: _.toInteger(this.$route.query.page) || 1,
      descending: this.$route.query.descending === "true" || false
    };
  }
};
</script>
