/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#171717',
        primary: {
          light: '#A78BFA',
          DEFAULT: '#8B5CF6',
          dark: '#7C3AED',
        },
        secondary: {
          light: '#34D399',
          DEFAULT: '#10B981',
          dark: '#059669',
        },
        accent: {
          yellow: '#F59E0B',
          pink: '#EC4899',
          blue: '#3B82F6',
          red: '#EF4444',
          teal: '#14B8A6',
          orange: '#F97316',
        },
        white: '#FFFFFF',
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        'xs': ['0.675rem', { lineHeight: '0.9rem', letterSpacing: '-0.01em' }],
        'sm': ['0.8rem', { lineHeight: '1.15rem', letterSpacing: '-0.01em' }],
        'base': ['0.9rem', { lineHeight: '1.35rem', letterSpacing: '-0.01em' }],
        'lg': ['1rem', { lineHeight: '1.6rem', letterSpacing: '-0.01em' }],
        'xl': ['1.125rem', { lineHeight: '1.6rem', letterSpacing: '-0.01em' }],
        '2xl': ['1.35rem', { lineHeight: '1.8rem', letterSpacing: '-0.02em' }],
        '3xl': ['1.7rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
        '4xl': ['2rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
      },
      boxShadow: {
        'custom-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'custom-md': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        'custom-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
} 