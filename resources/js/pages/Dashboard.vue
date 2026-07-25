<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { dashboard } from '@/routes';
import { Bar } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Dashboard', href: dashboard() },
        ],
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
}>();

function formatHM(totalSeconds: number): string {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    return `${h}h ${m}m`;
}

function shortDate(dateStr: string): string {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

const dailyChartData = {
    labels: props.dailyTotals.map((d) => shortDate(d.date)),
    datasets: [
        {
            label: 'Minutes',
            data: props.dailyTotals.map((d) => Math.round(d.seconds / 60)),
            backgroundColor: '#16a34a',
            borderRadius: 4,
        },
    ],
};

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
</script>

<template>
    <Head title="Dashboard" />
    <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <!-- Summary cards -->
        <div class="grid gap-4 md:grid-cols-4">
            <Card>
                <CardHeader><CardTitle class="text-sm text-muted-foreground">Today</CardTitle></CardHeader>
                <CardContent class="text-2xl font-semibold">{{ formatHM(summary.todaySeconds) }}</CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle class="text-sm text-muted-foreground">This week</CardTitle></CardHeader>
                <CardContent class="text-2xl font-semibold">{{ formatHM(summary.weekSeconds) }}</CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle class="text-sm text-muted-foreground">All time</CardTitle></CardHeader>
                <CardContent class="text-2xl font-semibold">{{ formatHM(summary.allTimeSeconds) }}</CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle class="text-sm text-muted-foreground">Total sessions</CardTitle></CardHeader>
                <CardContent class="text-2xl font-semibold">{{ summary.sessionCount }}</CardContent>
            </Card>
        </div>

        <!-- Daily totals, last 30 days -->
        <Card>
            <CardHeader><CardTitle>Last 30 days</CardTitle></CardHeader>
            <CardContent>
                <div class="h-64">
                    <Bar :data="dailyChartData" :options="dailyChartOptions" />
                </div>
            </CardContent>
        </Card>

        <!-- Breakdown by source and modality -->
        <div class="grid gap-4 md:grid-cols-2">
            <Card>
                <CardHeader><CardTitle>By source</CardTitle></CardHeader>
                <CardContent>
                    <div class="h-64">
                        <Bar :data="breakdownChartData(bySource)" :options="breakdownChartOptions" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>By modality</CardTitle></CardHeader>
                <CardContent>
                    <div class="h-64">
                        <Bar :data="breakdownChartData(byModality)" :options="breakdownChartOptions" />
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
</template>