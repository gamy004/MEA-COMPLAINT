<template>
  <v-btn color="deep-orange" flat dark small @click="$_issue_category_mixin_dialog = true">
    <v-icon class="mr-1">add</v-icon>
    <span v-t="'issueCategory.index.createBtn'"></span>
  </v-btn>
</template>

<script>
import issueCategoryMixin from "../../mixins/issue-category-mixin";

export default {
  mixins: [issueCategoryMixin]
};
</script>

