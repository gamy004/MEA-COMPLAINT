<?php

namespace App\Api;

use Exception;
use App\IOCs\Data;
use App\Api\Parser;
use App\IOCs\DBCol;
use App\Api\Utility;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use InvalidArgumentException;
use App\Api\Parsers\BaseParser;
use App\Helpers\DateTimeHelper;
use App\Api\Parsers\SelectParser;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use App\Api\Parsers\PaginateParser;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

abstract class BaseApi
{
    /**
     * Singleton Api Parser
     *
     * @var [type]
     */
    protected $parser;

    protected $architect;

    public $parser_options;

    /**
     * Base Model
     *
     * @var Illuminate\Database\Eloquent\Model
     */
    protected $model = null;

    /**
     * Base Model
     *
     * @var Illuminate\Database\Eloquent\Model
     */
    protected $originalModel = null;

    /**
     * Custom Query
     *
     */
    protected $customQuery = null;

    /**
     * Custom Table
     *
     */
    protected $customTable = null;

    /**
     * Data
     */
    protected $data = null;

    /**
     * Pagination Data
     */
    protected $pagination_data = [];

    /**
     * Architect Key
     */
    protected $architect_key = null;

    /**
     * Query Primary Key
     *
     * @var [String]
     */
    protected $primary_key = DBCol::ID;

    /**
     * DateTimeHelper Instance
     *
     * @var App\Helpers\DateTimeHelper
     */
    protected $dateTimeHelper;

    public function __construct(
        Model $model
    ) {
        $this->parser = app(Parser::class);
        $this->architect = app(Architect::class);
        $this->request = app(Request::class);
        $this->dateTimeHelper = app(DateTimeHelper::class);
        $this->originalModel = $model;
    }

    public function getBaseBuilder()
    {
        return $this->createBaseBuilder();
    }

    public function getBaseBuilderTable()
    {
        return !is_null($this->customTable)
        ? $this->customTable
        : $this->originalModel->getModel()->getTable();
    }

    public function getBuilderTable($builder)
    {
        return !is_null($this->customTable)
        ? $this->customTable
        : $builder->getModel()->getTable();
    }

    public function getFilterValue($key)
    {
        $value = null;

        $this->updateParserOptions();

        $filter_maps = $this->getParserOption(BaseParser::PARAMS['FILTER_MAPPING']);

        foreach ($filter_maps as $filter_group_key => $filter_value) {
            if ($filter_group_key === $key) {
                $value = $filter_value;

                break;
            }
        }

        return $value;
    }

    public function index()
    {
        try {
            $data = $this->get();
        } catch (Exception $e) {
            throw $e;
        }

        return $data;
    }

    public function show(Model $model)
    {
        return $this->find($model_id);
    }

    public function destroy(Model $model)
    {
        try {
            DB::beginTransaction();

            $model->delete();

            DB::commit();

            return response()->json([
                "message" => "destroy success",
                "id" => $model->{DBCol::ID}
            ]);
        } catch (Exception $exception) {
            DB::rollback();

            Log::error($exception);

            throw new Exception("Error Handle Deleting Resource Request");
        }
    }

    public function restore($id)
    {
        try {
            DB::beginTransaction();

            $restore = $this->originalModel->withTrashed()
                ->where(DBCol::ID, $id)
                ->restore();

            DB::commit();

            if ($restore) {
                return $this->find($id);
            }
        } catch (Exception $exception) {
            DB::rollback();

            Log::error($exception);

            throw new Exception("Error Handle Restoring Resource Request");
        }
    }

    public function get($key = null)
    {
        if (!is_null($key)) {
            $this->setArchitectKey($key);
        }

        $this->processData('get');

        return $this->data;
    }

    public function find($model_id)
    {
        $this->processData('find', $model_id);

        return $this->data;
    }

    protected function processData($fn, ...$args)
    {
        $builder = $this->getBaseBuilder();
        
        $this->data = call_user_func_array(
            [$builder, $fn],
            $args
        );

        if (is_null($this->customQuery)) {
            $this->applyAndUpdateArchitect();
        } else {
            $this->data = Collection::make([])->put(
                $this->getArchitectKey(),
                $this->data
            );
        }

        $this->updatePaginationData();
    }

