<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            ['name' => 'Super Admin'],
            ['name' => 'Kepala Sekolah'],
            ['name' => 'Guru'],
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }
}
