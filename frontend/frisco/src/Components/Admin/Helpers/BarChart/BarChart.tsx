import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface ChartData {
    label: string;
    value: number;
}

interface BarChartProps {
    data: ChartData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.label),
        datasets: [
            {
                label: 'Responses',
                data: data.map(item => item.value),
                backgroundColor: 'rgb(42,105,206)',
                borderColor: 'rgb(42,105,206)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false,
            position: 'bottom',
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: false,
                    text: '',
                },
            },
            y: {
                beginAtZero: true,
                display: true,
                title: {
                    display: true,
                    text: 'Total Responses',
                },
            },
        },
    };

    return (
        <div className='h-60'>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default BarChart;
