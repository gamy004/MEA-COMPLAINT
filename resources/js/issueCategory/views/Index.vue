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
            item-key="id"
            :total-items="$_issue_category_mixin_totalItems"
            :pagination="$_issue_category_mixin_pagination"
            :loading="$_issue_category_mixin_fetching"
            :selectable="false"
            :multiple-select="false"
            :actions="actions"
            hide-actions
            @update:pagination="onPaginationChange"
            @action:edit="onItemEdit"
            @action:delete="onItemDelete"
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
      :managable-edit="$_issue_category_mixin_isEditing"
      @form:error="$_alertable_alert('error')"
      @form:create="$_alertable_alert('create_success')"
      @form:update="$_alertable_alert('update_success')"
    />

    <message-alert
      key="alertCategoryIndex"
      :alertable-visible.sync="alertable_alert"
      :alertable-type="alertable_type"
      :alertable-messages="alertable_messages"
      :alertable-props="alertable_props"
    />
  </v-layout>
</template>

<script>
import CustomToolbar from "../../components/CustomToolbar";
import CustomTable from "../../components/CustomTable";
import MessageAlert from "../../components/MessageAlert";
import issueCategoryMixin from "../../mixins/issue-category-mixin";
import { vuex } from "../../mixins/vuexable";
import ButtonCreateCategory from "../components/ButtonCreateCategory";
import DialogCreateUpdateCategory from "../components/DialogCreateUpdateCategory";
import { views } from "../../constants";
import alertable from "../../mixins/alertable";
import SearchCategoryInput from "../components/SearchCategoryInput";

export default {
  mixins: [alertable, issueCategoryMixin],

  components: {
    DialogCreateUpdateCategory,
    CustomToolbar,
    CustomTable,
    MessageAlert
  },

  data() {
    return {
      vuex,
      pagination: {},
      selected: [],
      headers: [
        {
          text: this.$t("issueCategory.index.header.category"),
          align: "left",
          sortable: true,
          value: "category"
        }
      ],
      alertable_messages: {
        error: this.$t("alertMessages.issueCategory.submit_error"),
        create_success: {
          text: this.$t("alertMessages.issueCategory.create_success"),
          type: "success"
        },
        edit_error: {
          text: this.$t("alertMessages.issueCategory.edit_error"),
          type: "error"
        },
        update_success: {
          text: this.$t("alertMessages.issueCategory.update_success"),
          type: "success"
        },
        delete_success: {
          text: this.$t("alertMessages.issueCategory.delete_success"),
          actions: [
            {
              text: "Undo",
              handler: async ({ item }) => {
                await this.$_issue_category_mixin_restoreCategory(item);

                this.$_alertable_alert("restore_success");
              }
            }
          ]
        },
        delete_error: {
          text: this.$t("alertMessages.issueCategory.delete_error"),
          type: "error"
        },
        restore_success: {
          text: this.$t("alertMessages.undo")
        }
      }
    };
  },

  computed: {
    toolbars() {
      return [
        {
          text: this.$t("issueCategory.index.title"),
          classes: { title: true }
        },
        { spacer: true },
        { component: () => SearchCategoryInput },
        { component: () => ButtonCreateCategory }
      ];
    },

    actions() {
      return this.$_vuexable_auth && this.$_vuexable_auth.isAdmin
        ? [
            { action: "edit", text: this.$t("general.edit") },
            { action: "delete", text: this.$t("general.delete") }
          ]
        : [];
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
    async onPaginationChange(newPagination, { force = false } = {}) {
      const original = this.$_issue_category_mixin_pagination;

      if (
        this.$_vuexable_shouldUpdatePagination(
          newPagination,
          vuex.modules.ISSUE_CATEGORY
        ) ||
        force
      ) {
        this.$_issue_category_mixin_pagination = {
          ...original,
          ...newPagination
        };

        await this.$_issue_category_mixin_fetchCategory({
          pagination: this.$_issue_category_mixin_pagination
        });

        this.$router.push({
          name: views.ISSUE_CATEGORY.INDEX,
          query: {
            page: newPagination.page,
            descending: newPagination.descending
          }
        });
      }
    },

    async onItemEdit(item) {
      try {
        await this.$_issue_category_mixin_onEditCategory(item);
      } catch (error) {
        this.$_alertable_alert("edit_error");
        throw error;
      }

      this.$_issue_category_mixin_dialog = true;
    },

    async onItemDelete(item) {
      try {
        await this.$_issue_category_mixin_deleteCategory(item);
      } catch (error) {
        this.$_alertable_alert("delete_error");
        throw error;
      }

      this.$_alertable_alert("delete_success", { item });
    }
  },

  async created() {
    this.onPaginationChange(
      {
        sortBy: "category",
        page: _.toInteger(this.$route.query.page) || 1,
        descending: this.$route.query.descending === "true" || false
      },
      { force: true }
    );
  }
};
</script>
