<template>
  <v-card class="complaint-form">
    <v-toolbar card dense color="blue-grey darken-2" dark>
      <v-icon>arrow_back</v-icon>
      <v-toolbar-title>Complaint</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon>send</v-icon>
    </v-toolbar>
    <v-form>
      <v-autocomplete
        v-model="selected"
        :items="['Trevor Handsen', 'Alex Nelson']"
        chips
        label="To"
        full-width
        hide-details
        hide-no-data
        hide-selected
        multiple
        single-line
      ></v-autocomplete>
      <v-divider></v-divider>
      <v-text-field
        label="Subject"
        value="Plans for the weekend"
        single-line
        full-width
        hide-details
      ></v-text-field>
      <v-divider></v-divider>
      <!-- <v-textarea
        v-model="title"
        class="complaint__description"
        label="Message"
        full-width
        single-line
        no-resize
      ></v-textarea>-->
      <custom-editor/>
    </v-form>
  </v-card>
</template>

<script>
import CustomEditor from "../../components/CustomEditor";

export default {
  components: {
    CustomEditor
  },

  data() {
    return {
      selected: ["Trevor Handsen"],
      items: ["Trevor Handsen", "Alex Nelson"],
      title:
        "Hi,\nI just wanted to check in and see if you had any plans the upcoming weekend. We are thinking of heading up to Napa"
    };
  }
};
</script>

<style lang="scss">
.complaint-form {
  .mce-content-body {
    min-height: 266px;
    height: 30vw;
    overflow: auto;
    padding: 0 8px;
  }
}
</style>


