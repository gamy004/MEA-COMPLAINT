<template>
  <v-dialog v-model="dialog" persistent width="600">
    <v-card>
      <v-card-title class="headline">
        <slot name="header">Inbox Configuration</slot>
      </v-card-title>
      <v-card-text>
        <v-list class="inbox-config-list">
          <v-list-tile>
            <v-list-tile-action>
              <span class="mr-3 body-2">Maximum page size</span>
            </v-list-tile-action>

            <v-select
              v-model="form.rowsPerPage"
              :items="paginatable_rowsPerPage"
              outline
              color="deep-orange"
              full-width
              hide-details
              hide-no-data
              single-line
            ></v-select>
          </v-list-tile>
        </v-list>
      </v-card-text>
      <v-card-actions class="pa-3">
        <v-spacer></v-spacer>
        <v-btn flat @click="cancel">Cancel</v-btn>
        <v-btn
          dark
          color="deep-orange darken-1"
          class="rounded-sm"
          :loading="updatingConfigUser"
          @click.prevent="save"
        >Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import dialogable from "../../mixins/dialogable";
import paginatable from "../../mixins/paginatable";
import { vuex } from "../../mixins/vuexable";
export default {
  mixins: [dialogable, paginatable],

  data() {
    return {
      form: vuex.models.FORM.make({
        rowsPerPage: 10,
        inbox_settings: null
      })
    };
  },

  watch: {
    auth: {
      immediate: true,
      deep: true,
      handler({ inbox_settings = null }) {
        if (inbox_settings) {
          this.form.record({ ...JSON.parse(inbox_settings) });
        }
      }
    }
  },

  computed: {
    ...vuex.mapState(["auth"]),

    ...vuex.mapWaitingGetters({
      updatingConfigUser: "updating config user"
    }),

    routeParam() {
      return {
        user: this.auth.id
      };
    }
  },

  methods: {
    ...vuex.mapWaitingActions(vuex.modules.USER, {
      updateConfigUser: {
        action: vuex.actions.USER.UPDATE_CONFIG,
        loader: "updating config user"
      }
    }),

    cancel(event) {
      this.$_dialogable_closeDialog();
      this.$emit("click:cancel", event);
    },

    async save(event) {
      let response;

      const { routeParam } = this;
      const { rowsPerPage } = this.form.data;

      this.form.set("inbox_settings", JSON.stringify({ rowsPerPage }));

      try {
        await this.form.persist(this.updateConfigUser, {
          params: ["inbox_settings"],
          routeParam
        });
      } catch (error) {
        this.$emit("update:error", error);
        throw error;
      }

      this.$_dialogable_closeDialog();

      this.$emit("update:success");
    }
  }
};
</script>

<style lang="scss">
.inbox-config-list {
  .v-list__tile {
    padding: 0;
  }
}
</style>


