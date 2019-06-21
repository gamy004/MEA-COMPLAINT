<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\IssueCategory;
use Faker\Generator as Faker;

$factory->define(IssueCategory::class, function (Faker $faker) {
    return [
        'category' => $faker->word
    ];
});
