export const en = {
    general: {
        cancel: "Cancel",
        search: "Search",
        others: "others",
        date: "Date",
        month: "Month",
        select: "Select",
        refresh: "Refresh",
        restore: "Restore",
        settings: "Settings",
        newest: "Newest",
        oldest: "Oldest",
        export: "Export",
        save: "Save",
        savingDraft: "Saving draft",
        archive: "Archive",
        changeStatus: "Change status",
        create: "Create",
        edit: "Edit",
        update: "Update",
        delete: "Delete",
        forceDelete: "Delete from system",
        moveToTrash: "Move to Trash",
        uploadFile: "Upload files",
        formatOptions: "Formatting options",
        discard: "Discard",
        discardDraft: "Discard draft",
        close: "Close",
        send: "Send",
        saveAndClose: "Save & close",
        undo: "Undo",
        yes: "Yes",
        no: "No",
        admin: "Admin",
        anonymous: "unknown",
        anonymousRecipient: "Unknown recipient",
        anonymousStatus: "Unknown status",
        download: "Download",
        present: "Present",
        start: "Start",
        end: "End",
        exceed: "Late",
        duration: "Duration",
        unit: "Unit",
        logout: "Sign out"
    },
    time: {
        minutes: "minute",
        hours: "hour",
        days: "day",
        weeks: "week",
        months: "month",
        years: "year"
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
                    },
                    watingTerm: "Generating report, please stand by"
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
                selectAllBtn: "Select all complaints that match this search",
                clearAll: "Clear search"
            },
            form: {
                title: "Complaint",
                category: "Category",
                to: "To",
                subject: "Subject",
                fullScreen: "Full-screen",
                warningDiscard: {
                    title: "Discard complaint?",
                    desc: "Your complaint will be permanently deleted."
                },
                warningSubmit: {
                    title: "Submit without subject and description?",
                    desc: "You want to create complaint without subject and description."
                },
                warningForceDelete: {
                    title: "Delete complaint?",
                    desc: "Your complaint will be permanently deleted."
                }
            }
        },
        show: {
            toolbar: {
                back: "Back to inbox",
                showStatusHistory: "Show status history"
            },
            statusHistory: {
                title: "Status History"
            },
            complaintNote: {
                remarkBy: "Remark by",
                to: "To"
            },
            remarkBtn: "Remark"
        }
    },
    issueCategory: {
        index: {
            title: "Categories",
            searchLabel: "Search category",
            createBtn: "New category",
            header: {
                category: "Category"
            },
            form: {
                title: {
                    new: "New category",
                    update: "Update category"
                },
                name: "Category name"
            }
        }
    },
    issueStatus: {
        index: {
            title: "Statuses",
            searchLabel: "Search status",
            createBtn: "New status",
            header: {
                status: "Status"
            },
            form: {
                title: {
                    new: "New status",
                    update: "Update status"
                },
                name: "Status name",
                pickColor: "Pick status color",
                trackStatus: "Track status",
                subPickColor: "Pick Status Color for Time No.{n}",
                addTracking: "Add Tracking"
            }
        }
    },
    userGroup: {
        index: {
            title: "Users & Groups",
            searchLabel: "Search user or group/subgroup",
            createBtn: "New User",
            header: {
                user: "User",
                role: "Role",
                group: "Group",
                subGroup: "Sub Group"
            },
            form: {
                title: {
                    new: "New User",
                    update: "Update User"
                },
                credential: "User's Credential",
                username: "Username (required)",
                updatePassword: "Update Password",
                password: "Password (required)",
                passwordConfirm: "Password Confirmation (required)",
                generalInformation: "General Information",
                name: "name (required)",
                email: "Email",
                phone: "Phone",
                role: "Role",
                group: "Group",
                subGroup: "Sub Group",
                groupAndSubGroup: "Group & Sub Group"
            },
            warningGroupItem: {
                term: "{item} will be permanently deleted. All users beneath {item} will lost their group."
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
    login: {
        term1: "Welcome back",
        signIn: "Sign in",
        signInTerm: "with your MEA provided account",
        form: {
            username: "Username",
            password: "Password"
        },
        signin_success: "Sign in successfully"
    },
    alertMessages: {
        undo: "Action undone",
        undo_error: "Action cannot undone",
        update_success: "Update successfully",
        delete_error: "Cannot update, pelase try again",
        delete_success: "Delete successfully",
        delete_error: "Cannot delete, pelase try again",
        searchComplaint: {
            invalidQuery: "Invalid search query, returning all complaints",
            error: "Searching failed, please try again"
        },
        file: {
            delete_success: "Attachment was deleted successfully",
            delete_error: "Cannot delete file, please try again"
        },
        uploadFile: {
            delete_success: "Uploaded file was deleted successfully"
        },
        complaintForm: {
            submit_error: "Cannot submit complaint, please check error message",
            delete_error: "Cannot delete complaint, please try again",
            archive_error: "Cannot archive complaint, please try again",
            save_draft_success: "Draft complaint was saved successfully",
            create_success: "Complaint was created successfully",
            update_success: "Complaint was updated successfully",
            delete_success: "Complaint moved to Trash",
            archive_success: "Complaint moved to Archive",
            restore_success: "Complaint was restored successfully",
            restore_error: "Cannot restore complaint, please try again",
            force_delete_success: "Complaint was deleted successfully"
        },
        complaintStatus: {
            update_success: "Complaint Status was updated successfully",
            update_error: "Cannot update complaint status, please try again",
        },
        complaintNote: {
            submit_error: "Cannot submit note, please check error message",
            delete_error: "Cannot delete note, please try again",
            create_success: "Note was created successfully",
            update_success: "Note was updated successfully",
            delete_success: "Note was deleted successfully"
        },
        issueCategory: {
            submit_error: "Cannot submit category, please check error message",
            edit_error: "Cannot load category data, please try again",
            delete_error: "Cannot delete category, please try again",
            create_success: "Category was created successfully",
            update_success: "Category was updated successfully",
            delete_success: "Category was deleted successfully"
        },
        issueStatus: {
            submit_error: "Cannot submit status, please check error message",
            edit_error: "Cannot load status data, please try again",
            delete_error: "Cannot delete status, please try again",
            create_success: "Status was created successfully",
            update_success: "Status was updated successfully",
            delete_success: "Status was deleted successfully",
            update_default_success: "Default status was updated successfully",
            update_default_error: "Cannot update default status, please try again",
        },
        userGroup: {
            submit_error: "Cannot submit user, please check error message",
            edit_error: "Cannot load user data, please try again",
            delete_error: "Cannot delete user, please try again",
            create_success: "User was created successfully",
            update_success: "User was updated successfully",
            delete_success: "User was deleted successfully"
        },
        group: {
            update_success: "Update group successfully",
            delete_error: "Cannot update group, pelase try again",
            delete_success: "Delete group successfully",
            delete_error: "Cannot delete group, pelase try again",
        },
        subgroup: {
            update_success: "Update sub-group successfully",
            delete_error: "Cannot update sub-group, pelase try again",
            delete_success: "Delete sub-group successfully",
            delete_error: "Cannot delete sub-group, pelase try again",
        }
    },
    table: {
        noData: "No matching records found",
        noResult: "No matching result found"
    }
};
