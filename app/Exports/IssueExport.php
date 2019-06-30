<?php

namespace App\Exports;

use Carbon\Carbon;
use App\IOCs\DBCol;
use App\Models\Issue;
use App\Contracts\ApiInterface;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\FromQuery;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\BeforeExport;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Worksheet\PageSetup;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;

class IssueExport implements FromQuery, WithEvents, WithColumnFormatting, WithMapping, WithHeadings, ShouldAutoSize
{
    use Exportable;
    
    protected $api;
    protected $raw;

    public function __construct(ApiInterface $api, array $raw = [])
    {
        $this->api = $api;
        $this->raw = $raw;
    }

    /**
     * @return array
     */
    public function registerEvents(): array
    {
        return [
            AfterSheet::class    => function(AfterSheet $event) {
                $headerRange = 'A1:I1';
                
                $event->sheet->getDelegate()->getStyle($headerRange)->getFill()
                    ->setFillType(
                        \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID
                    )
                    ->getStartColor()
                    ->setARGB('f5f5f5');
                
                $event->sheet->getDelegate()->getStyle($headerRange)->getFont()->setBold(true);

                $noteRage = 'I2:I'.$event->sheet->getHighestRow();

                $event->sheet->getDelegate()->getStyle($noteRage)->getAlignment()->setWrapText(true);

            },
        ];
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function query()
    {
        $baseBuilder = $this->api->getBaseBuilder();

        return $baseBuilder;
    }

    public function headings(): array
    {
        return [
            '#',
            'Created at',
            'Category',
            'Latest Status',
            'Issuer',
            'Recipients',
            'Subject',
            'Description',
            'Notes'
        ];
    }

    /**
    * @var Issue $issue
    */
    public function map($issue): array
    {
        $category = $issue->category ? $issue->category->{DBCol::CATEGORY} : "-";
        $status = $issue->status ? $issue->status->{DBCol::STATUS} : "-";
        $issuer = $issue->issuer ? $issue->issuer->{DBCol::NAME} : "Admin";
        $recipients = $issue->recipients->count() ? $issue->recipients->pluck('name')->join(',') : "-";
        $notes = $issue->notes->count() ? $issue->notes->map(
            function($note) {
                $creator = $note->creator ? $note->creator->{DBCol::NAME} : "Admin";
                
                $description = $note->{DBCol::DESCRIPTION} ? strip_tags($note->{DBCol::DESCRIPTION}) : "-";

                $note->row = sprintf("%s: %s", $creator, $description);

                return $note;
            }
        )->pluck("row")->join("\r\n") : "-";

        return [
            $issue->{DBCol::ID},
            Date::dateTimeToExcel(
                Carbon::parse($issue->getOriginal(DBCol::CREATED_AT))
            ),
            $category,
            $status,
            $issuer,
            $recipients,
            $issue->{DBCol::SUBJECT},
            strip_tags($issue->{DBCol::DESCRIPTION}),
            $notes
        ];
    }

    /**
     * @return array
     */
    public function columnFormats(): array
    {
        return [
            'B' => NumberFormat::FORMAT_DATE_DDMMYYYY
        ];
    }
}
