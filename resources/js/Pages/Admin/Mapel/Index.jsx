import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Pencil, Trash2, Plus, BookOpen, X } from 'lucide-react';

export default function MapelIndex({ auth, mapel }) {
    const { data, setData, post, put, delete: destroy, reset, processing, errors } = useForm({
        id: '',
        nama_mapel: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    // Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('mapels.update', data.id), { onSuccess: () => closeModal() });
        } else {
            post(route('mapels.store'), { onSuccess: () => closeModal() });
        }
    };

    // Handle Delete
    const handleDelete = (id) => {
        if (confirm('Hapus mata pelajaran ini?')) {
            destroy(route('mapels.destroy', id));
        }
    };

    // Modal Logic
    const openModal = (item = null) => {
        setIsEdit(!!item);
        setData({
            id: item ? item.id : '',
            nama_mapel: item ? item.nama_mapel : ''
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        reset();
    };

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-100">
                    Mata Pelajaran
                </h2>
            }
        >
            <Head title="Data Mapel" />

            <div className="py-6 sm:py-8 lg:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                        <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                                Daftar Mata Pelajaran
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Kelola mata pelajaran yang tersedia
                            </p>
                        </div>
                        <button 
                            onClick={() => openModal()} 
                            className="flex items-center justify-center gap-2 bg-purple-600 dark:bg-purple-500 text-white px-4 py-2.5 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors shadow-sm hover:shadow-md"
                        >
                            <Plus className="w-4 h-4" /> 
                            <span className="font-medium">Tambah Mapel</span>
                        </button>
                    </div>

                    {/* Content Card */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-xl border border-gray-200 dark:border-gray-700 transition-colors duration-200">
                        <div className="p-4 sm:p-6">
                            
                            {/* Grid Layout */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                {mapel.length === 0 ? (
                                    <div className="col-span-full text-center py-12">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                                            <BookOpen className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                                        </div>
                                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                                            Belum ada data mata pelajaran
                                        </p>
                                        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                                            Klik tombol "Tambah Mapel" untuk menambahkan
                                        </p>
                                    </div>
                                ) : (
                                    mapel.map((item) => (
                                        <div 
                                            key={item.id} 
                                            className="group border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-750"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-start gap-3 flex-1 min-w-0">
                                                    <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900/30 p-2.5 rounded-lg text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                                                        <BookOpen className="w-5 h-5" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base break-words">
                                                            {item.nama_mapel}
                                                        </h4>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                            ID: {item.id}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                {/* Action Buttons */}
                                                <div className="flex gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button 
                                                        onClick={() => openModal(item)} 
                                                        className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(item.id)} 
                                                        className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Stats Footer */}
                            {mapel.length > 0 && (
                                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                                        Total <span className="font-semibold text-purple-600 dark:text-purple-400">{mapel.length}</span> mata pelajaran
                                    </p>
                                </div>
                            )}

                        </div>
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
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                    <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                                    {isEdit ? 'Edit Mata Pelajaran' : 'Tambah Mata Pelajaran'}
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
                                    Nama Mata Pelajaran <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all"
                                    value={data.nama_mapel}
                                    onChange={e => setData('nama_mapel', e.target.value)}
                                    placeholder="Contoh: Matematika Wajib"
                                    autoFocus
                                />
                                {errors.nama_mapel && (
                                    <p className="text-red-500 dark:text-red-400 text-xs mt-2 flex items-center gap-1">
                                        <span className="font-medium">⚠</span> {errors.nama_mapel}
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
                                    className="w-full sm:w-auto px-5 py-2.5 bg-purple-600 dark:bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow-md"
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