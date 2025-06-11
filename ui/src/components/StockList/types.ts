export interface Stock {
  symbol: string;
  name: string;
  shares: number;
  costPrice: number;
  currentPrice: number;
  allocation: number;
}

export interface StockListProps {
  stocks: Stock[];
} 