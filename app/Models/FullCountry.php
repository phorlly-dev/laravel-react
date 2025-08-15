<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FullCountry extends Model
{
    protected $table = 'full_countries';
    protected $fillable = [
        'name',
        'code',
        'emoji',
        'unicode',
        'image',
        'dial_code',
    ];
}
