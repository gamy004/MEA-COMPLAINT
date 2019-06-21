<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddIssueCategoryToIssuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('issues', function (Blueprint $table) {
            $table->bigInteger('issue_category_id')->unsigned()->nullable();
        });

        Schema::table('issues', function (Blueprint $table) {
            $table->foreign('issue_category_id')->references('id')->on('issue_categories')->onDelete('set null');
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
            $table->dropForeign(['issue_category_id']);
        });

        Schema::table('issues', function (Blueprint $table) {
            $table->dropColumn('issue_category_id');
        });
    }
}
