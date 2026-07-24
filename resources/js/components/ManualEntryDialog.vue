<script setup lang="ts">
import { ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from '@/components/ui/dialog';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

const props = defineProps<{
    languages: Array<{ id: number; name: string }>;
    modalities: Array<{ id: number; name: string }>;
    inputSources: Array<{ id: number; name: string }>;
}>();

const open = ref(false);

const languageId = ref<string>(props.languages.length === 1 ? String(props.languages[0].id) : '');
const modalityId = ref<string>('');
const inputSourceId = ref<string>('');
const startedAt = ref<string>('');
const endedAt = ref<string>('');
const title = ref<string>('');
const notes = ref<string>('');
const errors = ref<Record<string, string>>({});

const canSubmit = computed(() =>
    languageId.value !== '' && modalityId.value !== '' && inputSourceId.value !== '' &&
    startedAt.value !== '' && endedAt.value !== ''
);

function submit() {
    router.post('/tracker/manual', {
        language_id: Number(languageId.value),
        modality_id: Number(modalityId.value),
        input_source_id: Number(inputSourceId.value),
        started_at: startedAt.value,
        ended_at: endedAt.value,
        title: title.value || undefined,
        notes: notes.value || undefined,
    }, {
        preserveScroll: true,
        onSuccess: () => {
            open.value = false;
            resetForm();
        },
        onError: (e) => { errors.value = e; },
    });
}

function resetForm() {
    modalityId.value = '';
    inputSourceId.value = '';
    startedAt.value = '';
    endedAt.value = '';
    title.value = '';
    notes.value = '';
    errors.value = {};
}
</script>

<template>
    <Dialog v-model:open="open">
        <DialogTrigger as-child>
            <Button variant="outline">Log a past session</Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Log a past session</DialogTitle>
            </DialogHeader>

            <div class="space-y-4">
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
            </div>

            <DialogFooter>
                <Button :disabled="!canSubmit" @click="submit">Save session</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>