<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIssueNoteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('issue_note', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->boolean('important')->default(0);
            $table->bigInteger('issue_id')->unsigned();
            $table->bigInteger('note_id')->unsigned();
            $table->timestamps();
        });

        Schema::table('issue_note', function (Blueprint $table) {
            $table->foreign('issue_id')->references('id')->on('issues')->onDelete('cascade');
            $table->foreign('note_id')->references('id')->on('notes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('issue_note');
    }
}
