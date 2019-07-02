<?php

namespace App\IOCs;

class Data
{
    const FOREIGNS = 'foreigns';
    const BUILT_IN = 'built_in';
    const BUILT_INS = 'built_ins';
    const REF = 'ref';
    const NULLABLE = 'nullable';
    const OPTIONS = 'options';
    const OPTION = 'option';
    const OPERATORS = 'operators';
    const SIMPLE = 'simple';
    const SHORT = 'short';
    const ITEM_FIELDS = 'item_fields';
    const FIELDS = 'fields';
    const KEYWORD = 'keyword';
    const TOTAL = 'total';
    const REPORTER = 'reporter';
    const ROLE = 'role';
    const ROLES = 'roles';
    const UPLOAD_PATH = 'upload_path';
    const DETACHED = 'detached';
    /**
     * Issue
     */
    const RECIPIENTS = 'recipients';
    const ATTACHMENTS = 'attachments';

    /**
     * IssueStatus
     */
    const CONFIGS = 'configs';

    /**
     * File System
     */
    const APP_DIR = 'app/';
    const PUBLIC_DIR = 'public/';
    const STORAGE_DIR = 'storage/';
    const UPLOAD_DIR = 'uploads/';
    const UPLOADED_FILES = 'uploaded_files';

    /**
     * Company API
     */
    const USERS = 'users';
}
