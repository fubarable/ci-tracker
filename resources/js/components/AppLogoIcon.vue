<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

defineOptions({
    inheritAttrs: false,
});

type Props = {
    className?: HTMLAttributes['class'];
};

defineProps<Props>();
</script>

<template>
    <img src="/images/julia-mark.png" alt="" :class="className" v-bind="$attrs" class="object-cover" />
</template>