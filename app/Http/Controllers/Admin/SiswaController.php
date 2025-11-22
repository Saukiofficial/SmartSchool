<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Siswa;
use App\Models\Kelas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiswaController extends Controller
{
    public function index(Request $request)
    {
        // Fitur Filter per Kelas
        $query = Siswa::with('kelas')->orderBy('kelas_id')->orderBy('nama');

        if ($request->has('kelas_id') && $request->kelas_id != '') {
            $query->where('kelas_id', $request->kelas_id);
        }

        // Search by Nama
        if ($request->has('search') && $request->search != '') {
            $query->where('nama', 'like', '%' . $request->search . '%');
        }

        return Inertia::render('Admin/Siswa/Index', [
            'siswas' => $query->paginate(10)->withQueryString(), // Pakai pagination biar ringan
            'kelas_list' => Kelas::all(),
            'filters' => $request->only(['kelas_id', 'search'])
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'nis' => 'required|unique:siswas,nis',
            'kelas_id' => 'required|exists:kelas,id',
            'jenis_kelamin' => 'required|in:L,P',
        ]);

        Siswa::create($request->all());

        return redirect()->back()->with('message', 'Data siswa berhasil ditambahkan.');
    }

    public function update(Request $request, Siswa $siswa)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'nis' => 'required|unique:siswas,nis,' . $siswa->id,
            'kelas_id' => 'required|exists:kelas,id',
            'jenis_kelamin' => 'required|in:L,P',
        ]);

        $siswa->update($request->all());

        return redirect()->back()->with('message', 'Data siswa berhasil diperbarui.');
    }

    public function destroy(Siswa $siswa)
    {
        $siswa->delete();
        return redirect()->back()->with('message', 'Data siswa berhasil dihapus.');
    }
}
