<?php

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        
        Role::truncate();

        Role::insert([
            [
                "role" => "admin"
            ],
            [
                "role" => "user"
            ]
        ]);
    }
}
