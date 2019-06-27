<?php

namespace App\IOCs;

class DBCol
{
    const ID = 'id';
    const NAME = 'name';
    const EMAIL = 'email';
    const PASSWORD = 'password';
    const PHONE = 'phone';
    const AVATAR = 'avatar';
    const AVAILABLE = 'available';
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
    /**
     * ISSUE_CATEGORY
     */
    const CATEGORY = 'category';
    /**
     * ISSUE STATUS
     */
    const STATUS = 'status';
    const DEFAULT = 'default';
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
    const ROLE_ID = 'role_id';
    const TYPE_ID = 'type_id';
}
