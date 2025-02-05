<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'avatar' => ['nullable', 'image', 'mimes:png,jpg', 'max:2048'],
        ];

        if ($this->user()->hasRole('artisan')) {
            $rules['bio'] = ['nullable', 'string', 'max:1000'];
            $rules['location'] = ['nullable', 'string', 'max:255'];
            $rules['phone'] = ['nullable', 'string', 'max:20'];
            $rules['instagram_url'] = ['nullable', 'url', 'max:255'];
            $rules['facebook_url'] = ['nullable', 'url', 'max:255'];
            $rules['twitter_url'] = ['nullable', 'url', 'max:255'];
            $rules['pinterest_url'] = ['nullable', 'url', 'max:255'];
        }

        return $rules;
    }
}
