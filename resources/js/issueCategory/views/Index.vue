<template>
  <v-layout>
    <v-flex xs12>
      <v-card flat white class="fill-height">
        <v-card-title class="pa-0">
          <custom-toolbar :items="toolbars" class="py-0 bb-1"></custom-toolbar>
        </v-card-title>

        <v-card-text>//list here</v-card-text>
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
import issueCategoryMixin from "../../mixins/issue-category-mixin";
import { vuex } from "../../mixins/vuexable";
import ButtonCreateCategory from "../components/ButtonCreateCategory";
import DialogCreateUpdateCategory from "../components/DialogCreateUpdateCategory";

export default {
  mixins: [issueCategoryMixin],

  components: {
    CustomToolbar,
    DialogCreateUpdateCategory
  },

  data() {
    return {
      vuex
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
  }
};
</script>
