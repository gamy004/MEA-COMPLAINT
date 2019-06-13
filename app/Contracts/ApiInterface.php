<?php

namespace App\Contracts;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;

interface ApiInterface
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index();

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @return \Illuminate\Http\Response
     */
    public function show(Model $model);

    /**
     * Display the specified resource.
     *
     * @param  Array $raw
     */
    public function store(array $raw);

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @param  Array $raw
     * @return \Illuminate\Http\Response
     */
    public function update(Model $model, array $raw);

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @return \Illuminate\Http\Response
     */
    public function destroy(Model $model);
}
