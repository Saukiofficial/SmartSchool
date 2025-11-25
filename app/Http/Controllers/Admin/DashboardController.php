<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Guru;
use App\Models\Siswa;
use App\Models\Kelas;
use App\Models\Jurnal;
use App\Models\Jadwal;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/DashboardSuperAdmin', [
            'stats' => $this->getStatistics(),
            'teacherActivity' => $this->getTeacherActivityData(),
            'studentAttendance' => $this->getStudentAttendanceData(),
            'additionalStats' => $this->getAdditionalStats(),
        ]);
    }

    /**
     * Statistik Utama (4 Cards)
     */
    private function getStatistics()
    {
        return [
            'total_guru' => Guru::count(),
            'total_siswa' => Siswa::count(),
            'total_kelas' => Kelas::count(),
            'jurnal_hari_ini' => Jurnal::whereDate('created_at', today())->count(),
        ];
    }

    /**
     * Data Keaktifan Guru (7 Hari Terakhir)
     * Untuk Area Chart
     */
    private function getTeacherActivityData()
    {
        $data = [];
        
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            
            // Hitung jumlah guru yang hadir (berdasarkan jurnal yang dibuat)
            $guruHadir = Jurnal::whereDate('created_at', $date)
                              ->distinct('guru_id')
                              ->count('guru_id');
            
            // Hitung total jurnal yang dibuat
            $totalJurnal = Jurnal::whereDate('created_at', $date)->count();
            
            // Hitung tugas yang diberikan (sesuaikan dengan model Anda)
            // Jika tidak ada model Tugas, bisa diganti dengan metric lain
            // Misalnya: jumlah mapel yang diajar hari itu
            $tugasDiberikan = Jadwal::where('hari', $this->getHariIndonesia($date))
                                    ->count();
            
            $data[] = [
                'day' => $this->getHariSingkat($date),
                'hadir' => $guruHadir,
                'jurnal' => $totalJurnal,
                'tugas' => $tugasDiberikan,
            ];
        }
        
        return $data;
    }

    /**
     * Data Absensi Siswa (7 Hari Terakhir)
     * Untuk Bar Chart
     */
    private function getStudentAttendanceData()
    {
        $data = [];
        $totalSiswa = Siswa::count();
        
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            
            // Jika Anda punya tabel absensi siswa, gunakan itu
            // Contoh asumsi: menggunakan tabel 'absensi_siswas'
            // dengan kolom: siswa_id, tanggal, status (hadir/izin/sakit/alpha)
            
            // OPSI 1: Jika ada tabel absensi
            /*
            $hadir = DB::table('absensi_siswas')
                      ->whereDate('tanggal', $date)
                      ->where('status', 'hadir')
                      ->count();
            
            $izin = DB::table('absensi_siswas')
                     ->whereDate('tanggal', $date)
                     ->where('status', 'izin')
                     ->count();
            
            $sakit = DB::table('absensi_siswas')
                      ->whereDate('tanggal', $date)
                      ->where('status', 'sakit')
                      ->count();
            */
            
            // OPSI 2: Jika belum ada tabel absensi, gunakan data estimasi
            // Berdasarkan hari libur atau weekday
            $isWeekend = $date->isWeekend();
            
            if ($isWeekend) {
                $hadir = 0;
                $izin = 0;
                $sakit = 0;
            } else {
                // Estimasi: 95% hadir, 3% izin, 2% sakit
                $hadir = round($totalSiswa * 0.95);
                $izin = round($totalSiswa * 0.03);
                $sakit = round($totalSiswa * 0.02);
            }
            
            $data[] = [
                'day' => $this->getHariSingkat($date),
                'hadir' => $hadir,
                'izin' => $izin,
                'sakit' => $sakit,
            ];
        }
        
        return $data;
    }

    /**
     * Statistik Tambahan (Quick Stats Row)
     */
    private function getAdditionalStats()
    {
        $totalGuru = Guru::count();
        $totalSiswa = Siswa::count();
        $totalKelas = Kelas::count();
        $jurnalHariIni = Jurnal::whereDate('created_at', today())->count();
        
        // Tingkat Kehadiran Guru (berdasarkan jurnal hari ini)
        $tingkatKehadiranGuru = $totalGuru > 0 
            ? round(($jurnalHariIni / $totalGuru) * 100, 1) 
            : 0;
        
        // Jurnal Terisi (dari total guru)
        $jurnalTerisi = $jurnalHariIni . '/' . $totalGuru;
        
        // Kelas Aktif (semua kelas dianggap aktif jika ada jadwal hari ini)
        $hariIni = $this->getHariIndonesia(Carbon::now());
        $kelasAktif = Jadwal::where('hari', $hariIni)
                           ->distinct('kelas_id')
                           ->count('kelas_id');
        $kelasAktifStr = $kelasAktif . '/' . $totalKelas;
        
        return [
            'tingkat_kehadiran' => $tingkatKehadiranGuru,
            'jurnal_terisi' => $jurnalTerisi,
            'kelas_aktif' => $kelasAktifStr,
        ];
    }

    /**
     * Helper: Konversi Carbon date ke nama hari Indonesia
     */
    private function getHariIndonesia($date)
    {
        $days = [
            'Sunday' => 'Minggu',
            'Monday' => 'Senin',
            'Tuesday' => 'Selasa',
            'Wednesday' => 'Rabu',
            'Thursday' => 'Kamis',
            'Friday' => 'Jumat',
            'Saturday' => 'Sabtu',
        ];
        
        return $days[$date->format('l')];
    }

    /**
     * Helper: Nama hari singkat untuk chart
     */
    private function getHariSingkat($date)
    {
        $days = [
            'Sunday' => 'Min',
            'Monday' => 'Sen',
            'Tuesday' => 'Sel',
            'Wednesday' => 'Rab',
            'Thursday' => 'Kam',
            'Friday' => 'Jum',
            'Saturday' => 'Sab',
        ];
        
        return $days[$date->format('l')];
    }
}