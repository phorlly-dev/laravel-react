<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }

    // public function toArray($request)
    // {
    //     return [
    //         'id'    => $this->id,
    //         'name'  => $this->name,
    //         'email' => $this->email,
    //         'is_admin' => $this->is_admin,
    //         'sex' => $this->sex,
    //         'status' => $this->status,
    //         'avatar' => $this->avatar,
    //         'phone' => $this->phone,
    //         'dob' => $this->dob,
    //         'address' => $this->address,
    //         'created_at' => $this->created_at,
    //         'updated_at' => $this->updated_at,
    //     ];
    // }
}
