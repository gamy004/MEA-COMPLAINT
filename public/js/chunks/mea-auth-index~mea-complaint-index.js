(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["mea-auth-index~mea-complaint-index"],{

/***/ "./node_modules/file-saver/dist/FileSaver.min.js":
/*!*******************************************************!*\
  !*** ./node_modules/file-saver/dist/FileSaver.min.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(a,b){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(b,c,d){var e=new XMLHttpRequest;e.open("GET",b),e.responseType="blob",e.onload=function(){a(e.response,c,d)},e.onerror=function(){console.error("could not download file")},e.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(a,b,d,e){if(e=e||open("","_blank"),e&&(e.document.title=e.document.body.innerText="downloading..."),"string"==typeof a)return c(a,b,d);var g="application/octet-stream"===a.type,h=/constructor/i.test(f.HTMLElement)||f.safari,i=/CriOS\/[\d]+/.test(navigator.userAgent);if((i||g&&h)&&"object"==typeof FileReader){var j=new FileReader;j.onloadend=function(){var a=j.result;a=i?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),e?e.location.href=a:location=a,e=null},j.readAsDataURL(a)}else{var k=f.URL||f.webkitURL,l=k.createObjectURL(a);e?e.location=l:location.href=l,e=null,setTimeout(function(){k.revokeObjectURL(l)},4E4)}});f.saveAs=a.saveAs=a, true&&(module.exports=a)});

//# sourceMappingURL=FileSaver.min.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./resources/js/mixins/issue-report-mixin.js":
/*!***************************************************!*\
  !*** ./resources/js/mixins/issue-report-mixin.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(moment, _) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _vuexable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vuexable */ "./resources/js/mixins/vuexable.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers */ "./resources/js/helpers.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var IssueReportMixin = {
  mixins: [_vuexable__WEBPACK_IMPORTED_MODULE_2__["vuexable"]],
  computed: {
    $_issue_report_mixin_report: function $_issue_report_mixin_report() {
      return this.$_vuexable_getState("report", _vuexable__WEBPACK_IMPORTED_MODULE_2__["vuex"].modules.ISSUE) || {};
    },
    $_issue_report_mixin_reportTypes: function $_issue_report_mixin_reportTypes() {
      var _this$$_issue_report_ = this.$_issue_report_mixin_report.types,
          types = _this$$_issue_report_ === void 0 ? [] : _this$$_issue_report_;
      return types;
    },
    $_issue_report_mixin_reportType: {
      get: function get() {
        var _this$$_issue_report_2 = this.$_issue_report_mixin_report.reportType,
            reportType = _this$$_issue_report_2 === void 0 ? "date" : _this$$_issue_report_2;
        return reportType;
      },
      set: function set(reportType) {
        this.$_vuexable_setState({
          key: "report",
          value: _objectSpread({}, this.$_issue_report_mixin_report, {
            reportType: reportType
          })
        }, _vuexable__WEBPACK_IMPORTED_MODULE_2__["vuex"].modules.ISSUE);
      }
    },
    $_issue_report_mixin_isTypeDate: function $_issue_report_mixin_isTypeDate() {
      return this.$_issue_report_mixin_reportType === "date";
    },
    $_issue_report_mixin_reportVModel: {
      get: function get() {
        var data = this.$_issue_report_mixin_isTypeDate ? "dates" : "months";
        return this.$_issue_report_mixin_report[data] || [];
      },
      set: function set(v) {
        var data = this.$_issue_report_mixin_isTypeDate ? "dates" : "months";
        this.$_vuexable_setState({
          key: "report",
          value: _objectSpread({}, this.$_issue_report_mixin_report, _defineProperty({}, data, v))
        }, _vuexable__WEBPACK_IMPORTED_MODULE_2__["vuex"].modules.ISSUE);
      }
    },
    $_issue_report_mixin_reportGenerate: {
      get: function get() {
        var _this$$_issue_report_3 = this.$_issue_report_mixin_report.generate,
            generate = _this$$_issue_report_3 === void 0 ? false : _this$$_issue_report_3;
        return generate;
      },
      set: function set(generate) {
        this.$_vuexable_setState({
          key: "report",
          value: _objectSpread({}, this.$_issue_report_mixin_report, {
            generate: generate
          })
        }, _vuexable__WEBPACK_IMPORTED_MODULE_2__["vuex"].modules.ISSUE);
      }
    },
    $_issue_report_mixin_reportDialog: {
      get: function get() {
        var _this$$_issue_report_4 = this.$_issue_report_mixin_report.dialog,
            dialog = _this$$_issue_report_4 === void 0 ? false : _this$$_issue_report_4;
        return dialog;
      },
      set: function set(dialog) {
        this.$_vuexable_setState({
          key: "report",
          value: _objectSpread({}, this.$_issue_report_mixin_report, {
            dialog: dialog
          })
        }, _vuexable__WEBPACK_IMPORTED_MODULE_2__["vuex"].modules.ISSUE);
      }
    }
  },
  methods: _objectSpread({}, _vuexable__WEBPACK_IMPORTED_MODULE_2__["vuex"].mapWaitingActions(_vuexable__WEBPACK_IMPORTED_MODULE_2__["vuex"].modules.ISSUE, [_vuexable__WEBPACK_IMPORTED_MODULE_2__["vuex"].actions.ISSUE.EXPORT, _vuexable__WEBPACK_IMPORTED_MODULE_2__["vuex"].actions.ISSUE.EXPORT_SEARCH]), {
    $_issue_report_mixin_switchType: function $_issue_report_mixin_switchType() {
      if (this.$_issue_report_mixin_isTypeDate) {
        this.$_issue_report_mixin_reportType = 'month';
      } else {
        this.$_issue_report_mixin_reportType = 'date';
      }
    },
    $_issue_report_mixin_generateCurrentSelected: function () {
      var _$_issue_report_mixin_generateCurrentSelected = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var filter_groups, pagination, selected, selectAll, selectedIds, id, isSelected, sort;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                filter_groups = this.$_vuexable_getState("filter_groups", _vuexable__WEBPACK_IMPORTED_MODULE_2__["vuex"].modules.ISSUE);
                pagination = this.$_vuexable_getState("pagination", _vuexable__WEBPACK_IMPORTED_MODULE_2__["vuex"].modules.ISSUE);
                selected = this.$_vuexable_getState("selected", _vuexable__WEBPACK_IMPORTED_MODULE_2__["vuex"].modules.ISSUE);
                selectAll = this.$_vuexable_getState("selectAll", _vuexable__WEBPACK_IMPORTED_MODULE_2__["vuex"].modules.ISSUE);

                if (!selectAll) {
                  selectedIds = [];

                  for (id in selected) {
                    if (selected.hasOwnProperty(id)) {
                      isSelected = selected[id];

                      if (isSelected) {
                        selectedIds.push(id);
                      }
                    }
                  }

                  filter_groups = [{
                    filters: [Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["filterIn"])("id", selectedIds)]
                  }];
                }

                sort = pagination.sortBy;

                if (pagination.descending) {
                  sort = "-".concat(sort);
                }

                this.$_issue_report_mixin_export(filter_groups, {
                  action: _vuexable__WEBPACK_IMPORTED_MODULE_2__["vuex"].actions.ISSUE.EXPORT_SEARCH,
                  sort: [sort]
                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function $_issue_report_mixin_generateCurrentSelected() {
        return _$_issue_report_mixin_generateCurrentSelected.apply(this, arguments);
      }

      return $_issue_report_mixin_generateCurrentSelected;
    }(),
    $_issue_report_mixin_generateCurrentFilter: function () {
      var _$_issue_report_mixin_generateCurrentFilter = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var filter_groups, pagination, sort, search, params;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                filter_groups = this.$_vuexable_getState("filter_groups", _vuexable__WEBPACK_IMPORTED_MODULE_2__["vuex"].modules.ISSUE);
                pagination = this.$_vuexable_getState("pagination", _vuexable__WEBPACK_IMPORTED_MODULE_2__["vuex"].modules.ISSUE);
                sort = pagination.sortBy;
                search = pagination.search;
                params = {
                  action: _vuexable__WEBPACK_IMPORTED_MODULE_2__["vuex"].actions.ISSUE.EXPORT_SEARCH
                };

                if (pagination.descending) {
                  sort = "-".concat(sort);
                }

                this.$set(params, 'sort', [sort]);

                if (search.keyword) {
                  this.$set(params, 'search', search);
                }

                this.$_issue_report_mixin_export(filter_groups, params);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function $_issue_report_mixin_generateCurrentFilter() {
        return _$_issue_report_mixin_generateCurrentFilter.apply(this, arguments);
      }

      return $_issue_report_mixin_generateCurrentFilter;
    }(),
    $_issue_report_mixin_generateThisWeekReport: function () {
      var _$_issue_report_mixin_generateThisWeekReport = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var startOfWeek, endOfWeek, ranges, day, fileName;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                startOfWeek = moment().startOf('isoWeek');
                endOfWeek = moment().endOf('isoWeek');
                ranges = [];
                day = startOfWeek;

                while (day <= endOfWeek) {
                  ranges.push(day.format("YYYY-MM-DD").toString());
                  day = day.clone().add(1, 'd');
                }

                fileName = "ComplaintWeeklyReport_".concat(ranges[0], "_").concat(ranges[ranges.length - 1]);
                _context3.next = 8;
                return this.$_issue_report_mixin_generateReport(ranges, fileName);

              case 8:
                return _context3.abrupt("return", _context3.sent);

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function $_issue_report_mixin_generateThisWeekReport() {
        return _$_issue_report_mixin_generateThisWeekReport.apply(this, arguments);
      }

      return $_issue_report_mixin_generateThisWeekReport;
    }(),
    $_issue_report_mixin_generateThisMonthReport: function () {
      var _$_issue_report_mixin_generateThisMonthReport = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4() {
        var yearMonth, fileName;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                yearMonth = moment().format("YYYY-MM").toString();
                fileName = "ComplaintMonthlyReport_".concat(yearMonth);
                _context4.next = 4;
                return this.$_issue_report_mixin_generateReport([yearMonth], fileName);

              case 4:
                return _context4.abrupt("return", _context4.sent);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function $_issue_report_mixin_generateThisMonthReport() {
        return _$_issue_report_mixin_generateThisMonthReport.apply(this, arguments);
      }

      return $_issue_report_mixin_generateThisMonthReport;
    }(),
    $_issue_report_mixin_generateReport: function () {
      var _$_issue_report_mixin_generateReport = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(ranges) {
        var fileName,
            filters,
            filter_groups,
            _args5 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                fileName = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : null;
                filters = ranges.map(function (range) {
                  return Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["filterContains"])("created_at", range);
                });
                filter_groups = filters.length ? [{
                  filters: filters,
                  or: true
                }] : [];
                return _context5.abrupt("return", this.$_issue_report_mixin_export(filter_groups, {
                  fileName: fileName
                }));

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function $_issue_report_mixin_generateReport(_x) {
        return _$_issue_report_mixin_generateReport.apply(this, arguments);
      }

      return $_issue_report_mixin_generateReport;
    }(),
    $_issue_report_mixin_export: function () {
      var _$_issue_report_mixin_export = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6() {
        var filter_groups,
            _ref,
            _ref$fileName,
            fileName,
            _ref$action,
            action,
            _ref$sort,
            sort,
            _ref$search,
            search,
            type,
            content,
            params,
            currentDate,
            _args6 = arguments;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                filter_groups = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : [];
                _ref = _args6.length > 1 ? _args6[1] : undefined, _ref$fileName = _ref.fileName, fileName = _ref$fileName === void 0 ? null : _ref$fileName, _ref$action = _ref.action, action = _ref$action === void 0 ? _vuexable__WEBPACK_IMPORTED_MODULE_2__["vuex"].actions.ISSUE.EXPORT : _ref$action, _ref$sort = _ref.sort, sort = _ref$sort === void 0 ? ["-updated_at"] : _ref$sort, _ref$search = _ref.search, search = _ref$search === void 0 ? null : _ref$search;
                this.$_issue_report_mixin_reportDialog = false;
                this.$_issue_report_mixin_reportGenerate = true;
                type = this.$route.query.hasOwnProperty('type') ? this.$route.query.type : 'inbox';
                params = {
                  filter_groups: filter_groups,
                  sort: sort,
                  type: type
                };

                if (search) {
                  this.$set(params, 'search', search);
                }

                _context6.prev = 7;
                _context6.next = 10;
                return this[action](params);

              case 10:
                content = _context6.sent;
                _context6.next = 16;
                break;

              case 13:
                _context6.prev = 13;
                _context6.t0 = _context6["catch"](7);
                throw _context6.t0;

              case 16:
                currentDate = new Date();
                fileName = !_.isNull(fileName) ? fileName : "ComplaintReport_".concat(Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["formatDateFile"])(currentDate));
                file_saver__WEBPACK_IMPORTED_MODULE_1___default.a.saveAs(content.data, fileName);
                this.$_issue_report_mixin_reportGenerate = false;

              case 20:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[7, 13]]);
      }));

      function $_issue_report_mixin_export() {
        return _$_issue_report_mixin_export.apply(this, arguments);
      }

      return $_issue_report_mixin_export;
    }()
  }),
  mounted: function mounted() {
    if (!Object.keys(this.$_issue_report_mixin_report).length) {
      this.$_vuexable_setState({
        key: "report",
        value: {
          reportType: "date",
          types: [{
            label: this.$t("general.month"),
            value: "month"
          }, {
            label: this.$t("general.date"),
            value: "date"
          }],
          dates: [],
          months: [],
          dialog: false,
          generate: false
        }
      }, _vuexable__WEBPACK_IMPORTED_MODULE_2__["vuex"].modules.ISSUE);
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (IssueReportMixin);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! moment */ "./node_modules/moment/moment.js"), __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js")))

/***/ }),

