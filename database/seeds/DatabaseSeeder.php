<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RolesTableSeeder::class);
        $this->call(IssueStatusesTableSeeder::class);
        $this->call(IssueCategoriesTableSeeder::class);
        $this->call(UsersTableSeeder::class);
    }
}
