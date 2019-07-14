<?php

namespace App\IOCs;

class DBCol
{
    const ID = 'id';
    const USERNAME = 'username';
    const NAME = 'name';
    const EMAIL = 'email';
    const PASSWORD = 'password';
    const PHONE = 'phone';
    const AVATAR = 'avatar';
    const AVAILABLE = 'available';
    const INBOX_SETTINGS = 'inbox_settings';
    const ROLE = 'role';
    const TYPE = 'type';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    const DELETED_AT = 'deleted_at';
    const EXPIRE_AT = 'expire_at';
    const REF = 'ref';
    const VALUE = 'value';
    const DESCRIPTION = 'description';
    const LABEL = 'label';
    const DISPLAY = 'display';
    const REQUIRED = 'required';
    const ACTIVE = 'active';
    const UNIQUE = 'unique';
    const NOTE = 'note';
    const UUID = 'uuid';
    /**
     * ISSUE
     */
    const SUBJECT = 'subject';
    const ISSUED_BY = 'issued_by';
    const REFERENCED_TO = 'referenced_to';
    const RECIPIENT_ID = 'recipient_id';
    const ARCHIVE = 'archive';
    const DRAFT = 'draft';
    /**
     * ISSUE_CATEGORY
     */
    const CATEGORY = 'category';
    /**
     * ISSUE STATUS
     */
    const STATUS = 'status';
    const COLOR = 'color';
    const DURATION = 'duration';
    const UNIT = 'unit';
    const DEFAULT = 'default';
    const STATUS_UPDATED_AT = 'status_updated_at';
    const STARTED_AT = 'started_at';
    const ENDED_AT = 'ended_at';
    /**
     * ISSUE NOTE
     */
    const CREATED_BY = 'created_by';
    /**
     * File
     */
    const DISPLAY_NAME = 'display_name';
    const HASH_NAME = 'hash_name';
    const SIZE = 'size';
    const FORMATTED_SIZE = 'formatted_size';
    const MIME = 'mime';
    const PATH = 'path';
    const URL = 'url';
    const _PUBLIC = 'public';

    const GROUP_ID = 'group_id';
    const SUB_GROUP_ID = 'sub_group_id';
    const ROLE_ID = 'role_id';
    const TYPE_ID = 'type_id';
    const AVATAR_ID = 'avatar_id';
    const PARENT_ID = 'parent_id';
}
