import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { CheckCircle, XCircle, Loader2, RefreshCw, Camera, Clock, Calendar, QrCode } from 'lucide-react';

// Custom CSS untuk QR Scanner agar terlihat di dark mode dan responsive
const scannerStyles = `
    #reader {
        border: none !important;
        background: transparent !important;
        width: 100% !important;
    }
    
    #reader__scan_region {
        border: 3px solid #6366f1 !important;
        border-radius: 12px !important;
        overflow: hidden !important;
        background: #000 !important;
        width: 100% !important;
        min-height: 300px !important;
    }
    
    #reader__camera_selection {
        background: white !important;
        color: #1f2937 !important;
        border: 1px solid #d1d5db !important;
        border-radius: 8px !important;
        padding: 8px 12px !important;
        margin-bottom: 12px !important;
        width: 100% !important;
        max-width: 100% !important;
    }
    
    #reader__dashboard {
        background: transparent !important;
        border: none !important;
        width: 100% !important;
    }
    
    #reader__dashboard_section {
        background: transparent !important;
        width: 100% !important;
    }
    
    #reader__dashboard_section_csr {
        width: 100% !important;
    }
    
    #reader__dashboard_section_csr button,
    #reader__dashboard_section_swaplink {
        background: #6366f1 !important;
        color: white !important;
        border: none !important;
        border-radius: 8px !important;
        padding: 10px 16px !important;
        font-weight: 500 !important;
        cursor: pointer !important;
        transition: all 0.3s !important;
        width: 100% !important;
        margin: 4px 0 !important;
    }
    
    #reader__dashboard_section_csr button:hover,
    #reader__dashboard_section_swaplink:hover {
        background: #4f46e5 !important;
    }
    
    #reader video {
        border-radius: 8px !important;
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        height: auto !important;
        object-fit: cover !important;
    }
    
    #reader__header_message {
        display: none !important;
    }
    
    #reader__status_span {
        color: #9ca3af !important;
        font-size: 13px !important;
        padding: 4px 0 !important;
    }
    
    #reader__scan_region img,
    #reader__scan_region canvas {
        width: 100% !important;
        max-width: 100% !important;
    }
    
    .dark #reader__camera_selection {
        background: #374151 !important;
        color: #f3f4f6 !important;
        border-color: #4b5563 !important;
    }
    
    /* Mobile specific */
    @media (max-width: 640px) {
        #reader__scan_region {
            min-height: 280px !important;
        }
        
        #reader video {
            min-height: 250px !important;
        }
    }
`;

