import React from "react"
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend);

export const getRankingSum = (arr, key) => {
    return arr.reduce((acc, cur) => acc + (cur.rankings[key] ? cur.rankings[key].value : 0), 0)
}

export const fml = (arr1, arr2) => {
    return arr1.filter(x => arr2.every(y => y != x._id))
}

export const CountriesPie = props => {

    const { attackers, defenders } = useSelector(state => state.app.warplaner)

    const values = [
        getRankingSum(fml(attackers.countries, attackers.excluded), "weeklyCountryDamages"),
        getRankingSum(fml(attackers.allies, attackers.excluded), "weeklyCountryDamages"),
        getRankingSum(fml(defenders.countries, defenders.excluded), "weeklyCountryDamages"),
        getRankingSum(fml(defenders.allies, defenders.excluded), "weeklyCountryDamages")
    ]

    const data = {
        labels: ['Attackers', 'Attackers Allies', 'Defenders', 'Defenders Allies'],
        datasets: [
            {
                label: '# of Votes',
                data: values,
                backgroundColor: [
                    'rgba(14, 226, 14, 0.5)',
                    'rgba(54, 235, 99, 0.5)',
                    'rgba(205, 11, 11, 0.5)',
                    'rgba(254, 11, 21, 0.5)',
                ],
                borderColor: [
                    'rgba(14, 226, 14, 1)',
                    'rgba(54, 235, 99, 1)',
                    'rgba(205, 11, 11, 1)',
                    'rgba(254, 11, 21, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    return <Pie data={data} />;
}

export default CountriesPie
