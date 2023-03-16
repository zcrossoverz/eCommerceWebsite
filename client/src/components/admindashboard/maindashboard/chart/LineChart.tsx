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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: 'Sale Analytics',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const data1 = [200, 159, 280, 181, 156, 155, 100];
const data2 = [45, 78, 21, 90, 13, 88, 22];
const data3 = [100, 89, 93, 122, 109, 111, 156];

const data = {
  labels,
  datasets: [
    {
      label: 'Outbound',
      data: data1,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      tension: 0.1,
    },
    {
      label: 'Orders',
      data: data2,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      tension: 0.1,
    },
    {
      label: 'Inbound',
      data: data3,
      borderColor: 'rgb(252, 169, 3)',
      backgroundColor: 'rgba(252, 169, 3, 0.5)',
      tension: 0.1,
    },
  ],
};

export const LineChart = () => {
  return <Line options={options} data={data} />;
};
