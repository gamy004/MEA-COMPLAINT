<?php

namespace App\Api\Providers;

use Exception;
use App\IOCs\Data;
use Carbon\Carbon;
use App\IOCs\DBCol;
use App\Api\BaseApi;
use App\Models\File;
use App\Models\Role;
use App\Models\User;
use App\Models\Group;
use App\Models\Issue;
use App\Traits\HasFile;
use App\Models\UserRole;
use App\Models\IssueStatus;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use App\Exports\IssueExport;
use App\Models\IssueCategory;
use App\Models\IssueRecipient;
use App\Api\Parsers\BaseParser;
use App\Contracts\ApiInterface;
use App\Models\IssueStatusConfig;
use App\Exports\IssueSearchExport;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Model;

class IssueApi extends BaseApi implements ApiInterface
{
    use HasFile;

    public function __construct(Issue $model)
    {
        parent::__construct($model);
    }

    private function parseAuth()
    {
        $modifiedOriginalModel = $this->getOriginalModel()->withTrashed();
        $auth = auth()->user();
        $request = request();
        $type = $request->has(Data::TYPE) ? $request->{Data::TYPE} : "inbox";

        if (!$auth->isAdmin() || !is_null($auth->{Group::FK})) {
            $modifiedOriginalModel = $modifiedOriginalModel->where(
                DBCol::ISSUED_BY,
                $auth->{Group::FK}
            );
        }

        switch ($type) {
            case Data::ARCHIVE:
                $modifiedOriginalModel = $modifiedOriginalModel
                    ->where(DBCol::ARCHIVE, 1)
                    ->where(DBCol::DRAFT, 0)
                    ->whereNull(DBCol::DELETED_AT);
                break;

            case Data::DRAFT:
                $modifiedOriginalModel = $modifiedOriginalModel
                    ->where(DBCol::ARCHIVE, 0)
                    ->where(DBCol::DRAFT, 1)
                    ->whereNull(DBCol::DELETED_AT);
                break;

            case Data::TRASH:
                $modifiedOriginalModel = $modifiedOriginalModel
                    ->where(DBCol::ARCHIVE, 0)
                    ->where(DBCol::DRAFT, 0)
                    ->whereNotNull(DBCol::DELETED_AT);

                break;
            
            default:
            $modifiedOriginalModel = $modifiedOriginalModel
                ->where(DBCol::ARCHIVE, 0)
                ->where(DBCol::DRAFT, 0)
                ->whereNull(DBCol::DELETED_AT);
                break;
        }

        // dd(!$auth->isAdmin() || !is_null($auth->{Group::FK}), $modifiedOriginalModel->toSql());
        $this->setOriginalModel($modifiedOriginalModel);
    }

    public function index()
    {
        try {
            $this->parseAuth();
            $data = $this->get();
        } catch (Exception $e) {
            throw $e;
        }

        return $data;
    }

    public function show($id)
    {
        try {
            $this->parseAuth();
            $data = $this->find($id);
        } catch (Exception $e) {
            throw $e;
        }

        return $data;
    }

    public function fetchSearch()
    {
        $original_parser = $this->getParser();
        $request_parser = $this->getParser();
        $parser_result = $request_parser->result();

        $search_fields = isset($parser_result[BaseParser::PARAMS['SEARCH']][BaseParser::PARAMS['FIELDS']])
            ? $parser_result[BaseParser::PARAMS['SEARCH']][BaseParser::PARAMS['FIELDS']]
            : [];

        $request_parser->setResult(
            "select",
            ["issues" => array_merge(
                ["id"],
                $search_fields
            )]
        );

        $this->setParser($request_parser);

        $search_result = $this->setCustomQuery(
            $this->querySearch()
        );

        $data = $this->get();
        // dd($data);
        $this->setParser($original_parser);

        $this->setCustomQuery(null);

        return $data;
    }

    public function search(array $raw)
    {
        $original_parser = $this->getParser();
        $search_result = $this->fetchSearch($raw);
        // dd($search_result);
        $key = $this->getArchitectKey();
        $data = $search_result->get($key);
        $total = $search_result->get(Data::TOTAL);

        if (count($data)) {
            $ids = $data->pluck("id")->toArray();

            $original_parser->setResult("select", []);
            $original_parser->setResult("search", ["keyword" => "", "fields" => []]);
            $original_parser->setResult("offset", 0);

            $original_parser->setResult("filter_groups", [
                [
                    "filters" => [
                        [
                            "key" => "id",
                            "value" => $ids,
                            "operator" => "in",
                            "not" => false
                        ]
                    ],
                    "or" => false
                ]
            ]);

            $search_result = $this->get();
            $search_result->put(Data::TOTAL, $total);
        }

        return $search_result;
    }

