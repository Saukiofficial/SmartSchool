import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { Calendar, Trash2, Plus, Clock, X, Pencil, Filter, BookOpen, User } from 'lucide-react';

export default function JadwalIndex({ auth, jadwals, kelas, mapels, gurus, filters }) {
    const { data, setData, post, put, delete: destroy, reset, processing, errors } = useForm({
        id: '',
        hari: 'Senin',
        kelas_id: '',
        mapel_id: '',
        guru_id: '',
        jam_mulai: '',
        jam_selesai: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [filterKelas, setFilterKelas] = useState(filters.kelas_id || '');

    const handleFilter = (val) => {
        setFilterKelas(val);
        router.get(route('jadwals.index'), { kelas_id: val }, { preserveState: true });
    };

    const openModal = (jadwal = null) => {
        setIsEdit(!!jadwal);
        if (jadwal) {
            setData({
                id: jadwal.id,
                hari: jadwal.hari,
                kelas_id: jadwal.kelas_id,
                mapel_id: jadwal.mapel_id,
                guru_id: jadwal.guru_id,
                jam_mulai: jadwal.jam_mulai,
                jam_selesai: jadwal.jam_selesai
            });
        } else {
            setData({
                id: '',
                hari: 'Senin',
                kelas_id: '',
                mapel_id: '',
                guru_id: '',
                jam_mulai: '',
                jam_selesai: ''
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('jadwals.update', data.id), { onSuccess: () => closeModal() });
        } else {
            post(route('jadwals.store'), { onSuccess: () => closeModal() });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Hapus jadwal ini?')) destroy(route('jadwals.destroy', id));
    };

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-100">
                    Jadwal Pelajaran
                </h2>
            }
        >
            <Head title="Atur Jadwal" />

            <div className="py-6 sm:py-8 lg:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* TOOLBAR */}
                    <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 mb-6 bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <Filter className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                <span>Filter Kelas:</span>
                            </div>
                            <select 
                                className="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
                                value={filterKelas} 
                                onChange={(e) => handleFilter(e.target.value)}
                            >
                                <option value="">Semua Kelas</option>
                                {kelas.map(k => <option key={k.id} value={k.id}>{k.nama_kelas}</option>)}
                            </select>
                        </div>
                        <button 
                            onClick={() => openModal()} 
                            className="flex items-center justify-center gap-2 bg-indigo-600 dark:bg-indigo-500 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors shadow-sm hover:shadow-md font-medium"
                        >
                            <Plus className="w-4 h-4" /> 
                            <span>Tambah Jadwal</span>
                        </button>
                    </div>

                    {/* RESPONSIVE TABLE/CARD VIEW */}
                    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-200">
                        
                        {/* Desktop Table View */}
                        <div className="hidden lg:block overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-900/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                            Hari / Jam
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                            Kelas
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                            Mata Pelajaran
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                            Guru Pengajar
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {jadwals.data.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-16 text-center">
                                                <div className="flex flex-col items-center">
                                                    <Calendar className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
                                                    <p className="text-gray-500 dark:text-gray-400 font-medium">Belum ada jadwal yang diatur</p>
                                                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Klik tombol "Tambah Jadwal" untuk memulai</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        jadwals.data.map((jadwal) => (
                                            <tr key={jadwal.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                                                            <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-gray-900 dark:text-gray-100">{jadwal.hari}</div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                                                                <Clock className="w-3 h-3" /> 
                                                                {jadwal.jam_mulai.substring(0, 5)} - {jadwal.jam_selesai.substring(0, 5)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300">
                                                        {jadwal.kelas.nama_kelas}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <BookOpen className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                            {jadwal.mapel.nama_mapel}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <User className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                                            {jadwal.guru?.user?.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <div className="flex justify-center gap-2">
                                                        <button 
                                                            onClick={() => openModal(jadwal)} 
                                                            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Pencil className="w-4 h-4" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(jadwal.id)} 
                                                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                            title="Hapus"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile/Tablet Card View */}
                        <div className="lg:hidden p-4 space-y-3">
                            {jadwals.data.length === 0 ? (
                                <div className="flex flex-col items-center py-12">
                                    <Calendar className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
                                    <p className="text-gray-500 dark:text-gray-400 font-medium">Belum ada jadwal</p>
                                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Klik "Tambah Jadwal"</p>
                                </div>
                            ) : (
                                jadwals.data.map((jadwal) => (
                                    <div 
                                        key={jadwal.id} 
                                        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-750 border border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:shadow-lg transition-all duration-200"
                                    >
                                        {/* Header Card */}
                                        <div className="flex justify-between items-start mb-3 pb-3 border-b border-gray-200 dark:border-gray-600">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                                                    <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 dark:text-gray-100">{jadwal.hari}</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                                                        <Clock className="w-3 h-3" /> 
                                                        {jadwal.jam_mulai.substring(0, 5)} - {jadwal.jam_selesai.substring(0, 5)}
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300">
                                                {jadwal.kelas.nama_kelas}
                                            </span>
                                        </div>

                                        {/* Content Card */}
                                        <div className="space-y-2 mb-3">
                                            <div className="flex items-center gap-2">
                                                <BookOpen className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {jadwal.mapel.nama_mapel}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                                    {jadwal.guru?.user?.name}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-600">
                                            <button 
                                                onClick={() => openModal(jadwal)} 
                                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors text-sm font-medium"
                                            >
                                                <Pencil className="w-4 h-4" />
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(jadwal.id)} 
                                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors text-sm font-medium"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Pagination */}
                        {jadwals.links && (
                            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap justify-center gap-2">
                                {jadwals.links.map((link, i) => (
                                    <button
                                        key={i}
                                        disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url, { kelas_id: filterKelas })}
                                        className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                                            link.active 
                                                ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-sm' 
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* MODAL FORM */}
            {showModal && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
                    onClick={closeModal}
                >
                    <div 
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg transform transition-all animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 backdrop-blur-sm">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                                    <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                                    {isEdit ? 'Edit Jadwal Mengajar' : 'Tambah Jadwal Mengajar'}
                                </h3>
                            </div>
                            <button 
                                onClick={closeModal} 
                                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">
                                        Hari <span className="text-red-500">*</span>
                                    </label>
                                    <select 
                                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
                                        value={data.hari} 
                                        onChange={e => setData('hari', e.target.value)}
                                    >
                                        {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'].map(h => (
                                            <option key={h} value={h}>{h}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">
                                        Kelas <span className="text-red-500">*</span>
                                    </label>
                                    <select 
                                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
                                        value={data.kelas_id} 
                                        onChange={e => setData('kelas_id', e.target.value)} 
                                        required
                                    >
                                        <option value="">- Pilih -</option>
                                        {kelas.map(k => <option key={k.id} value={k.id}>{k.nama_kelas}</option>)}
                                    </select>
                                    {errors.kelas_id && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.kelas_id}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">
                                    Mata Pelajaran <span className="text-red-500">*</span>
                                </label>
                                <select 
                                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
                                    value={data.mapel_id} 
                                    onChange={e => setData('mapel_id', e.target.value)} 
                                    required
                                >
                                    <option value="">- Pilih Mapel -</option>
                                    {mapels.map(m => <option key={m.id} value={m.id}>{m.nama_mapel}</option>)}
                                </select>
                                {errors.mapel_id && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.mapel_id}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">
                                    Guru Pengajar <span className="text-red-500">*</span>
                                </label>
                                <select 
                                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
                                    value={data.guru_id} 
                                    onChange={e => setData('guru_id', e.target.value)} 
                                    required
                                >
                                    <option value="">- Pilih Guru -</option>
                                    {gurus.map(g => (
                                        <option key={g.id} value={g.id}>
                                            {g.user.name} ({g.mapel?.nama_mapel})
                                        </option>
                                    ))}
                                </select>
                                {errors.guru_id && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.guru_id}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">
                                        Jam Mulai <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="time" 
                                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
                                        value={data.jam_mulai} 
                                        onChange={e => setData('jam_mulai', e.target.value)} 
                                        required 
                                    />
                                    {errors.jam_mulai && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.jam_mulai}</p>}
                                </div>
                                <div>
                                    <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">
                                        Jam Selesai <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="time" 
                                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
                                        value={data.jam_selesai} 
                                        onChange={e => setData('jam_selesai', e.target.value)} 
                                        required 
                                    />
                                    {errors.jam_selesai && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.jam_selesai}</p>}
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="pt-5 flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-gray-200 dark:border-gray-700">
                                <button 
                                    type="button" 
                                    onClick={closeModal} 
                                    className="w-full sm:w-auto px-5 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                >
                                    Batal
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={processing} 
                                    className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 dark:bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow-md"
                                >
                                    {processing ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Menyimpan...
                                        </span>
                                    ) : (
                                        isEdit ? 'Simpan Perubahan' : 'Simpan Jadwal'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}