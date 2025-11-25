import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { Pencil, Trash2, Plus, Search, GraduationCap, X, Filter, Users, User } from 'lucide-react';

export default function SiswaIndex({ auth, siswas, kelas_list, filters }) {
    const { data, setData, post, put, delete: destroy, reset, processing, errors } = useForm({
        id: '', nama: '', nis: '', kelas_id: '', jenis_kelamin: 'L'
    });

    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [filterKelas, setFilterKelas] = useState(filters.kelas_id || '');

    const handleFilter = () => {
        router.get(route('siswas.index'), { kelas_id: filterKelas, search: searchQuery }, { preserveState: true });
    };

    const openModal = (siswa = null) => {
        setIsEdit(!!siswa);
        if (siswa) {
            setData({
                id: siswa.id,
                nama: siswa.nama,
                nis: siswa.nis,
                kelas_id: siswa.kelas_id,
                jenis_kelamin: siswa.jenis_kelamin || 'L'
            });
        } else {
            setData({ id: '', nama: '', nis: '', kelas_id: '', jenis_kelamin: 'L' });
        }
        setShowModal(true);
    };

    const closeModal = () => { setShowModal(false); reset(); };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('siswas.update', data.id), { onSuccess: () => closeModal() });
        } else {
            post(route('siswas.store'), { onSuccess: () => closeModal() });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Hapus data siswa ini?')) {
            destroy(route('siswas.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-100">
                    Data Siswa
                </h2>
            }
        >
            <Head title="Manajemen Siswa" />

            <div className="py-6 sm:py-8 lg:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* TOOLBAR: FILTER & SEARCH */}
                    <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6 transition-colors duration-200">
                        <div className="flex flex-col lg:flex-row gap-4">
                            {/* Left: Filters */}
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                <div className="flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                                    <select
                                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                                        value={filterKelas}
                                        onChange={(e) => setFilterKelas(e.target.value)}
                                    >
                                        <option value="">Semua Kelas</option>
                                        {kelas_list.map(k => <option key={k.id} value={k.id}>{k.nama_kelas}</option>)}
                                    </select>
                                </div>
                                
                                <div className="relative sm:col-span-2 lg:col-span-1">
                                    <input
                                        type="text"
                                        placeholder="Cari nama siswa..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleFilter()}
                                    />
                                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
                                </div>
                                
                                <button 
                                    onClick={handleFilter} 
                                    className="px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg text-sm hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors font-medium"
                                >
                                    Cari
                                </button>
                            </div>

                            {/* Right: Add Button */}
                            <button 
                                onClick={() => openModal()} 
                                className="flex items-center justify-center gap-2 bg-blue-600 dark:bg-blue-500 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-sm hover:shadow-md font-medium"
                            >
                                <Plus className="w-4 h-4" /> 
                                <span>Tambah Siswa</span>
                            </button>
                        </div>
                    </div>

                    {/* CONTENT AREA */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 transition-colors duration-200">
                        
                        {/* Desktop Table View */}
                        <div className="hidden lg:block overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-900/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                            NIS
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                            Nama Siswa
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                            L/P
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                            Kelas
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {siswas.data.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-16 text-center">
                                                <div className="flex flex-col items-center">
                                                    <GraduationCap className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
                                                    <p className="text-gray-500 dark:text-gray-400 font-medium">Tidak ada data siswa</p>
                                                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Coba ubah filter atau tambahkan data baru</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        siswas.data.map((siswa) => (
                                            <tr key={siswa.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="font-mono text-sm text-gray-600 dark:text-gray-300 font-medium">
                                                        {siswa.nis}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                                            <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                                        </div>
                                                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                                                            {siswa.nama}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                                                        siswa.jenis_kelamin === 'L' 
                                                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                                                            : 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300'
                                                    }`}>
                                                        {siswa.jenis_kelamin}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                                                        {siswa.kelas?.nama_kelas || '-'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <div className="flex justify-center gap-2">
                                                        <button 
                                                            onClick={() => openModal(siswa)} 
                                                            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Pencil className="w-4 h-4" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(siswa.id)} 
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
                            {siswas.data.length === 0 ? (
                                <div className="flex flex-col items-center py-12">
                                    <GraduationCap className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
                                    <p className="text-gray-500 dark:text-gray-400 font-medium">Tidak ada data siswa</p>
                                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Coba ubah filter</p>
                                </div>
                            ) : (
                                siswas.data.map((siswa) => (
                                    <div 
                                        key={siswa.id} 
                                        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-750 border border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:shadow-lg transition-all duration-200"
                                    >
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-3 pb-3 border-b border-gray-200 dark:border-gray-600">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900 dark:text-gray-100">
                                                        {siswa.nama}
                                                    </h4>
                                                    <p className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-0.5">
                                                        NIS: {siswa.nis}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="space-y-2 mb-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Kelas:</span>
                                                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                                    {siswa.kelas?.nama_kelas || '-'}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Jenis Kelamin:</span>
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                                                    siswa.jenis_kelamin === 'L' 
                                                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                                                        : 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300'
                                                }`}>
                                                    {siswa.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-600">
                                            <button
                                                onClick={() => openModal(siswa)}
                                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors text-sm font-medium"
                                            >
                                                <Pencil className="w-4 h-4" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(siswa.id)}
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

                        {/* PAGINATION */}
                        {siswas.links && (
                            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap justify-center gap-2">
                                {siswas.links.map((link, i) => (
                                    <button
                                        key={i}
                                        onClick={() => link.url && router.get(link.url, { kelas_id: filterKelas, search: searchQuery })}
                                        disabled={!link.url || link.active}
                                        className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                                            link.active 
                                                ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-sm' 
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        } ${(!link.url || link.active) && 'opacity-50 cursor-not-allowed'}`}
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
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 backdrop-blur-sm">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                    <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                                    {isEdit ? 'Edit Data Siswa' : 'Tambah Siswa Baru'}
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
                            <div>
                                <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">
                                    NIS (Nomor Induk) <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all font-mono"
                                    value={data.nis} 
                                    onChange={e => setData('nis', e.target.value)} 
                                    placeholder="Contoh: 1234567890"
                                    required 
                                />
                                {errors.nis && <p className="text-red-500 dark:text-red-400 text-xs mt-2">⚠ {errors.nis}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">
                                    Nama Lengkap <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
                                    value={data.nama} 
                                    onChange={e => setData('nama', e.target.value)} 
                                    placeholder="Contoh: Ahmad Fauzi"
                                    required 
                                />
                                {errors.nama && <p className="text-red-500 dark:text-red-400 text-xs mt-2">⚠ {errors.nama}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">
                                        Kelas <span className="text-red-500">*</span>
                                    </label>
                                    <select 
                                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                                        value={data.kelas_id} 
                                        onChange={e => setData('kelas_id', e.target.value)} 
                                        required
                                    >
                                        <option value="">- Pilih -</option>
                                        {kelas_list.map(k => <option key={k.id} value={k.id}>{k.nama_kelas}</option>)}
                                    </select>
                                    {errors.kelas_id && <p className="text-red-500 dark:text-red-400 text-xs mt-2">⚠ {errors.kelas_id}</p>}
                                </div>

                                <div>
                                    <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">
                                        Jenis Kelamin <span className="text-red-500">*</span>
                                    </label>
                                    <select 
                                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                                        value={data.jenis_kelamin} 
                                        onChange={e => setData('jenis_kelamin', e.target.value)}
                                    >
                                        <option value="L">Laki-laki</option>
                                        <option value="P">Perempuan</option>
                                    </select>
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
                                    className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 dark:bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow-md"
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
                                        'Simpan'
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