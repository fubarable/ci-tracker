<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { login } from '@/routes';
</script>

<template>

    <Head title="Welcome">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link
            href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600&display=swap"
            rel="stylesheet" />
    </Head>

    <div class="relative flex min-h-screen flex-col overflow-hidden bg-[#0B0E14] text-[#ECE9E3]">
        <!-- Mobile-only ambient background -->
        <img src="/images/julia-welcome-bg.png" alt=""
            class="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-15 lg:hidden" />

        <header class="relative z-10 flex items-center justify-between px-6 py-6 lg:px-12">
            <span class="font-mono text-xs tracking-[0.25em] text-[#8B93A6]">CI TRACKER</span>
            <Link v-if="$page.props.auth.user" href="/tracker"
                class="rounded-md border border-[#2A2F3D] px-5 py-2 text-sm text-[#ECE9E3] transition hover:border-[#8B5CF6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0E14]">
                Go to Tracker
            </Link>
            <Link v-else :href="login()"
                class="rounded-md border border-[#2A2F3D] px-5 py-2 text-sm text-[#ECE9E3] transition hover:border-[#8B5CF6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0E14]">
                Log in
            </Link>
        </header>

        <main class="relative z-10 flex flex-1 flex-col lg:flex-row">
            <div
                class="flex flex-1 flex-col justify-center px-6 py-16 opacity-100 transition-opacity duration-700 lg:max-w-xl lg:px-16 lg:py-0 starting:opacity-0">
                <p class="mb-4 font-mono text-xs tracking-[0.3em] text-[#8B93A6] uppercase">
                    Comprehensible Input Tracker
                </p>
                <h1 class="mb-5 text-4xl leading-[1.1] font-medium lg:text-5xl" style="font-family: 'Fraunces', serif">
                    Small sessions.<br />
                    Real fluency.
                </h1>
                <p class="mb-9 max-w-md text-base leading-relaxed text-[#8B93A6]">
                    Track listening, reading, and speaking practice — in any language you're learning.
                </p>
                <div>
                    <Link v-if="$page.props.auth.user" href="/tracker"
                        class="inline-flex items-center rounded-md bg-[#8B5CF6] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#7C4DEB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0E14]">
                        Go to Tracker
                    </Link>
                    <Link v-else :href="login()"
                        class="inline-flex items-center rounded-md bg-[#8B5CF6] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#7C4DEB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0E14]">
                        Log in
                    </Link>
                </div>
            </div>

            <!-- Fractal panel, desktop only -->
            <div class="relative hidden flex-1 lg:block">
                <img src="/images/julia-welcome-bg.png" alt=""
                    class="absolute inset-0 h-full w-full object-cover opacity-55" />
                <div class="absolute inset-0 bg-gradient-to-r from-[#0B0E14] via-[#0B0E14]/20 to-transparent"></div>
                <div class="absolute inset-0 bg-[#0B0E14]/25"></div>
            </div>
        </main>
    </div>
</template>
