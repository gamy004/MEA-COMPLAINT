<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddIssueStatusToIssuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('issues', function (Blueprint $table) {
            $table->bigInteger('issue_status_id')->unsigned()->nullable();
        });

        Schema::table('issues', function (Blueprint $table) {
            $table->foreign('issue_status_id')->references('id')->on('issue_statuses')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('issues', function (Blueprint $table) {
            $table->dropForeign(['issue_status_id']);
        });

        Schema::table('issues', function (Blueprint $table) {
            $table->dropColumn('issue_status_id');
        });
    }
}