    protected function applyAndUpdateArchitect($key = null)
    {
        $this->data = $this->architect->parseData(
            $this->data,
            $this->getParserOption(BaseParser::PARAMS['MODES']),
            $this->getArchitectKey()
        );

        return $this;
    }

    protected function updatePaginationData()
    {
        if (!empty($this->pagination_data)) {
            $this->data = $this->data->merge($this->pagination_data);
        }

        return $this;
    }

    protected function addFieldTotalToPagination()
    {
        if ($this->hasParserOption(BaseParser::PARAMS['PAGE'])) {
            $this->pagination_data[Data::TOTAL] = $this->model->count();
        }

        return $this;
    }
    
    /**
     * @deprecated
     *
     * @return void
     */
    protected function applyMapping()
    {
        if (!$this->hasParserOption(BaseParser::PARAMS['MAP'])) {
            return;
        }

        $map = $this->getParserOption(BaseParser::PARAMS['MAP']);
        $data = $this->data;

        if (!Utility::isCollection($data)) {
            $checkRules = [get_class($data)];
            $data = collect($data);
            $reverse = true;
        } else {
            $reverse = false;
            $checkRules = $data->keys()->all();
        }

        foreach ($map as $mvalue) {
            $customMapMethod = $this->hasCustomMethod('map', $mvalue);

            if ($customMapMethod) {
                $mapping = Utility::getProperty($this, 'mapping');

                if (count($mapping)) {
                    $mapping = $mapping[$customMapMethod];

                    if ($data->has($mapping)) {
                        $result = call_user_func_array(
                            [$this, $customMapMethod],
                            [$data[$mapping], &$data]
                        );

                        if (!is_null($result)) {
                            $data[$mapping] = $result;
                        }
                    }
                }
            }
        }

        if ($reverse) {
            $data = $data->first();
        }

        $this->data = $data;

        return $this;
    }

    protected function applyFields()
    {
        $baseTable = $this->getBaseBuilderTable();
        $architectKey = $this->getArchitectKey();

        $fields = [];

        if (
            $this->hasSelect($architectKey)
        ) {
            $fields = array_map(
                function ($field) use ($baseTable) {
                    return sprintf("%s.%s", $baseTable, $field);
                },
                $this->getSelect($architectKey)
            );
        }
        if (!empty($fields)) {
            $this->model = $this->model->select($fields);
        }

        return $this;
    }

    protected function applyOptions()
    {
        if (
            $this->hasParserOption(BaseParser::PARAMS['INCLUDES'])
        ) {
            $this->applyIncludes(
                $this->getParserOption(BaseParser::PARAMS['INCLUDES'])
            );
        }

        if (
            $this->hasParserOption(BaseParser::PARAMS['FILTER_GROUPS'])
        ) {
            $filterJoins = $this->applyFilterGroups(
                $this->getParserOption(BaseParser::PARAMS['FILTER_GROUPS'])
            );
        }

        if (
            $this->hasParserOption(BaseParser::PARAMS['SORT'])
        ) {
            if (!isset($filterJoins)) {
                $filterJoins = [];
            }

            $sortingJoins = $this->applySorting(
                $this->getParserOption(BaseParser::PARAMS['SORT']),
                $filterJoins
            );
        }

        if (
            $this->hasParserOption(BaseParser::PARAMS['SEARCH'])
        ) {
            $this->applySearching(
                $this->getParserOption(BaseParser::PARAMS['SEARCH'])
            );
        }

        $this->addFieldTotalToPagination();

        if (
            $this->hasParserOption(BaseParser::PARAMS['PAGE'])
        ) {
            $this->applyOffset(
                $this->getParserOption(BaseParser::PARAMS['PAGE'])
            );
        }

        if (
            $this->hasParserOption(BaseParser::PARAMS['LIMIT'])
        ) {
            $this->applyLimit(
                $this->getParserOption(BaseParser::PARAMS['LIMIT'])
            );
        }

        return $this;
    }

