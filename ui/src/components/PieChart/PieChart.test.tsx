/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import { PieChart } from './PieChart';

// Mock the Chart.js component
jest.mock('react-chartjs-2', () => ({
  Pie: () => <div data-testid="mock-pie-chart">Mock Chart</div>
}));

describe('PieChart', () => {
  const mockData = {
    labels: ['Retirement', 'Education'],
    datasets: [{
      data: [1000, 2000],
      backgroundColor: ['#3B82F6', '#10B981'],
      borderColor: ['#3B82F6', '#10B981'],
      borderWidth: 1,
      portfolioIds: ['1', '2']
    }]
  };

  it('renders the chart title', () => {
    render(<PieChart data={mockData} />);
    expect(screen.getByText('Investment Distribution')).toBeInTheDocument();
  });

  it('renders with the correct dimensions', () => {
    render(<PieChart data={mockData} />);
    const container = screen.getByTestId('mock-pie-chart').parentElement;
    expect(container).toHaveClass('h-[250px]');
    expect(container).toHaveClass('max-w-[300px]');
  });
}); 