<?php

namespace App\Http\Requests;

use App\IOCs\Data;
use App\IOCs\DBCol;
use App\Models\Role;
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
        $roleAdmin = Role::where("role", Role::ADMIN)->first();

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
                    'nullable',
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

                Data::ROLE => [
                    'sometimes',
                    'required',
                    'exists:roles,id'
                ],

                Data::GROUP => [
                    Rule::requiredIf(
                        $this->{Data::ROLE} !== null &&
                        $this->{Data::ROLE} !== $roleAdmin->{DBCol::ID} &&
                        $this->{DBCol::GROUP_ID} === null
                    ),
                    Rule::unique('groups', DBCol::NAME)
                        ->where(function ($query) {
                            $query->whereNull('parent_id')->where('deleted_at', null);
                        }),
                    'string',
                    'nullable',
                    'max:255'
                ],

                Data::SUB_GROUP => [
                    'sometimes',
                    // Rule::requiredIf($this->{Data::ROLE} !== $roleAdmin->{DBCol::ID} && $this->{Data::GROUP} !== null),
                    'string',
                    'nullable',
                    'max:255'
                ],

                DBCol::GROUP_ID => [
                    Rule::requiredIf(
                        $this->{Data::ROLE} !== null &&
                        $this->{Data::ROLE} !== $roleAdmin->{DBCol::ID} &&
                        $this->{Data::GROUP} === null
                    ),
                    'numeric',
                    'nullable',
                    Rule::exists('groups', DBCol::ID)
                    ->where(function ($query) {
                        $query->where('deleted_at', null);
                    })
                ],

                DBCol::SUB_GROUP_ID => [
                    'sometimes',
                    // Rule::requiredIf($this->{Data::ROLE} !== $roleAdmin->{DBCol::ID} && $this->{DBCol::GROUP_ID} !== null),
                    'numeric',
                    'nullable',
                    Rule::exists('groups', DBCol::ID)
                    ->where(function ($query) {
                        $query->where('parent_id', $this->{DBCol::GROUP_ID})->where('deleted_at', null);
                    })
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
