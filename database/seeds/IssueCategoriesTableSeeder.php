<?php

use App\Models\IssueCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class IssueCategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        
        IssueCategory::truncate();
        
        factory(IssueCategory::class, 30)->create();
    }
}
