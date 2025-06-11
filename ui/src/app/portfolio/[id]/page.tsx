'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PortfolioSummary } from '../../../components/PortfolioSummary';
import { StockList } from '../../../components/StockList/StockList';
import { AddStock } from '../../../components/AddStock';

interface Portfolio {
  id: string;
  name: string;
  type: string;
  totalInvested: number;
  currentValue: number;
  goalAmount: number;
  description: string;
  stocks: Array<{
    id: string;
    symbol: string;
    name: string;
    shares: number;
    costPrice: number;
    currentPrice: number;
    allocation: number;
  }>;
}

export default function PortfolioDetail() {
  const params = useParams();
  const id = params?.id as string;
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolio = async () => {
    try {
      const response = await fetch(`/api/portfolio/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch portfolio');
      }
      const data = await response.json();
      setPortfolio(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch portfolio');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPortfolio();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Loading Portfolio...</h1>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Portfolio not found</h1>
        </div>
      </div>
    );
  }

  const chartData = portfolio.stocks.map(stock => ({
    label: stock.symbol,
    value: (stock.currentPrice * stock.shares) / portfolio.currentValue,
    portfolioId: portfolio.id
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-8xl mx-auto space-y-6">
        <PortfolioSummary 
          totalInvested={portfolio.totalInvested}
          totalGoal={portfolio.goalAmount}
          totalCurrentValue={portfolio.currentValue}
          chartData={chartData}
          title={portfolio.name}
        />
        <div className="flex justify-end">
          <AddStock portfolioId={id} onStockAdded={fetchPortfolio} />
        </div>
        <StockList stocks={portfolio.stocks} />
      </div>
    </div>
  );
} 