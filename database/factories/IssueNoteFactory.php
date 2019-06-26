<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\IssueNote;
use Faker\Generator as Faker;

$factory->define(IssueNote::class, function (Faker $faker) {
    return [
        "description" => $faker->text,
        "issue_id" => isset($props['issue_id'])
                            ? $props['issue_id']
                            : factory(\App\Models\Issue::class)->create(),
    ];
});
