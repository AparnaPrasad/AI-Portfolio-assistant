import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { DisplayPriceChange } from '../DisplayPriceChange';
import { StockListProps } from './types';

export function StockList({ stocks }: StockListProps) {
  const totalCurrentValue = stocks.reduce((sum, stock) => sum + (stock.currentPrice * stock.shares), 0);

  return (
    <div className="bg-white rounded-lg shadow-custom-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Portfolio Holdings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shares</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost Basis</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Value</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allocation</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stocks.map((stock) => {
              const costValue = stock.costPrice * stock.shares;
              const currentValue = stock.currentPrice * stock.shares;

              return (
                <tr key={stock.symbol} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stock.symbol}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stock.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stock.shares}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(costValue)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(currentValue)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <DisplayPriceChange currentValue={currentValue} costValue={costValue} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatPercentage(currentValue/totalCurrentValue*100)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
} 