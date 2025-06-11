import { formatPercentage } from '../../utils/formatters';
import { ProgressBarProps } from './types';

export function ProgressBar({ 
  value, 
  max, 
  showCurrentValue = true, 
  currentValue,
  label = 'Progress'
}: ProgressBarProps) {
  //const percentage = (value / max) * 100;
  const currentValuePercentage = currentValue ? (currentValue / max) * 100 : 0;

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1  p-1">
        <span>{label}</span>
        <span>{formatPercentage(currentValuePercentage)}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        {!!(showCurrentValue && currentValue) && (
          <div 
            className="bg-primary h-2 rounded-full" 
            style={{ width: `${Math.min(100, currentValuePercentage)}%` }}
          />
        )}
        {/* <div 
          className="bg-primary h-2 rounded-full -mt-2" 
          style={{ width: `${Math.min(100, percentage)}%` }}
        /> */}
      </div>
    </div>
  );
} 