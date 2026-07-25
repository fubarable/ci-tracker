<script setup lang="ts">
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TagRow {
    id: number;
    name: string;
    ci_sessions_count: number;
}

const props = defineProps<{ tags: TagRow[] }>();

const newName = ref('');

function addTag() {
    if (!newName.value.trim()) return;
    router.post('/settings/tags', { name: newName.value }, {
        preserveScroll: true,
        onSuccess: () => { newName.value = ''; },
    });
}

function remove(tag: TagRow) {
    const msg = tag.ci_sessions_count > 0
        ? `Delete "${tag.name}"? It will be removed from ${tag.ci_sessions_count} session(s).`
        : `Delete "${tag.name}"?`;
    if (confirm(msg)) {
        router.delete(`/settings/tags/${tag.id}`, { preserveScroll: true });
    }
}
</script>

<template>
    <div class="p-6 space-y-6 max-w-2xl">
        <h1 class="text-2xl font-semibold">Tags</h1>

        <Card>
            <CardHeader>
                <CardTitle>Add a tag</CardTitle>
            </CardHeader>
            <CardContent class="flex gap-2">
                <Input v-model="newName" placeholder="e.g. subtitles-on" @keyup.enter="addTag" />
                <Button @click="addTag">Add</Button>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>All tags</CardTitle>
            </CardHeader>
            <CardContent>
                <ul class="divide-y">
                    <li v-for="t in props.tags" :key="t.id" class="py-2 flex items-center justify-between text-sm">
                        <span>{{ t.name }}</span>
                        <div class="flex items-center gap-3">
                            <span class="text-muted-foreground">{{ t.ci_sessions_count }} session(s)</span>
                            <Button variant="link" size="sm" class="text-destructive" @click="remove(t)">
                                Delete
                            </Button>
                        </div>
                    </li>
                </ul>
                <p v-if="props.tags.length === 0" class="text-muted-foreground text-sm">No tags yet.</p>
            </CardContent>
        </Card>
    </div>
</template>