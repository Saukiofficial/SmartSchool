import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { Pencil, Trash2, Plus, Search, GraduationCap, X } from 'lucide-react';

export default function SiswaIndex({ auth, siswas, kelas_list, filters }) {
    // --- FORM STATE ---
    const { data, setData, post, put, delete: destroy, reset, processing, errors } = useForm({
        id: '', nama: '', nis: '', kelas_id: '', jenis_kelamin: 'L'
    });

    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [filterKelas, setFilterKelas] = useState(filters.kelas_id || '');

    // --- FILTER & SEARCH ---
    const handleFilter = () => {
        router.get(route('siswas.index'), { kelas_id: filterKelas, search: searchQuery }, { preserveState: true });
    };

    // --- MODAL LOGIC ---
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

    // --- CRUD ACTIONS ---
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
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800">Data Siswa</h2>}>
            <Head title="Manajemen Siswa" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">

                {/* TOOLBAR: FILTER & ADD */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm border">
                    <div className="flex gap-2 w-full md:w-auto">
                        <select
                            className="border-gray-300 rounded-lg text-sm"
                            value={filterKelas}
                            onChange={(e) => setFilterKelas(e.target.value)}
                        >
                            <option value="">Semua Kelas</option>
                            {kelas_list.map(k => <option key={k.id} value={k.id}>{k.nama_kelas}</option>)}
                        </select>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari Nama..."
                                className="border-gray-300 rounded-lg text-sm pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="w-4 h-4 absolute left-2 top-3 text-gray-400" />
                        </div>
                        <button onClick={handleFilter} className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700">Cari</button>
                    </div>

                    <button onClick={() => openModal()} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full md:w-auto justify-center">
                        <Plus className="w-4 h-4" /> Tambah Siswa
                    </button>
                </div>

                {/* TABEL SISWA */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">NIS</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Nama Siswa</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">L/P</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Kelas</th>
                                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {siswas.data.length === 0 ? (
                                    <tr><td colSpan="5" className="px-6 py-10 text-center text-gray-500">Tidak ada data siswa.</td></tr>
                                ) : (
                                    siswas.data.map((siswa) => (
                                        <tr key={siswa.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-mono text-gray-600">{siswa.nis}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900">{siswa.nama}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${siswa.jenis_kelamin === 'L' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}>
                                                    {siswa.jenis_kelamin}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{siswa.kelas?.nama_kelas}</td>
                                            <td className="px-6 py-4 text-center flex justify-center gap-2">
                                                <button onClick={() => openModal(siswa)} className="text-blue-600 hover:bg-blue-50 p-2 rounded"><Pencil className="w-4 h-4" /></button>
                                                <button onClick={() => handleDelete(siswa.id)} className="text-red-600 hover:bg-red-50 p-2 rounded"><Trash2 className="w-4 h-4" /></button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}
                    <div className="p-4 border-t flex justify-center gap-2">
                        {siswas.links.map((link, i) => (
                            <button
                                key={i}
                                onClick={() => link.url && router.get(link.url, { kelas_id: filterKelas, search: searchQuery })}
                                disabled={!link.url || link.active}
                                className={`px-3 py-1 rounded border text-sm ${link.active ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>

                {/* MODAL FORM */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-fade-in-up">
                            <div className="flex justify-between items-center p-5 border-b">
                                <h3 className="text-lg font-bold">{isEdit ? 'Edit Siswa' : 'Tambah Siswa Baru'}</h3>
                                <button onClick={closeModal}><X className="w-5 h-5 text-gray-400" /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="text-sm font-medium block mb-1">NIS (Nomor Induk)</label>
                                    <input type="text" className="w-full border-gray-300 rounded-lg" value={data.nis} onChange={e => setData('nis', e.target.value)} required />
                                    {errors.nis && <p className="text-red-500 text-xs">{errors.nis}</p>}
                                </div>
                                <div>
                                    <label className="text-sm font-medium block mb-1">Nama Lengkap</label>
                                    <input type="text" className="w-full border-gray-300 rounded-lg" value={data.nama} onChange={e => setData('nama', e.target.value)} required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium block mb-1">Kelas</label>
                                        <select className="w-full border-gray-300 rounded-lg" value={data.kelas_id} onChange={e => setData('kelas_id', e.target.value)} required>
                                            <option value="">- Pilih -</option>
                                            {kelas_list.map(k => <option key={k.id} value={k.id}>{k.nama_kelas}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium block mb-1">L/P</label>
                                        <select className="w-full border-gray-300 rounded-lg" value={data.jenis_kelamin} onChange={e => setData('jenis_kelamin', e.target.value)}>
                                            <option value="L">Laki-laki</option>
                                            <option value="P">Perempuan</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="pt-4 flex justify-end gap-2">
                                    <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700">Batal</button>
                                    <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Simpan</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