    protected function applySearching(array $search_data)
    {
        if (!isset($search_data[Data::FIELDS])) {
            throw new InvalidArgumentException(
                SelectParser::$messages['missing_fields_argument']
            );
        }

        if (!isset($search_data[Data::KEYWORD])) {
            throw new InvalidArgumentException(
                SelectParser::$messages['missing_keyword_argument']
            );
        }

        $keywords = getWords($search_data[Data::KEYWORD]);
        // dd($keywords);
        $fields = $search_data[Data::FIELDS];

        if (count($keywords) && !empty($fields)) {
            $builder = $this->model;
            // $new_query = $this->createQueryBuilder();
            // $new_query_expression = DB::raw("select * from ({$builder->toSql()}) as original")->getValue();

            // dd($new_query->fromQuery($new_query_expression, $builder->getQuery()));
            // $keyword = "ACMI";
            // $keyword = strtolower($keyword);
            $main_table = $this->getBaseBuilderTable();

            $new_builder = $this->createQueryBuilder()
                ->joinSub($builder, 'original', function ($join) use ($main_table) {
                    $join->on($main_table . '.' . $this->primary_key, '=', 'original.' . $this->primary_key);
                })->select(["original.*"]);
            // // $new_builder = DB::table( DB::raw("({$builder->toSql()}) as original") )
            // //     ->mergeBindings($builder->getQuery()); // you need to get underlying Query Builder
            $new_builder->where(
                function ($query) use ($keywords, $fields) {
                    foreach ($keywords as $keyword) {
                        foreach ($fields as $field) {
                            if ($this->dateTimeHelper->isDateTimeField($field)) {
                                $dateTimeFormat = DateTimeHelper::DEFAULT_FORMAT;

                                $whereStatement = "LOWER(DATE_FORMAT(`original`.`$field`, '$dateTimeFormat')) LIKE '%$keyword%'";
                            } else {
                                $whereStatement = "LOWER(`original`.`$field`) LIKE '%$keyword%'";
                            }

                            $query->orWhereRaw($whereStatement);
                        }
                    }

                    // dd($query->toSql());
                }
            );

            // foreach ($fields as $field) {
            //     $new_builder->orWhereRaw("LOWER(`original`.`$field`) LIKE '%$keyword%'");
            // }

            // dd($new_builder->get());

            $this->model = $new_builder;

            unset($new_builder);
            // dd($new_builder->toSql(), $new_builder->get());
            // dd($builder->toSql());
            // if ($this->getBaseBuilderTable() === 'machines') {
            //     dd([$builder->toSql(), $fn],
            //     $args);
            // }
        }
    }

    protected function applyIncludes(array $includes)
    {
        if (!is_null($this->customQuery)) {
            return;
        }

        $parseInclude = [];

        foreach ($includes as $include) {
            $selectField = $this->getSelect($include);

            if (is_null($selectField)) {
                $includeValue = [$include];
                // $includeValue = [$include => function ($query) {
                //     try {
                //         $query->withTrashed();
                //     } catch (\Throwable $th) {
                //         //throw $th;
                //     }
                // }];

            } else {
                $includeValue = [
                    $include => function ($query) use ($selectField) {
                        $query->select($selectField);
                    },
                ];
            }

            $parseInclude = array_merge($parseInclude, $includeValue);
        }

        if (count($parseInclude)) {
            $this->model->with($parseInclude);
        }

        return $this;
    }

    private function hasSelect($string)
    {
        return array_key_exists(
            $string,
            $this->getParserOption(BaseParser::PARAMS['SELECT'])
        );
    }

    private function getSelect($string)
    {
        return $this->hasSelect($string)
        ? $this->getParserOption(BaseParser::PARAMS['SELECT'])[$string]
        : null;
    }

    protected function applyFilterGroups(array $filter_groups, array $previouslyJoined = [])
    {
        $joins = [];
        
        foreach ($filter_groups as $key => $group) {
            $this->applyFilterGroup($group, $joins);
        }

        foreach (array_diff($joins, $previouslyJoined) as $join) {
            $this->joinRelatedModelIfExists($join);
        }

        return $joins;
    }

