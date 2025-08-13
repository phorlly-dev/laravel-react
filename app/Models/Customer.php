<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    /** @use HasFactory<\Database\Factories\CustomerFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'country_id',
        'company',
        'date',
        'status',
        'verified',
        'activity',
        'representative_id',
        'balance',
    ];

    protected $casts = [
        'date'     => 'date',
        'verified' => 'boolean',
        'balance'  => 'decimal:2',
    ];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function representative()
    {
        return $this->belongsTo(Representative::class);
    }
}