    private function querySearch()
    {
        $auth = auth()->user();
        $request = request();
        $type = $request->has(Data::TYPE) ? $request->{Data::TYPE} : Data::INBOX;
        $baseModel = $this->getOriginalModel();
        $baseTable = $this->getBaseBuilderTable();
        $groupTable = model_table(Group::class);
        $issueStatusTable = model_table(IssueStatus::class);
        $issueCategoryTable = model_table(IssueCategory::class);
        $issueRecipientTable = model_table(IssueRecipient::class);
        $recipients = $this->getQueryRecipient();
        $sub_recipients = 'subquery_'.Data::RECIPIENTS;
        $sub_status = 'subquery_'.DBCol::STATUS;

        return $this->getOriginalModel()
            ->withTrashed()
            ->join(
                $groupTable,
                sprintf("%s.%s", $groupTable, DBCol::ID),
                "=",
                sprintf("%s.%s", $baseTable, DBCol::ISSUED_BY),
                "left"
            )
            ->join(
                $issueStatusTable,
                sprintf("%s.%s", $issueStatusTable, DBCol::ID),
                "=",
                sprintf("%s.%s", $baseTable, IssueStatus::FK),
                "left"
            )
            ->join(
                $issueCategoryTable,
                sprintf("%s.%s", $issueCategoryTable, DBCol::ID),
                "=",
                sprintf("%s.%s", $baseTable, IssueCategory::FK),
                "left"
            )->leftJoinSub($recipients, $sub_recipients, function ($join) use ($baseTable, $sub_recipients) {
                $join->on(
                    sprintf("%s.%s", $baseTable, DBCol::ID),
                    '=',
                    sprintf("%s.%s", $sub_recipients, DBCol::ID)
                );
            })
            ->when(!$auth->isAdmin() || !is_null($auth->{Group::FK}), function ($q) use ($baseTable, $auth) {
                $q->whereRaw(
                    sprintf("`%s`.`%s` = %s", $baseTable, DBCol::ISSUED_BY, $auth->{Group::FK})
                );
            })
            ->when(!is_null($type), function ($q) use ($baseTable, $type) {
                $archive = 0;
                $draft = 0;
                $deleted_at_is_null = true;

                switch ($type) {
                    case Data::ARCHIVE:
                        $archive = 1;
                        break;

                    case Data::ARCHIVE:
                        $draft = 1;
                        break;
        
                    case Data::TRASH:
                        $deleted_at_is_null = false;
                        break;
                }

                $q->whereRaw(
                    sprintf(
                        "`%s`.`%s` = %s",
                        $baseTable,
                        DBCol::ARCHIVE,
                        $archive
                    )
                )
                ->whereRaw(
                    sprintf(
                        "`%s`.`%s` = %s",
                        $baseTable,
                        DBCol::DRAFT,
                        $draft
                    )
                )
                ->whereRaw(
                    sprintf(
                        "`%s`.`%s` %s",
                        $baseTable,
                        DBCol::DELETED_AT,
                        $deleted_at_is_null ? "is null" : "is not null"
                    )
                );
            })
            // ->when($type === Data::INBOX, function($q) {
            //     $q->where(DBCol::ARCHIVE, 0)->whereNull(DBCol::DELETED_AT);
            // })
            // ->when($type === Data::ARCHIVE, function($q) {
            //     $q->where(DBCol::ARCHIVE, 1)->whereNull(DBCol::DELETED_AT);
            // })
            // ->when($type === Data::TRASH, function($q) {
            //     $q->where(DBCol::ARCHIVE, 0)->whereNotNull(DBCol::DELETED_AT);
            // })
            ->select(
            [
                sprintf("%s.%s", $baseTable, DBCol::ID),
                sprintf("%s.%s", $baseTable, DBCol::CREATED_AT),
                sprintf("%s.%s", $baseTable, DBCol::UPDATED_AT),
                sprintf("%s.%s", $baseTable, DBCol::DELETED_AT),
                sprintf("%s.%s", $baseTable, DBCol::ARCHIVE),
                sprintf("%s.%s", $baseTable, DBCol::SUBJECT),
                sprintf("%s.%s", $baseTable, DBCol::DESCRIPTION),
                sprintf("%s.%s", $baseTable, DBCol::ISSUED_BY),
                sprintf("%s.%s as %s", $groupTable, DBCol::NAME, Data::ISSUER),
                sprintf("%s.%s", $baseTable, IssueStatus::FK),
                sprintf("%s.%s as %s", $issueStatusTable, DBCol::STATUS, Data::LATEST_STATUS),
                sprintf("%s.%s", $baseTable, IssueCategory::FK),
                sprintf("%s.%s", $issueCategoryTable, DBCol::CATEGORY),
                sprintf("%s.%s", $sub_recipients, Data::RECIPIENT_IDS),
                sprintf("%s.%s", $sub_recipients, Data::RECIPIENTS)
            ]
        );
    }

