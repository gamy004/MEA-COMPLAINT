<?php

namespace App\Http\Requests;

use App\IOCs\Data;
use App\IOCs\DBCol;
use App\Traits\HasFile;
use App\Models\IssueStatus;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateStatusRequest extends FormRequest
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
                    Rule::unique('issue_statuses', 'status')
                    ->where(function ($query) {
                        $query->where('deleted_at', null);
                    })->ignore($this->issue_status->id),
                    'max:255'
                ],
                DBCol::COLOR => 'string|size:9',
                Data::CONFIGS => 'array',
                Data::CONFIGS.'.*.'.DBCol::ID => 'sometimes|required|integer|exists:issue_status_configs',
                Data::CONFIGS.'.*.'.DBCol::COLOR => 'required|string|size:9',
                Data::CONFIGS.'.*.'.DBCol::DURATION => 'required|integer',
                Data::CONFIGS.'.*.'.DBCol::UNIT => [
                    'required',
                    Rule::in(['minutes', 'hours', 'days', 'weeks', 'months', 'years'])
                ]
            ]
        );
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            Data::CONFIGS.'.*.'.DBCol::DURATION.'.required' => 'A duration is required'
        ];
    }
}
