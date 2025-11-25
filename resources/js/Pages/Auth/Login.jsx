import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
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

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in - SmartSchool" />

            {/* Main Container dengan Background Biru Muda */}
            <div className="fixed inset-0 overflow-auto bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
                
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
                </div>

                <div className="min-h-full w-full grid grid-cols-1 lg:grid-cols-2 relative">
                    
                    {/* Left Side - Login Form */}
                    <div className="flex items-center justify-center p-4 sm:p-6 lg:p-12 order-2 lg:order-1">
                        <div className="w-full max-w-md">
                            
                            {/* Logo & Header */}
                            <div className="text-center mb-6 sm:mb-8 animate-fade-in-down">
                                <div className="inline-flex items-center justify-center mb-4 relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                                    <div className="relative bg-white p-3 sm:p-4 rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                                        <img
                                            src="/images/icons/icons.png"
                                            alt="SmartSchool Logo"
                                            className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain"
                                        />
                                    </div>
                                </div>
                                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent mb-2">
                                    SmartSchool
                                </h1>
                                <p className="text-sm sm:text-base text-gray-600 font-medium">Sistem Manajemen Sekolah Modern</p>
                            </div>

                            {/* Status Message */}
                            {status && (
                                <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl shadow-sm animate-fade-in">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-sm font-medium text-green-800">{status}</p>
                                    </div>
                                </div>
                            )}

                            {/* Login Form Card */}
                            <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-blue-100/50 animate-fade-in-up">
                                
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Masuk ke Akun Anda</h2>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse animation-delay-200"></div>
                                        <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse animation-delay-400"></div>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    
                                    {/* Email Field */}
                                    <div className="group">
                                        <InputLabel
                                            htmlFor="email"
                                            value="Alamat Email"
                                            className="text-gray-700 font-semibold mb-2 text-sm"
                                        />
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <TextInput
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                className="w-full pl-11 pr-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white text-sm sm:text-base"
                                                autoComplete="username"
                                                isFocused={true}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="nama@sekolah.com"
                                            />
                                        </div>
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    {/* Password Field */}
                                    <div className="group">
                                        <InputLabel
                                            htmlFor="password"
                                            value="Kata Sandi"
                                            className="text-gray-700 font-semibold mb-2 text-sm"
                                        />
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                            <TextInput
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={data.password}
                                                className="w-full pl-11 pr-12 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white text-sm sm:text-base"
                                                autoComplete="current-password"
                                                onChange={(e) => setData('password', e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && !processing) {
                                                        submit(e);
                                                    }
                                                }}
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                {showPassword ? (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    {/* Remember Me & Forgot Password */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 text-sm">
                                        <label className="flex items-center cursor-pointer group">
                                            <Checkbox
                                                name="remember"
                                                checked={data.remember}
                                                onChange={(e) => setData('remember', e.target.checked)}
                                                className="rounded-md border-gray-300 text-blue-600 focus:ring-blue-500 transition-all"
                                            />
                                            <span className="ml-2 text-gray-600 group-hover:text-gray-800 transition-colors font-medium">
                                                Ingat saya
                                            </span>
                                        </label>

                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors hover:underline"
                                            >
                                                Lupa kata sandi?
                                            </Link>
                                        )}
                                    </div>

                                    {/* Login Button */}
                                    <PrimaryButton
                                        onClick={submit}
                                        className="w-full justify-center py-3.5 px-6 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 hover:from-blue-600 hover:via-cyan-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
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
                                            'Masuk Sekarang'
                                        )}
                                    </PrimaryButton>
                                </div>

                                {/* Footer */}
                                <div className="mt-6 text-center">
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Butuh bantuan? {' '}
                                        <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors">
                                            Hubungi Administrator
                                        </a>
                                    </p>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-gray-500 animate-fade-in">
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 text-green-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    <span className="font-medium">Aman & Terenkripsi</span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 text-blue-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="font-medium">Terpercaya</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Hero Section */}
                    <div className="relative bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 overflow-hidden order-1 lg:order-2 min-h-[280px] sm:min-h-[350px] lg:min-h-screen">
                        
                        {/* Animated Background Patterns */}
                        <div className="absolute inset-0">
                            <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
                            <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-300/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
                            <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl animate-float animation-delay-4000"></div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-10 right-10 w-24 sm:w-32 h-24 sm:h-32 border-4 border-white rounded-2xl rotate-12 animate-spin-slow"></div>
                            <div className="absolute bottom-20 left-10 w-16 sm:w-24 h-16 sm:h-24 border-4 border-white rounded-full animate-pulse"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-6 sm:p-8 lg:p-12 text-white">
                            <div className="max-w-lg w-full">
                                
                                {/* Icon Header */}
                                <div className="mb-6 sm:mb-8 text-center animate-fade-in-up">
                                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-4 sm:mb-6 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
                                        <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4 animate-fade-in-up animation-delay-200">
                                        Selamat Datang di<br className="hidden sm:block" /> SmartSchool
                                    </h2>
                                    <p className="text-sm sm:text-base lg:text-xl text-blue-50 leading-relaxed animate-fade-in-up animation-delay-400 px-4 sm:px-0">
                                        Platform manajemen sekolah terpadu yang memudahkan administrasi, pembelajaran, dan kolaborasi dalam satu sistem yang terintegrasi.
                                    </p>
                                </div>

                                {/* Features */}
                                <div className="space-y-3 sm:space-y-4 lg:space-y-5 px-4 sm:px-0">
                                    <div className="flex items-start space-x-3 sm:space-x-4 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:bg-white/20 hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-600">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-300 flex-shrink-0 mt-0.5 sm:mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <div>
                                            <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-0.5 sm:mb-1">Manajemen Siswa & Guru</h3>
                                            <p className="text-blue-100 text-xs sm:text-sm">Data terorganisir dan mudah diakses</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3 sm:space-x-4 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:bg-white/20 hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-800">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-300 flex-shrink-0 mt-0.5 sm:mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <div>
                                            <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-0.5 sm:mb-1">Absensi Digital</h3>
                                            <p className="text-blue-100 text-xs sm:text-sm">Monitoring kehadiran real-time</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3 sm:space-x-4 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:bg-white/20 hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-1000">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-300 flex-shrink-0 mt-0.5 sm:mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <div>
                                            <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-0.5 sm:mb-1">Laporan & Analytics</h3>
                                            <p className="text-blue-100 text-xs sm:text-sm">Dashboard insight yang komprehensif</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS Animations */}
            <style>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -20px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(20px, 20px) scale(1.05); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(12deg); }
                    to { transform: rotate(372deg); }
                }
                @keyframes fade-in-down {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.6s ease-out;
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out;
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }
                .animation-delay-200 { animation-delay: 0.2s; }
                .animation-delay-400 { animation-delay: 0.4s; }
                .animation-delay-600 { animation-delay: 0.6s; }
                .animation-delay-800 { animation-delay: 0.8s; }
                .animation-delay-1000 { animation-delay: 1s; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
            `}</style>
        </>
    );
}