<?php

namespace App\Http\Requests;

use App\IOCs\Data;
use App\IOCs\DBCol;
use App\Traits\HasFile;
use App\Models\IssueCategory;
use Illuminate\Foundation\Http\FormRequest;

class StoreIssueRequest extends FormRequest
{
    use HasFile;
    
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
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
                Data::RECIPIENTS => 'array',
                Data::RECIPIENTS.'.*' => 'required|numeric|exists:groups,id',
                IssueCategory::FK => 'nullable|exists:issue_categories,id'
            ],
            $this->uploadedFilesRules()
        );
    }
}
