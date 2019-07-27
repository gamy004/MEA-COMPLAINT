<?php

namespace App\Http\Requests;

use App\IOCs\DBCol;
use App\Models\Group;
use Illuminate\Foundation\Http\FormRequest;

class ShowIssueRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // $auth = auth()->user();

        // return ($auth->isAdmin() || $auth->{Group::FK} === $this->issue->{DBCol::ISSUED_BY}) && (
        //     !$this->issue->{DBCol::DRAFT} &&
        //     $this->issue->{DBCol::DELETED_AT} === null
        // );
        return !$this->issue->{DBCol::DRAFT} &&
            $this->issue->{DBCol::DELETED_AT} === null;

    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [];
    }
}
