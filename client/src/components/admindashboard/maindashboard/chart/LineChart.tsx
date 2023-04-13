/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';
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
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import analysisApi from 'src/apis/analysis.api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
// const data1 = [200, 159, 280, 181, 156, 155, 100];
// const data2 = [45, 78, 21, 90, 13, 88, 22];
// const data3 = [100, 89, 93, 122, 109, 111, 156];
interface Props {
  inventory?: boolean;
  titleText?: string;
}
export const LineChart = ({ inventory, titleText }: Props) => {
  const options = useMemo(() => {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom' as const,
        },
        title: {
          display: true,
          text: titleText ? titleText : 'Sale Analytics',
        },
      },
    };
  }, [titleText]);
  const statistic = useQuery(['get_data_for_linechart'], () => analysisApi.saleSatistic());
  const data = useMemo(() => {
    const data_raw = statistic.data?.data;
    if (statistic.data !== undefined && data_raw && inventory) {
      return {
        labels: data_raw.map((e: { month: string }) => e.month),
        datasets: [
          {
            label: 'Outbound (item)',
            data: data_raw.map((e: { out: number }) => e.out),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            tension: 0.1,
          },
          {
            label: 'Orders (order)',
            data: data_raw.map((e: { total_order: number }) => e.total_order),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            tension: 0.1,
          },
          {
            label: 'Inbound (item)',
            data: data_raw.map((e: { in: number }) => e.in),
            borderColor: 'rgb(252, 169, 3)',
            backgroundColor: 'rgba(252, 169, 3, 0.5)',
            tension: 0.1,
          },
        ],
      };
    }
    return (
      data_raw && {
        labels: data_raw.map((e: { month: string }) => e.month),
        datasets: [
          {
            label: 'Outbound (item)',
            data: data_raw.map((e: { out: number }) => e.out),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            tension: 0.1,
          },
          {
            label: 'Orders (order)',
            data: data_raw.map((e: { total_order: number }) => e.total_order),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            tension: 0.1,
          },
          {
            label: 'Inbound (item)',
            data: data_raw.map((e: { in: number }) => e.in),
            borderColor: 'rgb(252, 169, 3)',
            backgroundColor: 'rgba(252, 169, 3, 0.5)',
            tension: 0.1,
          },
          {
            label: 'Revenue (million vnd)',
            data: data_raw.map((e: { amount: number }) => (e.amount / 1_000_000).toFixed(3)),
            borderColor: 'rgb(66, 245, 78)',
            backgroundColor: 'rgba(66, 245, 78, 0.5)',
            tension: 0.1,
          },
        ],
      }
    );
  }, [statistic, inventory]);
  return (
    <Line
      options={options}
      data={
        data
          ? data
          : {
              labels: [],
              datasets: [
                {
                  label: 'Outbound',
                  data: [],
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  tension: 0.1,
                },
                {
                  label: 'Orders',
                  data: [],
                  borderColor: 'rgb(53, 162, 235)',
                  backgroundColor: 'rgba(53, 162, 235, 0.5)',
                  tension: 0.1,
                },
                {
                  label: 'Inbound',
                  data: [],
                  borderColor: 'rgb(252, 169, 3)',
                  backgroundColor: 'rgba(252, 169, 3, 0.5)',
                  tension: 0.1,
                },
              ],
            }
      }
    />
  );
};
