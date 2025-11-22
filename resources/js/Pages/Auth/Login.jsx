import { Head, Link, useForm } from '@inertiajs/react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in - SmartSchool" />

            <div className="fixed inset-0 overflow-auto">
                <div className="min-h-full w-full grid grid-cols-1 lg:grid-cols-2">
                    {/* Left Side - Login Form */}
                    <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-gray-50 order-1">
                        <div className="w-full max-w-md">
                            {/* Logo & Header */}
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center mb-4">
                                    <img
                                        src="/images/icons/icons.png"
                                        alt="SmartSchool Logo"
                                        className="w-20 h-20 object-contain"
                                    />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">SmartSchool</h1>
                                <p className="text-gray-600">Sistem Manajemen Sekolah Modern</p>
                            </div>

                            {/* Status Message */}
                            {status && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <p className="text-sm font-medium text-green-800">{status}</p>
                                </div>
                            )}

                            {/* Login Form */}
                            <div className="bg-white p-8 rounded-2xl shadow-xl">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Masuk ke Akun Anda</h2>

                                <div className="space-y-5">
                                    {/* Email Field */}
                                    <div>
                                        <InputLabel
                                            htmlFor="email"
                                            value="Alamat Email"
                                            className="text-gray-700 font-medium mb-2"
                                        />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="nama@sekolah.com"
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    {/* Password Field */}
                                    <div>
                                        <InputLabel
                                            htmlFor="password"
                                            value="Kata Sandi"
                                            className="text-gray-700 font-medium mb-2"
                                        />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            autoComplete="current-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !processing) {
                                                    submit(e);
                                                }
                                            }}
                                            placeholder="••••••••"
                                        />
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    {/* Remember Me & Forgot Password */}
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center cursor-pointer">
                                            <Checkbox
                                                name="remember"
                                                checked={data.remember}
                                                onChange={(e) => setData('remember', e.target.checked)}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-600">
                                                Ingat saya
                                            </span>
                                        </label>

                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                            >
                                                Lupa kata sandi?
                                            </Link>
                                        )}
                                    </div>

                                    {/* Login Button */}
                                    <PrimaryButton
                                        onClick={submit}
                                        className="w-full justify-center py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Memproses...
                                            </span>
                                        ) : (
                                            'Masuk'
                                        )}
                                    </PrimaryButton>
                                </div>

                                {/* Footer */}
                                <div className="mt-6 text-center">
                                    <p className="text-sm text-gray-600">
                                        Butuh bantuan? {' '}
                                        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                                            Hubungi Administrator
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Hero Section (Hidden on Mobile) */}
                    <div className="hidden lg:flex bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 relative overflow-hidden order-2">
                        {/* Decorative Elements */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                            <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
                            <div className="max-w-lg">
                                <div className="mb-8 text-center">
                                    <svg className="w-24 h-24 mx-auto mb-6 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>

                                <h2 className="text-4xl font-bold mb-6 text-center">
                                    Selamat Datang di SmartSchool
                                </h2>

                                <p className="text-xl text-blue-100 mb-10 leading-relaxed text-center">
                                    Platform manajemen sekolah terpadu yang memudahkan administrasi, pembelajaran, dan kolaborasi dalam satu sistem yang terintegrasi.
                                </p>

                                {/* Features */}
                                <div className="space-y-5">
                                    <div className="flex items-start space-x-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                                        <svg className="w-6 h-6 text-green-300 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1">Manajemen Siswa & Guru</h3>
                                            <p className="text-blue-100 text-sm">Data terorganisir dan mudah diakses</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                                        <svg className="w-6 h-6 text-green-300 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1">Absensi Digital</h3>
                                            <p className="text-blue-100 text-sm">Monitoring kehadiran real-time</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                                        <svg className="w-6 h-6 text-green-300 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1">Laporan & Analytics</h3>
                                            <p className="text-blue-100 text-sm">Dashboard insight yang komprehensif</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
