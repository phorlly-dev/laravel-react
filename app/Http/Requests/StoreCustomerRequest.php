<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Set to false if you want to add authorization logic
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'country_id' => 'required|exists:countries,id',
            'company' => 'required|string|max:255',
            'date' => 'required|date|before_or_equal:today',
            'status' => 'required|in:qualified,unqualified,new,negotiation,renewal,proposal',
            'verified' => 'boolean',
            'activity' => 'required|integer|min:1|max:100',
            'representative_id' => 'required|exists:representatives,id',
            'balance' => 'required|numeric|min:0|max:999999999.99',
        ];
    }

    /**
     * Get custom error messages for validation rules.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Customer name is required',
            'country_id.exists' => 'Selected country does not exist',
            'date.before_or_equal' => 'Date cannot be in the future',
            'status.in' => 'Status must be one of: qualified, unqualified, new, negotiation, renewal, proposal',
            'activity.between' => 'Activity must be between 1 and 100',
            'representative_id.exists' => 'Selected representative does not exist',
            'balance.min' => 'Balance cannot be negative',
        ];
    }
}
