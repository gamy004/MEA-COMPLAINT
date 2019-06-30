<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card>
      <v-card-title class="headline">New Category</v-card-title>

      <v-card-text>
        <v-form>
          <v-text-field
            v-model="form.category"
            label="Category"
            color="deep-orange"
            outline
            single-line
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="pb-3">
        <v-spacer></v-spacer>
        <v-btn flat @click="dialog = false">Cancel</v-btn>
        <v-btn
          color="deep-orange"
          depressed
          class="mr-2 rounded-sm"
          dark
          :loading="form.isSubmitting"
          @click.prevent.stop="onSubmit"
        >Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import dialogable from "../../mixins/dialogable";
import managable from "../../mixins/managable";
import { vuex } from "../../mixins/vuexable";

export default {
  mixins: [dialogable, managable],

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
    }
  },

  methods: {
    async onSubmit() {
      const { form } = this;

      let v;

      try {
        v = await this.$_managable_submitForm(form, ["id", "category"]);
      } catch (error) {
        throw error;
      }
    }
  }
};
</script>

