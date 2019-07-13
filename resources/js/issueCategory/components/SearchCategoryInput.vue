<template>
  <div>
    <v-text-field
      flat
      solo
      color="deep-orange"
      hide-details
      :label="$t('issueCategory.index.searchLabel')"
      prepend-inner-icon="search"
      :loading="isSearchingCategory"
      v-model="searchKeyword"
      class="search-category__input"
      @keyup.enter.prevent="search"
    ></v-text-field>
  </div>
</template>

<script>
import { vuex, vuexable } from "../../mixins/vuexable";
import issueCategoryMixin from "../../mixins/issue-category-mixin";
export default {
  mixins: [issueCategoryMixin, vuexable],

  data() {
    return {
      searchKeyword: ""
    };
  },

  computed: {
    ...vuex.mapWaitingGetters({
      isSearchingCategory: "search category fetching"
    })
  },

  methods: {
    ...vuex.mapWaitingActions(vuex.modules.ISSUE_CATEGORY, {
      searchCategory: {
        action: vuex.actions.ISSUE_CATEGORY.FETCH,
        loader: "search category fetching"
      }
    }),

    search() {
      let value = {
        keyword: "",
        fields: []
      };

      if (this.searchKeyword.length) {
        value = {
          keyword: this.searchKeyword,
          fields: ["category"]
        };
      }

      this.$_vuexable_updatePagination(
        {
          key: "search",
          value
        },
        vuex.modules.ISSUE_CATEGORY
      );

      return this.searchCategory({
        pagination: this.$_issue_category_mixin_pagination
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.search-category {
  &__input {
    width: 300px;
  }
}
</style>
