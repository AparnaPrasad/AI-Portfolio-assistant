export interface Portfolio {
  id: string;
  name: string;
  type: 'Retirement 🏖️' | 'Education 📚' | 'Emergency 💰' | 'Travel 🌍';
  totalInvested: number;
  currentValue: number;
  goalAmount: number;
  description?: string;
}

export interface PortfolioFormData {
  name: string;
  type: 'Retirement 🏖️' | 'Education 📚' | 'Emergency 💰' | 'Travel 🌍';
  goalAmount: number;
  description: string;
} 