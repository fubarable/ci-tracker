<script setup lang="ts">
import { ref, computed } from 'vue';
import { Check, ChevronsUpDown, X } from '@lucide/vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Popover, PopoverContent, PopoverTrigger,
} from '@/components/ui/popover';
import {
    Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from '@/components/ui/command';

interface Option {
    id: number;
    name: string;
}

const props = defineProps<{
    options: Option[];
    modelValue: number[];
    placeholder?: string;
}>();

const emit = defineEmits<{ 'update:modelValue': [number[]] }>();

const open = ref(false);

const selectedOptions = computed(() =>
    props.options.filter((o) => props.modelValue.includes(o.id))
);

function toggle(id: number) {
    const next = props.modelValue.includes(id)
        ? props.modelValue.filter((v) => v !== id)
        : [...props.modelValue, id];
    emit('update:modelValue', next);
}

function remove(id: number) {
    emit('update:modelValue', props.modelValue.filter((v) => v !== id));
}
</script>

<template>
    <div class="space-y-1.5">
        <Popover v-model:open="open">
            <PopoverTrigger as-child>
                <Button
                    variant="outline"
                    role="combobox"
                    :aria-expanded="open"
                    class="w-full justify-between font-normal"
                >
                    <span class="text-muted-foreground">
                        {{ placeholder ?? 'Select...' }}
                    </span>
                    <ChevronsUpDown class="h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent class="w-full p-0" align="start">
                <Command>
                    <CommandInput :placeholder="`Search ${placeholder?.toLowerCase() ?? 'options'}...`" />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            <CommandItem
                                v-for="option in options"
                                :key="option.id"
                                :value="option.name"
                                @select="toggle(option.id)"
                            >
                                <Check
                                    class="mr-2 h-4 w-4"
                                    :class="modelValue.includes(option.id) ? 'opacity-100' : 'opacity-0'"
                                />
                                {{ option.name }}
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>

        <div v-if="selectedOptions.length > 0" class="flex flex-wrap gap-1">
            <Badge
                v-for="opt in selectedOptions"
                :key="opt.id"
                variant="secondary"
                class="gap-1"
            >
                {{ opt.name }}
                <button type="button" @click="remove(opt.id)" class="ml-1">
                    <X class="h-3 w-3" />
                </button>
            </Badge>
        </div>
    </div>
</template>