    private function getQueryRecipient() {
        $baseModel = $this->getOriginalModel();
        $baseTable = $this->getBaseBuilderTable();
        $groupTable = model_table(Group::class);
        $issueRecipientTable = model_table(IssueRecipient::class);

        return $this->getOriginalModel()
            ->join(
                $issueRecipientTable,
                sprintf("%s.%s", $issueRecipientTable, Issue::FK),
                "=",
                sprintf("%s.%s", $baseTable, DBCol::ID),
                'left'
            )->join(
                $groupTable,
                sprintf("%s.%s", $issueRecipientTable, DBCol::RECIPIENT_ID),
                "=",
                sprintf("%s.%s", $groupTable, DBCol::ID)
            )->select(
                [
                    sprintf("%s.%s", $baseTable, DBCol::ID),
                    DB::raw(sprintf(
                        "GROUP_CONCAT( `%s`.`%s` SEPARATOR ', ') as %s",
                        $groupTable,
                        DBCol::NAME,
                        Data::RECIPIENTS
                    )),
                    DB::raw(sprintf(
                        "GROUP_CONCAT( `%s`.`%s` SEPARATOR ', ') as %s",
                        $groupTable,
                        DBCol::ID,
                        Data::RECIPIENT_IDS
                    ))
                ]
            )->groupBy(
                sprintf("%s.%s", $baseTable, DBCol::ID)
            );
    }

    // private function getQueryStatus() {
    //     $baseModel = $this->getOriginalModel();
    //     $baseTable = $this->getBaseBuilderTable();
    //     $statusTable = model_table(IssueStatus::class);
    //     $statusConfigTable = model_table(IssueStatusConfig::class);

    //     $units = [
    //         'minutes',
    //         'hours',
    //         'days',
    //         'weeks',
    //         'months',
    //         'years'
    //     ];

    //     $date_case_raw = 'CASE';
    //     $subquery_label = 'config_shown_at';
    //     $query_name = 'query_config';
    //     $subquery_name = 'subquery_config';

    //     foreach ($units as $unit) {
    //         $date_case_raw .= sprintf(
    //             " WHEN `%s`.`%s`='%s' THEN DATE_ADD(`%s`.`%s`, INTERVAL `%s`.`%s` %s)",
    //             $statusConfigTable,
    //             DBCol::UNIT,
    //             $unit,
    //             $baseTable,
    //             DBCol::CREATED_AT,
    //             $statusConfigTable,
    //             DBCol::DURATION,
    //             Str::singular(strtoupper($unit))
    //         );
    //     }

    //     $date_case_raw .= sprintf("END as `%s`", $subquery_label);