export default function AbsensiSaya({ auth, histories }) {
    const { errors, flash = {} } = usePage().props;
    const [scanResult, setScanResult] = useState(null);
    const [status, setStatus] = useState('idle');
    const [cameraPermission, setCameraPermission] = useState('checking');

    useEffect(() => {
        let scanner;
        
        // Cek permission kamera terlebih dahulu
        const checkCameraPermission = async () => {
            try {
                // Request camera permission
                await navigator.mediaDevices.getUserMedia({ video: true });
                setCameraPermission('granted');
                
                // Jika permission granted, langsung init scanner
                if (status === 'idle') {
                    initScanner();
                }
            } catch (error) {
                console.error('Camera permission error:', error);
                setCameraPermission('denied');
            }
        };

                const initScanner = () => {
            scanner = new Html5QrcodeScanner(
                "reader",
                { 
                    fps: 10, 
                    qrbox: function(viewfinderWidth, viewfinderHeight) {
                        // Responsive qrbox
                        let minEdge = Math.min(viewfinderWidth, viewfinderHeight);
                        let qrboxSize = Math.floor(minEdge * 0.8);
                        return {
                            width: qrboxSize,
                            height: qrboxSize
                        };
                    },
                    aspectRatio: 1.0,
                    rememberLastUsedCamera: true,
                    supportedScanTypes: [0, 1],
                    showTorchButtonIfSupported: true,
                    showZoomSliderIfSupported: true
                },
                false
            );
            
            scanner.render(onScanSuccess, onScanFailure);
        };

        function onScanSuccess(decodedText, decodedResult) {
            setScanResult(decodedText);
            setStatus('processing');

            if(scanner) {
                scanner.clear().catch(err => console.error(err));
            }

            router.post(route('guru.absensi-saya.store'), {
                qr_token: decodedText,
                lokasi: 'GPS-Dummy',
                device_info: navigator.userAgent
            }, {
                preserveScroll: true,
                onSuccess: (page) => {
                    if (page.props.flash?.error) {
                        setStatus('error');
                    } else {
                        setStatus('success');
                    }
                },
                onError: (errors) => {
                    setStatus('error');
                }
            });
        }

        function onScanFailure(error) {
            // Silent fail untuk scanning
        }

        // Check permission saat component mount
        if (status === 'idle') {
            checkCameraPermission();
        }

        return () => {
            if (scanner) {
                scanner.clear().catch(e => console.error(e));
            }
        };
    }, [status]);

    useEffect(() => {
        if (flash?.error && status === 'processing') {
            setStatus('error');
        }
    }, [flash, status]);

    const handleReset = () => {
        setScanResult(null);
        setStatus('idle');
        setCameraPermission('checking');
    };

    const requestCameraAgain = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ video: true });
            setCameraPermission('granted');
            setStatus('idle');
        } catch (error) {
            alert('Harap izinkan akses kamera pada browser Anda');
        }
    };

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-100">
                    Scan Kehadiran
                </h2>
            }
        >
            <Head title="Absensi Saya" />
            
            {/* Inject custom CSS untuk scanner */}
            <style>{scannerStyles}</style>
            
            <div className="py-4 sm:py-6 lg:py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

                        {/* SCANNER AREA */}
                        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-2 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
                                <QrCode className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
                                <h3 className="font-bold text-base sm:text-lg text-gray-800 dark:text-gray-100">
                                    Scan QR Code
                                </h3>
                            </div>

                            <div className="flex flex-col items-center justify-center min-h-[350px] sm:min-h-[400px]">
                                
                                {/* Checking Camera Permission */}
                                {cameraPermission === 'checking' && status === 'idle' && (
                                    <div className="text-center py-10">
                                        <Camera className="w-16 h-16 text-gray-400 dark:text-gray-500 animate-pulse mx-auto mb-4" />
                                        <p className="text-gray-600 dark:text-gray-400">Meminta akses kamera...</p>
                                    </div>
                                )}

                                {/* Camera Permission Denied */}
                                {cameraPermission === 'denied' && (
                                    <div className="text-center py-10 px-4">
                                        <Camera className="w-16 h-16 text-red-500 dark:text-red-400 mx-auto mb-4" />
                                        <h4 className="text-lg font-bold text-red-600 dark:text-red-400 mb-2">
                                            Akses Kamera Ditolak
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                            Aplikasi membutuhkan akses kamera untuk scan QR Code
                                        </p>
                                        <button 
                                            onClick={requestCameraAgain}
                                            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                                        >
                                            Izinkan Akses Kamera
                                        </button>
                                    </div>
                                )}

                                {/* Scanner Active */}
                                {status === 'idle' && cameraPermission === 'granted' && (
                                    <div className="w-full px-2 sm:px-0">
                                        {/* Container dengan background hitam untuk video terlihat */}
                                        <div className="bg-black rounded-xl p-2 sm:p-3 shadow-xl w-full">
                                            <div id="reader" className="w-full"></div>
                                        </div>
                                        <div className="mt-3 sm:mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                                            <p className="text-xs sm:text-sm text-indigo-800 dark:text-indigo-300 text-center font-medium">
                                                📱 Arahkan kamera ke QR Code di meja piket
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Processing */}
                                {status === 'processing' && (
                                    <div className="text-center py-10">
                                        <Loader2 className="w-16 h-16 text-indigo-600 dark:text-indigo-400 animate-spin mx-auto mb-4" />
                                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                            Memproses Data...
                                        </p>
                                    </div>
                                )}

                                {/* Success */}
                                {status === 'success' && !flash?.error && (
                                    <div className="text-center py-10 px-4">
                                        <div className="mb-4 relative">
                                            <CheckCircle className="w-20 h-20 text-green-500 dark:text-green-400 mx-auto" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-24 h-24 bg-green-500/20 dark:bg-green-400/20 rounded-full animate-ping"></div>
                                            </div>
                                        </div>
                                        <h4 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                                            Berhasil! ✓
                                        </h4>
                                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                                            {flash?.message || 'Data kehadiran tersimpan.'}
                                        </p>
                                        <button 
                                            onClick={handleReset} 
                                            className="inline-flex items-center gap-2 bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg"
                                        >
                                            <RefreshCw className="w-4 h-4" /> Scan Lagi
                                        </button>
                                    </div>
                                )}

                                {/* Error */}
                                {(status === 'error' || flash?.error) && (
                                    <div className="text-center py-10 px-4">
                                        <XCircle className="w-20 h-20 text-red-500 dark:text-red-400 mx-auto mb-4" />
                                        <h4 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-3">
                                            Gagal! ✗
                                        </h4>
                                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-6 text-sm text-red-800 dark:text-red-300 break-words max-w-md mx-auto">
                                            {flash?.error || errors?.qr_token || 'Terjadi kesalahan. Coba scan ulang.'}
                                        </div>
                                        <button 
                                            onClick={handleReset} 
                                            className="inline-flex items-center gap-2 bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg"
                                        >
                                            <RefreshCw className="w-4 h-4" /> Coba Lagi
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIWAYAT LIST */}
                        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
                                    <h3 className="font-bold text-base sm:text-lg text-gray-800 dark:text-gray-100">
                                        Riwayat Kehadiran
                                    </h3>
                                </div>
                                <span className="text-xs sm:text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-full">
                                    {histories.length} hari
                                </span>
                            </div>

                            <div className="space-y-3 max-h-[400px] sm:max-h-[500px] overflow-y-auto pr-1">
                                {histories.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Calendar className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-300 dark:text-gray-600" />
                                        <p className="text-gray-400 dark:text-gray-500 text-sm sm:text-base">
                                            Belum ada riwayat kehadiran
                                        </p>
                                        <p className="text-gray-400 dark:text-gray-600 text-xs sm:text-sm mt-1">
                                            Scan QR Code untuk memulai
                                        </p>
                                    </div>
                                ) : (
                                    histories.map((h) => (
                                        <div 
                                            key={h.id} 
                                            className="group bg-gray-50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:shadow-md"
                                        >
                                            <div className="flex justify-between items-start gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                                                        <span className="font-bold text-sm sm:text-base text-gray-800 dark:text-gray-100">
                                                            {h.tanggal}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                                                        <Clock className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                                                        <span className="text-green-700 dark:text-green-300 font-medium">
                                                            Masuk: {h.jam_masuk}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    {h.jam_pulang ? (
                                                        <span className="inline-flex items-center gap-1.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2.5 py-1.5 rounded-lg font-medium border border-green-200 dark:border-green-800">
                                                            <CheckCircle className="w-3 h-3" />
                                                            {h.jam_pulang}
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs px-2.5 py-1.5 rounded-lg font-medium border border-yellow-200 dark:border-yellow-800">
                                                            <Clock className="w-3 h-3" />
                                                            Belum pulang
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}