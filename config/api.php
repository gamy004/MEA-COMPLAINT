<?php

return [
    'parser' => [
        'select' => App\Api\Parsers\SelectParser::class,
        'include' => App\Api\Parsers\IncludeParser::class,
        'map' => App\Api\Parsers\MapParser::class,
        'filter_group' => App\Api\Parsers\FilterGroupParser::class,
        'sort' => App\Api\Parsers\SortParser::class,
        'paginate' => App\Api\Parsers\PaginateParser::class
    ],

    'resolver' => [
        'embed' => App\Api\Resolvers\EmbedModeResolver::class,
        'ids' => App\Api\Resolvers\IdsModeResolver::class,
        'sideload' => App\Api\Resolvers\SideloadModeResolver::class
    ],

    'default_resolver' => 'embed'
];