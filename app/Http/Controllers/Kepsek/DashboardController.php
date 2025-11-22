<?php

namespace App\Http\Controllers\Kepsek;

use App\Http\Controllers\Controller;
use App\Models\Guru;
use App\Models\Siswa;
use App\Models\Jurnal;
use App\Models\AbsensiGuru;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Menampilkan Dashboard Utama Kepala Sekolah
     * Statistik, Grafik, dan Aktivitas Terbaru
     */
    public function index()
    {
        $today = Carbon::today();

        // 1. Statistik Utama (Kartu Atas)
        $stats = [
            'total_guru' => Guru::count(),
            'total_siswa' => Siswa::count(),
            'guru_hadir' => AbsensiGuru::whereDate('tanggal', $today)->count(),
            'jurnal_masuk' => Jurnal::whereDate('tanggal', $today)->count(),
        ];

        // 2. Data Grafik Kehadiran Guru (7 Hari Terakhir)
        // Digunakan untuk chart di dashboard (jika ada)
        $chartData = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i);
            $chartData[] = [
                'date' => $date->format('d M'),
                'count' => AbsensiGuru::whereDate('tanggal', $date)->count()
            ];
        }

        // 3. Feed Jurnal Terbaru (5 Data Terakhir)
        // Menampilkan aktivitas real-time guru yang baru saja mengisi jurnal
        $recentJurnals = Jurnal::with(['guru.user', 'kelas', 'mapel'])
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('Kepsek/DashboardKepsek', [
            'stats' => $stats,
            'chartData' => $chartData,
            'recentJurnals' => $recentJurnals
        ]);
    }

    /**
     * Halaman Monitoring Jurnal Mengajar (Detail)
     * Kepsek bisa melihat semua jurnal pada tanggal tertentu
     */
    public function monitoringJurnal(Request $request)
    {
        // Ambil tanggal dari request, default hari ini
        $date = $request->input('date', Carbon::today()->format('Y-m-d'));

        $jurnals = Jurnal::with(['guru.user', 'kelas', 'mapel'])
            ->whereDate('tanggal', $date)
            ->latest()
            ->get();

        return Inertia::render('Kepsek/Monitoring/Jurnal', [
            'jurnals' => $jurnals,
            'filterDate' => $date
        ]);
    }

    /**
     * Halaman Monitoring Absensi Guru (Detail)
     * Kepsek bisa melihat siapa saja guru yang hadir/telat
     */
    public function monitoringAbsensi(Request $request)
    {
        // Ambil tanggal dari request, default hari ini
        $date = $request->input('date', Carbon::today()->format('Y-m-d'));

        $absensis = AbsensiGuru::with('guru.user')
            ->whereDate('tanggal', $date)
            ->orderBy('jam_masuk')
            ->get();

        return Inertia::render('Kepsek/Monitoring/Absensi', [
            'absensis' => $absensis,
            'filterDate' => $date
        ]);
    }
}
