<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\Group;
use Faker\Generator as Faker;

$factory->define(Group::class, function (Faker $faker, array $props = []) {
    return [
        'name' => $faker->word,
        'parent_id' => array_key_exists('parent_id', $props)
            ? $props['parent_id']
            : factory(\App\Models\Group::class)->create(['parent_id' => null])
    ];
});
