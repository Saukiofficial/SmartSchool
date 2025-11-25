<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use App\Models\Guru; // Import Model Guru
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
 
        $this->call(RoleSeeder::class);

   
        $admin = User::create([
            'name' => 'Administrator',
            'username' => 'admin',
            'email' => 'admin@sekolah.id',
            'password' => Hash::make('password123'),
        ]);


        $roleAdmin = Role::where('name', 'Super Admin')->first();
        $admin->roles()->attach($roleAdmin);

        $guruUser = User::create([
            'name' => 'Pak Fhadol, S.Pd',
            'username' => 'guru fhadol',
            'email' => 'fhadol@sekolah.id',
            'password' => Hash::make('password123'),
        ]);

        $roleGuru = Role::where('name', 'Guru')->first();
        $guruUser->roles()->attach($roleGuru);


        Guru::create([
            'user_id' => $guruUser->id,
            'status_aktif' => true,

        ]);



        $kepsek = User::create([
            'name' => 'Dr. Kepala Sekolah, M.Pd',
            'username' => 'kepsek',
            'email' => 'kepsek@sekolah.id',
            'password' => Hash::make('password123'),
        ]);

        $roleKepsek = Role::where('name', 'Kepala Sekolah')->first();
        $kepsek->roles()->attach($roleKepsek);
    }
}
