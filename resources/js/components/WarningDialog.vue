<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">
        <slot name="header">Use Google's location service?</slot>
      </v-card-title>
      <v-card-text>
        <slot
          name="message"
        >Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="deep-orange darken-1" flat @click.stop.prevent="cancel">{{ cancelText }}</v-btn>
        <v-btn color="deep-orange darken-1" flat @click.stop.prevent="discard">{{ acceptText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import dialogable from "../mixins/dialogable";

export default {
  mixins: [dialogable],

  props: {
    cancelText: {
      type: String,
      default: "Cancel"
    },

    acceptText: {
      type: String,
      default: "Discard"
    }
  },

  methods: {
    cancel(event) {
      this.$_dialogable_closeDialog();
      this.$emit("click:cancel", event);
    },

    discard(event) {
      this.$_dialogable_closeDialog();
      this.$emit("click:accept", event);
    }
  }
};
</script>