    protected function applyFilterGroup(array $group, array &$joins)
    {
        $this->model->where(function ($queryBuilder) use ($group, &$joins) {
            $or = $group[BaseParser::PARAMS['OR']];
            $filters = $group[BaseParser::PARAMS['FILTERS']];

            foreach ($filters as $filterKey => $filter) {
                $this->applyFilter($queryBuilder, $filter, $or, $joins);
            }
        });
    }

    /**
     * @param Illuminate\Database\Eloquent\Builder $queryBuilder
     * @param array $filter
     * @param bool|false $or
     * @param array $joins
     */
    protected function applyFilter(&$queryBuilder, array $filter, $or = false, array &$joins)
    {
        // Destructure Shorthand Filtering Syntax if filter is Shorthand
        if (!array_key_exists(BaseParser::PARAMS['KEY'], $filter) && count($filter) >= 3) {
            $filter = [
                BaseParser::PARAMS[BaseParser::PARAMS['KEY']] => ($filter[0] ?: null),
                BaseParser::PARAMS['OPERATOR'] => ($filter[1] ?: null),
                BaseParser::PARAMS['VALUE'] => ($filter[2] ?: null),
                BaseParser::PARAMS['NOT'] => (array_key_exists(3, $filter) ? $filter[3] : null),
            ];
        }
        // $value, $not, $key, $operator
        extract($filter);
        $or = toBool($or);
        $not = toBool($not);
        $dbType = $queryBuilder->getConnection()->getDriverName();
        $table = $this->getBuilderTable($queryBuilder);

        if ($value === 'null' || $value === '') {
            $method = $not ? 'WhereNotNull' : 'WhereNull';
            call_user_func([$queryBuilder, $method], sprintf("%s.%s", $table, $key));
        } else {
            $method = filter_var($or, FILTER_VALIDATE_BOOLEAN) ? 'orWhere' : 'where';
            $clauseOperator = null;
            $databaseField = null;
            switch ($operator) {
                case 'ct':
                case 'sw':
                case 'ew':
                    $valueString = [
                        'ct' => '%' . $value . '%', // contains
                        'ew' => '%' . $value, // ends with
                        'sw' => $value . '%', // starts with
                    ];
                    $castToText = (($dbType === 'pgsql') ? 'TEXT' : 'CHAR');
                    $databaseField = DB::raw(sprintf('CAST(%s.%s AS ' . $castToText . ')', $table, $key));
                    $clauseOperator = ($not ? 'NOT ' : '') . (($dbType === 'pgsql') ? 'ILIKE' : 'LIKE');
                    $value = $valueString[$operator];
                    break;
                case 'eq':
                default:
                    $clauseOperator = $not ? '!=' : "=";
                    break;
                case 'gt':
                    $clauseOperator = $not ? '<' : '>';
                    break;
                case 'gte':
                    $clauseOperator = $not ? '<' : '>=';
                    break;
                case 'lte':
                    $clauseOperator = $not ? '>' : '<=';
                    break;
                case 'lt':
                    $clauseOperator = $not ? '>' : '<';
                    break;
                case 'in':
                    if ($or === true) {
                        $method = $not === true ? 'orWhereNotIn' : 'orWhereIn';
                    } else {
                        $method = $not === true ? 'whereNotIn' : 'whereIn';
                    }
                    $clauseOperator = false;
                    break;
                case 'bt':
                    if ($or === true) {
                        $method = $not === true ? 'orWhereNotBetween' : 'orWhereBetween';
                    } else {
                        $method = $not === true ? 'whereNotBetween' : 'whereBetween';
                    }
                    $clauseOperator = false;
                    break;
            }

            // If we do not assign database field, the customer filter method
            // will fail when we execute it with parameters such as CAST(%s AS TEXT)
            // key needs to be reserved
            if (is_null($databaseField)) {
                $databaseField = sprintf("%s.%s", $table, $key);
            }

            $customFilterMethod = $this->hasCustomMethod('filter', $key);

            if ($customFilterMethod) {
                call_user_func_array([$this, $customFilterMethod], [
                    $queryBuilder,
                    $method,
                    $clauseOperator,
                    $value,
                    $clauseOperator, // @deprecated. Here for backwards compatibility
                ]);
                // column to join.
                // trying to join within a nested where will get the join ignored.
                $joins[] = $key;
            } else {
                // In operations do not have an operator
                if (in_array($operator, ['in', 'bt'])) {
                    call_user_func_array([$queryBuilder, $method], [
                        $databaseField, $value,
                    ]);
                } else {
                    call_user_func_array([$queryBuilder, $method], [
                        $databaseField, $clauseOperator, $value,
                    ]);
                }
            }
        }
    }

