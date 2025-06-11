'use client';

import React, { useState, useEffect } from 'react';
import { PortfolioCard } from '../components/PortfolioCard';
import { PortfolioSummary } from '../components/PortfolioSummary';
import { CreatePortfolio } from '../components/CreatePortfolio';

interface Portfolio {
  id: string;
  name: string;
  type: 'Retirement 🏖️' | 'Education 📚' | 'Emergency 💰' | 'Travel 🌍';
  totalInvested: number;
  currentValue: number;
  goalAmount: number;
  description: string;
}

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
  </div>
);

export default function Home() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPortfolios = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/portfolios');
      if (!response.ok) {
        throw new Error('Failed to fetch portfolios');
      }
      const data = await response.json();
      setPortfolios(data);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const totalInvested = portfolios.reduce((sum, p) => sum + p.totalInvested, 0);
  const totalGoal = portfolios.reduce((sum, p) => sum + p.goalAmount, 0);
  const totalCurrentValue = portfolios.reduce((sum, p) => sum + p.currentValue, 0);

  // Group investments by type
  const investmentsByType = portfolios.reduce((acc, portfolio) => {
    acc[portfolio.type] = (acc[portfolio.type] || 0) + portfolio.totalInvested;
    return acc;
  }, {} as Record<string, number>);

  // Get the first portfolio ID for each type
  const portfolioIdsByType = portfolios.reduce((acc, portfolio) => {
    if (!acc[portfolio.type]) {
      acc[portfolio.type] = portfolio.id;
    }
    return acc;
  }, {} as Record<string, string>);

  const chartData = Object.entries(investmentsByType).map(([type, value]) => ({
    label: type,
    value,
    portfolioId: portfolioIdsByType[type]
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-8xl mx-auto space-y-6">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <PortfolioSummary 
              totalInvested={totalInvested}
              totalGoal={totalGoal}
              totalCurrentValue={totalCurrentValue}
              chartData={chartData}
            />
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">Portfolios</div>
              <CreatePortfolio onPortfolioCreated={fetchPortfolios} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map((portfolio) => (
                <PortfolioCard key={portfolio.id} portfolio={portfolio} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
