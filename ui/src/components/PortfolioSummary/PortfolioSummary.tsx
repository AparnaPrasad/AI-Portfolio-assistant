import { PieChart } from '../PieChart';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { chartColors } from '../../constants/colors';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { PortfolioSummaryProps } from './types';


function SummaryItem({ label, value, subtext }: { label: string; value: string; subtext: string }) {
  return (
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500 mt-1">{subtext}</div>
    </div>
  );
}

export function PortfolioSummary({ totalInvested, totalGoal, totalCurrentValue, chartData, title }: PortfolioSummaryProps) {
  const percentage = (totalInvested / totalGoal) * 100;

  const formattedChartData = {
    labels: chartData.map(item => item.label),
    datasets: [
      {
        data: chartData.map(item => item.value),
        backgroundColor: chartData.map((_, index) => chartColors[index % chartColors.length]),
        borderColor: chartData.map((_, index) => chartColors[index % chartColors.length]),
        borderWidth: 1,
        portfolioIds: chartData.map(item => item.portfolioId || ''),
      },
    ],
  };

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title || 'Financial Portfolio Dashboard'}</h1>
      <div className="bg-white rounded-lg shadow-custom-sm p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Summary Section */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <SummaryItem
                label="Total Invested"
                value={formatCurrency(totalInvested)}
                subtext={`${formatPercentage(percentage)} of total goal`}
              />
              <SummaryItem
                label="Current Value"
                value={formatCurrency(totalCurrentValue)}
                subtext={`${formatPercentage((totalCurrentValue / totalGoal) * 100)} of total goal`}
              />
              <SummaryItem
                label="Total Goals"
                value={formatCurrency(totalGoal)}
                subtext={`${formatCurrency(totalGoal - totalInvested)} remaining`}
              />
            </div>
            <ProgressBar 
              value={totalInvested} 
              max={totalGoal} 
              showCurrentValue={true}
              currentValue={totalCurrentValue}
              label="Overall Progress"
            />
          </div>

          {/* Pie Chart Section */}
          {totalInvested > 0 && <PieChart data={formattedChartData}/>}
        </div>
      </div>
    </div>
  );
} 