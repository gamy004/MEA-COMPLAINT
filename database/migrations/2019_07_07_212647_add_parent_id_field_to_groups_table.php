<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddParentIdFieldToGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('groups', function (Blueprint $table) {
            $table->bigInteger('parent_id')->unsigned()->nullable();
        });

        Schema::table('groups', function (Blueprint $table) {
            $table->foreign('parent_id')->references('id')->on('groups')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('groups', function (Blueprint $table) {
            $table->dropForeign(['parent_id']);
        });

        Schema::table('groups', function (Blueprint $table) {
            $table->dropColumn(['parent_id']);
        });
    }
}
