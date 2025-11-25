import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Book, Upload, FileText, AlertCircle, Calendar } from 'lucide-react';

export default function JurnalIndex({ auth, jurnals, kelas, mapels }) {
    const { data, setData, post, reset, processing, errors } = useForm({
        kelas_id: '', mapel_id: '', materi: '', catatan: '', dokumentasi: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('guru.jurnal.store'), {
            onSuccess: () => reset()
        });
    };

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-100">
                    Jurnal Mengajar
                </h2>
            }
        >
            <Head title="Jurnal" />

            <div className="py-4 sm:py-6 lg:py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

                        {/* FORM INPUT */}
                        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 lg:col-span-1 order-2 lg:order-1">
                            <div className="flex items-center gap-2 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
                                <Book className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
                                <h3 className="font-bold text-base sm:text-lg text-gray-800 dark:text-gray-100">
                                    Isi Jurnal Hari Ini
                                </h3>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                                {/* Kelas */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                        Kelas
                                    </label>
                                    <select
                                        className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                        value={data.kelas_id}
                                        onChange={e => setData('kelas_id', e.target.value)}
                                    >
                                        <option value="">Pilih Kelas</option>
                                        {kelas.map(k => (
                                            <option key={k.id} value={k.id}>
                                                {k.nama_kelas}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.kelas_id && (
                                        <p className="text-red-500 dark:text-red-400 text-xs mt-1.5">
                                            {errors.kelas_id}
                                        </p>
                                    )}
                                </div>

                                {/* Mapel */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                        Mata Pelajaran
                                    </label>
                                    <select
                                        className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                        value={data.mapel_id}
                                        onChange={e => setData('mapel_id', e.target.value)}
                                    >
                                        <option value="">Pilih Mapel</option>
                                        {mapels.map(m => (
                                            <option key={m.id} value={m.id}>
                                                {m.nama_mapel}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.mapel_id && (
                                        <p className="text-red-500 dark:text-red-400 text-xs mt-1.5">
                                            {errors.mapel_id}
                                        </p>
                                    )}
                                </div>

                                {/* Materi */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                        Materi Pembelajaran
                                    </label>
                                    <textarea
                                        className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                        rows="3"
                                        value={data.materi}
                                        onChange={e => setData('materi', e.target.value)}
                                        placeholder="Contoh: Perkalian Pecahan"
                                    ></textarea>
                                    {errors.materi && (
                                        <p className="text-red-500 dark:text-red-400 text-xs mt-1.5">
                                            {errors.materi}
                                        </p>
                                    )}
                                </div>

                                {/* Upload File */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                        Dokumentasi (Foto/PDF)
                                    </label>
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-28 sm:h-32 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                            <div className="flex flex-col items-center justify-center pt-4 pb-5">
                                                {data.dokumentasi ? (
                                                    <>
                                                        <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-green-500 dark:text-green-400 mb-2" />
                                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-center px-2">
                                                            {data.dokumentasi.name}
                                                        </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Upload className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400 dark:text-gray-500 mb-2" />
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            Klik untuk upload
                                                        </p>
                                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                                            Max 5MB
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={e => setData('dokumentasi', e.target.files[0])}
                                                accept="image/*,.pdf,.doc,.docx"
                                            />
                                        </label>
                                    </div>
                                    {errors.dokumentasi && (
                                        <div className="flex items-center gap-1.5 text-red-500 dark:text-red-400 text-xs mt-2 bg-red-50 dark:bg-red-900/20 p-2.5 rounded-lg">
                                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                                            <span>{errors.dokumentasi}</span>
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold py-2.5 sm:py-3 rounded-lg transition-colors shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                                >
                                    {processing ? 'Mengirim...' : 'Kirim Jurnal'}
                                </button>
                            </form>
                        </div>

                        {/* HISTORY LIST */}
                        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 lg:col-span-2 order-1 lg:order-2">
                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                                <h3 className="font-bold text-base sm:text-lg text-gray-800 dark:text-gray-100">
                                    Riwayat Jurnal
                                </h3>
                                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2.5 sm:px-3 py-1 rounded-full">
                                    {jurnals.length} Jurnal
                                </span>
                            </div>

                            {jurnals.length === 0 ? (
                                <div className="text-center py-12 sm:py-16">
                                    <Book className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-300 dark:text-gray-600" />
                                    <p className="text-gray-400 dark:text-gray-500 text-sm sm:text-base">
                                        Belum ada jurnal yang diisi
                                    </p>
                                    <p className="text-gray-400 dark:text-gray-600 text-xs sm:text-sm mt-1">
                                        Mulai isi jurnal mengajar Anda hari ini
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3 sm:space-y-4 max-h-[600px] sm:max-h-[700px] overflow-y-auto pr-1">
                                    {jurnals.map(jurnal => (
                                        <div 
                                            key={jurnal.id} 
                                            className="group relative border-l-4 border-indigo-500 dark:border-indigo-400 bg-gray-50 dark:bg-gray-700/50 p-3 sm:p-4 rounded-r-lg hover:bg-white dark:hover:bg-gray-700 hover:shadow-md dark:hover:shadow-gray-900/30 transition-all"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-sm sm:text-base text-gray-800 dark:text-gray-100 truncate">
                                                        {jurnal.mapel.nama_mapel}
                                                    </h4>
                                                    <p className="text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-1 sm:mb-2">
                                                        {jurnal.kelas.nama_kelas}
                                                    </p>
                                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                                        {jurnal.materi}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md text-gray-500 dark:text-gray-400 shrink-0 self-start">
                                                    <Calendar className="w-3 h-3" />
                                                    <span className="whitespace-nowrap">{jurnal.tanggal}</span>
                                                </div>
                                            </div>

                                            {jurnal.dokumentasi && (
                                                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                                                    <a
                                                        href={`/storage/${jurnal.dokumentasi}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline bg-blue-50 dark:bg-blue-900/20 px-2.5 sm:px-3 py-1.5 rounded-full transition-colors"
                                                    >
                                                        <FileText className="w-3 h-3 mr-1.5" />
                                                        Lihat Dokumentasi
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}