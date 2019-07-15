(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["mea-complaint-index~mea-complaint-show~mea-status-index"],{

/***/ "./resources/js/mixins/issue-status-mixin.js":
/*!***************************************************!*\
  !*** ./resources/js/mixins/issue-status-mixin.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(_) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vuexable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vuexable */ "./resources/js/mixins/vuexable.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var issueStatusMixin = {
  mixins: [_vuexable__WEBPACK_IMPORTED_MODULE_1__["vuexable"]],
  computed: _objectSpread({}, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].mapWaitingGetters({
    $_issue_status_mixin_updatingIssue: "issueStatusMixin updating issue",
    $_issue_status_mixin_fetching: "issueCategoryMixin fetch action",
    $_issue_status_mixin_editing: "issueCategoryMixin edit action",
    $_issue_status_mixin_deleting: "issueCategoryMixin delete action",
    $_issue_status_mixin_restoring: "issueCategoryMixin restore action",
    $_issue_status_mixin_updating_default: "issueStatusMixin update default action"
  }), {
    $_issue_status_mixin_statuses: function $_issue_status_mixin_statuses() {
      return this.$_vuexable_getSortedValues(_vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE_STATUS);
    },
    $_issue_status_mixin_dialog: {
      get: function get() {
        return this.$_vuexable_getState("dialog", _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE_STATUS);
      },
      set: function set(value) {
        this.$_vuexable_setState({
          key: "dialog",
          value: value
        }, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE_STATUS);
      }
    },
    $_issue_status_mixin_pagination: {
      get: function get() {
        return this.$_vuexable_getState("pagination", _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE_STATUS);
      },
      set: function set(pagination) {
        this.$_vuexable_setPagination(pagination, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE_STATUS);
      }
    },
    $_issue_status_mixin_totalItems: function $_issue_status_mixin_totalItems() {
      return this.$_vuexable_getState("totalItems", _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE_STATUS);
    },
    $_issue_status_mixin_edit: {
      get: function get() {
        return this.$_vuexable_getEdit(_vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE_STATUS);
      },
      set: function set(value) {
        this.$_vuexable_setEdit(value, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE_STATUS);
      }
    },
    $_issue_status_mixin_isEditing: function $_issue_status_mixin_isEditing() {
      return this.$_issue_status_mixin_edit !== undefined;
    },
    $_issue_status_mixin_active: {
      get: function get() {
        return this.$_vuexable_getActive(_vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE_STATUS);
      },
      set: function set(value) {
        this.$_vuexable_setActive(value, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE_STATUS);
      }
    },
    $_issue_status_mixin_paginated_items: function $_issue_status_mixin_paginated_items() {
      return this.$_vuexable_getPaginatedValues(this.$_issue_status_mixin_pagination.page, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE_STATUS);
    }
  }),
  methods: _objectSpread({}, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].mapWaitingActions(_vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE, {
    $_issue_status_mixin_updateComplaint: {
      action: _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].actions.UPDATE,
      loader: "issueStatusMixin updating issue"
    }
  }), _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].mapWaitingActions(_vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE_STATUS, {
    $_issue_status_mixin_fetchStatus: {
      action: _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].actions.ISSUE_STATUS.FETCH,
      loader: "issueStatusMixin fetch action"
    },
    $_issue_status_mixin_editStatus: {
      action: _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].actions.ISSUE_STATUS.EDIT,
      loader: "issueStatusMixin edit action"
    },
    $_issue_status_mixin_deleteStatus: {
      action: _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].actions.ISSUE_STATUS.DELETE,
      loader: "issueStatusMixin delete action"
    },
    $_issue_status_mixin_restoreStatus: {
      action: _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].actions.ISSUE_STATUS.RESTORE,
      loader: "issueStatusMixin restore action"
    },
    $_issue_status_mixin_updateDefault: {
      action: _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].actions.ISSUE_STATUS.UPDATE_DEFAULT,
      loader: "issueStatusMixin update default action"
    }
  }), {
    $_issue_status_mixin_findStatus: function $_issue_status_mixin_findStatus(statusId) {
      return this.$_vuexable_getByKey(statusId, _vuexable__WEBPACK_IMPORTED_MODULE_1__["vuex"].modules.ISSUE_STATUS);
    },
    $_issue_status_mixin_fetchStatuses: function () {
      var _$_issue_status_mixin_fetchStatuses = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.$_issue_status_mixin_fetchStatus({
                  sort: ["-issue_statuses.default", "issue_statuses.status"]
                });

              case 3:
                return _context.abrupt("return", _context.sent);

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 6]]);
      }));

      function $_issue_status_mixin_fetchStatuses() {
        return _$_issue_status_mixin_fetchStatuses.apply(this, arguments);
      }

      return $_issue_status_mixin_fetchStatuses;
    }(),
    $_issue_status_mixin_onEditStatus: function () {
      var _$_issue_status_mixin_onEditStatus = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(_ref) {
        var id, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = _ref.id;
                _context2.prev = 1;
                _context2.next = 4;
                return this.$_issue_status_mixin_editStatus({
                  id: id
                });

              case 4:
                response = _context2.sent;
                _context2.next = 10;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](1);
                throw _context2.t0;

              case 10:
                this.$_issue_status_mixin_edit = id;
                return _context2.abrupt("return", response);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 7]]);
      }));

      function $_issue_status_mixin_onEditStatus(_x) {
        return _$_issue_status_mixin_onEditStatus.apply(this, arguments);
      }

      return $_issue_status_mixin_onEditStatus;
    }(),
    $_issue_status_mixin_makeStatusMenuItems: function $_issue_status_mixin_makeStatusMenuItems(issue) {
      var _this = this;

      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      var errCb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

      var tempIssue = _objectSpread({}, issue);

      return _.orderBy(this.$_issue_status_mixin_statuses, ["default", "status"], ["desc", "asc"]).map(function (_ref2) {
        var id = _ref2.id,
            status = _ref2.status,
            color = _ref2.color;
        return {
          id: id,
          status: status,
          color: color,
          text: status,
          disabled: function disabled() {
            return issue.issue_status_id === id;
          },
          onClick: function () {
            var _onClick = _asyncToGenerator(
            /*#__PURE__*/
            _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.prev = 0;
                      _context3.next = 3;
                      return _this.$_issue_status_mixin_updateComplaint({
                        id: issue.id,
                        issue_status_id: id,
                        includes: ['logs', 'logs.status:sideload', 'logs.status.configs'],
                        routeParam: {
                          issue: issue.id
                        }
                      });

                    case 3:
                      _context3.next = 9;
                      break;

                    case 5:
                      _context3.prev = 5;
                      _context3.t0 = _context3["catch"](0);
                      errCb(tempIssue, _context3.t0);
                      throw _context3.t0;

                    case 9:
                      _this.$set(tempIssue, 'issue_status_id', id);

                      return _context3.abrupt("return", cb(tempIssue, status));

                    case 11:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, null, [[0, 5]]);
            }));

            function onClick() {
              return _onClick.apply(this, arguments);
            }

            return onClick;
          }()
        };
      });
    }
  })
};
/* harmony default export */ __webpack_exports__["default"] = (issueStatusMixin);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js")))

/***/ })

}]);