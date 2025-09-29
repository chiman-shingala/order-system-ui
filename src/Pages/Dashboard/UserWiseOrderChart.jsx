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
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function UserWiseOrderChart() {
    const topUsers = useSelector(state => state.topUser.topUser)
    const label = topUsers?.map(x => x.UserName);
    const chartData = topUsers?.map(x => x.OrderNo);

    const data = {
        labels: label,
        datasets: [
            {
                label: 'Top Users',
                data: chartData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
            }
        ]
    }
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        showScale: false
        

    }
    const chartStyles = {
        width: '100%',
        // height: '55vh',
        // Additional styles as needed
    };

    return (
        <>
            <div className='w-100' style={{minHeight: '300px'}}>
            <h5>Top Users</h5>
                <div>

                {
                    label.length == 0 ?
                    "There are no data to display"
                    :
                    <Line data={data} options={options} style={chartStyles} />
                }
                </div>
            </div>

        </>
    )
}

export default UserWiseOrderChart