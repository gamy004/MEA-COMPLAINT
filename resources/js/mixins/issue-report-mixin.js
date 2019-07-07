import FileSaver from "file-saver";
import {
    vuexable,
    vuex
} from "./vuexable";
import {
    filterContains,
    formatDateFile,
    filterIn
} from "../helpers";

const IssueReportMixin = {
    mixins: [vuexable],

    computed: {
        $_issue_report_mixin_report() {
            return this.$_vuexable_getState("report", vuex.modules.ISSUE) || {};
        },

        $_issue_report_mixin_reportTypes() {
            const {
                types = []
            } = this.$_issue_report_mixin_report;

            return types;
        },

        $_issue_report_mixin_reportType: {
            get() {
                const {
                    reportType = "date"
                } = this.$_issue_report_mixin_report;

                return reportType;
            },

            set(reportType) {
                this.$_vuexable_setState({
                        key: "report",
                        value: {
                            ...this.$_issue_report_mixin_report,
                            reportType
                        }
                    },
                    vuex.modules.ISSUE
                );
            }
        },

        $_issue_report_mixin_isTypeDate() {
            return this.$_issue_report_mixin_reportType === "date";
        },

        $_issue_report_mixin_reportVModel: {
            get() {
                const data = this.$_issue_report_mixin_isTypeDate ? "dates" : "months";

                return this.$_issue_report_mixin_report[data] || [];
            },

            set(v) {
                const data = this.$_issue_report_mixin_isTypeDate ? "dates" : "months";

                this.$_vuexable_setState({
                        key: "report",
                        value: {
                            ...this.$_issue_report_mixin_report,
                            [data]: v
                        }
                    },
                    vuex.modules.ISSUE
                );
            }
        },

        $_issue_report_mixin_reportGenerate: {
            get() {
                const {
                    generate = false
                } = this.$_issue_report_mixin_report;

                return generate;
            },

            set(generate) {
                this.$_vuexable_setState({
                        key: "report",
                        value: {
                            ...this.$_issue_report_mixin_report,
                            generate
                        }
                    },
                    vuex.modules.ISSUE
                );
            }
        },

        $_issue_report_mixin_reportDialog: {
            get() {
                const {
                    dialog = false
                } = this.$_issue_report_mixin_report;

                return dialog;
            },

            set(dialog) {
                this.$_vuexable_setState({
                        key: "report",
                        value: {
                            ...this.$_issue_report_mixin_report,
                            dialog
                        }
                    },
                    vuex.modules.ISSUE
                );
            }
        }
    },

    methods: {
        ...vuex.mapWaitingActions(vuex.modules.ISSUE, [
            vuex.actions.ISSUE.EXPORT,
            vuex.actions.ISSUE.EXPORT_SEARCH,
        ]),

        $_issue_report_mixin_switchType() {
            if (this.$_issue_report_mixin_isTypeDate) {
                this.$_issue_report_mixin_reportType = 'month';
            } else {
                this.$_issue_report_mixin_reportType = 'date';
            }
        },

        async $_issue_report_mixin_generateCurrentSelected() {
            let filter_groups = this.$_vuexable_getState(
                "filter_groups",
                vuex.modules.ISSUE
            );

            const pagination = this.$_vuexable_getState(
                "pagination",
                vuex.modules.ISSUE
            );

            const selected = this.$_vuexable_getState(
                "selected",
                vuex.modules.ISSUE
            );

            let selectAll = this.$_vuexable_getState(
                "selectAll",
                vuex.modules.ISSUE
            );

            if (!selectAll) {
                const selectedIds = [];

                for (const id in selected) {
                    if (selected.hasOwnProperty(id)) {
                        const isSelected = selected[id];

                        if (isSelected) {
                            selectedIds.push(id);
                        }
                    }
                }

                filter_groups = [{
                    filters: [filterIn("id", selectedIds)]
                }];
            }

            let sort = pagination.sortBy;

            if (pagination.descending) {
                sort = `-${sort}`;
            }

            this.$_issue_report_mixin_export(
                filter_groups, {
                    action: vuex.actions.ISSUE.EXPORT_SEARCH,
                    sort: [sort]
                }
            );
        },

        async $_issue_report_mixin_generateCurrentFilter() {
            const filter_groups = this.$_vuexable_getState(
                "filter_groups",
                vuex.modules.ISSUE
            );

            const pagination = this.$_vuexable_getState(
                "pagination",
                vuex.modules.ISSUE
            );

            let sort = pagination.sortBy;

            if (pagination.descending) {
                sort = `-${sort}`;
            }

            this.$_issue_report_mixin_export(
                filter_groups, {
                    action: vuex.actions.ISSUE.EXPORT_SEARCH,
                    sort: [sort]
                }
            );
        },

        async $_issue_report_mixin_generateThisWeekReport() {
            let startOfWeek = moment().startOf('isoWeek');
            let endOfWeek = moment().endOf('isoWeek');

            let ranges = [];
            let day = startOfWeek;

            while (day <= endOfWeek) {
                ranges.push(day.format("YYYY-MM-DD").toString());
                day = day.clone().add(1, 'd');
            }

            const fileName = `ComplaintWeeklyReport_${ranges[0]}_${ranges[ranges.length - 1]}`;

            return await this.$_issue_report_mixin_generateReport(ranges, fileName);
        },

        async $_issue_report_mixin_generateThisMonthReport() {
            let yearMonth = moment().format("YYYY-MM").toString();

            const fileName = `ComplaintMonthlyReport_${yearMonth}`;

            return await this.$_issue_report_mixin_generateReport([yearMonth], fileName);
        },

        async $_issue_report_mixin_generateReport(ranges, fileName = null) {
            let filter_groups = [{
                filters: ranges.map(range => filterContains("created_at", range)),
                or: true
            }];

            return this.$_issue_report_mixin_export(filter_groups, {
                fileName
            });
        },

        async $_issue_report_mixin_export(filter_groups = [], {
            fileName = null,
            action = vuex.actions.ISSUE.EXPORT,
            sort = ["-updated_at"]
        }) {
            this.$_issue_report_mixin_reportDialog = false;
            this.$_issue_report_mixin_reportGenerate = true;

            let content;

            try {
                content = await this[action]({
                    filter_groups,
                    sort
                });
            } catch (error) {
                throw error;
            }

            const currentDate = new Date();

            fileName = !_.isNull(fileName) ? fileName : `ComplaintReport_${formatDateFile(currentDate)}`;

            FileSaver.saveAs(
                content.data,
                fileName
            );

            this.$_issue_report_mixin_reportGenerate = false;
        }
    },

    mounted() {
        if (!Object.keys(this.$_issue_report_mixin_report).length) {
            this.$_vuexable_setState({
                    key: "report",
                    value: {
                        reportType: "date",
                        types: [{
                                label: "Month",
                                value: "month"
                            },
                            {
                                label: "Date",
                                value: "date"
                            }
                        ],
                        dates: [],
                        months: [],
                        dialog: false,
                        generate: false
                    }
                },
                vuex.modules.ISSUE
            );
        }
    }
};

export default IssueReportMixin;
