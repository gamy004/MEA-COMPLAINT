<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSubGroupIdFieldToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->bigInteger('sub_group_id')->unsigned()->nullable();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->foreign('sub_group_id')->references('id')->on('groups')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['sub_group_id']);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['sub_group_id']);
        });
    }
}
