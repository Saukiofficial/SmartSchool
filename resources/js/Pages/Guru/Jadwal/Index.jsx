import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Calendar, Clock, MapPin, BookOpen } from 'lucide-react';

export default function JadwalGuruIndex({ auth, jadwals }) {

   
    const groupedJadwals = jadwals.reduce((acc, jadwal) => {
        (acc[jadwal.hari] = acc[jadwal.hari] || []).push(jadwal);
        return acc;
    }, {});

    const daysOrder = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                    Jadwal Mengajar Saya
                </h2>
            }
        >
            <Head title="Jadwal Mengajar" />

            <div className="py-6 sm:py-8 lg:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {jadwals.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 p-8 sm:p-10 lg:p-12 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 text-center">
                            <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <h3 className="text-base sm:text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">
                                Belum Ada Jadwal
                            </h3>
                            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                                Admin belum menambahkan jadwal mengajar untuk Anda.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                            {daysOrder.map(hari => (
                                groupedJadwals[hari] && (
                                    <div 
                                        key={hari} 
                                        className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200"
                                    >
                                        {/* Header Hari */}
                                        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-700 dark:to-indigo-800 text-white px-4 sm:px-5 lg:px-6 py-3 sm:py-4 flex justify-between items-center">
                                            <h3 className="font-bold text-base sm:text-lg">{hari}</h3>
                                            <span className="text-xs sm:text-sm bg-white/20 dark:bg-white/10 px-2 sm:px-3 py-1 rounded-full font-medium">
                                                {groupedJadwals[hari].length} Kelas
                                            </span>
                                        </div>

                                        {/* List Jadwal */}
                                        <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                            {groupedJadwals[hari].map((jadwal) => (
                                                <div 
                                                    key={jadwal.id} 
                                                    className="p-4 sm:p-5 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150"
                                                >
                                                    {/* Waktu */}
                                                    <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-bold text-xs sm:text-sm bg-indigo-50 dark:bg-indigo-900/30 px-2 sm:px-3 py-1.5 rounded-lg mb-3 w-fit">
                                                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                                                        <span>{jadwal.jam_mulai.substring(0, 5)} - {jadwal.jam_selesai.substring(0, 5)}</span>
                                                    </div>

                                                    {/* Mata Pelajaran */}
                                                    <h4 className="text-gray-800 dark:text-gray-200 font-bold text-base sm:text-lg mb-2 line-clamp-2">
                                                        {jadwal.mapel.nama_mapel}
                                                    </h4>

                                                    {/* Kelas */}
                                                    <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                                                        <span>Kelas: </span>
                                                        <span className="font-semibold text-gray-700 dark:text-gray-300 ml-1">
                                                            {jadwal.kelas.nama_kelas}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}