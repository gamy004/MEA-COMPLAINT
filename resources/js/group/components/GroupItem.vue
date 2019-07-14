<template>
  <v-layout align-center class="group-item">
    <v-list-tile-content>
      <v-text-field
        v-if="editing"
        v-model="form.name"
        autofocus
        flat
        background-color="transparent"
        :hide-details="!form.errors.has('name')"
        solo
        :error="form.errors.has('name')"
        :error-messages="form.errors.getError('name')"
        @input="form.errors.clear('name')"
        @keyup.enter="save"
      ></v-text-field>
      <span v-else>{{ item.text }}</span>
    </v-list-tile-content>
    <v-spacer></v-spacer>

    <transition name="slide-x-reverse-transition">
      <span v-if="updated" class="caption mr-1" :class="messageClass">{{ message }}</span>
    </transition>

    <v-list-tile-action @click.stop>
      <v-btn v-if="editing" icon @click.stop.prevent="save">
        <v-icon>check</v-icon>
      </v-btn>

      <v-layout v-else>
        <v-btn icon @click.stop.prevent="edit" class="mr-1">
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn icon @click.stop.prevent="warning = true" :loading="removing">
          <v-icon>delete</v-icon>
        </v-btn>
      </v-layout>
    </v-list-tile-action>

    <warning-dialog
      :dialogable-visible.sync="warning"
      @click:accept.prevent.stop="remove"
      :accept-text="$t('general.delete')"
    >
      <template v-slot:header>{{ $t('general.delete') }} {{ item.text }}?</template>

      <template v-slot:message>{{ warningMessage }}</template>
    </warning-dialog>
  </v-layout>
</template>

<script>
import { vuex, vuexable } from "../../mixins/vuexable";
import managable from "../../mixins/managable";
import WarningDialog from "../../components/WarningDialog";

export default {
  props: ["input", "item", "index"],

  model: {
    prop: "input",
    event: "change"
  },

  mixins: [managable, vuexable],

  components: {
    WarningDialog
  },

  data() {
    return {
      editing: false,
      updated: false,
      removing: false,
      warning: false,
      message: "",
      messageClass: "",
      form: vuex.models.FORM.make({
        id: this.item.value,
        name: this.item.text
      })
    };
  },

  computed: {
    warningMessage() {
      return this.$t("userGroup.index.warningGroupItem.term", {
        item: this.item.text
      });
    }
  },

  methods: {
    edit() {
      this.editing = !this.editing;

      this.$emit("edit", this.editing);
    },

    async save() {
      let response;

      try {
        response = await this.$_managable_submitForm(this.form, ["id", "name"]);
      } catch (error) {
        this.message = this.$t("alertMessages.update_error");
        this.messageClass = "error--text";
        throw error;
      } finally {
        this.updated = true;
        setTimeout(() => {
          this.updated = false;
        }, 700);
      }

      this.editing = false;
      this.message = this.$t("alertMessages.update_success");
      this.messageClass = "success--text";

      this.$emit("change", this.form.name);
    },

    async remove() {
      let response;

      this.removing = true;

      const data = this.form.getData(["id"]);

      try {
        this.$emit("deleted", data);

        response = await this.$_vuexable_dispatch(
          vuex.actions.DELETE,
          this.managableModule,
          data
        );
      } catch (error) {
        this.message = this.$t("alertMessages.delete_error");
        this.messageClass = "error--text";
        throw error;
      } finally {
        this.updated = true;
        setTimeout(() => {
          this.updated = false;
        }, 700);
      }

      this.$emit("change", null);
      this.removing = false;
    }
  }
};
</script>

<style lang="scss">
.group-item {
  .v-input {
    &__slot {
      padding-left: 0 !important;
    }
  }
  .v-text-field {
    &__details {
      position: absolute;
      bottom: -5px;
      left: 5px;
    }
  }
}
</style>


