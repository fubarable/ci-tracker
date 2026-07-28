<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { ref } from 'vue';
import SessionFormDialog from '@/components/SessionFormDialog.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface SessionRow {
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
    // Tags associated with the session added
    tags: Array<{ id: number; name: string }>;
    tag_ids: number[];
}

interface PaginatedSessions {
    data: SessionRow[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
    from: number | null;
    to: number | null;
    total: number;
}

const props = defineProps<{
    languages: Array<{ id: number; name: string }>;
    modalities: Array<{ id: number; name: string }>;
    inputSources: Array<{ id: number; name: string }>;
    tags: Array<{ id: number; name: string }>;
    sessions: PaginatedSessions;
    filters: {
        language_id?: string;
        modality_id?: string;
        input_source_id?: string;
        date_from?: string;
        date_to?: string;
    };
}>();

const languageId = ref(props.filters.language_id ?? 'all');
const modalityId = ref(props.filters.modality_id ?? 'all');
const inputSourceId = ref(props.filters.input_source_id ?? 'all');
const dateFrom = ref(props.filters.date_from ?? '');
const dateTo = ref(props.filters.date_to ?? '');

function applyFilters() {
    router.get(
        '/tracker/history',
        {
            language_id:
                languageId.value !== 'all' ? languageId.value : undefined,
            modality_id:
                modalityId.value !== 'all' ? modalityId.value : undefined,
            input_source_id:
                inputSourceId.value !== 'all' ? inputSourceId.value : undefined,
            date_from: dateFrom.value || undefined,
            date_to: dateTo.value || undefined,
        },
        { preserveState: true, replace: true },
    );
}

function clearFilters() {
    languageId.value = 'all';
    modalityId.value = 'all';
    inputSourceId.value = 'all';
    dateFrom.value = '';
    dateTo.value = '';
    applyFilters();
}

function formatSessionDate(startedAt: string): string {
    return new Date(startedAt).toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });
}

function formatDuration(s: SessionRow): string {
    if (!s.ended_at) {
        return 'in progress';
    }

    const totalSeconds = Math.max(
        0,
        Math.floor((Date.parse(s.ended_at) - Date.parse(s.started_at)) / 1000) -
            s.paused_duration_seconds,
    );
    const m = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;

    return `${m}m ${sec}s`;
}

const editingSession = ref<SessionRow | null>(null);

function deleteSession(id: number) {
    if (confirm('Delete this session? This cannot be undone.')) {
        router.delete(`/tracker/${id}`, { preserveScroll: true });
    }
}

function downloadCsv() {
    const params = new URLSearchParams();

    if (languageId.value !== 'all') {
        params.set('language_id', languageId.value);
    }

    if (modalityId.value !== 'all') {
        params.set('modality_id', modalityId.value);
    }

    if (inputSourceId.value !== 'all') {
        params.set('input_source_id', inputSourceId.value);
    }

    if (dateFrom.value) {
        params.set('date_from', dateFrom.value);
    }

    if (dateTo.value) {
        params.set('date_to', dateTo.value);
    }

    window.location.href = `/tracker/history/export?${params.toString()}`;
}

function decodeLabel(label: string): string {
    return label.replace(/&laquo;/g, '«').replace(/&raquo;/g, '»');
}
</script>

<template>
    <div class="space-y-6 p-6">
        <div class="flex items-center justify-between">
            <h1 class="text-2xl font-semibold">Session History</h1>
            <SessionFormDialog
                :languages="languages"
                :modalities="modalities"
                :input-sources="inputSources"
                :tags="tags"
            />
        </div>

        <div class="space-y-4 rounded-lg border p-4">
            <div class="grid grid-cols-3 gap-3">
                <div class="space-y-1">
                    <Label class="text-xs">Language</Label>
                    <Select
                        v-model="languageId"
                        @update:model-value="applyFilters"
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem
                                v-for="l in languages"
                                :key="l.id"
                                :value="String(l.id)"
                                >{{ l.name }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div class="space-y-1">
                    <Label class="text-xs">Modality</Label>
                    <Select
                        v-model="modalityId"
                        @update:model-value="applyFilters"
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem
                                v-for="m in modalities"
                                :key="m.id"
                                :value="String(m.id)"
                                >{{ m.name }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div class="space-y-1">
                    <Label class="text-xs">Source</Label>
                    <Select
                        v-model="inputSourceId"
                        @update:model-value="applyFilters"
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem
                                v-for="s in inputSources"
                                :key="s.id"
                                :value="String(s.id)"
                                >{{ s.name }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1">
                    <Label class="text-xs">From</Label>
                    <Input
                        v-model="dateFrom"
                        type="date"
                        @change="applyFilters"
                    />
                </div>
                <div class="space-y-1">
                    <Label class="text-xs">To</Label>
                    <Input
                        v-model="dateTo"
                        type="date"
                        @change="applyFilters"
                    />
                </div>
            </div>

            <div class="flex items-center justify-between">
                <Button variant="outline" size="sm" @click="clearFilters"
                    >Clear filters</Button
                >
                <Button variant="outline" size="sm" @click="downloadCsv"
                    >Export CSV</Button
                >
            </div>
        </div>

        <div class="rounded-lg border p-4">
            <p class="mb-2 text-sm text-muted-foreground">
                Showing {{ sessions.from ?? 0 }}–{{ sessions.to ?? 0 }} of
                {{ sessions.total }}
            </p>

            <ul class="divide-y">
                <li
                    v-for="s in sessions.data"
                    :key="s.id"
                    class="flex flex-col gap-2 py-2 text-sm sm:flex-row sm:items-center sm:justify-between"
                >
                    <div>
                        <span class="font-medium">{{ s.modality.name }}</span>
                        <span class="text-muted-foreground">
                            — {{ s.input_source.name }}</span
                        >
                        <span
                            v-if="languages.length > 1"
                            class="text-muted-foreground"
                        >
                            ({{ s.language.name }})</span
                        >
                        <span v-if="s.title" class="text-muted-foreground">
                            · {{ s.title }}</span
                        >
                    </div>
                    <div
                        class="flex items-center justify-between gap-3 sm:justify-end"
                    >
                        <span class="text-muted-foreground">
                            {{ formatSessionDate(s.started_at) }} ·
                            {{ formatDuration(s) }}
                        </span>
                        <div class="flex gap-1">
                            <Button
                                variant="link"
                                size="sm"
                                @click="editingSession = s"
                                >Edit</Button
                            >
                            <Button
                                variant="link"
                                size="sm"
                                class="text-destructive"
                                @click="deleteSession(s.id)"
                                >Delete</Button
                            >
                        </div>
                    </div>
                </li>
            </ul>

            <div class="mt-4 flex flex-wrap gap-1">
                <Button
                    v-for="link in sessions.links"
                    :key="link.label"
                    variant="outline"
                    size="sm"
                    :disabled="!link.url"
                    :class="{ 'bg-accent': link.active }"
                    @click="
                        link.url &&
                        router.visit(link.url, { preserveState: true })
                    "
                >
                    {{ decodeLabel(link.label) }}
                </Button>
            </div>
        </div>
    </div>
</template>
