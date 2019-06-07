<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIssueAttachmentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('issue_attachment', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('issue_id')->unsigned();
            $table->bigInteger('attachment_id')->unsigned();
            $table->timestamps();
        });

        Schema::table('issue_attachment', function (Blueprint $table) {
            $table->foreign('issue_id')->references('id')->on('issues')->onDelete('cascade');
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
        Schema::dropIfExists('issue_attachment');
    }
}
