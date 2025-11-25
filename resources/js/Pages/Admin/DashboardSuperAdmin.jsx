import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Users, BookOpen, Building, QrCode, FileText, GraduationCap, ChevronRight, Activity, Calendar, TrendingUp, Award, Clock, ArrowUpRight, ArrowUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, PieChart, Pie, Cell } from 'recharts';

export default function DashboardSuperAdmin({ auth, stats, teacherActivity, studentAttendance, additionalStats }) {
    // Data dari Backend (sudah real data)
    const teacherActivityData = teacherActivity || [];
    const studentAttendanceData = studentAttendance || [];

    // Konfigurasi Kartu Statistik dengan enhancement
    const statCards = [
        {
            title: 'Total Guru',
            value: stats.total_guru,
            change: '+3',
            changeLabel: 'dari bulan lalu',
            icon: <Users className="w-6 h-6" />,
            gradient: 'from-blue-500 to-blue-600',
            lightBg: 'bg-blue-50 dark:bg-blue-900/20',
            trend: 'up'
        },
        {
            title: 'Total Siswa',
            value: stats.total_siswa,
            change: '+24',
            changeLabel: 'siswa baru',
            icon: <GraduationCap className="w-6 h-6" />,
            gradient: 'from-orange-500 to-orange-600',
            lightBg: 'bg-orange-50 dark:bg-orange-900/20',
            trend: 'up'
        },
        {
            title: 'Total Kelas',
            value: stats.total_kelas,
            change: '100%',
            changeLabel: 'kapasitas terisi',
            icon: <Building className="w-6 h-6" />,
            gradient: 'from-green-500 to-green-600',
            lightBg: 'bg-green-50 dark:bg-green-900/20',
            trend: 'stable'
        },
        {
            title: 'Jurnal Hari Ini',
            value: stats.jurnal_hari_ini,
            change: '84%',
            changeLabel: 'tingkat pengisian',
            icon: <FileText className="w-6 h-6" />,
            gradient: 'from-purple-500 to-purple-600',
            lightBg: 'bg-purple-50 dark:bg-purple-900/20',
            trend: 'up'
        },
    ];

    // Konfigurasi Menu Akses Cepat
    const menus = [
        {
            title: 'Data Guru',
            desc: 'Manajemen akun & profil guru',
            icon: <Users className="w-5 h-5" />,
            link: route('gurus.index'),
            gradient: 'from-blue-500 to-blue-600',
            iconBg: 'bg-blue-100 dark:bg-blue-900/30'
        },
        {
            title: 'Data Siswa',
            desc: 'Manajemen siswa & kelas',
            icon: <GraduationCap className="w-5 h-5" />,
            link: route('siswas.index'),
            gradient: 'from-orange-500 to-orange-600',
            iconBg: 'bg-orange-100 dark:bg-orange-900/30'
        },
        {
            title: 'Data Kelas',
            desc: 'Atur kelas & wali kelas',
            icon: <Building className="w-5 h-5" />,
            link: route('kelas.index'),
            gradient: 'from-green-500 to-green-600',
            iconBg: 'bg-green-100 dark:bg-green-900/30'
        },
        {
            title: 'Jadwal Pelajaran',
            desc: 'Atur jam mengajar guru',
            icon: <Calendar className="w-5 h-5" />,
            link: route('jadwals.index'),
            gradient: 'from-teal-500 to-teal-600',
            iconBg: 'bg-teal-100 dark:bg-teal-900/30'
        },
        {
            title: 'Mata Pelajaran',
            desc: 'Daftar mapel sekolah',
            icon: <BookOpen className="w-5 h-5" />,
            link: route('mapels.index'),
            gradient: 'from-purple-500 to-purple-600',
            iconBg: 'bg-purple-100 dark:bg-purple-900/30'
        },
        {
            title: 'Layar QR Absen',
            desc: 'Mode Kiosk untuk absensi',
            icon: <QrCode className="w-5 h-5" />,
            link: route('admin.qr.generate'),
            gradient: 'from-red-500 to-red-600',
            iconBg: 'bg-red-100 dark:bg-red-900/30'
        },
    ];

    // Custom tooltip untuk charts
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-xs text-gray-600 dark:text-gray-400">
                            <span className="font-medium" style={{ color: entry.color }}>{entry.name}:</span> {entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <AuthenticatedLayout user={auth.user} header="Admin Dashboard">
            <Head title="Dashboard Admin" />

            <div className="space-y-6">
                {/* 1. WELCOME BANNER - Lebih Clean & Minimalist */}
                <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-8 lg:p-10 text-white shadow-xl overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
                    
                    <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                Sistem Aktif
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-2">
                                Selamat Datang, {auth.user.name}!
                            </h2>
                            <p className="text-blue-100 text-base lg:text-lg max-w-2xl">
                                Pantau dan kelola seluruh aktivitas sekolah dengan mudah dari satu dashboard terpadu.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
                                <Clock className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-blue-200">Hari ini</p>
                                <p className="text-xl font-bold">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. STAT CARDS GRID - Enhanced dengan Trend Indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((stat, idx) => (
                        <div
                            key={idx}
                            className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                        >
                            {/* Background Gradient Decoration */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500`}></div>
                            
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-xl ${stat.lightBg}`}>
                                        <div className={`text-transparent bg-clip-text bg-gradient-to-br ${stat.gradient}`}>
                                            {stat.icon}
                                        </div>
                                    </div>
                                    {stat.trend === 'up' && (
                                        <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-semibold bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                                            <ArrowUp className="w-3 h-3" />
                                            {stat.change}
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                    {stat.title}
                                </p>
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                    {stat.value}
                                </h3>
                                <p className="text-xs text-gray-400 dark:text-gray-500">
                                    {stat.changeLabel}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 3. CHARTS SECTION - Keaktifan Guru & Absensi Siswa */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Chart 1: Keaktifan Guru */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    Keaktifan Guru (7 Hari)
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Monitoring kehadiran, jurnal & tugas
                                </p>
                            </div>
                        </div>
                        {teacherActivityData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={280}>
                                <AreaChart data={teacherActivityData}>
                                    <defs>
                                        <linearGradient id="colorHadir" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorJurnal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorTugas" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                                    <XAxis 
                                        dataKey="day" 
                                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                                        stroke="#e5e7eb"
                                        className="dark:stroke-gray-700"
                                    />
                                    <YAxis 
                                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                                        stroke="#e5e7eb"
                                        className="dark:stroke-gray-700"
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area type="monotone" dataKey="hadir" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorHadir)" name="Hadir" />
                                    <Area type="monotone" dataKey="jurnal" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorJurnal)" name="Jurnal" />
                                    <Area type="monotone" dataKey="tugas" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorTugas)" name="Tugas" />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-500">
                                Tidak ada data tersedia
                            </div>
                        )}
                        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span className="text-xs text-gray-600 dark:text-gray-400">Kehadiran</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                <span className="text-xs text-gray-600 dark:text-gray-400">Jurnal Mengajar</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-xs text-gray-600 dark:text-gray-400">Penugasan</span>
                            </div>
                        </div>
                    </div>

                    {/* Chart 2: Absensi Siswa Mingguan */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    Absensi Siswa (Minggu Ini)
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Perbandingan kehadiran harian
                                </p>
                            </div>
                        </div>
                        {studentAttendanceData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={studentAttendanceData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                                    <XAxis 
                                        dataKey="day" 
                                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                                        stroke="#e5e7eb"
                                        className="dark:stroke-gray-700"
                                    />
                                    <YAxis 
                                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                                        stroke="#e5e7eb"
                                        className="dark:stroke-gray-700"
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="hadir" fill="#10b981" radius={[8, 8, 0, 0]} name="Hadir" />
                                    <Bar dataKey="izin" fill="#f59e0b" radius={[8, 8, 0, 0]} name="Izin" />
                                    <Bar dataKey="sakit" fill="#ef4444" radius={[8, 8, 0, 0]} name="Sakit" />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-500">
                                Tidak ada data tersedia
                            </div>
                        )}
                        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-xs text-gray-600 dark:text-gray-400">Hadir</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                <span className="text-xs text-gray-600 dark:text-gray-400">Izin</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span className="text-xs text-gray-600 dark:text-gray-400">Sakit</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. QUICK ACCESS MENU - Cleaner Design */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            Menu Utama
                        </h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Akses cepat ke fitur</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {menus.map((menu, idx) => (
                            <Link
                                key={idx}
                                href={menu.link}
                                className="group relative bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl ${menu.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                                        <div className={`text-transparent bg-clip-text bg-gradient-to-br ${menu.gradient}`}>
                                            {menu.icon}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-base font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {menu.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                            {menu.desc}
                                        </p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 5. QUICK STATS ROW */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm mb-1">Tingkat Kehadiran</p>
                                <h4 className="text-3xl font-bold">{additionalStats?.tingkat_kehadiran || 0}%</h4>
                            </div>
                            <div className="bg-white/20 p-3 rounded-lg">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm mb-1">Jurnal Terisi</p>
                                <h4 className="text-3xl font-bold">{additionalStats?.jurnal_terisi || '0/0'}</h4>
                            </div>
                            <div className="bg-white/20 p-3 rounded-lg">
                                <FileText className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm mb-1">Kelas Aktif</p>
                                <h4 className="text-3xl font-bold">{additionalStats?.kelas_aktif || '0/0'}</h4>
                            </div>
                            <div className="bg-white/20 p-3 rounded-lg">
                                <Building className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}