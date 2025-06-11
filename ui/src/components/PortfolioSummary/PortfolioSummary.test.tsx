import { render, screen } from '@testing-library/react';
import { PortfolioSummary } from './PortfolioSummary';
import { Portfolio } from '../../types/portfolio';

// Mock the PieChart component
jest.mock('../PieChart', () => ({
  PieChart: () => <div data-testid="mock-pie-chart">Mock Chart</div>
}));

describe('PortfolioSummary', () => {
  const mockPortfolios: Portfolio[] = [
    {
      id: '1',
      name: 'Retirement Fund',
      type: 'Retirement',
      totalInvested: 50000,
      currentValue: 55000,
      goalAmount: 100000,
      description: 'Long-term retirement savings'
    },
    {
      id: '2',
      name: 'Education Fund',
      type: 'Education',
      totalInvested: 25000,
      currentValue: 27500,
      goalAmount: 50000,
      description: 'College savings'
    }
  ];

  const totalInvested = mockPortfolios.reduce((sum, p) => sum + p.totalInvested, 0);
  const totalGoal = mockPortfolios.reduce((sum, p) => sum + p.goalAmount, 0);
  const totalCurrentValue = mockPortfolios.reduce((sum, p) => sum + p.currentValue, 0);
  const chartData = mockPortfolios.map(p => ({
    label: p.type,
    value: p.totalInvested,
    portfolioId: p.id
  }));

  it('renders the dashboard title', () => {
    render(<PortfolioSummary 
      totalInvested={totalInvested}
      totalGoal={totalGoal}
      totalCurrentValue={totalCurrentValue}
      chartData={chartData}
    />);
    expect(screen.getByText('Financial Portfolio Dashboard')).toBeInTheDocument();
  });

  it('displays total invested amount correctly', () => {
    render(<PortfolioSummary 
      totalInvested={totalInvested}
      totalGoal={totalGoal}
      totalCurrentValue={totalCurrentValue}
      chartData={chartData}
    />);
    expect(screen.getByText('$75,000.00')).toBeInTheDocument(); // Total invested
    expect(screen.getByText('$150,000.00')).toBeInTheDocument(); // Total goal
  });

  it('shows progress information', () => {
    render(<PortfolioSummary 
      totalInvested={totalInvested}
      totalGoal={totalGoal}
      totalCurrentValue={totalCurrentValue}
      chartData={chartData}
    />);
    expect(screen.getByText('Overall Progress')).toBeInTheDocument();
    expect(screen.getByText('50.00%')).toBeInTheDocument();
  });

  it('renders the pie chart component', () => {
    render(<PortfolioSummary 
      totalInvested={totalInvested}
      totalGoal={totalGoal}
      totalCurrentValue={totalCurrentValue}
      chartData={chartData}
    />);
    expect(screen.getByTestId('mock-pie-chart')).toBeInTheDocument();
  });
}); 