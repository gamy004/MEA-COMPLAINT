<?php

namespace App\Http\Requests;

use App\IOCs\Data;
use App\IOCs\DBCol;
use App\Models\Issue;
use App\Traits\HasFile;
use App\Models\IssueCategory;
use Illuminate\Foundation\Http\FormRequest;

class StoreIssueNoteRequest extends FormRequest
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
                Issue::FK => 'exists:issues,id'
            ],
            $this->uploadedFilesRules()
        );
    }
}
