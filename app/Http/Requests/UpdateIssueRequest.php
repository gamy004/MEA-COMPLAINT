<?php

namespace App\Http\Requests;

use App\IOCs\Data;
use App\IOCs\DBCol;
use App\Traits\HasFile;
use App\Models\Group;
use App\Models\IssueCategory;
use App\Models\IssueStatus;
use Illuminate\Foundation\Http\FormRequest;

class UpdateIssueRequest extends FormRequest
{
    use HasFile;
    
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->isAdmin() || $this->user()->{Group::FK} === $this->issue->{DBCol::ISSUED_BY};
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
                DBCol::SUBJECT => 'max:255',
                Data::RECIPIENTS => 'sometimes|required|array|min:1',
                Data::RECIPIENTS.'.*' => 'required|numeric|exists:groups,id',
                IssueCategory::FK => 'nullable|exists:issue_categories,id',
                IssueStatus::FK => 'sometimes|exists:issue_statuses,id', 
            ],
            $this->uploadedFilesRules()
        );
    }
}
