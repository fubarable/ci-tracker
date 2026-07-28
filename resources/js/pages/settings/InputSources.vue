<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { ref } from 'vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Source {
    id: number;
    name: string;
    is_system: boolean;
    is_active: boolean;
}

const props = defineProps<{ sources: Source[] }>();

const newName = ref('');
const errors = ref<Record<string, string>>({});

function addSource() {
    if (!newName.value.trim()) {
        return;
    }

    router.post(
        '/settings/input-sources',
        { name: newName.value },
        {
            preserveScroll: true,
            onSuccess: () => {
                newName.value = '';
                errors.value = {};
            },
            onError: (e) => {
                errors.value = e;
            },
        },
    );
}

function toggle(source: Source) {
    router.patch(
        `/settings/input-sources/${source.id}/toggle`,
        {},
        { preserveScroll: true },
    );
}

function remove(source: Source) {
    if (confirm(`Delete "${source.name}"? This cannot be undone.`)) {
        router.delete(`/settings/input-sources/${source.id}`, {
            preserveScroll: true,
        });
    }
}
</script>

<template>
    <div class="max-w-2xl space-y-6 p-6">
        <h1 class="text-2xl font-semibold">Input Sources</h1>

        <Card>
            <CardHeader><CardTitle>Add a custom source</CardTitle></CardHeader>
            <CardContent class="flex gap-2">
                <Input
                    v-model="newName"
                    placeholder="e.g. My Podcast"
                    @keyup.enter="addSource"
                />
                <Button @click="addSource">Add</Button>
            </CardContent>
        </Card>
        <p v-if="errors.name" class="text-sm text-destructive">
            {{ errors.name }}
        </p>
        <p v-if="errors.source" class="text-sm text-destructive">
            {{ errors.source }}
        </p>

        <Card>
            <CardHeader><CardTitle>All sources</CardTitle></CardHeader>
            <CardContent>
                <ul class="divide-y">
                    <li
                        v-for="s in props.sources"
                        :key="s.id"
                        class="flex items-center justify-between py-2 text-sm"
                    >
                        <div class="flex items-center gap-2">
                            <span
                                :class="{
                                    'text-muted-foreground line-through':
                                        !s.is_active,
                                }"
                                >{{ s.name }}</span
                            >
                            <Badge v-if="s.is_system" variant="secondary"
                                >system</Badge
                            >
                        </div>
                        <div v-if="!s.is_system" class="flex gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                @click="toggle(s)"
                            >
                                {{ s.is_active ? 'Deactivate' : 'Activate' }}
                            </Button>
                            <Button
                                variant="link"
                                size="sm"
                                class="text-destructive"
                                @click="remove(s)"
                            >
                                Delete
                            </Button>
                        </div>
                    </li>
                </ul>
            </CardContent>
        </Card>
    </div>
</template>
