import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


interface ChartData {
    label: string;
    value: number;
}

interface DonutChartProps {
    data: ChartData[];
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.label),
        datasets: [
            {
                data: data.map(item => item.value),
                backgroundColor: [
                    'rgb(42,105,206)',
                    'rgb(255,96,46)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        // aspectRatio:1,
        cutout: '60%',
        legend: {
          display: true,
          position: 'right',
        },

        animation: {
          animateRotate: true,
          animateScale: true,
        },
        tooltips: {
          enabled: true,
        },

      };

    return (
        <div className='h-60'>
            <Doughnut data={chartData} options={chartOptions} />
        </div>
    );
};

export default DonutChart;
