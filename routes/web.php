<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

// --- IMPORT MODELS ---
use App\Models\User;
use App\Models\Guru;
use App\Models\Siswa;
use App\Models\Kelas;
use App\Models\Jurnal;
use App\Models\AbsensiGuru;

// --- IMPORT CONTROLLER ADMIN ---
use App\Http\Controllers\Admin\GuruController;
use App\Http\Controllers\Admin\KelasController;
use App\Http\Controllers\Admin\MapelController;
use App\Http\Controllers\Admin\SiswaController;
use App\Http\Controllers\Admin\JadwalController;

// --- IMPORT CONTROLLER GURU ---
use App\Http\Controllers\Guru\JurnalController;
use App\Http\Controllers\Guru\AbsensiMuridController;
use App\Http\Controllers\Guru\AbsensiGuruController;
use App\Http\Controllers\Guru\JadwalController as GuruJadwalController;

// --- IMPORT CONTROLLER KEPALA SEKOLAH ---
use App\Http\Controllers\Kepsek\DashboardController as KepsekDashboardController;

// --- IMPORT CONTROLLER EXPORT PDF ---
use App\Http\Controllers\ExportPdfController;

/*
|--------------------------------------------------------------------------
| Web Routes (Aplikasi Sekolah)
|--------------------------------------------------------------------------
*/

// --- PERBAIKAN UTAMA DISINI ---
// Redirect halaman depan ('/') langsung ke halaman Login
Route::get('/', function () {
    return redirect()->route('login');
});

// --- LOGIKA REDIRECT DASHBOARD ---
Route::get('/dashboard', function () {
    /** @var \App\Models\User $user */
    $user = Auth::user();

    if ($user->hasRole('Super Admin')) {
        return redirect()->route('admin.dashboard');
    }
    elseif ($user->hasRole('Guru')) {
        return redirect()->route('guru.dashboard');
    }
    elseif ($user->hasRole('Kepala Sekolah')) {
        return redirect()->route('kepsek.dashboard');
    }

    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    // --- PROFILE ---
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // =================================================================
    // GROUP SUPER ADMIN
    // =================================================================
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', function() {
            $stats = [
                'total_guru' => Guru::count(),
                'total_siswa' => Siswa::count(),
                'total_kelas' => Kelas::count(),
                'jurnal_hari_ini' => Jurnal::whereDate('tanggal', Carbon::today())->count(),
                'guru_hadir' => AbsensiGuru::whereDate('tanggal', Carbon::today())->count(),
            ];
            return Inertia::render('Admin/DashboardSuperAdmin', ['stats' => $stats]);
        })->name('admin.dashboard');

        Route::resource('kelas', KelasController::class);
        Route::resource('mapels', MapelController::class);
        Route::resource('gurus', GuruController::class);
        Route::resource('siswas', SiswaController::class);
        Route::resource('jadwals', JadwalController::class);
        Route::get('/generate-qr', [AbsensiGuruController::class, 'generateQr'])->name('admin.qr.generate');
    });

    // =================================================================
    // GROUP GURU
    // =================================================================
    Route::prefix('guru')->group(function () {
        Route::get('/dashboard', function() {
            return Inertia::render('Guru/DashboardGuru');
        })->name('guru.dashboard');

        Route::get('/jurnal', [JurnalController::class, 'index'])->name('guru.jurnal.index');
        Route::post('/jurnal', [JurnalController::class, 'store'])->name('guru.jurnal.store');
        Route::get('/absensi', [AbsensiMuridController::class, 'index'])->name('guru.absensi.index');
        Route::post('/absensi', [AbsensiMuridController::class, 'store'])->name('guru.absensi.store');
        Route::get('/absensi-saya', [AbsensiGuruController::class, 'index'])->name('guru.absensi-saya.index');
        Route::post('/absensi-saya/scan', [AbsensiGuruController::class, 'store'])->name('guru.absensi-saya.store');
        Route::get('/jadwal', [GuruJadwalController::class, 'index'])->name('guru.jadwal.index');
    });

    // =================================================================
    // GROUP KEPALA SEKOLAH
    // =================================================================
    Route::prefix('kepsek')->group(function () {
        Route::get('/dashboard', [KepsekDashboardController::class, 'index'])->name('kepsek.dashboard');
        Route::get('/monitoring-jurnal', [KepsekDashboardController::class, 'monitoringJurnal'])->name('kepsek.jurnal');
        Route::get('/monitoring-absensi', [KepsekDashboardController::class, 'monitoringAbsensi'])->name('kepsek.absensi');
        Route::get('/laporan-siswa', [KepsekDashboardController::class, 'laporanSiswa'])->name('kepsek.laporan-siswa');
    });

    // =================================================================
    // EXPORT PDF
    // =================================================================
    Route::prefix('export')->group(function () {
        Route::get('/jurnal', [ExportPdfController::class, 'jurnal'])->name('export.jurnal');
        Route::get('/absensi-guru', [ExportPdfController::class, 'absensiGuru'])->name('export.absensi-guru');
        Route::get('/absensi-murid', [ExportPdfController::class, 'absensiMurid'])->name('export.absensi-murid');
    });
});

require __DIR__.'/auth.php';
