<template>
  <div id="editorContainer">
    <!-- <editor api-key="2p4wbftum5afmu5eugdcvsugrwvv6ivinukanpci7rgi9oru" v-model="data"></editor> -->
    <editor
      api-key="2p4wbftum5afmu5eugdcvsugrwvv6ivinukanpci7rgi9oru"
      v-model="data"
      :init="config"
    ></editor>

    <!-- file list here -->

    <v-layout row wrap>
      <v-flex xs12>
        <div id="customToolbar"></div>
      </v-flex>

      <v-flex xs12>
        <v-layout align-center>
          <v-btn small flat color="primary">send</v-btn>
          <div id="customToolbar2">eiei</div>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
// import tinymce from "tinymce/tinymce";

// A theme is also required
// import "tinymce/themes/silver";

// // Any plugins you want to use has to be imported
// import 'tinymce/plugins/paste';
// import 'tinymce/plugins/link';

import Editor from "@tinymce/tinymce-vue";

export default {
  components: {
    Editor
  },

  data() {
    return {
      data: "<h1>Hello World!!</h1>",
      config: {
        paste_data_images: true,
        inline: true,
        resize: false,
        fixed_toolbar_container: "#customToolbar",
        menubar: false,
        // toolbar: "undo redo | styleselect | bold italic | outdent indent",
        toolbar_drawer: "sliding"
      }
    };
  },

  mounted() {}
};
</script>
