import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import { networkInterfaces } from 'os';
import { defineConfig } from 'vite';

// function lanAddress(): string {
//     for (const iface of Object.values(networkInterfaces()).flat()) {
//         if (iface && iface.family === 'IPv4' && !iface.internal) return iface.address;
//     }
//     return 'localhost';
// }

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.ts'],
            refresh: true,
            fonts: [
                bunny('Instrument Sans', {
                    weights: [400, 500, 600],
                }),
            ],
        }),
        inertia({ ssr: false }),
        tailwindcss(),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        wayfinder({
            formVariants: true,
        }),
    ],
    server: {
        // host: lanAddress(),
        // host: 'localhost',
        // host: '192.168.4.27',
        // host: '0.0.0.0',
        // origin: 'http://192.168.4.27:5173',
        host: process.env.VITE_LAN === '1' ? '192.168.4.27' : 'localhost',
    },
});
