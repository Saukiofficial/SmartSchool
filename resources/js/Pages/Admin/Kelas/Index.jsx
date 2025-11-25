import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Pencil, Trash2, Plus, Building, X, Hash } from 'lucide-react';

export default function KelasIndex({ auth, kelas }) {
    const { data, setData, post, put, delete: destroy, reset, processing, errors } = useForm({
        id: '',
        nama_kelas: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const openModal = (item = null) => {
        setIsEdit(!!item);
        if (item) {
            setData({
                id: item.id,
                nama_kelas: item.nama_kelas
            });
        } else {
            setData({ id: '', nama_kelas: '' });
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
            put(route('kelas.update', data.id), {
                onSuccess: () => closeModal()
            });
        } else {
            post(route('kelas.store'), {
                onSuccess: () => closeModal()
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus kelas ini?')) {
            destroy(route('kelas.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-100">
                    Manajemen Kelas
                </h2>
            }
        >
            <Head title="Data Kelas" />

            <div className="py-6 sm:py-8 lg:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6 bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                                <Building className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Daftar Kelas</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Kelola data kelas sekolah</p>
                            </div>
                        </div>
                        <button
                            onClick={() => openModal()}
                            className="flex items-center justify-center gap-2 bg-green-600 dark:bg-green-500 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors shadow-sm hover:shadow-md font-medium"
                        >
                            <Plus className="w-4 h-4" /> 
                            <span>Tambah Kelas</span>
                        </button>
                    </div>

                    {/* Table Container */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 transition-colors duration-200">
                        
                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-900/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider w-20">
                                            No
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                            Nama Kelas
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider w-48">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {kelas.length === 0 ? (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-16 text-center">
                                                <div className="flex flex-col items-center">
                                                    <Building className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
                                                    <p className="text-gray-500 dark:text-gray-400 font-medium">Belum ada data kelas</p>
                                                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Klik "Tambah Kelas" untuk memulai</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        kelas.map((item, index) => (
                                            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold text-sm">
                                                        {index + 1}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                                            <Hash className="w-4 h-4 text-green-600 dark:text-green-400" />
                                                        </div>
                                                        <span className="font-bold text-gray-900 dark:text-gray-100 text-base">
                                                            {item.nama_kelas}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <div className="flex justify-center gap-2">
                                                        <button
                                                            onClick={() => openModal(item)}
                                                            className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-3 py-2 rounded-lg transition-colors font-medium text-sm"
                                                        >
                                                            <Pencil className="w-4 h-4" /> Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(item.id)}
                                                            className="flex items-center gap-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-lg transition-colors font-medium text-sm"
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

                        {/* Mobile Card View */}
                        <div className="md:hidden p-4 space-y-3">
                            {kelas.length === 0 ? (
                                <div className="flex flex-col items-center py-12">
                                    <Building className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
                                    <p className="text-gray-500 dark:text-gray-400 font-medium">Belum ada data kelas</p>
                                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Klik "Tambah Kelas"</p>
                                </div>
                            ) : (
                                kelas.map((item, index) => (
                                    <div 
                                        key={item.id} 
                                        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-750 border border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:shadow-lg transition-all duration-200"
                                    >
                                        <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200 dark:border-gray-600">
                                            <div className="flex items-center gap-3">
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold text-sm">
                                                    {index + 1}
                                                </span>
                                                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                                    <Hash className="w-4 h-4 text-green-600 dark:text-green-400" />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="mb-3">
                                            <h4 className="font-bold text-gray-900 dark:text-gray-100 text-lg">
                                                {item.nama_kelas}
                                            </h4>
                                        </div>

                                        <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-600">
                                            <button
                                                onClick={() => openModal(item)}
                                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded-lg transition-colors text-sm font-medium"
                                            >
                                                <Pencil className="w-4 h-4" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
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

                        {/* Stats Footer */}
                        {kelas.length > 0 && (
                            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
                                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                                    Total <span className="font-semibold text-green-600 dark:text-green-400">{kelas.length}</span> kelas terdaftar
                                </p>
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
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                    <Building className="w-5 h-5 text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                                    {isEdit ? 'Edit Nama Kelas' : 'Tambah Kelas Baru'}
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
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Nama Kelas <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all"
                                    placeholder="Contoh: X RPL 1"
                                    value={data.nama_kelas}
                                    onChange={e => setData('nama_kelas', e.target.value)}
                                    autoFocus
                                />
                                {errors.nama_kelas && (
                                    <p className="text-red-500 dark:text-red-400 text-xs mt-2 flex items-center gap-1">
                                        <span className="font-medium">⚠</span> {errors.nama_kelas}
                                    </p>
                                )}
                            </div>

                            {/* Modal Footer */}
                            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
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
                                    className="w-full sm:w-auto px-5 py-2.5 bg-green-600 dark:bg-green-500 text-white font-medium rounded-lg hover:bg-green-700 dark:hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow-md"
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
                                        isEdit ? 'Simpan Perubahan' : 'Simpan'
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