    /**
     * @param array $sorting
     * @param array $previouslyJoined
     *
     * @return array
     */
    protected function applySorting(array $sorting, array $previouslyJoined = [])
    {
        $joins = [];

        foreach ($sorting as $sortRule) {
            $this->applySort($sortRule, $joins);
        }

        foreach (array_diff($joins, $previouslyJoined) as $join) {
            $this->joinRelatedModelIfExists($join);
        }

        return $joins;
    }

    /**
     * Undocumented function
     *
     * @param Illuminate\Database\Eloquent\Builder $queryBuilder
     * @param array $sortRule
     *
     * @return void
     */
    protected function applySort($sortRule, array &$joins)
    {
        if (is_array($sortRule)) {
            $key = $sortRule[BaseParser::PARAMS['KEY']];

            $direction = mb_strtolower(
                $sortRule[BaseParser::PARAMS['DIRECTION']]
            ) === 'asc' ? 'ASC' : 'DESC';
        } else {
            $key = $sortRule;
            $direction = 'ASC';
        }

        $customSortMethod = $this->hasCustomMethod(BaseParser::PARAMS['SORT'], $key);

        if ($customSortMethod) {
            $joins[] = $key;

            call_user_func([$this, $customSortMethod], $this->model, $direction);
        } else {
            $baseTable = $this->getBaseBuilderTable();
            // dd($this->model->selectRaw('`drive_types`.`gearmotor_type`')->get());
            $this->model->orderByRaw(
                sprintf("%s %s", $key, $direction)
            );
        }
    }

    /**
     * apply limit parameter to queryBuilder
     *
     * @param [type] $limit
     * @return void
     */
    protected function applyLimit($limit)
    {
        $this->model->limit($limit);
    }

    protected function applyOffset($page)
    {
        if (
            !$this->hasParserOption(BaseParser::PARAMS['LIMIT'])
        ) {
            throw new InvalidArgumentException(
                PaginateParser::$messages['missing_limit_argument']
            );
        }

        // page lower than 1 is invalid page number. Redefine the page to 1;
        if ($page <= 0) {
            $page = 1;
        }
        
        $limit = $this->getParserOption(BaseParser::PARAMS['LIMIT']);
        $offset = $this->getParserOption(BaseParser::PARAMS['OFFSET']);

        $offset_value = !is_null($offset) ? $offset : ($page - 1) * $limit;

        $this->model->offset($offset_value);
    }

    /**
     * @param  $type
     * @param  $key
     * @return bool|string
     */
    private function hasCustomMethod($type, $key)
    {
        $methodName = sprintf('%s%s', $type, Str::studly($key));

        if (method_exists($this, $methodName)) {
            return $methodName;
        }

        return false;
    }

