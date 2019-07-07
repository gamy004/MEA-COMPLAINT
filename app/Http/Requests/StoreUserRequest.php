<?php

namespace App\Http\Requests;

use App\IOCs\Data;
use App\IOCs\DBCol;
use App\Models\Role;
use App\Traits\HasAvatar;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    use HasAvatar;

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
        $roleAdmin = Role::where("role", Role::ADMIN)->first();
        
        return array_merge(
            $this->avatarRules(),
            [
                DBCol::USERNAME => [
                    'required',
                    'string',
                    Rule::unique('users', DBCol::USERNAME)
                    ->where(function ($query) {
                        $query->where('deleted_at', null);
                    }),
                    'max:255'
                ],
                DBCol::NAME => [
                    'required',
                    'string',
                    'max:255'
                ],
                DBCol::EMAIL => [
                    'nullable',
                    'email',
                    'max:255'
                ],
                DBCol::PASSWORD => [
                    'required',
                    'confirmed',
                    'string',
                    'max:255'
                ],
                Data::ROLE => [
                    'required',
                    'exists:roles,id'
                ],

                Data::GROUP => [
                    Rule::requiredIf(
                        $this->{Data::ROLE} !== $roleAdmin->{DBCol::ID} &&
                        $this->{Data::ROLE} !== null &&
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
                
            ]
        );
    }
}
