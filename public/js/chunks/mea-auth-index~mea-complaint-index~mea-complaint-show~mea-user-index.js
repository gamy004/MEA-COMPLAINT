(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["mea-auth-index~mea-complaint-index~mea-complaint-show~mea-user-index"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./resources/js/components/WarningDialog.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/WarningDialog.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_dialogable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mixins/dialogable */ "./resources/js/mixins/dialogable.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [_mixins_dialogable__WEBPACK_IMPORTED_MODULE_0__["default"]],
  props: {
    cancelText: {
      type: String,
      "default": ""
    },
    acceptText: {
      type: String,
      "default": ""
    }
  },
  computed: {
    warningCancelText: function warningCancelText() {
      return this.cancelText.length ? this.cancelText : this.$t("general.cancel");
    },
    warningAcceptText: function warningAcceptText() {
      return this.acceptText.length ? this.acceptText : this.$t("general.discard");
    }
  },
  methods: {
    cancel: function cancel(event) {
      this.$_dialogable_closeDialog();
      this.$emit("click:cancel", event);
    },
    discard: function discard(event) {
      this.$_dialogable_closeDialog();
      this.$emit("click:accept", event);
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./resources/js/components/WarningDialog.vue?vue&type=template&id=2741eda9&":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/WarningDialog.vue?vue&type=template&id=2741eda9& ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-dialog",
    {
      attrs: { persistent: "", "max-width": "290" },
      model: {
        value: _vm.dialog,
        callback: function($$v) {
          _vm.dialog = $$v
        },
        expression: "dialog"
      }
    },
    [
      _c(
        "v-card",
        [
          _c(
            "v-card-title",
            { staticClass: "headline" },
            [_vm._t("header", [_vm._v("Use Google's location service?")])],
            2
          ),
          _vm._v(" "),
          _c(
            "v-card-text",
            [
              _vm._t("message", [
                _vm._v(
                  "Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running."
                )
              ])
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "v-card-actions",
            [
              _c("v-spacer"),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  attrs: { color: "deep-orange darken-1", flat: "" },
                  on: {
                    click: function($event) {
                      $event.stopPropagation()
                      $event.preventDefault()
                      return _vm.cancel($event)
                    }
                  }
                },
                [_vm._v(_vm._s(_vm.warningCancelText))]
              ),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  attrs: { color: "deep-orange darken-1", flat: "" },
                  on: {
                    click: function($event) {
                      $event.stopPropagation()
                      $event.preventDefault()
                      return _vm.discard($event)
                    }
                  }
                },
                [_vm._v(_vm._s(_vm.warningAcceptText))]
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/WarningDialog.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/WarningDialog.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WarningDialog_vue_vue_type_template_id_2741eda9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WarningDialog.vue?vue&type=template&id=2741eda9& */ "./resources/js/components/WarningDialog.vue?vue&type=template&id=2741eda9&");
/* harmony import */ var _WarningDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WarningDialog.vue?vue&type=script&lang=js& */ "./resources/js/components/WarningDialog.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _Users_admin_Sites_mea_complaint_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _Users_admin_Sites_mea_complaint_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Users_admin_Sites_mea_complaint_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib */ "./node_modules/vuetify/lib/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _WarningDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _WarningDialog_vue_vue_type_template_id_2741eda9___WEBPACK_IMPORTED_MODULE_0__["render"],
  _WarningDialog_vue_vue_type_template_id_2741eda9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */








_Users_admin_Sites_mea_complaint_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib__WEBPACK_IMPORTED_MODULE_4__["VBtn"],VCard: vuetify_lib__WEBPACK_IMPORTED_MODULE_4__["VCard"],VCardActions: vuetify_lib__WEBPACK_IMPORTED_MODULE_4__["VCardActions"],VCardText: vuetify_lib__WEBPACK_IMPORTED_MODULE_4__["VCardText"],VCardTitle: vuetify_lib__WEBPACK_IMPORTED_MODULE_4__["VCardTitle"],VDialog: vuetify_lib__WEBPACK_IMPORTED_MODULE_4__["VDialog"],VSpacer: vuetify_lib__WEBPACK_IMPORTED_MODULE_4__["VSpacer"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/WarningDialog.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/WarningDialog.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/WarningDialog.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_WarningDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vuetify-loader/lib/loader.js!../../../node_modules/vue-loader/lib??vue-loader-options!./WarningDialog.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./resources/js/components/WarningDialog.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_WarningDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/WarningDialog.vue?vue&type=template&id=2741eda9&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/WarningDialog.vue?vue&type=template&id=2741eda9& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_WarningDialog_vue_vue_type_template_id_2741eda9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vuetify-loader/lib/loader.js!../../../node_modules/vue-loader/lib??vue-loader-options!./WarningDialog.vue?vue&type=template&id=2741eda9& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./resources/js/components/WarningDialog.vue?vue&type=template&id=2741eda9&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_WarningDialog_vue_vue_type_template_id_2741eda9___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_WarningDialog_vue_vue_type_template_id_2741eda9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/mixins/uploadable.js":
/*!*******************************************!*\
  !*** ./resources/js/mixins/uploadable.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(_) {/* harmony import */ var vuejs_uploader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuejs-uploader */ "./node_modules/vuejs-uploader/dist/build.js");
/* harmony import */ var vuejs_uploader__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vuejs_uploader__WEBPACK_IMPORTED_MODULE_0__);

var uploadable = {
  props: {
    endpoint: {
      type: String,
      "default": function _default() {
        return route('api:files.upload');
      }
    },
    multipart: {
      type: Boolean,
      "default": true
    },
    multiple: {
      type: Boolean,
      "default": false
    },
    uploadableAvatar: {
      type: String,
      "default": ""
    }
  },
  components: {
    uploader: vuejs_uploader__WEBPACK_IMPORTED_MODULE_0___default.a
  },
  data: function data() {
    return {
      uploadable_uploaderRef: 'uploadable_uploader',
      uploadable_uploader: null,
      uploadable_uploading: false,
      uploadable_uploadProgress: null,
      uploadable_uploadedFiles: []
    };
  },
  computed: {
    $_uploadable_isIndeterminate: function $_uploadable_isIndeterminate() {
      return _.isNull(this.uploadProgress);
    },
    $_uploadable_progressAdditionalProps: function $_uploadable_progressAdditionalProps() {
      var props = {};

      if (!this.$_uploadable_isIndeterminate) {
        this.$set(props, "value", this.uploadable_uploadProgress);
      }

      return props;
    },
    $_uploadable_uploaderFiles: function $_uploadable_uploaderFiles() {
      return this.uploadable_uploader ? this.uploadable_uploader.getFiles : []; // this.uploadable_uploader.getFiles.filter(file => {
      //     return !file.uploaded;
      // }) : [];
    },
    $_uploadable_metaData: function $_uploadable_metaData() {
      return this.uploadable_uploadedFiles.reduce(function (acc, _ref) {
        var file = _ref.file,
            hash_name = _ref.hash_name,
            size = _ref.filesize,
            formatted_size = _ref.formattedFilesize,
            upload_path = _ref.upload_path,
            url = _ref.url;
        acc.push({
          display_name: file.name,
          hash_name: hash_name,
          size: size,
          formatted_size: formatted_size,
          upload_path: upload_path,
          url: url
        });
        return acc;
      }, []);
    },
    $_uploadable_hasUploadedFiles: function $_uploadable_hasUploadedFiles() {
      return this.uploadable_uploadedFiles.length;
    }
  },
  watch: {
    $_uploadable_uploaderFiles: {
      handler: function handler() {
        var files = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        if (this.uploadable_uploader) {
          this.uploadable_uploading = files.length !== 0;
          this.uploadable_uploader.upload();
        }
      }
    } // uploadable_uploadedFiles: {
    //     deep: true,
    //     handler(files = []) {
    //         console.log(files);
    //     }
    // }

  },
  methods: {
    onStartUpload: function onStartUpload() {
      this.uploadable_uploading = true;
    },
    onChunkUploaded: function onChunkUploaded(_ref2, currentChunk) {
      var totalParts = _ref2.totalParts;
      this.uploadable_uploadProgress = currentChunk / totalParts * 100;
    },
    onUploadError: function onUploadError(error) {
      this.stopUploading();
    },
    stopUploading: function stopUploading() {
      this.uploadable_uploading = false;
      this.uploadable_uploadProgress = null;
    },
    dropFiles: function dropFiles(event) {
      this.uploadable_uploader.dropFiles(event);
    },
    dragover: function dragover(event) {
      this.uploadable_uploader.dragover(event);
    },
    dragleave: function dragleave(event) {
      this.uploadable_uploader.dragleave(event);
    },
    removeFile: function removeFile(file) {
      this.uploadable_uploader.removeFile(file);
    },
    onFileUploaded: function onFileUploaded() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          file = _ref3.file,
          response = _ref3.response;

      for (var key in response.meta) {
        if (response.meta.hasOwnProperty(key)) {
          var element = response.meta[key];
          this.$set(file, key, element);
        }
      }

      this.stopUploading();

      if (file.url) {
        this.$emit("update:uploadable-avatar", file.url);
      }

      this.$set(file, "uploaded", true);
      this.uploadable_uploadedFiles.push(file);
      this.uploadable_uploadedFiles = Array.from(new Set(this.uploadable_uploadedFiles));
      this.$emit("fileUploaded", {
        file: file,
        response: response
      });
    },
    $_uploadable_UpdateUploader: function $_uploadable_UpdateUploader() {
      var _this = this;

      this.$nextTick(function () {
        _this.uploadable_uploader = _this.$refs[_this.uploadable_uploaderRef];
      });
    },
    $_uploadable_reset: function $_uploadable_reset() {
      this.uploadable_uploadedFiles = [];
      this.uploadable_uploading = false;
      this.$_uploadable_UpdateUploader();
    }
  },
  created: function created() {
    this.$_uploadable_UpdateUploader();
  }
};
/* harmony default export */ __webpack_exports__["default"] = (uploadable);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js")))

/***/ })

}]);