<?php

namespace App\Http\Requests;

use App\IOCs\Data;
use App\IOCs\DBCol;
use App\Models\Group;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateGroupRequest extends FormRequest
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
                DBCol::NAME => [
                    'required',
                    Rule::unique('groups', 'name')
                    ->where(function ($query) {
                        $query->where(
                            DBCol::PARENT_ID,
                            $this->{DBCol::PARENT_ID}
                        )
                        ->where('deleted_at', null);
                    })->ignore($this->group->{DBCol::ID}),
                    'max:255'
                ],
                DBCol::PARENT_ID => [
                    'sometimes',
                    'required',
                    Rule::exists('groups', 'id')
                    ->where(function ($query) {
                        $query->whereNull(
                            DBCol::PARENT_ID
                        )
                        ->where('deleted_at', null);
                    }),
                    'numeric'
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
