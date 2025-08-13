<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Representative extends Model
{
    /** @use HasFactory<\Database\Factories\RepresentativeFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'image',
    ];

    public function customers()
    {
        return $this->hasMany(Customer::class);
    }
}
