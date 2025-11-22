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
        // 1. Jalankan RoleSeeder dulu (PENTING)
        // Pastikan RoleSeeder.php sudah ada dan benar isinya
        $this->call(RoleSeeder::class);

        // ---------------------------------------------------------
        // 2. BUAT AKUN SUPER ADMIN
        // ---------------------------------------------------------
        $admin = User::create([
            'name' => 'Administrator',
            'username' => 'admin', // Username untuk login
            'email' => 'admin@sekolah.id',
            'password' => Hash::make('password123'), // Password default
        ]);

        // Assign Role Super Admin ke user ini
        $roleAdmin = Role::where('name', 'Super Admin')->first();
        $admin->roles()->attach($roleAdmin);


        // ---------------------------------------------------------
        // 3. BUAT AKUN GURU (DUMMY)
        // ---------------------------------------------------------
        $guruUser = User::create([
            'name' => 'Pak Fhadol, S.Pd',
            'username' => 'guru fhadol',
            'email' => 'fhadol@sekolah.id',
            'password' => Hash::make('password123'),
        ]);

        $roleGuru = Role::where('name', 'Guru')->first();
        $guruUser->roles()->attach($roleGuru);

        // PENTING: Buat juga data profil di tabel 'gurus'
        // Tanpa ini, guru tidak bisa absen/isi jurnal
        Guru::create([
            'user_id' => $guruUser->id,
            'status_aktif' => true,
            // mapel_id dan kelas_id bisa null dulu jika belum ada data mapel/kelas
        ]);


        // ---------------------------------------------------------
        // 4. BUAT AKUN KEPALA SEKOLAH
        // ---------------------------------------------------------
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
