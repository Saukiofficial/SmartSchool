import { useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import {
    Home, Book, BookOpen, ClipboardCheck, ScanLine, User, Settings,
    Menu, X, Moon, Sun, LogOut, FileText, Building, Users,
    Activity, GraduationCap
} from 'lucide-react';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');

    // Ambil data roles yang dikirim dari Middleware
    const { props } = usePage();
    const roles = props.auth.roles || [];

    // --- LOGIC DARK MODE ---
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    // --- LOGIC MENU BERDASARKAN ROLE (FIXED) ---
    // Sekarang cek berdasarkan Role Database, bukan URL lagi
    const isAdmin = roles.includes('Super Admin');
    const isGuru = roles.includes('Guru');
    const isKepsek = roles.includes('Kepala Sekolah');

    const menus = [
        // --- MENU GURU ---
        { show: isGuru, title: 'Dashboard', icon: <Home size={20} />, href: route('guru.dashboard'), active: route().current('guru.dashboard') },
        { show: isGuru, title: 'Jurnal Mengajar', icon: <Book size={20} />, href: route('guru.jurnal.index'), active: route().current('guru.jurnal.*') },
        { show: isGuru, title: 'Absensi Siswa', icon: <ClipboardCheck size={20} />, href: route('guru.absensi.index'), active: route().current('guru.absensi.*') },
        { show: isGuru, title: 'Scan Kehadiran', icon: <ScanLine size={20} />, href: route('guru.absensi-saya.index'), active: route().current('guru.absensi-saya.*') },
        { show: isGuru, title: 'Jadwal Saya', icon: <Activity size={20} />, href: route('guru.jadwal.index'), active: route().current('guru.jadwal.index') },

        // --- MENU ADMIN ---
        { show: isAdmin, title: 'Dashboard', icon: <Home size={20} />, href: route('admin.dashboard'), active: route().current('admin.dashboard') },
        { show: isAdmin, title: 'Data Guru', icon: <Users size={20} />, href: route('gurus.index'), active: route().current('gurus.*') },
        { show: isAdmin, title: 'Data Siswa', icon: <GraduationCap size={20} />, href: route('siswas.index'), active: route().current('siswas.*') },
        { show: isAdmin, title: 'Data Kelas', icon: <Building size={20} />, href: route('kelas.index'), active: route().current('kelas.*') },
        { show: isAdmin, title: 'Jadwal Pelajaran', icon: <Activity size={20} />, href: route('jadwals.index'), active: route().current('jadwals.*') },
        { show: isAdmin, title: 'Mata Pelajaran', icon: <Book size={20} />, href: route('mapels.index'), active: route().current('mapels.*') },
        { show: isAdmin, title: 'QR Display', icon: <ScanLine size={20} />, href: route('admin.qr.generate'), active: route().current('admin.qr.generate') },

        // --- MENU KEPALA SEKOLAH ---
        { show: isKepsek, title: 'Dashboard', icon: <Home size={20} />, href: route('kepsek.dashboard'), active: route().current('kepsek.dashboard') },
        { show: isKepsek, title: 'Monitoring Jurnal', icon: <BookOpen size={20} />, href: route('kepsek.jurnal'), active: route().current('kepsek.jurnal') },
        { show: isKepsek, title: 'Rekap Kehadiran', icon: <ClipboardCheck size={20} />, href: route('kepsek.absensi'), active: route().current('kepsek.absensi') },
        { show: isKepsek, title: 'Laporan Siswa', icon: <GraduationCap size={20} />, href: route('kepsek.laporan-siswa'), active: route().current('kepsek.laporan-siswa') },
    ];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">

            {/* --- SIDEBAR (DESKTOP ONLY) --- */}
            <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen fixed left-0 top-0 z-50 transition-colors duration-300">
                <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700 bg-brand-50 dark:bg-gray-800">
                    <Link href="/">
                        <ApplicationLogo className="block h-9 w-auto fill-current text-brand-600 dark:text-white" />
                    </Link>
                    <span className="ml-2 font-bold text-lg text-gray-800 dark:text-white">SmartSchool</span>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="px-4 space-y-2">
                        {menus.filter(m => m.show).map((menu, index) => (
                            <Link
                                key={index}
                                href={menu.href}
                                className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                                    menu.active
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            >
                                {menu.icon}
                                <span className="ml-3 font-medium text-sm">{menu.title}</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Tema</span>
                        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 transition">
                            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    </div>
                    <Link
                        href={route('logout')} method="post" as="button"
                        className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                    >
                        <LogOut size={18} />
                        <span className="ml-3">Log Out</span>
                    </Link>
                </div>
            </aside>

            {/* --- MAIN CONTENT WRAPPER --- */}
            <div className="md:ml-64 min-h-screen flex flex-col transition-all duration-300">

                {/* TOP BAR (MOBILE HEADER & DESKTOP USER PROFILE) */}
                <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-40">

                    {/* Mobile Logo */}
                    <div className="md:hidden flex items-center">
                        <Link href="/">
                            <ApplicationLogo className="block h-8 w-auto fill-current text-blue-600 dark:text-white" />
                        </Link>
                    </div>

                    {/* Page Title (Desktop) */}
                    <div className="hidden md:block">
                        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                            {header || 'Dashboard'}
                        </h1>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3">
                        {/* Dark Mode Toggle (Mobile) */}
                        <button onClick={() => setDarkMode(!darkMode)} className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300">
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {/* User Dropdown */}
                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button type="button" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-300 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-white focus:outline-none transition ease-in-out duration-150">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold">
                                                {user.name.charAt(0)}
                                            </div>
                                            <span className="hidden sm:block">{user.name}</span>
                                        </div>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </nav>

                {/* CONTENT AREA */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
                    {children}
                </main>
            </div>

            {/* --- BOTTOM NAV (MOBILE ONLY) --- */}
            <div className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 h-16 flex justify-around items-center z-50">
                {menus.filter(m => m.show).slice(0, 4).map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${link.active ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-blue-500'}`}
                    >
                        {link.active ? <div className="bg-blue-50 dark:bg-blue-900/30 p-1 rounded-xl">{link.icon}</div> : link.icon}
                        <span className="text-[10px] font-medium">{link.title.split(' ')[0]}</span>
                    </Link>
                ))}

                <Link href={route('profile.edit')} className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${route().current('profile.edit') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                    <Settings size={20} />
                    <span className="text-[10px] font-medium">Akun</span>
                </Link>
            </div>
        </div>
    );
}
