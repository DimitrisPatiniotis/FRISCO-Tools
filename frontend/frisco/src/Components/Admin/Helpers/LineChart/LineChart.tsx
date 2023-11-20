import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
    label: string;
    value: number;
}

interface LineChartProps {
    data: ChartData[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.label),
        datasets: [
            {
                label: 'Responses',
                data: data.map(item => item.value),
                fill: false,
                borderColor: 'rgb(42,105,206)',
                backgroundColor: 'rgb(42,105,206)',
                borderWidth: 3,
                tension: 0.5,
                pointRadius: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Day',
                },
            },
            y: {
                beginAtZero: true,
                display: true,
                title: {
                    display: true,
                    text: '# of Responses',
                },
            },
        },
    };

    return (
        <div >
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default LineChart;
