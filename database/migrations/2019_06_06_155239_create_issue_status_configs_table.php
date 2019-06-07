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
            $table->string('condition');
            $table->string('value');
            $table->string('color', 7);
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
