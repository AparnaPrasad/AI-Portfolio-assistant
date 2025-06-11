'use client';

import dynamic from 'next/dynamic';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { PieChartProps } from './types';
import { useRouter } from 'next/navigation';

// Import Chart.js registration
import '../../lib/chartjs';

// Dynamically import Chart.js components with no SSR
const Chart = dynamic(() => import('react-chartjs-2').then(mod => mod.Pie), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[250px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    </div>
  ),
});

export function PieChart({ data }: PieChartProps) {
  const router = useRouter();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: (event: any, elements: any) => {
      if (elements && elements.length > 0) {
        const index = elements[0].index;
        const portfolioId = data.datasets[0].portfolioIds[index];
        if (portfolioId) {
          router.push(`/portfolio/${portfolioId}`);
        }
      }
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        align: 'center' as const,
        labels: {
          padding: 10,
          boxWidth: 12,
          boxHeight: 12,
          font: {
            size: 12
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = (value / total) * 100;
            return `${context.label}: ${formatCurrency(value)} (${formatPercentage(percentage)})`;
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-sm text-gray-500 text-center mb-2">Investment Distribution</div>
      <div className="h-[250px] w-full max-w-[300px] cursor-pointer">
        <Chart data={data} options={options} />
      </div>
    </div>
  );
} 