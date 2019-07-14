import {
    vuex,
    vuexable
} from "./vuexable";
import IssueReportMixin from "./issue-report-mixin";
import {
    mapTextValue,
    filterContains,
    filterIn,
    filterNotContains
} from "../helpers";
import {
    views
} from "../constants";

export const SEARCH_FIELDS = [
    "issuer",
    "recipients",
    "subject",
    "latest_status",
    "description",
    "created_at"
];

export const issueSearchMixin = {
    mixins: [vuexable, IssueReportMixin],

    data() {
        return {
            issue_search_mixin_dateMenu: false,
            issue_search_mixin_searchKeyword: this.$route.query.q || "",
            issue_search_mixin_form: vuex.models.FORM.make({
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

    computed: {
        ...vuex.mapWaitingGetters({
            $_issue_search_mixin_isFetchingFormRecipient: "issueSearchMixin@fetchRecipients",
            $_issue_search_mixin_isFetchingFormCategory: "issueSearchMixin@fetchIssueCategories",
            $_issue_search_mixin_isSearchingComplaint: "issueSearchMixin@searchComplaint",
            $_issue_search_mixin_isFetchingFormStatus: "issueSearchMixin@fetchIssueStatuses"
        }),

        $_issue_search_mixin_storeRecipients() {
            const recipients = this.$_vuexable_getter(
                vuex.getters.SORTED_VALUES,
                vuex.modules.GROUP
            );

            return _.map(recipients, "name");
            // return mapTextValue(recipients, "name", "id");
        },

        $_issue_search_mixin_storeStatuses() {
            const statuses = this.$_vuexable_getter(
                vuex.getters.SORTED_VALUES,
                vuex.modules.ISSUE_STATUS
            );

            return _.map(statuses, "status");
        },

        $_issue_search_mixin_storeCategories() {
            const statuses = this.$_vuexable_getter(
                vuex.getters.SORTED_VALUES,
                vuex.modules.ISSUE_CATEGORY
            );

            return _.map(statuses, "category");
        },

        $_issue_search_mixin_calendarIcon() {
            return this.$_issue_report_mixin_reportType === "date" ?
                "mdi-calendar-month" :
                "mdi-calendar-today";
        },

        $_issue_search_mixin_calendarTooltip() {
            const type = this.$_issue_report_mixin_reportType === "date" ? "month" : "date";

            return this.$t(`header.searchForm.selectBy.${type}`);
        },

        $_issue_search_mixin_textFieldLabel() {
            return _.capitalize(
                this.$t(`general.${this.$_issue_report_mixin_reportType}`)
            );
        },

        $_issue_search_mixin_textFieldKey() {
            let base = "textField";

            if (this.$_issue_report_mixin_reportType) {
                base += `--${this.$_issue_report_mixin_reportType}`;
            }

            return base;
        },

        $_issue_search_mixin_searchFilters() {
            const filter_groups = [];

            const filters = [];

            if (this.issue_search_mixin_form.from.length) {
                filters.push(filterIn("issuer", this.issue_search_mixin_form.from));
            }

            // if (this.issue_search_mixin_form.to.length) {
            //     this.issue_search_mixin_form.to.forEach(recipient => {
            //         filters.push(filterContains("recipients", recipient));
            //     });
            //     // filters.push(filterIn("recipients", this.issue_search_mixin_form.to));
            // }

            if (this.issue_search_mixin_form.statuses.length) {
                filters.push(filterIn("latest_status", this.issue_search_mixin_form.statuses));
            }

            if (this.issue_search_mixin_form.categories.length) {
                filters.push(filterIn("category", this.issue_search_mixin_form.categories));
            }

            if (this.issue_search_mixin_form.subject.length) {
                const subject_words = this.issue_search_mixin_form.subject.split(/[\s,=:./-]/);

                subject_words.forEach(word => {
                    filters.push(filterContains("subject", word));
                });
            }

            if (this.issue_search_mixin_form.include_words.length) {
                const include_words = this.issue_search_mixin_form.include_words.split(/[\s,=:./-]/);

                include_words.forEach(word => {
                    filters.push(filterContains("description", word));
                });
            }

            if (this.issue_search_mixin_form.exclude_words.length) {
                const exclude_words = this.issue_search_mixin_form.exclude_words.split(/[\s,=:./-]/);

                exclude_words.forEach(word => {
                    filters.push(filterNotContains("description", word));
                });
            }

            if (this.issue_search_mixin_form.dates.length) {
                this.issue_search_mixin_form.dates.forEach(date => {
                    filters.push(filterContains("created_at", date));
                });
            }

            if (this.issue_search_mixin_form.to.length) {
                this.issue_search_mixin_form.to.forEach(recipient => {
                    const temp = filters;

                    temp.push(filterContains("recipients", recipient));

                    filter_groups.push({
                        filters: [...temp],
                        or: true
                    });
                });
                // filters.push(filterIn("recipients", this.issue_search_mixin_form.to));
            }

            if (filters.length) {
                filter_groups.push({
                    filters
                });
            }

            return filter_groups;
        },

        $_issue_search_mixin_searchFiltersKeyword() {
            const keywords = [];

            if (this.issue_search_mixin_form.from.length) {
                keywords.push(
                    this.$_issue_search_mixin_makeKeyword(
                        "from",
                        (res, word) => {
                            res += word;

                            return res;
                        },
                        this.issue_search_mixin_form.from
                    )
                );

                // keywords.push(
                //     this.$_issue_search_mixin_makeGroupKeyword(
                //         "from",
                //         this.issue_search_mixin_form.from
                //     )
                // );
            }

            if (this.issue_search_mixin_form.to.length) {
                keywords.push(
                    this.$_issue_search_mixin_makeKeyword(
                        "to",
                        (res, word) => {
                            res += word;

                            return res;
                        },
                        this.issue_search_mixin_form.to
                    )
                );

                // keywords.push(
                //     this.$_issue_search_mixin_makeGroupKeyword(
                //         "to",
                //         this.issue_search_mixin_form.to
                //     )
                // );
            }

            if (this.issue_search_mixin_form.statuses.length) {
                keywords.push(
                    this.$_issue_search_mixin_makeKeyword(
                        "status",
                        (res, word) => {
                            res += word;

                            return res;
                        },
                        this.issue_search_mixin_form.statuses
                    )
                );
            }

            if (this.issue_search_mixin_form.categories.length) {
                keywords.push(
                    this.$_issue_search_mixin_makeKeyword(
                        "category",
                        (res, word) => {
                            res += word;

                            return res;
                        },
                        this.issue_search_mixin_form.categories
                    )
                );
            }

            if (this.issue_search_mixin_form.subject.length) {
                // const subject_words = this.issue_search_mixin_form.subject.split(/[\s,=:./-]/);

                keywords.push(
                    this.$_issue_search_mixin_makeKeyword(
                        "subject",
                        (res, word) => {
                            res += word;

                            return res;
                        },
                        [this.issue_search_mixin_form.subject]
                    )
                );
            }

            if (this.issue_search_mixin_form.include_words.length) {
                const include_words = this.issue_search_mixin_form.include_words.split(/[\s,=:./-]/);

                keywords.push(
                    this.$_issue_search_mixin_makeKeyword(
                        "has-the-words",
                        (res, word) => {
                            res += word;

                            return res;
                        },
                        include_words
                    )
                );
            }

            if (this.issue_search_mixin_form.exclude_words.length) {
                const exclude_words = this.issue_search_mixin_form.exclude_words.split(/[\s,=:./-]/);

                keywords.push(
                    this.$_issue_search_mixin_makeKeyword(
                        "doesnt-have",
                        (res, word) => {
                            res += word;

                            return res;
                        },
                        exclude_words
                    )
                );
            }

            if (this.issue_search_mixin_form.dates.length) {
                keywords.push(
                    this.$_issue_search_mixin_makeKeyword(
                        this.$_issue_report_mixin_reportType,
                        (res, word) => {
                            res += word;

                            return res;
                        },
                        this.issue_search_mixin_form.dates
                    )
                );
            }

            return keywords.join(" ");
        },

        $_issue_search_mixin_searchFiltersVuex() {
            return this.$_vuexable_getState("filter_groups", vuex.modules.ISSUE);
        },

        $_issue_search_mixin_filtered() {
            return this.$_issue_search_mixin_searchFilters.length > 0 && this.$_issue_search_mixin_searchFiltersVuex.length;
        },

        $_issue_search_mixin_stateSearchKeyword() {
            return this.$_vuexable_getState(
                "searchKeyword",
                vuex.modules.ISSUE
            );
        },

        $_issue_search_mixin_stateBackupFormdata() {
            return this.$_vuexable_getState(
                "backupFormdata",
                vuex.modules.ISSUE
            );
        }
    },

    methods: {
        ...vuex.mapWaitingActions(vuex.modules.ISSUE, {
            $_issue_search_mixin_searchComplaint: {
                action: vuex.actions.ISSUE.SEARCH,
                loader: "issueSearchMixin@searchComplaint"
            }
        }),

        ...vuex.mapWaitingActions(vuex.modules.GROUP, {
            $_issue_search_mixin_fetchRecipients: {
                action: vuex.actions.GROUP.FETCH,
                loader: "issueSearchMixin@fetchRecipients"
            }
        }),

        ...vuex.mapWaitingActions(vuex.modules.ISSUE_STATUS, {
            $_issue_search_mixin_fetchStatuses: {
                action: vuex.actions.ISSUE_STATUS.FETCH,
                loader: "issueSearchMixin@fetchIssueStatuses"
            }
        }),

        ...vuex.mapWaitingActions(vuex.modules.ISSUE_CATEGORY, {
            $_issue_search_mixin_fetchIssueCategories: {
                action: vuex.actions.ISSUE_CATEGORY.FETCH,
                loader: "issueSearchMixin@fetchIssueCategories"
            }
        }),

        $_issue_search_mixin_onSwitchDateType() {
            this.$_issue_report_mixin_switchType();

            this.issue_search_mixin_dateMenu = false;

            setTimeout(() => {
                this.issue_search_mixin_dateMenu = true;
            }, 200);
        },

        async $_issue_search_mixin_fetchRecipient() {
            let response,
                filters = {},
                select = ["groups:id,name"],
                sort = ["name"];

            try {
                response = await this.$_issue_search_mixin_fetchRecipients({
                    filters,
                    select,
                    sort
                });
            } catch (error) {
                throw error;
            }

            return response;
        },

        $_issue_search_mixin_clearState() {
            this.$_vuexable_setState({
                key: "searchKeyword",
                value: ""
            }, vuex.modules.ISSUE);

            this.$_vuexable_updatePagination({
                key: "search",
                value: {
                    keyword: "",
                    fields: []
                }
            }, vuex.modules.ISSUE);

            this.$_vuexable_setState({
                key: "filter_groups",
                value: []
            }, vuex.modules.ISSUE);

            this.$_vuexable_setState({
                key: "backupFormdata",
                value: {}
            }, vuex.modules.ISSUE);
        },

        async $_issue_search_mixin_onSearchFilter() {
            const {
                issue_search_mixin_form,
                $_issue_search_mixin_searchFilters = []
            } = this;

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
                }, vuex.modules.ISSUE);

                this.$_vuexable_setState({
                    key: "backupFormdata",
                    value: _.cloneDeep(issue_search_mixin_form.data)
                }, vuex.modules.ISSUE);
            }

            this.$_vuexable_setState({
                    key: "filter_groups",
                    value: $_issue_search_mixin_searchFilters
                },
                vuex.modules.ISSUE
            );

            let response;

            try {
                response = await this.$_issue_search_mixin_searchComplaint();
            } catch (error) {
                this.$emit("alert:searchError");
                throw error;
            }

            this.$_issue_search_mixin_updateRoute();

            return response;
        },

        async $_issue_search_mixin_onSearchByKeyword() {
            this.$_issue_search_mixin_clearState();
            this.$_issue_search_mixin_extractSearchKeywordToFilters();

            const {
                issue_search_mixin_searchKeyword,
                $_issue_search_mixin_searchFilters = []
            } = this;

            if ($_issue_search_mixin_searchFilters.length) {
                return this.$_issue_search_mixin_onSearchFilter();
            }

            if (!issue_search_mixin_searchKeyword.length) {
                this.$emit("alert:invalidSearchForm");

                this.$_vuexable_updatePagination({
                    key: "search",
                    value: {
                        keyword: "",
                        fields: []
                    }
                }, vuex.modules.ISSUE)

                this.$_vuexable_setState({
                        key: "filter_groups",
                        value: []
                    },
                    vuex.modules.ISSUE
                );

                this.$_vuexable_setState({
                    key: "backupFormdata",
                    value: {}
                }, vuex.modules.ISSUE);
            } else {
                this.$_vuexable_setState({
                    key: "searchKeyword",
                    value: issue_search_mixin_searchKeyword
                }, vuex.modules.ISSUE);

                this.$_vuexable_updatePagination({
                    key: "search",
                    value: {
                        keyword: issue_search_mixin_searchKeyword,
                        fields: SEARCH_FIELDS
                    }
                }, vuex.modules.ISSUE)
            }

            let response;

            try {
                response = await this.$_issue_search_mixin_searchComplaint();
            } catch (error) {
                this.$emit("alert:searchError");
                throw error;
            }

            this.$_issue_search_mixin_updateRoute();

            return response;
        },

        $_issue_search_mixin_extractSearchKeywordToFilters() {
            const {
                issue_search_mixin_searchKeyword = ""
            } = this;

            this.$_issue_search_mixin_clearSearchFilters();

            if (!issue_search_mixin_searchKeyword.length) return;

            const regex = /([\w-]+):\(([0-9A-Za-zก-๙-!$%^&*()_+|~=`{}\[\]";'<>?,.\/\s]+)\)/gm;

            let m;

            while ((m = regex.exec(issue_search_mixin_searchKeyword)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }

                // The result can be accessed through the `m`-variable.
                if (m.length) {
                    // const fullMatch = m[0];
                    const key = m[1];
                    const value = m[2];

                    // const replacedValue = value.replace(/[,\s]+/gm, " ");
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
                    }

                    // if (this.form.has(key))
                }
                // m.forEach((match, groupIndex) => {
                //     console.log(match);

                //     console.log(`Found match, group ${groupIndex}: ${match}`);
                // });
            }
        },

        $_issue_search_mixin_updateSearchKeywordFromFilters() {
            const {
                $_issue_search_mixin_searchFiltersKeyword = ""
            } = this;

            if ($_issue_search_mixin_searchFiltersKeyword.length) {
                this.issue_search_mixin_searchKeyword = $_issue_search_mixin_searchFiltersKeyword;
            }

            this.$_vuexable_setState({
                key: "searchKeyword",
                value: this.issue_search_mixin_searchKeyword
            }, vuex.modules.ISSUE);
        },

        $_issue_search_mixin_clearSearchFilters() {
            this.issue_search_mixin_form = vuex.models.FORM.make({
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

        $_issue_search_mixin_clearSearchKeyword() {
            this.issue_search_mixin_searchKeyword = "";
        },

        $_issue_search_mixin_updateRoute() {
            this.$router.push({
                name: views.ISSUE.INDEX,
                query: {
                    ...this.$route.query,
                    q: this.issue_search_mixin_searchKeyword
                }
            })
        },

        $_issue_search_mixin_updateKeywordAndBackup() {
            const {
                $_issue_search_mixin_stateSearchKeyword,
                $_issue_search_mixin_stateBackupFormdata
            } = this;

            if (
                $_issue_search_mixin_stateSearchKeyword &&
                $_issue_search_mixin_stateSearchKeyword.length
            ) {
                this.issue_search_mixin_searchKeyword = $_issue_search_mixin_stateSearchKeyword;
            } else {
                this.issue_search_mixin_searchKeyword = "";
            }

            if (
                $_issue_search_mixin_stateBackupFormdata &&
                Object.keys($_issue_search_mixin_stateBackupFormdata).length
            ) {
                this.issue_search_mixin_form = vuex.models.FORM.make({
                    ...$_issue_search_mixin_stateBackupFormdata
                });
            } else {
                this.issue_search_mixin_form = vuex.models.FORM.make({
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

        $_issue_search_mixin_makeGroupKeyword(prefix, ids = []) {
            return this.$_issue_search_mixin_makeKeyword(prefix, (res, groupId) => {
                const group = this.$_vuexable_getByKey(
                    groupId,
                    vuex.modules.GROUP
                );

                res += group.name || "";

                return res;
            }, ids);
        },

        $_issue_search_mixin_makeKeyword(prefix, cb, arr = []) {
            return arr.reduce(
                (res, item, index) => {
                    res = cb(res, item, index);

                    if (index !== arr.length - 1) {
                        res += ",";
                    }

                    return res;
                }, `${prefix}:(`
            ) + ")";
        }
    },

    mounted() {
        const {
            $_issue_search_mixin_stateSearchKeyword,
            $_issue_search_mixin_stateBackupFormdata
        } = this;

        if ($_issue_search_mixin_stateSearchKeyword === undefined) {
            console.log("IssueSearchMixin: add state 'searchKeyword'");

            this.$_vuexable_setState({
                key: "searchKeyword",
                value: ""
            }, vuex.modules.ISSUE);
        }

        if ($_issue_search_mixin_stateBackupFormdata === undefined) {
            console.log("IssueSearchMixin: add state 'backupFormdata'");

            this.$_vuexable_setState({
                key: "backupFormdata",
                value: {}
            }, vuex.modules.ISSUE);
        }

        if (this.issue_search_mixin_searchKeyword.length) {
            this.$_issue_search_mixin_extractSearchKeywordToFilters();
            this.$_issue_search_mixin_updateSearchKeywordFromFilters();
            this.$_vuexable_setState({
                    key: "filter_groups",
                    value: this.$_issue_search_mixin_searchFilters
                },
                vuex.modules.ISSUE
            );
        }
    }
};
