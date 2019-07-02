<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIssueStatusConfigsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('issue_status_configs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('issue_status_id')->unsigned();
            $table->integer('duration');
            $table->string('unit');
            $table->string('color', 9)->default("#C3C3C3FF");
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('issue_status_configs', function (Blueprint $table) {
            $table->foreign('issue_status_id')->references('id')->on('issue_statuses')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('issue_status_configs');
    }
}
