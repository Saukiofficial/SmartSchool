import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

export default function QrDisplay({ auth, qrCode, date }) {

    // Auto refresh halaman setiap 5 menit agar QR Code tidak stale
    useEffect(() => {
        const interval = setInterval(() => {
            window.location.reload();
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-100">
                    Layar Absensi QR
                </h2>
            }
        >
            <Head title="Scan QR Code" />

            <div className="min-h-[calc(100vh-80px)] py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto h-full">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200">
                        
                        {/* Header Section */}
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 px-6 py-8 sm:px-8 sm:py-10 text-center">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 tracking-tight">
                                ABSENSI GURU
                            </h1>
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-base sm:text-lg lg:text-xl text-white font-semibold">
                                    {date}
                                </p>
                            </div>
                        </div>

                        {/* QR Code Section */}
                        <div className="px-4 sm:px-8 py-8 sm:py-12 flex flex-col items-center">
                            
                            {/* QR Code Container */}
                            <div className="relative group mb-8">
                                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
                                <div className="relative bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-xl border-4 border-dashed border-indigo-300 dark:border-indigo-600">
                                    <div
                                        className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 flex items-center justify-center"
                                        dangerouslySetInnerHTML={{ __html: qrCode }}
                                    />
                                </div>
                            </div>

                            {/* Instructions */}
                            <div className="w-full max-w-md bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                                <div className="flex items-center gap-2 mb-4">
                                    <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="font-bold text-gray-800 dark:text-gray-100 text-lg">
                                        Petunjuk Penggunaan
                                    </p>
                                </div>
                                
                                <ol className="space-y-3">
                                    <li className="flex gap-3 text-gray-700 dark:text-gray-300">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-bold flex items-center justify-center">
                                            1
                                        </span>
                                        <span className="text-sm sm:text-base leading-relaxed">
                                            Buka <strong className="text-gray-900 dark:text-white">Aplikasi Jurnal Guru</strong> di HP Anda
                                        </span>
                                    </li>
                                    <li className="flex gap-3 text-gray-700 dark:text-gray-300">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-bold flex items-center justify-center">
                                            2
                                        </span>
                                        <span className="text-sm sm:text-base leading-relaxed">
                                            Pilih menu <strong className="text-gray-900 dark:text-white">"Scan Kehadiran"</strong>
                                        </span>
                                    </li>
                                    <li className="flex gap-3 text-gray-700 dark:text-gray-300">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-bold flex items-center justify-center">
                                            3
                                        </span>
                                        <span className="text-sm sm:text-base leading-relaxed">
                                            Arahkan kamera ke kode QR di atas
                                        </span>
                                    </li>
                                </ol>
                            </div>

                            {/* Footer Info */}
                            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    <span>Auto refresh setiap 5 menit</span>
                                </div>
                                <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-500"></div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    <span>Pastikan layar tetap menyala</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}