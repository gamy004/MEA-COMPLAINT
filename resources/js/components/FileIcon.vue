<template>
  <v-icon v-bind="$attrs" v-text="icon" :color="colorName"></v-icon>
</template>

<script>
export default {
  props: {
    mime: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      mimes: {
        "application/pdf": "mdi-file-pdf-box",
        pdf: "mdi-file-pdf-box",
        "application/msword": "mdi-file-word-box",
        doc: "mdi-file-word-box",
        docx: "mdi-file-word-box",
        "application/excel": "mdi-file-excel-box",
        "application/x-excel": "mdi-file-excel-box",
        "application/x-msexcel": "mdi-file-excel-box",
        "application/vnd.ms-excel": "mdi-file-excel-box",
        xlsx: "mdi-file-excel-box",
        pptx: "mdi-file-powerpoint-box",
        "image/jpeg": "image",
        jpeg: "image",
        "image/pjpeg": "image",
        pjpeg: "image",
        "image/png": "image",
        png: "image",
        "image/gif": "gif",
        gif: "gif",
        "7z": "mdi-zip-box",
        rar: "mdi-zip-box",
        "application/rar": "mdi-zip-box",
        zip: "mdi-zip-box",
        "application/zip": "mdi-zip-box",
        exe: "mdi-apps-box",
        "application/x-dosexec": "mdi-apps-box"
      },

      colors: {
        "application/pdf": "red",
        pdf: "red",
        "application/msword": "indigo lighten-1",
        doc: "indigo lighten-1",
        docx: "indigo lighten-1",
        "application/excel": "success",
        "application/x-excel": "success",
        "application/x-msexcel": "success",
        "application/vnd.ms-excel": "success",
        xlsx: "success",
        pptx: "deep-orange",
        "image/jpeg": "accent",
        jpeg: "accent",
        jpg: "accent",
        "image/pjpeg": "accent",
        pjpeg: "accent",
        "image/png": "accent",
        png: "accent",
        "image/gif": "accent",
        gif: "accent",
        "7z": "amber darken-1",
        rar: "amber darken-1",
        "application/rar": "amber darken-1",
        zip: "amber darken-1",
        "application/zip": "amber darken-1",
        exe: "info",
        "application/x-dosexec": "info"
      }
    };
  },

  computed: {
    formattedMime() {
      return this.mime.toLowerCase();
    },
    icon() {
      return this.mimes.hasOwnProperty(this.formattedMime)
        ? this.mimes[this.formattedMime]
        : "mdi-file-document";
    },

    colorName() {
      return this.colors.hasOwnProperty(this.formattedMime)
        ? this.colors[this.formattedMime]
        : "grey";
    }
  }
};
</script>
