// import React, { useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     TimeScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';
// import 'chartjs-adapter-date-fns';

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     TimeScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
// );

// const PlayerStatsGraph = ({ stats }) => {
//     const data = {
//         labels: stats.map(stat => new Date(stat.date)),
//         datasets: [
//             {
//                 label: 'Points',
//                 data: stats.map(stat => stat.points),
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 fill: false,
//             },
//             {
//                 label: 'Assists',
//                 data: stats.map(stat => stat.assists),
//                 borderColor: 'rgba(153, 102, 255, 1)',
//                 backgroundColor: 'rgba(153, 102, 255, 0.2)',
//                 fill: false,
//             },
//             {
//                 label: 'Rebounds',
//                 data: stats.map(stat => stat.rebounds),
//                 borderColor: 'rgba(255, 206, 86, 1)',
//                 backgroundColor: 'rgba(255, 206, 86, 0.2)',
//                 fill: false,
//             },
//             {
//                 label: 'Steals',
//                 data: stats.map(stat => stat.steals),
//                 borderColor: 'rgba(54, 162, 235, 1)',
//                 backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                 fill: false,
//             },
//             {
//                 label: 'Blocks',
//                 data: stats.map(stat => stat.blocks),
//                 borderColor: 'rgba(255, 99, 132, 1)',
//                 backgroundColor: 'rgba(255, 99, 132, 0.2)',
//                 fill: false,
//             }
            
//             // Add more datasets as needed
//         ],
//     };

//     const options = {
//         scales: {
//             x: {
//                 type: 'time',
//                 time: {
//                     unit: 'month',
//                 },
//                 title: {
//                     display: true,
//                     text: 'Date',
//                 },
//             },
//             y: {
//                 beginAtZero: true,
//                 title: {
//                     display: true,
//                     text: 'Stats',
//                 },
//             },
//         },
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             title: {
//                 display: true,
//                 text: 'Player Stats Over Time',
//             },
//         },
//     };

//     return (
//         <div>
//             <Line data={data} options={options} />
//         </div>
//     );
// };

// export default PlayerStatsGraph;






import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    CategoryScale,
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const PlayerStatsGraph = ({ stats }) => {
    const generateChartData = (label, dataKey, borderColor, backgroundColor) => ({
        labels: stats.map((stat, index) => `Match ${index + 1} vs ${stat.opponent} on ${new Date(stat.date).toLocaleDateString()}`),
        datasets: [
            {
                label,
                data: stats.map(stat => stat[dataKey]),
                borderColor,
                backgroundColor,
                fill: false,
            },
        ],
    });

    const options = {
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true,
                    text: 'Match',
                },
                ticks: {
                    autoSkip: false,
                    maxRotation: 90,
                    minRotation: 90,
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Stats',
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Player Stats Over Matches',
            },
        },
    };

    const chartsData = [
        {
            label: 'Points',
            dataKey: 'points',
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
        {
            label: 'Assists',
            dataKey: 'assists',
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
        },
        {
            label: 'Rebounds',
            dataKey: 'rebounds',
            borderColor: 'rgba(255, 206, 86, 1)',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
        },
        {
            label: 'Steals',
            dataKey: 'steals',
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
        },
        {
            label: 'Blocks',
            dataKey: 'blocks',
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
        },
    ];

    return (
        <div>
            {chartsData.map(chart => (
                <div key={chart.label}>
                    <h2>{chart.label}</h2>
                    <Line
                        data={generateChartData(chart.label, chart.dataKey, chart.borderColor, chart.backgroundColor)}
                        options={options}
                    />
                </div>
            ))}
        </div>
    );
};

export default PlayerStatsGraph;
