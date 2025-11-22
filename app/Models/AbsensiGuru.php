<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AbsensiGuru extends Model
{
    protected $guarded = [];

    // Relasi ke Guru
    public function guru()
    {
        return $this->belongsTo(Guru::class);
    }
}
