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
import zoomPlugin from 'chartjs-plugin-zoom'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin
);

export const setOptions = (title) => {
    return {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: title
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true // SET SCROOL ZOOM TO TRUE
                    },
                    mode: "xy",
                    speed: 100
                },
                pan: {
                    enabled: true,
                    mode: "xy",
                    speed: 100
                }
            },
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
            },
            /* y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
            }, */
        },
    }
}

export const setLineChartData = (pData) => {

    const color = [
        'red', 'blue', 'green', 'yellow', 'orange', 'purple',
        'black', 'brown', 'teal', 'grey', 'maroon'
    ]

    const labels = pData.map((data, i) => data.map((x, j) => `${i} PP`))
    const datasets = pData.map((data, i) => ({
        label: `${i + 1} companies ${Math.min(12 - (i + 1), (i + 1) * 6)} AEs`,
        data,
        borderColor: color[i],//'rgb(53, 162, 235)',
        backgroundColor: color[i],//'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y'
    }))
    return ({
        labels,
        datasets
        /* datasets: [
            {
                label: 'PP Kosten',
                data: pData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y',
            },
            {
                label: 'Bar',
                data: labels.map(((x, i) => pData[i].currentPressure)),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y1',
            },
        ], */
    })
};


export const LineChart = () => {

    //const {pData, name} = props
    const pData = []
    const name = 'Company vs AE'

    const companyPrices = [20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]
    const aePrices = [4, 8, 16, 32, 64, 128]

    const n = 12
    const allData = []

    for (var i = 0; i < n - 1; i++) {
        const companyCount = i + 1
        const companyCostArr = companyPrices.slice(0, i)
        const maxUpgrades = Math.min(n - companyCount, companyCount * 6)
        const aeCostRepeatArr = [...Array(companyCount).keys()]
            .map(_ => aePrices)
            .flat()
            .sort((a, b) => a > b ? 1 : a < b ? -1 : 0)
            .slice(0, maxUpgrades)
        console.log(companyCostArr, aeCostRepeatArr)
        const costArr = [...companyCostArr, ...aeCostRepeatArr]
        const data = costArr.sort().map((sum => value => sum += value)(0))
        allData.push(data)
    }

    const lineChartData = setLineChartData(allData)
    const options = setOptions(name)

    return (
        <div className="linechart-container"><Line options={options} data={lineChartData} /></div>
    )






}

export default LineChart