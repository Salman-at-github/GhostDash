import React, { useContext, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {chart as ChartJS} from 'chart.js/auto';
import { GlobalContext } from '../context/GlobalContext';

const PieChart = () => {

  const {posts, monthPost, getPosts} = useContext(GlobalContext);
  useEffect(()=>{
    
    getPosts();
  }, []);

  const pieData = {
    labels: Object.keys(monthPost).map((month) => month),
    datasets: [
      {
        label: "Posts Per Month",
        data: Object.keys(monthPost).map((month) => monthPost[month]),
        backgroundColor: ["#0c18f7", "#0cdcf7", "#0cf720","#f70c0c","#8d0cf7","#0cf7b8","#f7d40c","#ae00ed","#027cb0","#0c0d0d","#f5f7f7","#fc830a"],
        border: 2,
        borderColor:"black"
      },
    ],
  };

  return (
    <div>
      {posts && (
      <div className='p-4'>
        <h1 className='text-center text-xl my-6 font-bold'>Posts Per Month</h1>
        <Doughnut data={pieData} className='text-yellow-100'/>
      </div>
      )}
    </div>
  )
}

export default PieChart;
