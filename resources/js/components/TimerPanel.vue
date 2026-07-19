<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTimerStore } from '@/stores/timer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

const props = defineProps<{
    languages: Array<{ id: number; name: string }>;
    modalities: Array<{ id: number; name: string }>;
    inputSources: Array<{ id: number; name: string }>;
}>();

const timer = useTimerStore();

// --- idle-state form selections (browser-only state; not Pinia-worthy) ---
const languageId = ref<string>(props.languages.length === 1 ? String(props.languages[0].id) : '');
const modalityId = ref<string>('');
const inputSourceId = ref<string>('');
const title = ref<string>('');

const canStart = computed(() =>
    languageId.value !== '' && modalityId.value !== '' && inputSourceId.value !== ''
);

function onStart() {
    timer.start({
        language_id: Number(languageId.value),
        modality_id: Number(modalityId.value),
        input_source_id: Number(inputSourceId.value),
        title: title.value || undefined,
    });
    title.value = '';
}

// --- display helpers ---
const elapsedDisplay = computed(() => {
    const total = timer.elapsedSeconds;
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
});

const statusColor = computed(() => ({
    idle: 'bg-muted text-muted-foreground',
    running: 'bg-green-600 text-white',
    paused: 'bg-amber-500 text-white',
}[timer.status]));
</script>

<template>
    <Card>
        <CardHeader class="flex flex-row items-center justify-between">
            <CardTitle>Session timer</CardTitle>
            <Badge :class="statusColor">{{ timer.status }}</Badge>
        </CardHeader>

        <CardContent class="space-y-4">
            <!-- IDLE: selection form -->
            <template v-if="timer.status === 'idle'">
                <div class="grid gap-4 sm:grid-cols-3">
                    <div class="space-y-2">
                        <Label>Modality</Label>
                        <Select v-model="modalityId">
                            <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="m in modalities" :key="m.id" :value="String(m.id)">
                                    {{ m.name }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="space-y-2">
                        <Label>Source</Label>
                        <Select v-model="inputSourceId">
                            <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="s in inputSources" :key="s.id" :value="String(s.id)">
                                    {{ s.name }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="space-y-2">
                        <Label>Language</Label>
                        <Select v-model="languageId">
                            <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="l in languages" :key="l.id" :value="String(l.id)">
                                    {{ l.name }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div class="space-y-2">
                    <Label>Title <span class="text-muted-foreground">(optional)</span></Label>
                    <Input v-model="title" placeholder='e.g. "DS Intermediate #312"' />
                </div>

                <Button :disabled="!canStart" class="w-full sm:w-auto" @click="onStart">
                    Start
                </Button>
            </template>

            <!-- RUNNING / PAUSED: clock and controls -->
            <template v-else>
                <div class="text-center space-y-1">
                    <div class="text-5xl font-mono tabular-nums">{{ elapsedDisplay }}</div>
                    <div class="text-sm text-muted-foreground">
                        {{ timer.session?.modality.name }} — {{ timer.session?.input_source.name }}
                        <template v-if="timer.session?.title"> · {{ timer.session.title }}</template>
                    </div>
                </div>

                <div class="flex justify-center gap-3">
                    <Button v-if="timer.status === 'running'" variant="outline" @click="timer.pause()">
                        Pause
                    </Button>
                    <Button v-else variant="outline" @click="timer.resume()">
                        Resume
                    </Button>
                    <Button variant="destructive" @click="timer.stop()">
                        Stop
                    </Button>
                </div>
            </template>
        </CardContent>
    </Card>
</template>