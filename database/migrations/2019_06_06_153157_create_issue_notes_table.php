<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIssueNotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('issue_notes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('description')->nullable();
            $table->bigInteger('issue_id')->unsigned();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('issue_notes', function (Blueprint $table) {
            $table->foreign('issue_id')->references('id')->on('issues')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('issue_notes', function (Blueprint $table) {
            $table->dropForeign(['issue_id']);
        });

        Schema::dropIfExists('issue_notes');
    }
}
