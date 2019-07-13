<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card>
      <v-card-title class="headline">
        <span>{{ $t(`issueCategory.index.form.title.${$_issue_category_mixin_edit ? "update" : "new" }`) }}</span>
      </v-card-title>

      <v-card-text>
        <v-form>
          <v-text-field
            v-model="form.category"
            :label="$t('issueCategory.index.form.name')"
            color="deep-orange"
            outline
            single-line
            :error="form.errors.has('category')"
            :error-messages="form.errors.getError('category')"
            @input="form.errors.clear('category')"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="pb-3">
        <v-spacer></v-spacer>
        <v-btn flat @click="closeForm">{{ $t('general.cancel') }}</v-btn>
        <v-btn
          color="deep-orange"
          depressed
          class="mr-2 rounded-sm"
          dark
          :loading="form.isSubmitting"
          @click.prevent.stop="onSubmit"
        >{{ $_managable_actionButton }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import dialogable from "../../mixins/dialogable";
import managable from "../../mixins/managable";
import { vuex } from "../../mixins/vuexable";
import issueCategoryMixin from "../../mixins/issue-category-mixin";

export default {
  mixins: [dialogable, managable, issueCategoryMixin],

  data() {
    return {
      form: vuex.models.FORM.make({
        category: ""
      })
    };
  },

  watch: {
    dialog(v) {
      if (v) {
        this.form.reset();
      }
    },

    $_issue_category_mixin_edit: {
      deep: true,
      handler({ id = null, category = "" } = {}) {
        this.form.record({ id, category });
      }
    }
  },

  methods: {
    closeForm() {
      this.dialog = false;
      this.$_issue_category_mixin_edit = null;
    },

    async onSubmit() {
      const { form } = this;

      let v;

      try {
        v = await this.$_managable_submitForm(form, ["category"]);
      } catch (error) {
        throw error;
      }

      this.closeForm();
    }
  }
};
</script>

