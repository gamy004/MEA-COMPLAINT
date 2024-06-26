export const QUERY = 'query';
export const REQUEST = 'request';
export const FIND = 'find';
export const FETCH = 'fetch';
export const STORE = 'store';
export const UPDATE = 'update';
export const DELETE = 'delete';

export const USER = {
    SIGN_IN: 'userSignIn',
    SIGN_OUT: 'userSignOut',
    GET_AUTH: 'userGetAuth',
    FETCH: 'userFetch',
    STORE: 'userStore',
    EDIT: 'userEdit',
    UPDATE: 'userUpdate',
    UPDATE_CONFIG: 'userUpdateConfig',
    DELETE: 'userDelete',
    RESTORE: 'userRestore',
};

export const ISSUE = {
    FETCH: 'complaintFetch',
    FETCH_SEARCH: 'complaintFetchAllSearch',
    SHOW: 'complaintShow',
    STORE: 'complaintStore',
    EDIT: 'complaintEdit',
    UPDATE: 'complaintUpdate',
    DELETE: 'complaintDelete',
    FORCE_DELETE: 'complaintForceDelete',
    RESTORE: 'complaintRestore',
    EXPORT: 'complaintExport',
    SEARCH: 'complaintSearch',
    EXPORT_SEARCH: 'complaintExportSearch',
    ARCHIVE: 'complaintArchive'
};

export const GROUP = {
    FETCH: 'groupFetch',
    UPDATE: 'groupUpdate',
    DELETE: 'groupDelete',
    RESTORE: 'groupRestore',
};

export const SUB_GROUP = {
    FETCH: 'subGroupFetch',
    UPDATE: 'subGroupUpdate',
    DELETE: 'subGroupDelete',
    RESTORE: 'subGroupRestore',
};

export const ROLE = {
    FETCH: 'roleFetch'
};

export const FILE = {
    FETCH: 'fileFetch',
    DELETE: 'fileDelete',
    RESTORE: 'fileRestore',
    DELETE_BY_PATH: 'fileDeleteByHash'
};

export const ISSUE_STATUS = {
    FETCH: 'issueStatusFetch',
    EDIT: 'issueStatusEdit',
    STORE: 'issueStatusStore',
    UPDATE: 'issueStatusUpdate',
    DELETE: 'issueStatusDelete',
    RESTORE: 'issueStatusRestore',
    UPDATE_DEFAULT: 'issueStatusUpdateDefault'
};

export const ISSUE_CATEGORY = {
    FETCH: 'issueCategoryFetch',
    EDIT: 'issueCategoryEdit',
    STORE: 'issueCategoryStore',
    UPDATE: 'issueCategoryUpdate',
    DELETE: 'issueCategoryDelete',
    RESTORE: 'issueCategoryRestore'
};

export const ISSUE_NOTE = {
    FETCH: 'issueNoteFetch',
    EDIT: 'issueNoteEdit',
    STORE: 'issueNoteStore',
    UPDATE: 'issueNoteUpdate',
    DELETE: 'issueNoteDelete',
    RESTORE: 'issueNoteRestore'
};
