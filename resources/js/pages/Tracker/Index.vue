<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { watch } from 'vue';
import { useTimerStore } from '@/stores/timer';
import type { LiveSession } from '@/stores/timer';
import TimerPanel from '@/components/TimerPanel.vue';


const props = defineProps<{
    languages: Array<{ id: number; name: string; code: string }>;
    modalities: Array<{ id: number; name: string; slug: string }>;
    inputSources: Array<{ id: number; name: string; slug: string }>;
    sessions: Array<{
        id: number;
        started_at: string;
        ended_at: string | null;
        title: string | null;
        modality: { name: string };
        input_source: { name: string };
    }>;
    liveSession: LiveSession | null;
}>();

const timer = useTimerStore();
timer.hydrate(props.liveSession);
watch(() => props.liveSession, (s) => timer.hydrate(s));

</script>

<template>

    <Head title="Tracker" />
    <div class="p-6 space-y-6">
        <h1 class="text-2xl font-semibold">CI Tracker</h1>

        <TimerPanel :languages="languages" :modalities="modalities" :input-sources="inputSources" />

        <div class="rounded-lg border p-4">
            <h2 class="font-medium mb-2">Reference data check</h2>
            <p>Languages: {{languages.map(l => l.name).join(', ')}}</p>
            <p>Modalities: {{modalities.map(m => m.name).join(', ')}}</p>
            <p>Sources: {{inputSources.map(s => s.name).join(', ')}}</p>
        </div>

        <div class="rounded-lg border p-4">
            <h2 class="font-medium mb-2">Recent sessions</h2>
            <p v-if="sessions.length === 0" class="text-muted-foreground">
                No sessions yet.
            </p>
        </div>
    </div>
</template>