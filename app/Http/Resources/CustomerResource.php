<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'id'             => $this->id,
            'name'           => $this->name,
            'country'        => new CountryResource($this->whenLoaded('country')),
            'company'        => $this->company,
            'date'           => $this->date->format('Y-m-d'),
            'status'         => $this->status,
            'verified'       => $this->verified,
            'activity'       => $this->activity,
            'representative' => new RepresentativeResource($this->whenLoaded('representative')),
            'balance'        => $this->balance,
            'created_at'     => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at'     => $this->updated_at?->format('Y-m-d H:i:s'),
        ];

    }
}
