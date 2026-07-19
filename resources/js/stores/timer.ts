import { defineStore } from 'pinia';
import { router } from '@inertiajs/vue3';
import { ref, computed } from 'vue';

export interface LiveSession {
    id: number;
    started_at: string;
    ended_at: string | null;
    paused_at: string | null;
    paused_duration_seconds: number;
    title: string | null;
    modality: { id: number; name: string };
    input_source: { id: number; name: string };
}

export const useTimerStore = defineStore('timer', () => {
    // --- state ---
    const session = ref<LiveSession | null>(null);
    const now = ref<number>(Date.now());
    let ticker: number | null = null;

    // --- hydration (called by the page whenever props arrive) ---
    function hydrate(liveSession: LiveSession | null) {
        session.value = liveSession;
        if (liveSession && ticker === null) {
            ticker = window.setInterval(() => (now.value = Date.now()), 1000);
        }
        if (!liveSession && ticker !== null) {
            window.clearInterval(ticker);
            ticker = null;
        }
    }

    // --- derived state ---
    const status = computed<'idle' | 'running' | 'paused'>(() => {
        if (!session.value) return 'idle';
        return session.value.paused_at ? 'paused' : 'running';
    });

    const elapsedSeconds = computed<number>(() => {
        if (!session.value) return 0;
        const startedMs = Date.parse(session.value.started_at);
        const pauseBase = session.value.paused_duration_seconds;
        // If currently paused, elapsed freezes at the pause moment
        const referenceMs = session.value.paused_at
            ? Date.parse(session.value.paused_at)
            : now.value;
        return Math.max(0, Math.floor((referenceMs - startedMs) / 1000) - pauseBase);
    });

    // --- actions: request transitions; server decides ---
    function start(payload: {
        language_id: number;
        modality_id: number;
        input_source_id: number;
        title?: string;
    }) {
        router.post('/tracker/start', payload, { preserveScroll: true });
    }

    function pause() {
        router.post('/tracker/pause', {}, { preserveScroll: true });
    }

    function resume() {
        router.post('/tracker/resume', {}, { preserveScroll: true });
    }

    function stop() {
        router.post('/tracker/stop', {}, { preserveScroll: true });
    }

    return { session, status, elapsedSeconds, hydrate, start, pause, resume, stop };
});