    /**
     * @param Builder $queryBuilder
     * @param $key
     */
    private function joinRelatedModelIfExists($key)
    {
        $model = $this->model->getModel();

        // relationship exists, join to make special sort
        if (method_exists($model, $key)) {
            $relation = $model->$key();
            $type = 'inner';

            if ($relation instanceof BelongsTo) {
                $this->model->join(
                    $relation->getRelated()->getTable(),
                    $relation->getQualifiedForeignKeyName(),
                    "=",
                    $relation->getQualifiedOwnerKeyName(),
                    $type
                );
            } elseif ($relation instanceof BelongsToMany) {
                $this->model->join(
                    $relation->getTable(),
                    $relation->getQualifiedParentKeyName(),
                    "=",
                    $relation->getQualifiedForeignPivotKeyName(),
                    $type
                )->join(
                    $relation->getRelated()->getTable(),
                    $relation->getRelated()->getTable() . '.' . $relation->getRelated()->getKeyName(),
                    "=",
                    $relation->getQualifiedRelatedPivotKeyName(), // changed from getQualifiedRelatedKeyName
                    $type
                );
            } else {
                $this->model->join(
                    $relation->getRelated()->getTable(),
                    $relation->getQualifiedParentKeyName(),
                    "=",
                    $relation->getQualifiedForeignKeyName(),
                    $type
                );
            }

            $table = $model->getTable();

            $this->model->select(sprintf('%s.*', $table));

            $this->addSortKeyTable($table);
        }
    }

    protected function addSortKeyTable($table)
    {
        foreach (
            $this->getParserOption(BaseParser::PARAMS['SORT']) as $ruleIndex => $sortRule
        ) {
            $key = $sortRule[BaseParser::PARAMS['KEY']];

            if (count(explode(".", $key)) === 1) { // append table name
                $key = sprintf("%s.%s", $table, $key);

                $this->getParserOption(BaseParser::PARAMS['SORT'])[$ruleIndex][BaseParser::PARAMS['KEY']] = $key;
            }
        }
    }

    /**
     * Creates a new query builder with Optimus options set
     * @param  array $options
     * @return Builder
     */
    protected function createBaseBuilder()
    {
        $this->model = $this->createQueryBuilder();

        $this->updateParserOptions()
            ->applyFields()
            ->applyOptions();

        return $this->model;
    }

    /**
     * Creates a new query builder
     * @return Builder
     */
    protected function createQueryBuilder()
    {
        return !is_null($this->customQuery)
        ? $this->customQuery
        : $this->originalModel->newQuery();
    }

    public function setCustomQuery($custom_query)
    {
        if (!$custom_query) {
            $this->setCustomTable(null);
            $this->customQuery = null;
        } else {
            $baseTable = $this->getBaseBuilderTable();

            $this->setCustomTable($baseTable);

            $bindings = method_exists($custom_query, "getQuery")
            ? $custom_query->getQuery()
            : $custom_query;

            $this->customQuery = DB::table(
                DB::raw("({$custom_query->toSql()}) as $baseTable")
            )
                ->mergeBindings(
                    $bindings
                ); // you need to get underlying Query Builder
            // $this->customQuery = $custom_query;
        }
        
        return $this;
    }

    public function setCustomTable($custom_table)
    {
        $this->customTable = $custom_table;

        return $this;
    }

    public function setArchitectKey($architect_key)
    {
        $this->architect_key = $architect_key;

        return $this;
    }

    public function getArchitectKey()
    {
        return is_null($this->architect_key)
        ? $this->getBaseBuilderTable()
        : $this->architect_key;
    }

    public function setPrimaryKey($primary_key)
    {
        $this->primary_key = $primary_key;

        return $this;
    }

    public function getPrimaryKey()
    {
        return $this->primary_key;
    }

    protected function updateParserOptions()
    {
        $this->parser_options = $this->parser->result();

        return $this;
    }

    protected function getParser()
    {
        return $this->parser;
    }

    protected function setParser(Parser $parser)
    {
        $this->parser = $parser;

        return $this;
    }

    public function hasParserOption($key)
    {
        return isset($this->parser_options[$key]);
    }

    public function getParserOption($key)
    {
        return $this->hasParserOption($key)
        ? $this->parser_options[$key]
        : null;
    }

    public function getOriginalModel()
    {
        return $this->originalModel;
    }

    public function setOriginalModel(Model $originalModel)
    {
        $this->originalModel = $originalModel;
    }

    /**
     * Maic method
     *
     * @param String $method method name
     * @param mixed  $args
     *
     * @return void
     */
    public function __call($method, $args)
    {
        return call_user_func_array([$this->model, $method], $args);
    }
}
