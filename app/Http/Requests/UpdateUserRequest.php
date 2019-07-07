<?php

namespace App\Http\Requests;

use App\IOCs\Data;
use App\IOCs\DBCol;
use App\Models\User;
use App\Traits\HasFile;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->isAdmin() || $this->user()->id === $this->user->id;
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
                DBCol::USERNAME => [
                    'sometimes',
                    'required',
                    'string',
                    Rule::unique('users', DBCol::USERNAME)
                    ->where(function ($query) {
                        $query->where('deleted_at', null);
                    })->ignore($this->user->id),
                    'max:255'
                ],
                DBCol::NAME => [
                    'sometimes',
                    'required',
                    'string',
                    'max:255'
                ],
                DBCol::EMAIL => [
                    'sometimes',
                    'required',
                    'email',
                    'max:255'
                ],
                DBCol::PASSWORD => [
                    'sometimes',
                    'required',
                    'confirmed',
                    'string',
                    'max:255'
                ],
                DBCol::GROUP_ID => [
                    'sometimes',
                    'required',
                    'numeric',
                    'exists:groups,id'
                ],
                DBCol::INBOX_SETTINGS => [
                    'sometimes',
                    'required',
                    'json'
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