    //     $config_query = $this->getOriginalModel()
    //         ->join(
    //             $statusTable,
    //             sprintf("%s.%s", $statusTable, DBCol::ID),
    //             "=",
    //             sprintf("%s.%s", $baseTable, IssueStatus::FK)
    //         )
    //         ->join(
    //             $statusConfigTable,
    //             sprintf("%s.%s", $statusConfigTable, IssueStatus::FK),
    //             "=",
    //             sprintf("%s.%s", $statusTable, DBCol::ID)
    //         )
    //         ->select(
    //             [
    //                 sprintf("%s.%s", $baseTable, DBCol::ID),
    //                 sprintf("%s.%s", $baseTable, IssueStatus::FK),
    //                 sprintf("%s.%s", $baseTable, DBCol::CREATED_AT),
    //                 sprintf("%s.%s as %s", $statusConfigTable, DBCol::ID, IssueStatusConfig::FK),
    //                 sprintf("%s.%s", $statusConfigTable, DBCol::COLOR),
    //                 sprintf("%s.%s", $statusConfigTable, DBCol::UNIT),
    //                 sprintf("%s.%s", $statusConfigTable, DBCol::DURATION),
    //                 DB::raw($date_case_raw)
    //             ]
    //         )
    //         ->whereRaw(
    //             sprintf(
    //                 "`%s`.`%s` >= `%s`",
    //                 $baseTable,
    //                 DBCol::CREATED_AT,
    //                 $subquery_label
    //             )
    //         )
    //         ->orderBy(
    //             sprintf("%s.%s", $baseTable, DBCol::ID)
    //         )
    //         ->orderBy(
    //             sprintf("%s.%s", $baseTable, IssueStatus::FK)
    //         )
    //         ->orderBy(
    //             $subquery_label,
    //             'desc'
    //         );
    //         // ->groupBy(
    //         //     sprintf("%s.%s", $baseTable, DBCol::ID),
    //         //     sprintf("%s.%s", $baseTable, IssueStatus::FK)
    //         // );

    //     // $config_query = $config_query->joinSub($config_query, "reduced_config_query", function ($join) use ($baseTable) {
    //     //     $join->on(
    //     //         sprintf("%s.%s", $baseTable, DBCol::ID),
    //     //         '=',
    //     //         sprintf("%s.%s", "reduced_config_query", DBCol::ID)
    //     //     );
    //     // })->groupBy(
    //     //     sprintf("%s.%s", $baseTable, DBCol::ID),
    //     //     sprintf("%s.%s", $baseTable, IssueStatus::FK)
    //     // );

    //     $bindings = method_exists($config_query, "getQuery")
    //     ? $config_query->getQuery()
    //     : $config_query;

    //     $query = DB::table(
    //         DB::raw("({$config_query->toSql()}) as $query_name")
    //     )->mergeBindings($bindings);

    //     $compare = $query->leftJoinSub($config_query, $subquery_name, function ($join) use ($query_name, $subquery_name, $subquery_label) {
    //         $join->on(
    //             sprintf("%s.%s", $query_name, DBCol::ID),
    //             '=',
    //             sprintf("%s.%s", $subquery_name, DBCol::ID)
    //         )->on(
    //             sprintf("%s.%s", $query_name, $subquery_label),
    //             '<',
    //             sprintf("%s.%s", $subquery_name, $subquery_label)
    //         );
    //     })
    //     ->whereRaw(sprintf("`%s`.`%s` is NULL", $subquery_name, DBCol::ID))
    //     // ->whereRaw(sprintf("`%s`.`%s` >= `%s`.`%s`", $query_name, DBCol::CREATED_AT, $query_name, $subquery_label))
    //     ->select(DB::raw(sprintf("%s.*", $query_name)));
    //     // ->groupBy(
    //     //     sprintf("%s.%s", $baseTable, DBCol::ID),
    //     //     sprintf("%s.%s", $baseTable, IssueStatus::FK)
    //     // );

    //     dd($compare->toSql());

    //     $status_query = $this->getOriginalModel()
    //     ->join(
    //         $statusTable,
    //         sprintf("%s.%s", $statusTable, DBCol::ID),
    //         "=",
    //         sprintf("%s.%s", $baseTable, IssueStatus::FK)
    //     )
    //     ->leftJoinSub($config_query, $subquery_name, function ($join) use ($baseTable, $subquery_name) {
    //         $join->on(
    //             sprintf("%s.%s", $baseTable, DBCol::ID),
    //             '=',
    //             sprintf("%s.%s", $subquery_name, DBCol::ID)
    //         );
    //     })
    //     ->select([
    //         sprintf("%s.%s", $baseTable, DBCol::ID),
    //         sprintf("%s.%s", $baseTable, DBCol::CREATED_AT),
    //         sprintf("%s.%s", $baseTable, DBCol::UPDATED_AT),
    //         sprintf("%s.%s", $subquery_name, IssueStatus::FK),
    //         sprintf("%s.%s", $subquery_name, IssueStatusConfig::FK),
    //         sprintf("%s.%s", $subquery_name, DBCol::COLOR),
    //         sprintf("%s.%s", $subquery_name, DBCol::UNIT),
    //         sprintf("%s.%s", $subquery_name, DBCol::DURATION),
    //         sprintf("%s.%s", $subquery_name, $subquery_label),
    //         // DB::raw(
    //         //     sprintf("TIMEDIFF(`%s`.`%s`, `%s`.`%s`) as timediff", $subquery_name, $subquery_label, $baseTable, DBCol::CREATED_AT)
    //         // )
    //         // DB::raw(
    //         //     sprintf("MAX(%s.%s) as %s", $subquery_name, $subquery_label, $subquery_label)
    //         // )
    //     ])
    //     ->whereNotNull(
    //         sprintf("%s.%s", $subquery_name, $subquery_label)
    //     );
    //     // ->whereRaw(
    //     //     sprintf(
    //     //         "%s.%s >= %s.%s",
    //     //         $subquery_name,
    //     //         $subquery_label,
    //     //         $baseTable,
    //     //         DBCol::CREATED_AT

