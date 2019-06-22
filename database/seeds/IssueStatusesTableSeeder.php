<?php

use App\Models\IssueStatus;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class IssueStatusesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        
        IssueStatus::truncate();

        IssueStatus::insert([
            [
                "status" => "เปิดข้อร้องเรียน",
                "default" => 1
            ],
            [
                "status" => "กำลังดำเนินงาน",
                "default" => 0
            ],
            [
                "status" => "เสร็จสิ้น",
                "default" => 0
            ]
        ]);
    }
}
