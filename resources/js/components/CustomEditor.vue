<template>
  <div class="editor-container" :class="editorClasses" @dragleave="dragleave">
    <!-- <editor api-key="2p4wbftum5afmu5eugdcvsugrwvv6ivinukanpci7rgi9oru" v-model="data"></editor> -->
    <v-layout v-show="!isInit" key="editorLoading" class="mx-3">
      <v-flex xs12>
        <v-progress-linear :indeterminate="true"></v-progress-linear>
      </v-flex>
    </v-layout>

    <editor
      :key="editorKey"
      ref="editor"
      api-key="2p4wbftum5afmu5eugdcvsugrwvv6ivinukanpci7rgi9oru"
      v-model="editorContent"
      :init="config"
      @onDrop.stop.prevent="onDrop"
      @onDragOver.stop.prevent="onDrageOver"
      @onInit="onInit"
    ></editor>

    <slot></slot>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";

if (!window.tinymce) {
  window.tinymce = tinymce;
}

import Editor from "@tinymce/tinymce-vue";
import vmodelable from "../mixins/vmodelable";

export default {
  mixins: [vmodelable],

  components: {
    Editor
  },

  props: {
    showToolbar: {
      type: Boolean,
      default: () => true
    },
    fullScreen: {
      type: Boolean,
      default: () => false
    }
  },

  data() {
    return {
      isInit: false
    };
  },

  computed: {
    editorContent: {
      get() {
        return this.vmodelable_vmodel;
      },

      set(v) {
        this.$_vmodelable_sync(v);
      }
    },

    editorKey() {
      return this.fullScreen ? "fullScreenEditor" : "editor";
    },

    fullScreenHeight() {
      return window.innerHeight * 0.4;
    },

    config() {
      return {
        plugins: "autoresize",
        paste_data_images: true,
        statusbar: false,
        menubar: false,
        min_height: this.fullScreen ? this.fullScreenHeight : 350,
        max_height: this.fullScreen ? this.fullScreenHeight : 650,
        autoresize: true,
        // toolbar: "undo redo | styleselect | bold italic | outdent indent",
        toolbar_drawer: "sliding"
      };
    },
    editorClasses() {
      return {
        "show-toolbar": this.showToolbar
      };
    }
  },

  methods: {
    onInit(event) {
      this.isInit = true;
    },

    onDrop(event) {
      this.$emit("editor:drop", event);
    },

    onDrageOver(event) {
      this.$emit("editor:dragover", event);
    },

    dragleave(event) {
      this.$emit("editor:dragleave", event);
    }
  }
};
</script>

<style lang="scss">
.editor-container {
  // position: relative;

  .mce-content-body {
    &:focus {
      outline: transparent auto 5px;
    }
  }

  .tox-tinymce {
    border: none;
    position: static !important;
  }

  .tox-toolbar-overlord {
    display: none;
    position: absolute;
    bottom: 60px;
    left: 0;
    right: 0;
    width: 95%;
    z-index: 1;
    margin: 0 auto;
    opacity: 0;
    transform: translate3d(0, 10px, 0);
    transition: all 200ms ease-in-out;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12) !important;
  }

  &.show-toolbar {
    .tox-toolbar-overlord {
      display: block;
      opacity: 1;
      transform: translate3d(0, 0, 0);
      box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
        0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12) !important;
    }
  }
}
</style>

