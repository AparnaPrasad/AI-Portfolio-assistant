import { Portfolio } from '../../types/portfolio';

export interface SummaryItemProps {
  label: string;
  value: string;
  subtext: string;
}

export interface ProgressBarProps {
  value: number;
  max: number;
}

export interface ChartDataItem {
  label: string;
  value: number;
  portfolioId?: string;
}

export interface PortfolioSummaryProps {
  totalInvested: number;
  totalGoal: number;
  totalCurrentValue: number;
  chartData: ChartDataItem[];
  title?: string;
}