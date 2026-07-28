<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface TagRow {
    id: number;
    name: string;
    ci_sessions_count: number;
}

const props = defineProps<{ tags: TagRow[] }>();

const newName = ref('');

function addTag() {
    if (!newName.value.trim()) {
        return;
    }

    router.post(
        '/settings/tags',
        { name: newName.value },
        {
            preserveScroll: true,
            onSuccess: () => {
                newName.value = '';
            },
        },
    );
}

function remove(tag: TagRow) {
    const msg =
        tag.ci_sessions_count > 0
            ? `Delete "${tag.name}"? It will be removed from ${tag.ci_sessions_count} session(s).`
            : `Delete "${tag.name}"?`;

    if (confirm(msg)) {
        router.delete(`/settings/tags/${tag.id}`, { preserveScroll: true });
    }
}
</script>

<template>
    <div class="max-w-2xl space-y-6 p-6">
        <h1 class="text-2xl font-semibold">Tags</h1>

        <Card>
            <CardHeader>
                <CardTitle>Add a tag</CardTitle>
            </CardHeader>
            <CardContent class="flex gap-2">
                <Input
                    v-model="newName"
                    placeholder="e.g. subtitles-on"
                    @keyup.enter="addTag"
                />
                <Button @click="addTag">Add</Button>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>All tags</CardTitle>
            </CardHeader>
            <CardContent>
                <ul class="divide-y">
                    <li
                        v-for="t in props.tags"
                        :key="t.id"
                        class="flex items-center justify-between py-2 text-sm"
                    >
                        <span>{{ t.name }}</span>
                        <div class="flex items-center gap-3">
                            <span class="text-muted-foreground"
                                >{{ t.ci_sessions_count }} session(s)</span
                            >
                            <Button
                                variant="link"
                                size="sm"
                                class="text-destructive"
                                @click="remove(t)"
                            >
                                Delete
                            </Button>
                        </div>
                    </li>
                </ul>
                <p
                    v-if="props.tags.length === 0"
                    class="text-sm text-muted-foreground"
                >
                    No tags yet.
                </p>
            </CardContent>
        </Card>
    </div>
</template>
