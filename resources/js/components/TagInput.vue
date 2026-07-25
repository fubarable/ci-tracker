<script setup lang="ts">
import { ref } from 'vue';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TagOption {
    id: number;
    name: string;
}

const props = defineProps<{
    tags: TagOption[];
    modelValue: number[]; // selected tag ids
}>();

const emit = defineEmits<{ 'update:modelValue': [number[]]; 'newTag': [string] }>();

const inputValue = ref('');

const selectedTags = () => props.tags.filter((t) => props.modelValue.includes(t.id));

function toggleExisting(tag: TagOption) {
    const isSelected = props.modelValue.includes(tag.id);
    emit('update:modelValue',
        isSelected
            ? props.modelValue.filter((id) => id !== tag.id)
            : [...props.modelValue, tag.id]
    );
}

function onEnter() {
    const name = inputValue.value.trim();
    if (!name) return;

    const existing = props.tags.find((t) => t.name.toLowerCase() === name.toLowerCase());
    if (existing) {
        if (!props.modelValue.includes(existing.id)) {
            emit('update:modelValue', [...props.modelValue, existing.id]);
        }
    } else {
        emit('newTag', name); // parent creates it, then adds the returned id
    }
    inputValue.value = '';
}
</script>

<template>
    <div class="space-y-2">
        <div class="flex flex-wrap gap-1">
            <Badge v-for="tag in selectedTags()" :key="tag.id" variant="secondary" class="cursor-pointer"
                @click="toggleExisting(tag)">
                {{ tag.name }} ✕
            </Badge>
        </div>
        <Input v-model="inputValue" placeholder="Type a tag..." @keyup.enter="onEnter" class="flex-1" />
        <Button type="button" variant="outline" size="sm" @click="onEnter">
            Add
        </Button>
        <div class="flex flex-wrap gap-1">
            <Badge v-for="tag in tags.filter((t) => !modelValue.includes(t.id))" :key="tag.id" variant="outline"
                class="cursor-pointer text-muted-foreground" @click="toggleExisting(tag)">
                + {{ tag.name }}
            </Badge>
        </div>
    </div>
</template>