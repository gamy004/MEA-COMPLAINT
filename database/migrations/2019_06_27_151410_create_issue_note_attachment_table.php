<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIssueNoteAttachmentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('issue_note_attachment', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('issue_note_id')->unsigned();
            $table->bigInteger('attachment_id')->unsigned();
            $table->timestamps();
        });

        Schema::table('issue_note_attachment', function (Blueprint $table) {
            $table->foreign('issue_note_id')->references('id')->on('issue_notes')->onDelete('cascade');
            $table->foreign('attachment_id')->references('id')->on('files')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('issue_note_attachment', function (Blueprint $table) {
            $table->dropForeign(['attachment_id']);
        });

        Schema::table('issue_note_attachment', function (Blueprint $table) {
            $table->dropForeign(['issue_note_id']);
        });

        Schema::dropIfExists('issue_note_attachment');
    }
}
