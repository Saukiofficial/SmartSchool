import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Users, Calendar, Search, CheckCircle, XCircle, AlertCircle, FileQuestion } from 'lucide-react';

export default function AbsensiIndex({ auth, kelas_list, siswas, kelas_selected }) {
    // State untuk form pencarian kelas
    const [selectedKelas, setSelectedKelas] = useState(kelas_selected || '');

    // Form Data untuk simpan absensi
    const { data, setData, post, processing } = useForm({
        kelas_id: kelas_selected,
        tanggal: new Date().toISOString().split('T')[0],
        absensi: []
    });

    // Saat load, populate data absensi default (Hadir semua)
    useEffect(() => {
        if (siswas.length > 0) {
            const initialAbsensi = siswas.map(siswa => ({
                siswa_id: siswa.id,
                status: 'Hadir'
            }));
            setData(prev => ({ ...prev, absensi: initialAbsensi }));
        }
    }, [siswas]);

    const handleFilter = () => {
        router.get(route('guru.absensi.index'), { kelas_id: selectedKelas });
    };

    const handleStatusChange = (siswaId, status) => {
        const updatedAbsensi = data.absensi.map(item =>
            item.siswa_id === siswaId ? { ...item, status: status } : item
        );
        setData('absensi', updatedAbsensi);
    };

    const submitAbsensi = (e) => {
        e.preventDefault();
        post(route('guru.absensi.store'));
    };

    // Hitung statistik
    const stats = {
        hadir: data.absensi.filter(a => a.status === 'Hadir').length,
        sakit: data.absensi.filter(a => a.status === 'Sakit').length,
        izin: data.absensi.filter(a => a.status === 'Izin').length,
        alpha: data.absensi.filter(a => a.status === 'Alpha').length,
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Hadir': return <CheckCircle className="w-4 h-4" />;
            case 'Sakit': return <AlertCircle className="w-4 h-4" />;
            case 'Izin': return <FileQuestion className="w-4 h-4" />;
            case 'Alpha': return <XCircle className="w-4 h-4" />;
            default: return null;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Hadir': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700';
            case 'Sakit': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700';
            case 'Izin': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700';
            case 'Alpha': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700';
            default: return '';
        }
    };

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-100">
                    Absensi Siswa
                </h2>
            }
        >
            <Head title="Absensi Siswa" />
            
            <div className="py-4 sm:py-6 lg:py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
                    
                    {/* FILTER KELAS */}
                    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-4">
                            <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Filter Kelas</h3>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                    Pilih Kelas
                                </label>
                                <select 
                                    className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                    value={selectedKelas} 
                                    onChange={e => setSelectedKelas(e.target.value)}
                                >
                                    <option value="">- Pilih Kelas -</option>
                                    {kelas_list.map(k => (
                                        <option key={k.id} value={k.id}>
                                            {k.nama_kelas}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button 
                                onClick={handleFilter} 
                                className="sm:self-end bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 text-sm sm:text-base"
                            >
                                Tampilkan Siswa
                            </button>
                        </div>
                    </div>

                    {/* STATISTIK */}
                    {siswas.length > 0 && (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                            <div className="bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 p-4 rounded-xl shadow-lg text-white">
                                <div className="flex items-center justify-between mb-2">
                                    <CheckCircle className="w-8 h-8 opacity-80" />
                                    <span className="text-2xl sm:text-3xl font-bold">{stats.hadir}</span>
                                </div>
                                <p className="text-xs sm:text-sm font-medium opacity-90">Hadir</p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 dark:from-yellow-600 dark:to-yellow-700 p-4 rounded-xl shadow-lg text-white">
                                <div className="flex items-center justify-between mb-2">
                                    <AlertCircle className="w-8 h-8 opacity-80" />
                                    <span className="text-2xl sm:text-3xl font-bold">{stats.sakit}</span>
                                </div>
                                <p className="text-xs sm:text-sm font-medium opacity-90">Sakit</p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-4 rounded-xl shadow-lg text-white">
                                <div className="flex items-center justify-between mb-2">
                                    <FileQuestion className="w-8 h-8 opacity-80" />
                                    <span className="text-2xl sm:text-3xl font-bold">{stats.izin}</span>
                                </div>
                                <p className="text-xs sm:text-sm font-medium opacity-90">Izin</p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 p-4 rounded-xl shadow-lg text-white">
                                <div className="flex items-center justify-between mb-2">
                                    <XCircle className="w-8 h-8 opacity-80" />
                                    <span className="text-2xl sm:text-3xl font-bold">{stats.alpha}</span>
                                </div>
                                <p className="text-xs sm:text-sm font-medium opacity-90">Alpha</p>
                            </div>
                        </div>
                    )}

                    {/* TABEL ABSENSI */}
                    {siswas.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <form onSubmit={submitAbsensi}>
                                {/* Header */}
                                <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                        <div className="flex items-center gap-2">
                                            <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                            <h3 className="font-bold text-base sm:text-lg text-gray-800 dark:text-gray-100">
                                                Daftar Siswa
                                            </h3>
                                            <span className="text-xs sm:text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-full">
                                                {siswas.length} siswa
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                            <input 
                                                type="date" 
                                                className="border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                value={data.tanggal} 
                                                onChange={e => setData('tanggal', e.target.value)} 
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Desktop Table */}
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                                    Nama Siswa
                                                </th>
                                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                                    Status Kehadiran
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {siswas.map((siswa) => (
                                                <tr key={siswa.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                                    <td className="px-4 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="font-medium text-gray-900 dark:text-gray-100">
                                                                {siswa.nama}
                                                            </span>
                                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                NIS: {siswa.nis}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <div className="flex justify-center gap-3">
                                                            {['Hadir', 'Sakit', 'Izin', 'Alpha'].map(status => {
                                                                const isChecked = data.absensi.find(a => a.siswa_id === siswa.id)?.status === status;
                                                                return (
                                                                    <label 
                                                                        key={status} 
                                                                        className={`cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all ${
                                                                            isChecked 
                                                                                ? getStatusColor(status) + ' font-semibold' 
                                                                                : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500'
                                                                        }`}
                                                                    >
                                                                        <input
                                                                            type="radio"
                                                                            name={`status-${siswa.id}`}
                                                                            value={status}
                                                                            checked={isChecked}
                                                                            onChange={() => handleStatusChange(siswa.id, status)}
                                                                            className="sr-only"
                                                                        />
                                                                        {getStatusIcon(status)}
                                                                        <span className="text-sm">{status}</span>
                                                                    </label>
                                                                );
                                                            })}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile Cards */}
                                <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
                                    {siswas.map((siswa) => (
                                        <div key={siswa.id} className="p-4">
                                            <div className="mb-3">
                                                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                                    {siswa.nama}
                                                </h4>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    NIS: {siswa.nis}
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                {['Hadir', 'Sakit', 'Izin', 'Alpha'].map(status => {
                                                    const isChecked = data.absensi.find(a => a.siswa_id === siswa.id)?.status === status;
                                                    return (
                                                        <label 
                                                            key={status} 
                                                            className={`cursor-pointer flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border-2 transition-all ${
                                                                isChecked 
                                                                    ? getStatusColor(status) + ' font-semibold' 
                                                                    : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                                                            }`}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name={`status-${siswa.id}`}
                                                                value={status}
                                                                checked={isChecked}
                                                                onChange={() => handleStatusChange(siswa.id, status)}
                                                                className="sr-only"
                                                            />
                                                            {getStatusIcon(status)}
                                                            <span className="text-xs sm:text-sm">{status}</span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer Submit */}
                                <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-200 dark:border-gray-700">
                                    <button 
                                        type="submit" 
                                        disabled={processing} 
                                        className="w-full sm:w-auto sm:float-right bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? 'Menyimpan...' : 'SIMPAN ABSENSI'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Empty State */}
                    {siswas.length === 0 && selectedKelas && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                            <Users className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Tidak Ada Siswa
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Kelas ini belum memiliki siswa yang terdaftar
                            </p>
                        </div>
                    )}

                    {!selectedKelas && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                            <Search className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Pilih Kelas Terlebih Dahulu
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Gunakan filter di atas untuk memilih kelas dan menampilkan daftar siswa
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}