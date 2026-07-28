<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { ref, computed, watch } from 'vue';
import TagInput from '@/components/TagInput.vue';
import { Button } from '@/components/ui/button';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

interface EditableSession {
    id: number;
    language_id: number;
    modality_id: number;
    input_source_id: number;
    started_at: string;
    ended_at: string | null;
    title: string | null;
    notes: string | null;
    tag_ids: number[];
}

const props = defineProps<{
    languages: Array<{ id: number; name: string }>;
    modalities: Array<{ id: number; name: string }>;
    inputSources: Array<{ id: number; name: string }>;
    tags: Array<{ id: number; name: string }>;
    session?: EditableSession | null;   // present = edit mode, absent = create mode
}>();

const emit = defineEmits<{ close: [] }>();

const isEditMode = computed(() => !!props.session);
const open = ref(isEditMode.value); // edit dialogs open immediately when triggered externally

const languageId = ref<string>('');
const modalityId = ref<string>('');
const inputSourceId = ref<string>('');
const startedAt = ref<string>('');
const endedAt = ref<string>('');
const title = ref<string>('');
const notes = ref<string>('');
const errors = ref<Record<string, string>>({});

const selectedTagIds = ref<number[]>([]);
const localTags = ref<Array<{ id: number; name: string }>>([...props.tags]);

// Pre-fill from the session prop, converting DB datetime strings to
// the "YYYY-MM-DDTHH:mm" shape datetime-local inputs expect.
function toLocalInput(value: string | null): string {
    if (!value) {
return '';
}

    return value.slice(0, 16).replace(' ', 'T');
}

function hydrateFromSession() {
    if (!props.session) {
return;
}

    languageId.value = String(props.session.language_id);
    modalityId.value = String(props.session.modality_id);
    inputSourceId.value = String(props.session.input_source_id);
    startedAt.value = toLocalInput(props.session.started_at);
    endedAt.value = toLocalInput(props.session.ended_at);
    title.value = props.session.title ?? '';
    notes.value = props.session.notes ?? '';
    selectedTagIds.value = props.session.tag_ids ?? [];
}

watch(() => props.session, () => {
    hydrateFromSession();
    open.value = !!props.session;
}, { immediate: true });

watch(() => props.tags, (newTags) => {
    localTags.value = [...newTags];
});

const canSubmit = computed(() =>
    languageId.value !== '' && modalityId.value !== '' && inputSourceId.value !== '' &&
    startedAt.value !== '' && endedAt.value !== ''
);

function submit() {
    const payload = {
        language_id: Number(languageId.value),
        modality_id: Number(modalityId.value),
        input_source_id: Number(inputSourceId.value),
        started_at: startedAt.value,
        ended_at: endedAt.value,
        title: title.value || undefined,
        notes: notes.value || undefined,
        tag_ids: selectedTagIds.value,
    };
    const options = {
        preserveScroll: true,
        onSuccess: () => {
 open.value = false; resetForm(); emit('close'); 
},
        onError: (e: Record<string, string>) => {
 errors.value = e; 
},
    };

    if (isEditMode.value && props.session) {
        router.patch(`/tracker/${props.session.id}`, payload, options);
    } else {
        router.post('/tracker/manual', payload, options);
    }
}

function resetForm() {
    if (!isEditMode.value) {
        languageId.value = props.languages.length === 1 ? String(props.languages[0].id) : '';
        modalityId.value = '';
        inputSourceId.value = '';
        startedAt.value = '';
        endedAt.value = '';
        title.value = '';
        notes.value = '';
    }

    selectedTagIds.value = [];
    errors.value = {};
}

function onOpenChange(val: boolean) {
    open.value = val;

    if (!val) {
emit('close');
}
}

async function handleNewTag(name: string) {
    const response = await fetch('/settings/tags/find-or-create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '',
        },
        body: JSON.stringify({ name }),
    });
    const tag = await response.json();

    if (!localTags.value.some((t) => t.id === tag.id)) {
        localTags.value.push(tag);
    }

    selectedTagIds.value = [...selectedTagIds.value, tag.id];
}
</script>

<template>
    <Dialog :open="open" @update:open="onOpenChange">
        <DialogTrigger v-if="!isEditMode" as-child>
            <Button variant="outline">Log a past session</Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>{{ isEditMode ? 'Edit session' : 'Log a past session' }}</DialogTitle>
                <DialogDescription>
                    {{ isEditMode ? 'Update the details of this session.' : 'Record a session you completed earlier.' }}
                </DialogDescription>
            </DialogHeader>

            <div class="space-y-4">
                <div class="grid gap-4 sm:grid-cols-3">
                    <div class="space-y-2">
                        <Label>Modality</Label>
                        <Select v-model="modalityId">
                            <SelectTrigger>
                                <SelectValue placeholder="Select..." />
                            </SelectTrigger>
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
                            <SelectTrigger>
                                <SelectValue placeholder="Select..." />
                            </SelectTrigger>
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
                            <SelectTrigger>
                                <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="l in languages" :key="l.id" :value="String(l.id)">
                                    {{ l.name }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div class="grid gap-4 sm:grid-cols-2">
                    <div class="space-y-2">
                        <Label>Start</Label>
                        <Input v-model="startedAt" type="datetime-local" />
                    </div>
                    <div class="space-y-2">
                        <Label>End</Label>
                        <Input v-model="endedAt" type="datetime-local" />
                    </div>
                </div>
                <p v-if="errors.ended_at" class="text-sm text-destructive">{{ errors.ended_at }}</p>

                <div class="space-y-2">
                    <Label>Title <span class="text-muted-foreground">(optional)</span></Label>
                    <Input v-model="title" />
                </div>

                <div class="space-y-2">
                    <Label>Notes <span class="text-muted-foreground">(optional)</span></Label>
                    <Input v-model="notes" />
                </div>
                <div class="space-y-2">
                    <Label>Tags</Label>
                    <TagInput v-model="selectedTagIds" :tags="localTags" @new-tag="handleNewTag" />
                </div>
            </div>

            <DialogFooter>
                <Button :disabled="!canSubmit" @click="submit">
                    {{ isEditMode ? 'Save changes' : 'Save session' }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>