    //     //     )
    //     // )
    //     // ->groupBy(
    //     //     sprintf("%s.%s", $baseTable, DBCol::ID),
    //     //     sprintf("%s.%s", $subquery_name, IssueStatus::FK)
    //     // )
    //     // ->havingRaw(
    //     //     sprintf("MAX(`%s`.`%s`)", $subquery_name, $subquery_label)
    //     // );

    //     dd($status_query->get());
    // }

    public function store(array $raw)
    {
        try {
            DB::beginTransaction();

            $default_status = IssueStatus::default()->select([DBCol::ID])->first();

            if (!is_null($default_status)) {
                $raw[IssueStatus::FK] = $default_status->{DBCol::ID};
            }

            $record = [
                DBCol::ISSUED_BY => auth()->user()->{Group::FK}
            ];

            $record = $this->parseGeneralFields($record, $raw);

            $issue = Issue::create($record);

            $this->syncRecipients($issue, $raw);
            $this->syncStatus($issue, $raw);

            $uploaded_file_ids = $this->setHasFileRelation('attachments')
                ->setHasFileRootDirectory('issues/')
                ->parseUploadedFiles($issue, $raw);

            $this->syncAttachments($issue, $raw, $uploaded_file_ids);

            DB::commit();

            return $this->find($issue->id);

        } catch (Exception $exception) {
            DB::rollback();
            Log::error($exception);
            throw new Exception("Error Creating Issue Request", 1);
        }
    }

    public function update(Model $issue, array $raw)
    {
        try {
            DB::beginTransaction();

            $record = [];

            $record = $this->parseGeneralFields($record, $raw);

            if (count($record)) {
                $issue->update($record);
            }

            $this->syncRecipients($issue, $raw);
            $this->syncStatus($issue, $raw);

            $uploaded_file_ids = $this->setHasFileRelation('attachments')
                ->setHasFileRootDirectory('issues/')
                ->parseUploadedFiles($issue, $raw);

            $this->syncAttachments($issue, $raw, $uploaded_file_ids);

            DB::commit();

            return $this->find($issue->id);

        } catch (Exception $exception) {
            DB::rollback();
            Log::error($exception);
            throw new Exception("Error Updating issue Request", 1);
        }
    }

    public function destroy(Model $issue)
    {
        try {
            DB::beginTransaction();

            if ($issue->{DBCol::ARCHIVE}) {
                $issue->{DBCol::ARCHIVE} = 0;
                $issue->save();
            }

            $issue->delete();

            DB::commit();

            return response()->json([
                "message" => "destroy success",
                "id" => $issue->{DBCol::ID}
            ]);
        } catch (Exception $exception) {
            DB::rollback();

            Log::error($exception);

            throw new Exception("Error Handle Deleting Complaint Request");
        }
    }

    public function restore($id)
    {
        try {
            DB::beginTransaction();
            $originalModel = $this->getOriginalModel();

            $issue = $originalModel->withTrashed()->findOrFail($id);

            if (!is_null($issue->{DBCol::DELETED_AT})) {
                $issue->restore();
            }

            $issue->{DBCol::ARCHIVE} = 0;
            $issue->save();

            DB::commit();

            return $this->find($id);
        } catch (Exception $exception) {
            DB::rollback();

            Log::error($exception);

            throw new Exception("Error Handle Restoring Resource Request");
        }
    }

