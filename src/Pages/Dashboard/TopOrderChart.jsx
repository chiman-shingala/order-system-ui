import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJs,
    ArcElement,
    Tooltip,
    Legend
}
    from 'chart.js';
import { Doughnut } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux';
import { getTopItemDetail } from '../../Redux/Actions/GetTopItemAction';

ChartJs.register(
    ArcElement,
    Tooltip,
    Legend)
function TopOrderChart() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTopItemDetail())
    }, [])
    let topItems = useSelector(state => state.topItem.topItem)

    const label = topItems.map(x => x.ItemName);
    const chartData = topItems.map(x => x.OrderNo);

    const data = {
        labels: label,
        datasets: [
            {
                label: 'Orders',
                data: chartData,
                backgroundColor: [
                    '#6b888f',
                    '#f0b6bb',
                    '#c398c3',
                    '#b1d49f',
                    '#61bdee',
                    '#f1e4b3',
                    '#a1d2f0',
                    '#b4d9cc',
                    '#c2bae8',
                    '#e6b9aa',
                ],
                borderWidth: 0,
            },
        ],
    }
    let options = {
        responsive: true,
        maintainAspectRatio: false,
        showScale: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'rect',
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw || '';
                        const percentage = context.dataset.data[context.dataIndex] / context.dataset.data.reduce((a, b) => a + b) * 100;
                        return `${label}: ${value} (${percentage.toFixed(2)}%)`;
                    },
                },
            },
        },
        
    }
    const chartStyles = {
        width: '100%',
        height: 'auto',
        // Additional styles as needed
    };
    return (
        <>
            <div className='w-100 h-auto' style={{minHeight: '500px'}}>
                <h5>Top Orders</h5>
                <div>
                {
                    label.length == 0 ?
                        "There are no records to display chart."
                        :
                        <Doughnut data={data} options={options} style={chartStyles} />
                }
                </div>
            </div>
        </>
    )
}

export default TopOrderChart