import { render, screen } from '@testing-library/react';
import { PortfolioCard } from './PortfolioCard';
import { Portfolio } from '../../types/portfolio';

describe('PortfolioCard', () => {
  const mockPortfolio: Portfolio = {
    id: '1',
    name: 'Retirement Fund',
    type: 'Retirement',
    totalInvested: 50000,
    currentValue: 55000,
    goalAmount: 100000,
    description: 'Long-term retirement savings'
  };

  it('renders portfolio information correctly', () => {
    render(<PortfolioCard portfolio={mockPortfolio} />);
    
    expect(screen.getByText('Retirement Fund')).toBeInTheDocument();
    expect(screen.getByText('Long-term retirement savings')).toBeInTheDocument();
    expect(screen.getByText('Retirement')).toBeInTheDocument();
  });

  it('displays progress correctly', () => {
    render(<PortfolioCard portfolio={mockPortfolio} />);
    
    expect(screen.getByText('Progress')).toBeInTheDocument();
    expect(screen.getByText('50.00%')).toBeInTheDocument();
  });

  it('shows investment amounts', () => {
    render(<PortfolioCard portfolio={mockPortfolio} />);
    
    expect(screen.getByText('Invested')).toBeInTheDocument();
    expect(screen.getByText('Goal')).toBeInTheDocument();
    expect(screen.getByText('$50,000.00')).toBeInTheDocument();
    expect(screen.getByText('$100,000.00')).toBeInTheDocument();
  });
}); 