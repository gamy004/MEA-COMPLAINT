<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\Issue;
use Faker\Generator as Faker;

$factory->define(Issue::class, function (Faker $faker, array $props = []) {
    return [
        "subject" => $faker->sentence,
        "description" => $faker->text,
        "issued_by" => isset($props['issued_by'])
                            ? $props['issued_by']
                            : factory(\App\Models\Group::class)->create(),
        "referenced_to" => isset($props['issued_by'])
                            ? $props['issued_by']
                            : null,
        "issue_status_id" => isset($props['issue_status_id'])
                            ? $props['issue_status_id']
                            : factory(\App\Models\IssueStatus::class)->create()
    ];
});
