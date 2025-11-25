import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Pencil, Trash2, Plus, UserPlus, X, BookOpen, Users } from 'lucide-react';

export default function GuruIndex({ auth, gurus, mapels, kelas }) {
    const { data, setData, post, put, delete: destroy, reset, processing, errors } = useForm({
        id: '',
        name: '',
        username: '',
        password: '',
        mapel_id: '',
        kelas_id: '',
        status_aktif: '1'
    });

    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const openModal = (guru = null) => {
        setIsEdit(!!guru);

        if (guru) {
            setData({
                id: guru.id,
                name: guru.user.name,
                username: guru.user.username,
                password: '',
                mapel_id: guru.mapel_id || '',
                kelas_id: guru.kelas_id || '',
                status_aktif: guru.status_aktif ? '1' : '0'
            });
        } else {
            setData({
                id: '', name: '', username: '', password: '', mapel_id: '', kelas_id: '', status_aktif: '1'
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
            put(route('gurus.update', data.id), {
                onSuccess: () => closeModal()
            });
        } else {
            post(route('gurus.store'), {
                onSuccess: () => closeModal()
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus data guru ini? Akun login juga akan terhapus.')) {
            destroy(route('gurus.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                    Manajemen Guru
                </h2>
            }
        >
            <Head title="Data Guru" />
            
            <div className="py-6 sm:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header Section - Responsive */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                        <div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">
                                Daftar Guru Pengajar
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Total: {gurus.length} guru terdaftar
                            </p>
                        </div>
                        <button
                            onClick={() => openModal()}
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md w-full sm:w-auto"
                        >
                            <UserPlus className="w-4 h-4" /> 
                            <span className="font-medium">Tambah Guru</span>
                        </button>
                    </div>

                    {/* Desktop & Tablet View - Table */}
                    <div className="hidden md:block bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-xl border border-gray-200 dark:border-gray-700">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-900/50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Nama Guru
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Username
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Mapel Ajar
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Wali Kelas
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {gurus.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                                <UserPlus className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                                <p>Belum ada data guru.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        gurus.map((guru) => (
                                            <tr key={guru.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                        {guru.user.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                        {guru.user.email}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm text-gray-700 dark:text-gray-300 font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                        {guru.user.username}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {guru.mapel ? (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                                                            {guru.mapel.nama_mapel}
                                                        </span>
                                                    ) : <span className="text-gray-400 dark:text-gray-500">-</span>}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {guru.kelas ? (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                                                            {guru.kelas.nama_kelas}
                                                        </span>
                                                    ) : <span className="text-gray-400 dark:text-gray-500">-</span>}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    {guru.status_aktif ? (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                                                            Aktif
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                                                            Non-Aktif
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                    <div className="flex justify-center gap-3">
                                                        <button
                                                            onClick={() => openModal(guru)}
                                                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 flex items-center gap-1 transition"
                                                        >
                                                            <Pencil className="w-4 h-4" /> Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(guru.id)}
                                                            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 flex items-center gap-1 transition"
                                                        >
                                                            <Trash2 className="w-4 h-4" /> Hapus
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile View - Cards */}
                    <div className="md:hidden space-y-4">
                        {gurus.length === 0 ? (
                            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
                                <UserPlus className="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-500" />
                                <p className="text-gray-500 dark:text-gray-400">Belum ada data guru.</p>
                            </div>
                        ) : (
                            gurus.map((guru) => (
                                <div key={guru.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow">
                                    {/* Header Card */}
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-base">
                                                {guru.user.name}
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                {guru.user.email}
                                            </p>
                                        </div>
                                        {guru.status_aktif ? (
                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                                                Aktif
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                                                Non-Aktif
                                            </span>
                                        )}
                                    </div>

                                    {/* Info Grid */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-20">Username:</span>
                                            <span className="text-sm text-gray-700 dark:text-gray-300 font-mono bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                                                {guru.user.username}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-20">Mapel:</span>
                                            {guru.mapel ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                                                    <BookOpen className="w-3 h-3" />
                                                    {guru.mapel.nama_mapel}
                                                </span>
                                            ) : <span className="text-sm text-gray-400 dark:text-gray-500">-</span>}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-20">Wali Kelas:</span>
                                            {guru.kelas ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                                                    <Users className="w-3 h-3" />
                                                    {guru.kelas.nama_kelas}
                                                </span>
                                            ) : <span className="text-sm text-gray-400 dark:text-gray-500">-</span>}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                                        <button
                                            onClick={() => openModal(guru)}
                                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded-lg transition"
                                        >
                                            <Pencil className="w-4 h-4" /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(guru.id)}
                                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition"
                                        >
                                            <Trash2 className="w-4 h-4" /> Hapus
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* MODAL FORM - Responsive & Theme Support */}
                    {showModal && (
                        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg relative animate-fade-in-up">

                                {/* Modal Header */}
                                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 rounded-t-xl">
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">
                                        {isEdit ? 'Edit Data Guru' : 'Tambah Guru Baru'}
                                    </h3>
                                    <button 
                                        onClick={closeModal} 
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Modal Body */}
                                <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
                                    {/* Nama */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Nama Lengkap
                                        </label>
                                        <input 
                                            type="text" 
                                            className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            value={data.name} 
                                            onChange={e => setData('name', e.target.value)} 
                                            required 
                                        />
                                        {errors.name && <div className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.name}</div>}
                                    </div>

                                    {/* Username & Password */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Username
                                            </label>
                                            <input 
                                                type="text" 
                                                className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                value={data.username} 
                                                onChange={e => setData('username', e.target.value)} 
                                                required 
                                            />
                                            {errors.username && <div className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.username}</div>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Password {isEdit && <span className="text-xs font-normal text-gray-500 dark:text-gray-400">(Opsional)</span>}
                                            </label>
                                            <input 
                                                type="password" 
                                                className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                value={data.password} 
                                                onChange={e => setData('password', e.target.value)}
                                                placeholder={isEdit ? "Biarkan kosong jika tetap" : ""}
                                                required={!isEdit} 
                                            />
                                        </div>
                                    </div>

                                    {/* Mapel & Wali Kelas */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Mata Pelajaran
                                            </label>
                                            <select 
                                                className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                value={data.mapel_id} 
                                                onChange={e => setData('mapel_id', e.target.value)}
                                            >
                                                <option value="">- Pilih Mapel -</option>
                                                {mapels.map(m => <option key={m.id} value={m.id}>{m.nama_mapel}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Wali Kelas
                                            </label>
                                            <select 
                                                className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                value={data.kelas_id} 
                                                onChange={e => setData('kelas_id', e.target.value)}
                                            >
                                                <option value="">- Bukan Wali Kelas -</option>
                                                {kelas.map(k => <option key={k.id} value={k.id}>{k.nama_kelas}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Status Akun
                                        </label>
                                        <select 
                                            className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            value={data.status_aktif} 
                                            onChange={e => setData('status_aktif', e.target.value)}
                                        >
                                            <option value="1">Aktif (Bisa Login)</option>
                                            <option value="0">Non-Aktif (Dibekukan)</option>
                                        </select>
                                    </div>

                                    {/* Footer Buttons */}
                                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <button 
                                            type="button" 
                                            onClick={closeModal} 
                                            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                                        >
                                            Batal
                                        </button>
                                        <button 
                                            type="submit" 
                                            disabled={processing} 
                                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {processing ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Tambah Guru')}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}