    public function archive($id, array $raw)
    {
        try {
            DB::beginTransaction();
            $issue = Issue::withTrashed()->findOrFail($id);

            if (!is_null($issue->{DBCol::DELETED_AT})) {
                $issue->restore();
            }

            $issue->{DBCol::ARCHIVE} = 1;
            $issue->save();

            DB::commit();

            return response()->json([
                "message" => "archive success",
                "id" => $issue->{DBCol::ID}
            ]);

        } catch (Exception $exception) {
            DB::rollback();
            Log::error($exception);
            throw new Exception("Error Archiving issue Request", 1);
        }
    }

    private function parseGeneralFields($record, $raw)
    {
        $record = array_merge(
            $record,
            Arr::only(
                $raw,
                [
                    DBCol::SUBJECT,
                    DBCol::DESCRIPTION,
                    DBCol::DRAFT,
                    IssueCategory::FK
                    // IssueStatus::FK
                ]
            )
        );

        if (!isset($record[DBCol::DESCRIPTION])
            || !strlen($record[DBCol::DESCRIPTION])
        ) {
            $record[DBCol::DESCRIPTION] = "<p></p>";
        }

        return $record;
    }

    private function syncRecipients(Issue $issue, $raw)
    {
        if (isset($raw[Data::RECIPIENTS])) {
            $recipient_ids = $raw[Data::RECIPIENTS];

            return $issue->recipients()->sync($recipient_ids);
        }

        return false;
    }

    private function syncStatus(Issue $issue, $raw)
    {
        if (isset($raw[IssueStatus::FK])) {
            $issue_status_id = $raw[IssueStatus::FK];
            $old_status_id = $issue->{IssueStatus::FK};
            $old_status_updated_at = $issue->{DBCol::STATUS_UPDATED_AT};

            $current_time = Carbon::now();

            $issue->{DBCol::STATUS_UPDATED_AT} = $current_time;
            $issue->{IssueStatus::FK} = $issue_status_id;

            $issue->save();

            if (!is_null($old_status_id)) {
                $issue->logs()->where([
                    [IssueStatus::FK, $old_status_id],
                    [DBCol::STARTED_AT, $old_status_updated_at]
                ])
                ->update([
                    DBCol::ENDED_AT => $current_time
                ]);
            }

            return $issue->logs()->create([
                IssueStatus::FK => $issue_status_id,
                DBCol::STARTED_AT => $current_time
            ]);
        }

        return false;
    }

    private function syncAttachments(Issue $issue, $raw, array $uploaded_file_ids = [])
    {
        $attachment_ids = isset($raw[Data::ATTACHMENTS]) ? $raw[Data::ATTACHMENTS] : [];

        $file_ids = array_merge(
            $attachment_ids,
            $uploaded_file_ids
        );

        $result = $issue->attachments()->sync(array_merge(
            $attachment_ids,
            $uploaded_file_ids
        ));

        $this->parseSyncResult($result);

        return false;
    }

    public function export(array $raw)
    {
        $export = new IssueExport($this, $raw);

        return $export->download('complaints.xlsx');
    }

    public function exportSearch(array $raw)
    {
        $original_parser = $this->getParser();
        $request_parser = $this->getParser();
        $parser_result = $request_parser->result();

        $search_fields = isset($parser_result[BaseParser::PARAMS['SEARCH']][BaseParser::PARAMS['FIELDS']])
            ? $parser_result[BaseParser::PARAMS['SEARCH']][BaseParser::PARAMS['FIELDS']]
            : [];

        $request_parser->setResult(
            "select",
            ["issues" => array_merge(
                ["id"],
                $search_fields
            )]
        );

        $this->setParser($request_parser);

        $search_result = $this->setCustomQuery(
            $this->querySearch()
        )->get();

        $data = $search_result->get($this->getArchitectKey());
        $ids = [];

        if (count($data)) {
            $ids = $data->pluck("id")->toArray();
        }

        $original_parser->setResult("select", []);
        $original_parser->setResult("search", ["keyword" => "", "fields" => []]);
        // $original_parser->setResult("sort", []);
        $original_parser->setResult("offset", 0);
        $original_parser->setResult("filter_groups", [
            [
                "filters" => [
                    [
                        "key" => "id",
                        "value" => $ids,
                        "operator" => "in",
                        "not" => false
                    ]
                ],
                "or" => false
            ]
        ]);

        $this->setParser($original_parser);
        $this->setCustomQuery(null);

        return $this->export($raw);
    }
}
