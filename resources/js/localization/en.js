export const en = {
    general: {
        cancel: "Cancel",
        search: "Search",
        others: "others",
        date: "Date",
        month: "Month",
        select: "Select",
        refresh: "Refresh",
        settings: "Settings",
        newest: "Newest",
        oldest: "Oldest",
        export: "Export",
        save: "Save"
    },

    complaint: {
        addBtn: "Complaint",

        index: {
            toolbar: {
                generateReport: {
                    tooltip: "Generate report",
                    subheader: "Generate report",
                    dateheader: "Generate by",
                    by: {
                        selected: "By current selected",
                        filter: "By current filter",
                        thisWeek: "This week",
                        thisMonth: "This month",
                        date: "Pick date"
                    }
                },

                inboxConfigs: {
                    tooltip: "Show Inbox Configuration",
                    header: "Inbox Configuration",
                    maxPage: "Maximum page size"
                },

                primary: "Primary"
            },

            selectAllSearch: {
                someSelected: "<strong>1</strong> complaint is selected | <strong>{count}</strong> complaints are selected",
                allSelected: "All <strong>1</strong> complaint is selected | All <strong>{count}</strong> complaints are selected",
                selectAllBtn: "Select all complaints that match this search"
            }
        }
    },

    sidebar: {
        inbox: "Inbox",
        draft: "Drafts",
        archive: "Archives",
        trash: "Trash",
        adminSection: "Admin Management",
        categories: "Categories",
        statuses: "Statuses",
        usersAndGroups: "Users & Groups",
    },

    header: {
        searchLabel: "Search complaint",
        searchTooltip: "Show search options",
        searchClearAction: "Clear search",
        searchForm: {
            from: "From",
            to: "To",
            status: "Status",
            category: "Category",
            subject: "Subject",
            includeWords: "Has the words",
            excludeWords: "Doesn't have",
            selectBy: {
                date: "Switch to select by date",
                month: "Switch to select by month",
            }
        }
    },

    alertMessages: {
        searchComplaint: {
            invalidQuery: "Invalid search query, returning all complaints",
            error: "Searching failed, please try again"
        }
    }
};
