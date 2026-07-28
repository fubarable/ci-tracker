<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { router } from '@inertiajs/vue3';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Filler,
} from 'chart.js';
import { ref, watch, computed } from 'vue';
import { Bar, Line } from 'vue-chartjs';
import MultiSelectCombobox from '@/components/MultiSelectCombobox.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dashboard } from '@/routes';

ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Filler);

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'Dashboard', href: dashboard() }],
    },
});

const props = defineProps<{
    summary: {
        allTimeSeconds: number;
        todaySeconds: number;
        weekSeconds: number;
        sessionCount: number;
    };
    dailyTotals: Array<{ date: string; seconds: number }>;
    bySource: Array<{ label: string; seconds: number }>;
    byModality: Array<{ label: string; seconds: number }>;
    languages: Array<{ id: number; name: string }>;
    modalities: Array<{ id: number; name: string }>;
    inputSources: Array<{ id: number; name: string }>;
    filters: {
        language_ids: number[];
        modality_ids: number[];
        input_source_ids: number[];
    };
    range: string;
    growth: Array<{ date: string; cumulativeSeconds: number }>;
}>();

const selectedRange = ref(props.range ?? '30');

const selectedLanguages = ref<number[]>(props.filters.language_ids ?? []);
const selectedModalities = ref<number[]>(props.filters.modality_ids ?? []);
const selectedSources = ref<number[]>(props.filters.input_source_ids ?? []);

watch(
    [selectedLanguages, selectedModalities, selectedSources, selectedRange],
    applyDashboardFilters,
    { deep: true }
);

function formatHM(totalSeconds: number): string {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);

    return `${h}h ${m}m`;
}

function shortDate(dateStr: string): string {
    const d = new Date(dateStr + 'T00:00:00');

    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

const dailyChartData = computed(() => ({
    labels: props.dailyTotals.map((d) => shortDate(d.date)),
    datasets: [
        {
            label: 'Minutes',
            data: props.dailyTotals.map((d) => Math.round(d.seconds / 60)),
            backgroundColor: '#16a34a',
            borderRadius: 4,
        },
    ],
}));

const dailyChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
        y: { beginAtZero: true, ticks: { precision: 0 } },
    },
};

function breakdownChartData(rows: Array<{ label: string; seconds: number }>) {
    return {
        labels: rows.map((r) => r.label),
        datasets: [
            {
                label: 'Minutes',
                data: rows.map((r) => Math.round(r.seconds / 60)),
                backgroundColor: '#0ea5e9',
                borderRadius: 4,
            },
        ],
    };
}

const breakdownChartOptions = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
        x: { beginAtZero: true, ticks: { precision: 0 } },
    },
};

function applyDashboardFilters() {
    router.get('/dashboard', {
        language_ids: selectedLanguages.value,
        modality_ids: selectedModalities.value,
        input_source_ids: selectedSources.value,
        range: selectedRange.value,
    }, { preserveState: true, replace: true });
}

function clearDashboardFilters() {
    selectedLanguages.value = [];
    selectedModalities.value = [];
    selectedSources.value = [];
    applyDashboardFilters();
}

function growthDateLabel(dateStr: string, allDates: string[]): string {
    const d = new Date(dateStr + 'T00:00:00');
    const first = new Date(allDates[0] + 'T00:00:00');
    const last = new Date(allDates[allDates.length - 1] + 'T00:00:00');
    const spanDays = (last.getTime() - first.getTime()) / (1000 * 60 * 60 * 24);

    if (spanDays > 365) {
        return d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
    }
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

const growthChartData = computed(() => {
    const dates = props.growth.map((g) => g.date);
    return {
        labels: dates.map((d) => growthDateLabel(d, dates)),
        datasets: [
            {
                label: 'Cumulative hours',
                data: props.growth.map((g) => Math.round((g.cumulativeSeconds / 3600) * 10) / 10),
                borderColor: '#8b5cf6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                fill: true,
                tension: 0.2,
                pointRadius: 0,
            },
        ],
    };
});

const growthChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
        y: { beginAtZero: true, title: { display: true, text: 'Hours' } },
        x: { ticks: { maxTicksLimit: 12 } },
    },
};
</script>

<template>

    <Head title="Dashboard" />
    <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <!-- Summary cards + filters -->
        <div class="grid gap-4 md:grid-cols-4">
            <Card>
                <CardHeader>
                    <CardTitle class="text-sm text-muted-foreground">Today</CardTitle>
                </CardHeader>
                <CardContent class="text-2xl font-semibold">
                    {{ formatHM(summary.todaySeconds) }}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle class="text-sm text-muted-foreground">This week</CardTitle>
                </CardHeader>
                <CardContent class="text-2xl font-semibold">{{
                    formatHM(summary.weekSeconds)
                }}</CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle class="text-sm text-muted-foreground">All time</CardTitle>
                </CardHeader>
                <CardContent class="text-2xl font-semibold">{{
                    formatHM(summary.allTimeSeconds)
                }}</CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle class="text-sm text-muted-foreground">Total sessions</CardTitle>
                </CardHeader>
                <CardContent class="text-2xl font-semibold">{{
                    summary.sessionCount
                }}</CardContent>
            </Card>
        </div>

        <!-- Filters -->
        <div class="flex flex-wrap items-center gap-3">
            <MultiSelectCombobox v-model="selectedLanguages" :options="languages" placeholder="Languages"
                class="w-40" />
            <MultiSelectCombobox v-model="selectedModalities" :options="modalities" placeholder="Modalities"
                class="w-40" />
            <MultiSelectCombobox v-model="selectedSources" :options="inputSources" placeholder="Sources" class="w-40" />
            <Button variant="ghost" size="sm" @click="clearDashboardFilters">Clear filters</Button>
        </div>

        <!-- Daily totals, last 30, 60, 90, 365 days -->
        <Card>
            <CardHeader class="flex flex-row items-center justify-between">
                <CardTitle>Activity over time</CardTitle>
                <Select v-model="selectedRange">
                    <SelectTrigger class="w-36">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="30">Last 30 days</SelectItem>
                        <SelectItem value="60">Last 60 days</SelectItem>
                        <SelectItem value="90">Last 90 days</SelectItem>
                        <SelectItem value="365">Last year</SelectItem>
                        <SelectItem value="all">All time</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <div class="h-64">
                    <Bar :data="dailyChartData" :options="dailyChartOptions" />
                </div>
            </CardContent>
        </Card>

        <!-- Breakdown by source and modality -->
        <div class="grid gap-4 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>By source</CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="h-64">
                        <Bar :data="breakdownChartData(bySource)" :options="breakdownChartOptions" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>By modality</CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="h-64">
                        <Bar :data="breakdownChartData(byModality)" :options="breakdownChartOptions" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Cumulative growth</CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="h-64">
                        <Line :data="growthChartData" :options="growthChartOptions" />
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
</template>
