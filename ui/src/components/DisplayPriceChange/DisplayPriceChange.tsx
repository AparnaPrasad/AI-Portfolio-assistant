import React from 'react';
import { formatPercentage } from '../../utils/formatters';
import { DisplayPriceChangeProps } from './types';

const ArrowUpIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

const ArrowDownIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export const DisplayPriceChange: React.FC<DisplayPriceChangeProps> = ({ currentValue, costValue }) => {
  const delta = currentValue - costValue;
  const isPositive = delta >= 0;
  const percentageChange = (delta / costValue) * 100;

  return (
    <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
      {isPositive ? <ArrowUpIcon /> : <ArrowDownIcon />}
      <span>{formatPercentage(percentageChange)}</span>
    </div>
  );
}; 