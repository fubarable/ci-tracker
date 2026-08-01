<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { home } from '@/routes';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link
            href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600&display=swap"
            rel="stylesheet"
        />
    </Head>
    <div class="dark flex min-h-svh flex-col items-center justify-center gap-6 bg-[#0B0E14] p-6 text-[#ECE9E3] md:p-10">
        <div class="w-full max-w-sm">
            <div class="flex flex-col gap-8">
                <div class="flex flex-col items-center gap-4">
                    <Link :href="home()" class="flex flex-col items-center gap-3">
                        <img
                            src="/images/julia-mark.png"
                            alt=""
                            class="h-14 w-14 rounded-full object-cover ring-1 ring-[#2A2F3D]"
                        />
                        <span class="sr-only">{{ title }}</span>
                    </Link>
                    <div class="space-y-2 text-center">
                        <h1 class="text-xl font-medium" style="font-family: 'Fraunces', serif">
                            {{ title }}
                        </h1>
                        <p class="text-center text-sm text-[#8B93A6]">
                            {{ description }}
                        </p>
                    </div>
                </div>
                <slot />
            </div>
        </div>
    </div>
</template>