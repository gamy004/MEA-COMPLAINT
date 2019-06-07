<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\IssueStatus;
use Faker\Generator as Faker;

$factory->define(IssueStatus::class, function (Faker $faker) {
    return [
        "status" => $faker->word
    ];
});
