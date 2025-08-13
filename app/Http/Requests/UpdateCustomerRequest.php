<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|max:255',
            'country_id' => 'sometimes|exists:countries,id',
            'company' => 'sometimes|string|max:255',
            'date' => 'sometimes|date|before_or_equal:today',
            'status' => 'sometimes|in:qualified,unqualified,new,negotiation,renewal,proposal',
            'verified' => 'sometimes|boolean',
            'activity' => 'sometimes|integer|min:1|max:100',
            'representative_id' => 'sometimes|exists:representatives,id',
            'balance' => 'sometimes|numeric|min:0|max:999999999.99',
        ];
    }

    /**
     * Get custom error messages for validation rules.
     */
    public function messages(): array
    {
        return [
            'country_id.exists' => 'Selected country does not exist',
            'date.before_or_equal' => 'Date cannot be in the future',
            'status.in' => 'Status must be one of: qualified, unqualified, new, negotiation, renewal, proposal',
            'activity.between' => 'Activity must be between 1 and 100',
            'representative_id.exists' => 'Selected representative does not exist',
            'balance.min' => 'Balance cannot be negative',
        ];
    }
}
