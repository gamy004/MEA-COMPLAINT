<?php

namespace App\Http\Requests;

use App\IOCs\Data;
use App\IOCs\DBCol;
use App\Traits\HasFile;
use App\Models\IssueStatus;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StoreStatusRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return array_merge(
            [
                DBCol::STATUS => [
                    'required',
                    Rule::unique('issue_statuses', 'status'),
                    'max:255'
                ],
                DBCol::COLOR => 'string|size:9',
                Data::CONFIGS => 'array',
                Data::CONFIGS.'.*.'.DBCol::COLOR => 'required|string|size:9',
                Data::CONFIGS.'.*.'.DBCol::DURATION => 'required|integer',
                Data::CONFIGS.'.*.'.DBCol::UNIT => [
                    'required',
                    Rule::in(['minutes', 'hours', 'days', 'weeks', 'months', 'years'])
                ]
            ]
        );
    }
}