/***/ "./resources/js/mixins/issue-search-mixin.js":
/*!***************************************************!*\
  !*** ./resources/js/mixins/issue-search-mixin.js ***!
  \***************************************************/
/*! exports provided: SEARCH_FIELDS, issueSearchMixin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(_) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEARCH_FIELDS", function() { return SEARCH_FIELDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "issueSearchMixin", function() { return issueSearchMixin; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vuexable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vuexable */ "./resources/js/mixins/vuexable.js");
/* harmony import */ var _issue_report_mixin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./issue-report-mixin */ "./resources/js/mixins/issue-report-mixin.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers */ "./resources/js/helpers.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants */ "./resources/js/constants/index.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var SEARCH_FIELDS = ["issuer", "recipients", "subject", "latest_status", "description", "created_at"];
var issueSearchMixin = {
  mixins: [_vuexable__WEBPACK_IMPORTED_MODULE_1__["vuexable"], _issue_report_mixin__WEBPACK_IMPORTED_MODULE_2__["default"]],
  data: function data() {
    return {
      issue_search_mixin_dateMenu: false,
      issue_search_mixin_searchKeyword: this.$route.query.q || "",
      issue_search_mixin_form: _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].models.FORM.make({
        from: [],
        to: [],
        subject: "",
        include_words: "",
        exclude_words: "",
        dates: [],
        categories: [],
        statuses: [],
        has_attachment: false
      })
    };
  },
  computed: _objectSpread({}, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].mapWaitingGetters({
    $_issue_search_mixin_isFetchingFormRecipient: "issueSearchMixin@fetchRecipients",
    $_issue_search_mixin_isFetchingFormCategory: "issueSearchMixin@fetchIssueCategories",
    $_issue_search_mixin_isSearchingComplaint: "issueSearchMixin@searchComplaint",
    $_issue_search_mixin_isFetchingFormStatus: "issueSearchMixin@fetchIssueStatuses"
  }), {
    $_issue_search_mixin_storeRecipients: function $_issue_search_mixin_storeRecipients() {
      var recipients = this.$_vuexable_getter(_vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].getters.SORTED_VALUES, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.GROUP);
      return _.map(recipients, "name"); // return mapTextValue(recipients, "name", "id");
    },
    $_issue_search_mixin_storeStatuses: function $_issue_search_mixin_storeStatuses() {
      var statuses = this.$_vuexable_getter(_vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].getters.SORTED_VALUES, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE_STATUS);
      return _.map(statuses, "status");
    },
    $_issue_search_mixin_storeCategories: function $_issue_search_mixin_storeCategories() {
      var statuses = this.$_vuexable_getter(_vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].getters.SORTED_VALUES, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE_CATEGORY);
      return _.map(statuses, "category");
    },
    $_issue_search_mixin_calendarIcon: function $_issue_search_mixin_calendarIcon() {
      return this.$_issue_report_mixin_reportType === "date" ? "mdi-calendar-month" : "mdi-calendar-today";
    },
    $_issue_search_mixin_calendarTooltip: function $_issue_search_mixin_calendarTooltip() {
      var type = this.$_issue_report_mixin_reportType === "date" ? "month" : "date";
      return this.$t("header.searchForm.selectBy.".concat(type));
    },
    $_issue_search_mixin_textFieldLabel: function $_issue_search_mixin_textFieldLabel() {
      return _.capitalize(this.$t("general.".concat(this.$_issue_report_mixin_reportType)));
    },
    $_issue_search_mixin_textFieldKey: function $_issue_search_mixin_textFieldKey() {
      var base = "textField";

      if (this.$_issue_report_mixin_reportType) {
        base += "--".concat(this.$_issue_report_mixin_reportType);
      }

      return base;
    },
    $_issue_search_mixin_searchFilters: function $_issue_search_mixin_searchFilters() {
      var filter_groups = [];
      var filters = [];

      if (this.issue_search_mixin_form.from.length) {
        filters.push(Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["filterIn"])("issuer", this.issue_search_mixin_form.from));
      } // if (this.issue_search_mixin_form.to.length) {
      //     this.issue_search_mixin_form.to.forEach(recipient => {
      //         filters.push(filterContains("recipients", recipient));
      //     });
      //     // filters.push(filterIn("recipients", this.issue_search_mixin_form.to));
      // }


      if (this.issue_search_mixin_form.statuses.length) {
        filters.push(Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["filterIn"])("latest_status", this.issue_search_mixin_form.statuses));
      }

      if (this.issue_search_mixin_form.categories.length) {
        filters.push(Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["filterIn"])("category", this.issue_search_mixin_form.categories));
      }

      if (this.issue_search_mixin_form.subject.length) {
        var subject_words = this.issue_search_mixin_form.subject.split(/[\s,=:./-]/);
        subject_words.forEach(function (word) {
          filters.push(Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["filterContains"])("subject", word));
        });
      }

      if (this.issue_search_mixin_form.include_words.length) {
        var include_words = this.issue_search_mixin_form.include_words.split(/[\s,=:./-]/);
        include_words.forEach(function (word) {
          filters.push(Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["filterContains"])("description", word));
        });
      }

      if (this.issue_search_mixin_form.exclude_words.length) {
        var exclude_words = this.issue_search_mixin_form.exclude_words.split(/[\s,=:./-]/);
        exclude_words.forEach(function (word) {
          filters.push(Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["filterNotContains"])("description", word));
        });
      }

      if (this.issue_search_mixin_form.dates.length) {
        this.issue_search_mixin_form.dates.forEach(function (date) {
          filters.push(Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["filterContains"])("created_at", date));
        });
      }

      if (this.issue_search_mixin_form.to.length) {
        this.issue_search_mixin_form.to.forEach(function (recipient) {
          var temp = filters;
          temp.push(Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["filterContains"])("recipients", recipient));
          filter_groups.push({
            filters: [].concat(temp),
            or: true
          });
        }); // filters.push(filterIn("recipients", this.issue_search_mixin_form.to));
      }

      if (filters.length) {
        filter_groups.push({
          filters: filters
        });
      }

      return filter_groups;
    },
    $_issue_search_mixin_searchFiltersKeyword: function $_issue_search_mixin_searchFiltersKeyword() {
      var keywords = [];

      if (this.issue_search_mixin_form.from.length) {
        keywords.push(this.$_issue_search_mixin_makeKeyword("from", function (res, word) {
          res += word;
          return res;
        }, this.issue_search_mixin_form.from)); // keywords.push(
        //     this.$_issue_search_mixin_makeGroupKeyword(
        //         "from",
        //         this.issue_search_mixin_form.from
        //     )
        // );
      }

      if (this.issue_search_mixin_form.to.length) {
        keywords.push(this.$_issue_search_mixin_makeKeyword("to", function (res, word) {
          res += word;
          return res;
        }, this.issue_search_mixin_form.to)); // keywords.push(
        //     this.$_issue_search_mixin_makeGroupKeyword(
        //         "to",
        //         this.issue_search_mixin_form.to
        //     )
        // );
      }

      if (this.issue_search_mixin_form.statuses.length) {
        keywords.push(this.$_issue_search_mixin_makeKeyword("status", function (res, word) {
          res += word;
          return res;
        }, this.issue_search_mixin_form.statuses));
      }

      if (this.issue_search_mixin_form.categories.length) {
        keywords.push(this.$_issue_search_mixin_makeKeyword("category", function (res, word) {
          res += word;
          return res;
        }, this.issue_search_mixin_form.categories));
      }

      if (this.issue_search_mixin_form.subject.length) {
        // const subject_words = this.issue_search_mixin_form.subject.split(/[\s,=:./-]/);
        keywords.push(this.$_issue_search_mixin_makeKeyword("subject", function (res, word) {
          res += word;
          return res;
        }, [this.issue_search_mixin_form.subject]));
      }

      if (this.issue_search_mixin_form.include_words.length) {
        var include_words = this.issue_search_mixin_form.include_words.split(/[\s,=:./-]/);
        keywords.push(this.$_issue_search_mixin_makeKeyword("has-the-words", function (res, word) {
          res += word;
          return res;
        }, include_words));
      }

      if (this.issue_search_mixin_form.exclude_words.length) {
        var exclude_words = this.issue_search_mixin_form.exclude_words.split(/[\s,=:./-]/);
        keywords.push(this.$_issue_search_mixin_makeKeyword("doesnt-have", function (res, word) {
          res += word;
          return res;
        }, exclude_words));
      }

      if (this.issue_search_mixin_form.dates.length) {
        keywords.push(this.$_issue_search_mixin_makeKeyword(this.$_issue_report_mixin_reportType, function (res, word) {
          res += word;
          return res;
        }, this.issue_search_mixin_form.dates));
      }

      return keywords.join(" ");
    },
    $_issue_search_mixin_searchFiltersVuex: function $_issue_search_mixin_searchFiltersVuex() {
      return this.$_vuexable_getState("filter_groups", _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE);
    },
    $_issue_search_mixin_filtered: function $_issue_search_mixin_filtered() {
      return this.$_issue_search_mixin_searchFilters.length > 0 && this.$_issue_search_mixin_searchFiltersVuex.length;
    },
    $_issue_search_mixin_stateSearchKeyword: function $_issue_search_mixin_stateSearchKeyword() {
      return this.$_vuexable_getState("searchKeyword", _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE);
    },
    $_issue_search_mixin_stateBackupFormdata: function $_issue_search_mixin_stateBackupFormdata() {
      return this.$_vuexable_getState("backupFormdata", _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE);
    }
  }),
  methods: _objectSpread({}, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].mapWaitingActions(_vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE, {
    $_issue_search_mixin_searchComplaint: {
      action: _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].actions.ISSUE.SEARCH,
      loader: "issueSearchMixin@searchComplaint"
    }
  }), _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].mapWaitingActions(_vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.GROUP, {
    $_issue_search_mixin_fetchRecipients: {
      action: _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].actions.GROUP.FETCH,
      loader: "issueSearchMixin@fetchRecipients"
    }
  }), _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].mapWaitingActions(_vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE_STATUS, {
    $_issue_search_mixin_fetchStatuses: {
      action: _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].actions.ISSUE_STATUS.FETCH,
      loader: "issueSearchMixin@fetchIssueStatuses"
    }
  }), _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].mapWaitingActions(_vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE_CATEGORY, {
    $_issue_search_mixin_fetchIssueCategories: {
      action: _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].actions.ISSUE_CATEGORY.FETCH,
      loader: "issueSearchMixin@fetchIssueCategories"
    }
  }), {
    $_issue_search_mixin_onSwitchDateType: function $_issue_search_mixin_onSwitchDateType() {
      var _this = this;

      this.$_issue_report_mixin_switchType();
      this.issue_search_mixin_dateMenu = false;
      setTimeout(function () {
        _this.issue_search_mixin_dateMenu = true;
      }, 200);
    },
    $_issue_search_mixin_fetchRecipient: function () {
      var _$_issue_search_mixin_fetchRecipient = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var response, filters, select, sort;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                filters = {}, select = ["groups:id,name"], sort = ["name"];
                _context.prev = 1;
                _context.next = 4;
                return this.$_issue_search_mixin_fetchRecipients({
                  filters: filters,
                  select: select,
                  sort: sort
                });

              case 4:
                response = _context.sent;
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](1);
                throw _context.t0;

              case 10:
                return _context.abrupt("return", response);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 7]]);
      }));

      function $_issue_search_mixin_fetchRecipient() {
        return _$_issue_search_mixin_fetchRecipient.apply(this, arguments);
      }

      return $_issue_search_mixin_fetchRecipient;
    }(),
    $_issue_search_mixin_clearState: function $_issue_search_mixin_clearState() {
      this.$_vuexable_setState({
        key: "searchKeyword",
        value: ""
      }, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE);
      this.$_vuexable_updatePagination({
        key: "search",
        value: {
          keyword: "",
          fields: []
        }
      }, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE);
      this.$_vuexable_setState({
        key: "filter_groups",
        value: []
      }, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE);
      this.$_vuexable_setState({
        key: "backupFormdata",
        value: {}
      }, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE);
    },
    $_issue_search_mixin_onSearchFilter: function () {
      var _$_issue_search_mixin_onSearchFilter = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var issue_search_mixin_form, _this$$_issue_search_, $_issue_search_mixin_searchFilters, response;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                issue_search_mixin_form = this.issue_search_mixin_form, _this$$_issue_search_ = this.$_issue_search_mixin_searchFilters, $_issue_search_mixin_searchFilters = _this$$_issue_search_ === void 0 ? [] : _this$$_issue_search_;

                if (!$_issue_search_mixin_searchFilters.length) {
                  this.issue_search_mixin_searchKeyword = "";
                  this.$_issue_search_mixin_clearState();
                  this.$emit("alert:invalidSearchForm");
                } else {
                  this.$_issue_search_mixin_updateSearchKeywordFromFilters();
                  this.$_vuexable_updatePagination({
                    key: "search",
                    value: {
                      keyword: "",
                      fields: []
                    }
                  }, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE);
                  this.$_vuexable_setState({
                    key: "backupFormdata",
                    value: _.cloneDeep(issue_search_mixin_form.data)
                  }, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE);
                }

                this.$_vuexable_setState({
                  key: "filter_groups",
                  value: $_issue_search_mixin_searchFilters
                }, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE);
                _context2.prev = 3;
                _context2.next = 6;
                return this.$_issue_search_mixin_searchComplaint();

              case 6:
                response = _context2.sent;
                _context2.next = 13;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](3);
                this.$emit("alert:searchError");
                throw _context2.t0;

              case 13:
                this.$_issue_search_mixin_updateRoute();
                return _context2.abrupt("return", response);

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 9]]);
      }));

      function $_issue_search_mixin_onSearchFilter() {
        return _$_issue_search_mixin_onSearchFilter.apply(this, arguments);
      }

      return $_issue_search_mixin_onSearchFilter;
    }(),
    $_issue_search_mixin_onSearchByKeyword: function () {
      var _$_issue_search_mixin_onSearchByKeyword = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var issue_search_mixin_searchKeyword, _this$$_issue_search_2, $_issue_search_mixin_searchFilters, response;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.$_issue_search_mixin_clearState();
                this.$_issue_search_mixin_extractSearchKeywordToFilters();
                issue_search_mixin_searchKeyword = this.issue_search_mixin_searchKeyword, _this$$_issue_search_2 = this.$_issue_search_mixin_searchFilters, $_issue_search_mixin_searchFilters = _this$$_issue_search_2 === void 0 ? [] : _this$$_issue_search_2;

                if (!$_issue_search_mixin_searchFilters.length) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", this.$_issue_search_mixin_onSearchFilter());

              case 5:
                if (!issue_search_mixin_searchKeyword.length) {
                  this.$emit("alert:invalidSearchForm");
                  this.$_vuexable_updatePagination({
                    key: "search",
                    value: {
                      keyword: "",
                      fields: []
                    }
                  }, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE);
                  this.$_vuexable_setState({
                    key: "filter_groups",
                    value: []
                  }, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE);
                  this.$_vuexable_setState({
                    key: "backupFormdata",
                    value: {}
                  }, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE);
                } else {
                  this.$_vuexable_setState({
                    key: "searchKeyword",
                    value: issue_search_mixin_searchKeyword
                  }, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE);
                  this.$_vuexable_updatePagination({
                    key: "search",
                    value: {
                      keyword: issue_search_mixin_searchKeyword,
                      fields: SEARCH_FIELDS
                    }
                  }, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE);
                }

                _context3.prev = 6;
                _context3.next = 9;
                return this.$_issue_search_mixin_searchComplaint();

              case 9:
                response = _context3.sent;
                _context3.next = 16;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](6);
                this.$emit("alert:searchError");
                throw _context3.t0;

              case 16:
                this.$_issue_search_mixin_updateRoute();
                return _context3.abrupt("return", response);

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[6, 12]]);
      }));

      function $_issue_search_mixin_onSearchByKeyword() {
        return _$_issue_search_mixin_onSearchByKeyword.apply(this, arguments);
      }

      return $_issue_search_mixin_onSearchByKeyword;
    }(),
    $_issue_search_mixin_extractSearchKeywordToFilters: function $_issue_search_mixin_extractSearchKeywordToFilters() {
      var _this$issue_search_mi = this.issue_search_mixin_searchKeyword,
          issue_search_mixin_searchKeyword = _this$issue_search_mi === void 0 ? "" : _this$issue_search_mi;
      this.$_issue_search_mixin_clearSearchFilters();
      if (!issue_search_mixin_searchKeyword.length) return;
      var regex = /([\w-]+):\(([0-9A-Za-zก-๙-!$%^&*()_+|~=`{}\[\]";'<>?,.\/\s]+)\)/gm;
      var m;

      while ((m = regex.exec(issue_search_mixin_searchKeyword)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        } // The result can be accessed through the `m`-variable.


        if (m.length) {
          // const fullMatch = m[0];
          var key = m[1];
          var value = m[2]; // const replacedValue = value.replace(/[,\s]+/gm, " ");
          // const splittedValue = value.split(/[,\s]+/gm);

          switch (key) {
            case "from":
              this.issue_search_mixin_form.set("from", value.split(/[,\s]+/gm));
              break;

            case "to":
              this.issue_search_mixin_form.set("to", value.split(/[,\s]+/gm));
              break;

            case "status":
              this.issue_search_mixin_form.set("statuses", value.split(/[,\s]+/gm));
              break;

            case "category":
              this.issue_search_mixin_form.set("categories", value.split(/[,\s]+/gm));
              break;

            case "subject":
              this.issue_search_mixin_form.set("subject", value);
              break;

            case "has-the-words":
              this.issue_search_mixin_form.set("include_words", value.replace(/[,\s]+/gm, " "));
              break;

            case "doesnt-have":
              this.issue_search_mixin_form.set("exclude_words", value.replace(/[,\s]+/gm, " "));
              break;

            case "month":
              this.issue_search_mixin_form.set("dates", value.split(/[,\s]+/gm));
              break;

            case "date":
              this.issue_search_mixin_form.set("dates", value.split(/[,\s]+/gm));
              break;

            default:
              break;
          } // if (this.form.has(key))

        } // m.forEach((match, groupIndex) => {
        //     console.log(match);
        //     console.log(`Found match, group ${groupIndex}: ${match}`);
        // });

      }
    },
    $_issue_search_mixin_updateSearchKeywordFromFilters: function $_issue_search_mixin_updateSearchKeywordFromFilters() {
      var _this$$_issue_search_3 = this.$_issue_search_mixin_searchFiltersKeyword,
          $_issue_search_mixin_searchFiltersKeyword = _this$$_issue_search_3 === void 0 ? "" : _this$$_issue_search_3;

      if ($_issue_search_mixin_searchFiltersKeyword.length) {
        this.issue_search_mixin_searchKeyword = $_issue_search_mixin_searchFiltersKeyword;
      }

      this.$_vuexable_setState({
        key: "searchKeyword",
        value: this.issue_search_mixin_searchKeyword
      }, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE);
    },
    $_issue_search_mixin_clearSearchFilters: function $_issue_search_mixin_clearSearchFilters() {
      this.issue_search_mixin_form = _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].models.FORM.make({
        from: [],
        to: [],
        latest_status: [],
        subject: "",
        include_words: "",
        exclude_words: "",
        dates: [],
        categories: [],
        statuses: [],
        has_attachment: false
      });
    },
    $_issue_search_mixin_clearSearchKeyword: function $_issue_search_mixin_clearSearchKeyword() {
      this.issue_search_mixin_searchKeyword = "";
    },
    $_issue_search_mixin_updateRoute: function $_issue_search_mixin_updateRoute() {
      this.$router.push({
        name: _constants__WEBPACK_IMPORTED_MODULE_4__["views"].ISSUE.INDEX,
        query: _objectSpread({}, this.$route.query, {
          q: this.issue_search_mixin_searchKeyword
        })
      });
    },
    $_issue_search_mixin_updateKeywordAndBackup: function $_issue_search_mixin_updateKeywordAndBackup() {
      var $_issue_search_mixin_stateSearchKeyword = this.$_issue_search_mixin_stateSearchKeyword,
          $_issue_search_mixin_stateBackupFormdata = this.$_issue_search_mixin_stateBackupFormdata;

      if ($_issue_search_mixin_stateSearchKeyword && $_issue_search_mixin_stateSearchKeyword.length) {
        this.issue_search_mixin_searchKeyword = $_issue_search_mixin_stateSearchKeyword;
      } else {
        this.issue_search_mixin_searchKeyword = "";
      }

      if ($_issue_search_mixin_stateBackupFormdata && Object.keys($_issue_search_mixin_stateBackupFormdata).length) {
        this.issue_search_mixin_form = _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].models.FORM.make(_objectSpread({}, $_issue_search_mixin_stateBackupFormdata));
      } else {
        this.issue_search_mixin_form = _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].models.FORM.make({
          from: [],
          to: [],
          subject: "",
          include_words: "",
          exclude_words: "",
          dates: [],
          categories: [],
          statuses: [],
          has_attachment: false
        });
      }
    },
    $_issue_search_mixin_makeGroupKeyword: function $_issue_search_mixin_makeGroupKeyword(prefix) {
      var _this2 = this;

      var ids = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return this.$_issue_search_mixin_makeKeyword(prefix, function (res, groupId) {
        var group = _this2.$_vuexable_getByKey(groupId, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.GROUP);

        res += group.name || "";
        return res;
      }, ids);
    },
    $_issue_search_mixin_makeKeyword: function $_issue_search_mixin_makeKeyword(prefix, cb) {
      var arr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      return arr.reduce(function (res, item, index) {
        res = cb(res, item, index);

        if (index !== arr.length - 1) {
          res += ",";
        }

        return res;
      }, "".concat(prefix, ":(")) + ")";
    }
  }),
  mounted: function mounted() {
    var $_issue_search_mixin_stateSearchKeyword = this.$_issue_search_mixin_stateSearchKeyword,
        $_issue_search_mixin_stateBackupFormdata = this.$_issue_search_mixin_stateBackupFormdata;

    if ($_issue_search_mixin_stateSearchKeyword === undefined) {
      this.$_vuexable_setState({
        key: "searchKeyword",
        value: ""
      }, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE);
    }

    if ($_issue_search_mixin_stateBackupFormdata === undefined) {
      this.$_vuexable_setState({
        key: "backupFormdata",
        value: {}
      }, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE);
    }

    if (this.issue_search_mixin_searchKeyword.length) {
      this.$_issue_search_mixin_extractSearchKeywordToFilters();
      this.$_issue_search_mixin_updateSearchKeywordFromFilters();
      this.$_vuexable_setState({
        key: "filter_groups",
        value: this.$_issue_search_mixin_searchFilters
      }, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE);
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js")))

/***/ })

}]);