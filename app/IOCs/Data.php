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
    const ISSUER = 'issuer';
    const RECIPIENT = 'recipient';
    const RECIPIENTS = 'recipients';
    const RECIPIENT_IDS = 'recipient_ids';
    const LATEST_STATUS = 'latest_status';
    const ATTACHMENTS = 'attachments';
    const TYPE = 'type';
    const INBOX = 'inbox';
    const DRAFT = 'draft';
    const ARCHIVE = 'archive';
    const TRASH = 'trash';
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
     * User API
     */
    const USERS = 'users';
    const GROUP = 'group';
    const SUB_GROUP = 'sub_group';
    const GROUP_NAME = 'group_name';
    const SUB_GROUP_NAME = 'sub_group_name';
    const AVATAR = 'avatar';
}
