<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { ref, watch } from 'vue';
import { useTimerStore } from '@/stores/timer';
import type { LiveSession } from '@/stores/timer';
import { Button } from '@/components/ui/button';
import TimerPanel from '@/components/TimerPanel.vue';
import SessionFormDialog from '@/components/SessionFormDialog.vue';
import { router } from '@inertiajs/vue3';
import { Link } from '@inertiajs/vue3';

const editingSession = ref<null | typeof props.sessions[number]>(null);

const props = defineProps<{
    languages: Array<{ id: number; name: string; code: string }>;
    modalities: Array<{ id: number; name: string; slug: string }>;
    inputSources: Array<{ id: number; name: string; slug: string }>;
    sessions: Array<{
        id: number;
        language_id: number;
        modality_id: number;
        input_source_id: number;
        started_at: string;
        ended_at: string | null;
        paused_duration_seconds: number;
        title: string | null;
        notes: string | null;
        modality: { name: string };
        input_source: { name: string };
        language: { name: string; code: string };
    }>;
    liveSession: LiveSession | null;
    todaysTotalSeconds: number;
}>();

function deleteSession(id: number) {
    if (confirm('Delete this session? This cannot be undone.')) {
        router.delete(`/tracker/${id}`, { preserveScroll: true });
    }
}

function formatSessionDate(startedAt: string): string {
    return new Date(startedAt).toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });
}

function formatDuration(s: { started_at: string; ended_at: string | null; paused_duration_seconds?: number }): string {
    if (!s.ended_at) return 'in progress';
    const totalSeconds = Math.max(
        0,
        Math.floor((Date.parse(s.ended_at) - Date.parse(s.started_at)) / 1000) -
        (s.paused_duration_seconds ?? 0)
    );
    const m = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    return `${m}m ${sec}s`;
}

const timer = useTimerStore();
timer.hydrate(props.liveSession);
watch(() => props.liveSession, (s) => timer.hydrate(s));

const showReferenceCheck = ref(false);

</script>

<template>

    <Head title="Tracker" />
    <div class="p-6 space-y-6">
        <h1 class="text-2xl font-semibold">CI Tracker</h1>

        <!-- TODO: This needs to go in a true navigation section of app -->
        <Link href="/tracker/history" class="text-sm underline">View full history →</Link>

        <TimerPanel :languages="languages" :modalities="modalities" :input-sources="inputSources"
            :todays-total-seconds="todaysTotalSeconds" />

        <div v-if="showReferenceCheck">
            <div class="rounded-lg border p-4">
                <h2 class="font-medium mb-2">Reference data check</h2>
                <p>Languages: {{languages.map(l => l.name).join(', ')}}</p>
                <p>Modalities: {{modalities.map(m => m.name).join(', ')}}</p>
                <p>Sources: {{inputSources.map(s => s.name).join(', ')}}</p>
            </div>
        </div>

        <div class="rounded-lg border p-4">
            <h2 class="font-medium mb-2">Recent sessions</h2>
            <p v-if="sessions.length === 0" class="text-muted-foreground">
                No sessions yet.
            </p>
            <ul v-else class="divide-y">
                <li v-for="s in sessions" :key="s.id"
                    class="py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
                    <div>
                        <span class="font-medium">{{ s.modality.name }}</span>
                        <span class="text-muted-foreground"> — {{ s.input_source.name }}</span>
                        <span v-if="languages.length > 1" class="text-muted-foreground"> ({{ s.language.name }})</span>
                        <span v-if="s.title" class="text-muted-foreground"> · {{ s.title }}</span>
                    </div>
                    <div class="flex items-center justify-between sm:justify-end gap-3">
                        <span class="text-muted-foreground">
                            {{ formatSessionDate(s.started_at) }} · {{ formatDuration(s) }}
                        </span>
                        <div class="flex gap-1">
                            <Button variant="link" size="sm" @click="editingSession = s">Edit</Button>
                            <Button variant="link" size="sm" class="text-destructive"
                                @click="deleteSession(s.id)">Delete</Button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <SessionFormDialog :languages="languages" :modalities="modalities" :input-sources="inputSources"
            :session="editingSession" @close="editingSession = null" />
    </div>
</template>