import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa'; // <--- Import PWA

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
        // Konfigurasi PWA
        VitePWA({
            registerType: 'autoUpdate',
            outDir: 'public/build', // Output ke folder build laravel
            scope: '/',
            base: '/',
            // Konfigurasi Manifest (Pengganti file manifest.json manual)
            manifest: {
                name: 'Jurnal Guru Smart School',
                short_name: 'JurnalGuru',
                description: 'Aplikasi Jurnal Mengajar dan Absensi Guru',
                theme_color: '#4F46E5', // Warna tema aplikasi (sesuaikan warna navbar)
                background_color: '#ffffff',
                display: 'standalone', // Agar tampil seperti native app (tanpa address bar)
                orientation: 'portrait',
                icons: [
                    {
                        src: '/images/icons/icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'any maskable'
                    },
                    {
                        src: '/images/icons/icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            },
            // Konfigurasi Offline Support (Workbox)
            workbox: {
                // Pola file yang akan dicache agar bisa dibuka offline
                globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],
                // URL yang dikecualikan dari cache (misal API request)
                navigateFallback: null,
                cleanupOutdatedCaches: true,
                runtimeCaching: [
                    {
                        // Cache Google Fonts
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },
                    {
                        // Cache Gambar dari Storage Laravel
                        urlPattern: /^\/storage\/.*/i,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'storage-images',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
                            }
                        }
                    }
                ]
            }
        })
    ],
});
