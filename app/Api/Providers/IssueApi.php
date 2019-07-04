<?php

namespace App\Api\Providers;

use Exception;
use App\IOCs\Data;
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
use App\Contracts\ApiInterface;
use App\Models\IssueStatusConfig;
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

    public function search()
    {
        return $this->setCustomQuery(
            $this->querySearch()
        )->get();
    }

    private function querySearch()
    {
        $baseModel = $this->getOriginalModel();
        $baseTable = $this->getBaseBuilderTable();
        $groupTable = model_table(Group::class);
        $issueStatusTable = model_table(IssueStatus::class);
        $issueCategoryTable = model_table(IssueCategory::class);
        $issueRecipientTable = model_table(IssueRecipient::class);

        $recipients = $this->getQueryRecipient();
        // $status = $this->getQueryStatus();

        $sub_recipients = 'subquery_'.Data::RECIPIENTS;
        $sub_status = 'subquery_'.DBCol::STATUS;

        return $this->getOriginalModel()
            ->join(
                $groupTable,
                sprintf("%s.%s", $groupTable, DBCol::ID),
                "=",
                sprintf("%s.%s", $baseTable, DBCol::ISSUED_BY)
            )
            ->join(
                $issueStatusTable,
                sprintf("%s.%s", $issueStatusTable, DBCol::ID),
                "=",
                sprintf("%s.%s", $baseTable, IssueStatus::FK)
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
            ->select(
            [
                sprintf("%s.%s", $baseTable, DBCol::ID),
                sprintf("%s.%s", $baseTable, DBCol::SUBJECT),
                sprintf("%s.%s", $baseTable, DBCol::DESCRIPTION),
                sprintf("%s.%s", $baseTable, DBCol::ISSUED_BY),
                sprintf("%s.%s as %s", $groupTable, DBCol::NAME, Data::ISSUER),
                sprintf("%s.%s", $baseTable, IssueStatus::FK),
                sprintf("%s.%s as %s", $issueStatusTable, DBCol::STATUS, Data::LATEST_STATUS),
                sprintf("%s.%s", $baseTable, IssueCategory::FK),
                sprintf("%s.%s", $issueCategoryTable, DBCol::CATEGORY),
                sprintf("%s.%s", $sub_recipients, Data::RECIPIENTS)

                // sprintf("%s.%s", $baseTable, DBCol::AVAILABLE),
                // sprintf("%s.%s", $baseTable, DBCol::EXPIRE_AT),
                // sprintf("%s.%s", $intermediateTable, Role::FK),
                // sprintf("%s.%s as %s", $roleTable, DBCol::NAME, Data::ROLE),
                // sprintf("%s.%s as %s", $fileTable, DBCol::PATH, DBCol::AVATAR),
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
                    ))
                ]
            )->groupBy(
                sprintf("%s.%s", $baseTable, DBCol::ID)
            );
    }

    private function getQueryStatus() {
        $baseModel = $this->getOriginalModel();
        $baseTable = $this->getBaseBuilderTable();
        $statusTable = model_table(IssueStatus::class);
        $statusConfigTable = model_table(IssueStatusConfig::class);

        $units = [
            'minute',
            'hour',
            'day',
            'week',
            'month',
            'year'
        ];

        $date_case_raw = 'CASE';
        $subquery_label = 'config_shown_at';
        $subquery_name = 'subquery_config';
        
        foreach ($units as $unit) {
            $date_case_raw .= sprintf(
                " WHEN `%s`.`%s`='%s' THEN DATE_ADD(`%s`.`%s`, INTERVAL `%s`.`%s` %s)",
                $statusConfigTable,
                DBCol::UNIT,
                $unit,
                $baseTable,
                DBCol::CREATED_AT,
                $statusConfigTable,
                DBCol::DURATION,
                strtoupper($unit)
            );
        }

        $date_case_raw .= sprintf("END as `%s`", $subquery_label);

        $config_query = $this->getOriginalModel()
            ->join(
                $statusTable,
                sprintf("%s.%s", $statusTable, DBCol::ID),
                "=",
                sprintf("%s.%s", $baseTable, IssueStatus::FK)
            )
            ->join(
                $statusConfigTable,
                sprintf("%s.%s", $statusConfigTable, IssueStatus::FK),
                "=",
                sprintf("%s.%s", $statusTable, DBCol::ID)
            )
            ->select(
                [
                    sprintf("%s.%s", $baseTable, DBCol::ID),
                    sprintf("%s.%s", $baseTable, IssueStatus::FK),
                    sprintf("%s.%s as %s", $statusConfigTable, DBCol::ID, IssueStatusConfig::FK),
                    sprintf("%s.%s", $statusConfigTable, DBCol::COLOR),
                    sprintf("%s.%s", $statusConfigTable, DBCol::UNIT),
                    sprintf("%s.%s", $statusConfigTable, DBCol::DURATION),
                    DB::raw($date_case_raw)
                ]
            )
            ->orderBy($subquery_label, 'desc');
            // ->groupBy(
            //     sprintf("%s.%s", $baseTable, DBCol::ID),
            //     sprintf("%s.%s", $baseTable, IssueStatus::FK)
            // );
        
        // $config_query = $config_query->joinSub($config_query, "reduced_config_query", function ($join) use ($baseTable) {
        //     $join->on(
        //         sprintf("%s.%s", $baseTable, DBCol::ID),
        //         '=',
        //         sprintf("%s.%s", "reduced_config_query", DBCol::ID)
        //     );
        // })->groupBy(
        //     sprintf("%s.%s", $baseTable, DBCol::ID),
        //     sprintf("%s.%s", $baseTable, IssueStatus::FK)
        // );

        $compare = $config_query->leftJoinSub($config_query, $subquery_name, function ($join) use ($baseTable, $subquery_name, $subquery_label) {
            $join->on(
                sprintf("%s.%s", $baseTable, DBCol::ID),
                '=',
                sprintf("%s.%s", $subquery_name, DBCol::ID)
            )->on(
                sprintf("%s", $subquery_label),
                '<',
                sprintf("%s.%s", $subquery_name, $subquery_label)
            );
        })->whereRaw(sprintf("%s.%s is NULL", $subquery_name, $subquery_label))
        ->groupBy(
            sprintf("%s.%s", $baseTable, DBCol::ID),
            sprintf("%s.%s", $baseTable, IssueStatus::FK)
        );

        dd($compare->get());

        $status_query = $this->getOriginalModel()
        ->join(
            $statusTable,
            sprintf("%s.%s", $statusTable, DBCol::ID),
            "=",
            sprintf("%s.%s", $baseTable, IssueStatus::FK)
        )
        ->leftJoinSub($config_query, $subquery_name, function ($join) use ($baseTable, $subquery_name) {
            $join->on(
                sprintf("%s.%s", $baseTable, DBCol::ID),
                '=',
                sprintf("%s.%s", $subquery_name, DBCol::ID)
            );
        })
        ->select([
            sprintf("%s.%s", $baseTable, DBCol::ID),
            sprintf("%s.%s", $baseTable, DBCol::CREATED_AT),
            sprintf("%s.%s", $subquery_name, IssueStatus::FK),
            sprintf("%s.%s", $subquery_name, IssueStatusConfig::FK),
            sprintf("%s.%s", $subquery_name, DBCol::COLOR),
            sprintf("%s.%s", $subquery_name, DBCol::UNIT),
            sprintf("%s.%s", $subquery_name, DBCol::DURATION),
            sprintf("%s.%s", $subquery_name, $subquery_label),
            // DB::raw(
            //     sprintf("TIMEDIFF(`%s`.`%s`, `%s`.`%s`) as timediff", $subquery_name, $subquery_label, $baseTable, DBCol::CREATED_AT)
            // )
            // DB::raw(
            //     sprintf("MAX(%s.%s) as %s", $subquery_name, $subquery_label, $subquery_label)
            // )
        ])
        ->whereNotNull(
            sprintf("%s.%s", $subquery_name, $subquery_label)
        );
        // ->whereRaw(
        //     sprintf(
        //         "%s.%s >= %s.%s",
        //         $subquery_name,
        //         $subquery_label,
        //         $baseTable,
        //         DBCol::CREATED_AT
                
        //     )
        // )
        // ->groupBy(
        //     sprintf("%s.%s", $baseTable, DBCol::ID),
        //     sprintf("%s.%s", $subquery_name, IssueStatus::FK)
        // )
        // ->havingRaw(
        //     sprintf("MAX(`%s`.`%s`)", $subquery_name, $subquery_label)
        // );

        dd($status_query->get());
    }

    public function store(array $raw)
    {
        try {
            DB::beginTransaction();

            $default_status = IssueStatus::default()->select([DBCol::ID])->first();

            $record = [
                IssueStatus::FK => $default_status->{DBCol::ID}
            ];
            
            $record = $this->parseGeneralFields($record, $raw);
            
            $issue = Issue::create($record);

            $this->syncRecipients($issue, $raw);

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

    private function parseGeneralFields($record, $raw)
    {
        $record = array_merge(
            $record,
            Arr::only(
                $raw,
                [
                    DBCol::SUBJECT,
                    DBCol::DESCRIPTION,
                    IssueCategory::FK,
                    IssueStatus::FK
                ]
            )
        );

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

    private function syncAttachments(Issue $issue, $raw, array $uploaded_file_ids = [])
    {
        if (isset($raw[Data::ATTACHMENTS])) {
            $attachment_ids = $raw[Data::ATTACHMENTS];

            $result = $issue->attachments()->sync(array_merge(
                $attachment_ids,
                $uploaded_file_ids
            ));

            $this->parseSyncResult($result);
        }

        return false;
    }

    public function export(array $raw)
    {
        $export = new IssueExport($this, $raw);

        return $export->download('complaints.xlsx');
    }
}
