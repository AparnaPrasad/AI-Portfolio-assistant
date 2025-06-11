import { formatCurrency } from '../../utils/formatters';
import { PortfolioCardProps } from './types';
import Link from 'next/link';
import { ProgressBar } from '../ProgressBar/ProgressBar';

export function PortfolioCard({ portfolio }: PortfolioCardProps) {
  return (
    <Link href={`/portfolio/${portfolio.id}`}>
      <div className="bg-white rounded-lg shadow-custom-md p-6 hover:shadow-custom-lg transition-shadow cursor-pointer">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{portfolio.name}</h3>
            <div className="text-sm text-gray-500">{portfolio.description}</div>
          </div>
          <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700 flex items-center gap-1">
            {portfolio.type}
          </span>
        </div>
        
        <div className="space-y-4">
          <ProgressBar 
            value={portfolio.totalInvested}
            max={portfolio.goalAmount}
            showCurrentValue={true}
            currentValue={portfolio.currentValue}
          />

          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-500">Invested</div>
              <div className="text-sm font-semibold">{formatCurrency(portfolio.totalInvested)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Current</div>
              <div className="text-sm font-semibold">{formatCurrency(portfolio.currentValue)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Goal</div>
              <div className="text-sm font-semibold">{formatCurrency(portfolio.goalAmount)}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 