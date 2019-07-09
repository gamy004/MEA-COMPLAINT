<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddIssueStatusLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('issue_status_logs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamp("started_at")->nullable();
            $table->timestamp("ended_at")->nullable();
            $table->bigInteger('issue_id')->unsigned();
            $table->bigInteger('issue_status_id')->unsigned();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('issue_status_logs', function (Blueprint $table) {
            $table->foreign('issue_id')
                ->references('id')
                ->on('issues');
            $table->foreign('issue_status_id')
                ->references('id')
                ->on('issue_statuses');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('issue_status_logs', function (Blueprint $table) {
            $table->dropForeign(['issue_status_id']);
            $table->dropForeign(['issue_id']);
        });

        Schema::dropIfExists('issue_status_logs');
    }
}
