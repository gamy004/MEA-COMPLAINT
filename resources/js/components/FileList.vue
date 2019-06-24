<template>
  <v-layout row wrap class="filelist">
    <template v-for="(file, index) in files">
      <v-flex xs12 :key="`${$_filemixin_getDisplayName(file)}-${index}`">
        <file-list-item :file="file" @remove="removeFile(file, index)"/>
      </v-flex>
    </template>

    <message-alert
      :alertable-visible.sync="alertable_alert"
      :alertable-type="alertable_type"
      :alertable-messages="alertable_messages"
    />
  </v-layout>
</template>

<script>
import FileListItem from "./FileListItem";
import filemixin from "../mixins/filemixin";
import { vuex, vuexable } from "../mixins/vuexable";
import alertable from "../mixins/alertable";
import MessageAlert from "../components/MessageAlert";

export default {
  mixins: [alertable, filemixin, vuexable],

  props: {
    uploader: {
      type: Object,
      required: true
    },
    files: {
      type: Array,
      default: () => []
    }
  },

  components: {
    FileListItem,
    MessageAlert
  },

  data() {
    return {
      alertable_messages: {
        delete_fail: {
          text: "Cannot delete file, please try again",
          type: "error"
        }
      }
    };
  },

  methods: {
    ...vuex.mapWaitingActions(vuex.modules.FILE, [
      vuex.actions.FILE.DELETE,
      vuex.actions.FILE.DELETE_BY_PATH
    ]),

    async removeFile(file, index) {
      let { uploaded = false } = file,
        files = [...this.files];

      if (this.$_filemixin_isFileModel(file) || uploaded) {
        // send request to delete temp or delete file in db

        const callFn = this.$_filemixin_isFileModel(file)
          ? vuex.actions.FILE.DELETE
          : vuex.actions.FILE.DELETE_BY_PATH;

        try {
          await this[callFn](file);
        } catch (error) {
          this.$_alertable_alert("delete_fail");
          throw error;
        }

        files.splice(index, 1);

        this.$emit("update:files", [...files]);

        this.$emit("remove", file, index, files);
      } else {
        this.uploader.removeFile(file);
      }
    }
  }
};
</script>

