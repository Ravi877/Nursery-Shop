// lib/shop.js

const products = [
  {
    id: 'ai-investing-guide',
    name: 'AI Investing E-Book 2025',
    description: 'A comprehensive guide to next-generation algorithmic investing and wealth management.',
    price: 49.99,
    image: '/images/uploads/ai_deep_dive_september.jpg', 
    category: 'E-Books',
    inStock: true,
    details: "Master the intersection of technology and finance with this essential guide. Learn how to leverage predictive AI models to identify market anomalies and execute high-probability trades. This book is for investors looking to move beyond traditional analysis.",
    features: [
      '150+ pages of expert AI strategy and market analysis.',
      'Includes downloadable cheat sheets for optimal AI model selection.',
      'Case studies on successful algorithmic trading strategies.',
      'Updated for the post-2024 financial regulatory environment.',
    ],
    what_included: [
      'The AI Investing E-Book (PDF, EPUB)',
      '10 Algorithmic Trading Templates (Excel/Google Sheets)',
      'Exclusive Access to Future Updates (Lifetime)',
    ],
    reviews_count: 45,
    rating: 4.8,
  },
  {
    id: 'financial-blueprint-kit',
    name: '2025 Financial Blueprint Kit',
    description: 'Templates and checklists for building a resilient, all-weather financial portfolio.',
    price: 29.00,
    image: '/images/uploads/financial-blueprint-2025.jpg', 
    category: 'Tools & Templates',
    inStock: true,
    details: "Stop guessing and start building financial stability. This kit provides a step-by-step framework to manage budgeting, debt payoff, and diversified investing, specifically designed for today's uncertain economic climate.",
    features: [
      'Automated 50/30/20 Budgeting Calculator.',
      'Debt Snowball vs. Avalanche Comparison Tool.',
      'Checklist for HYSAs and Diversification strategies.',
      'Compatibility with all major spreadsheet software.',
    ],
    what_included: [
      'The Financial Blueprint Kit (Spreadsheet Templates)',
      'Video Tutorial: Setting up your Automated Budget (15 mins)',
      'Monthly Financial Health Audit Checklist (PDF)',
    ],
    reviews_count: 120,
    rating: 4.5,
  },
  {
    id: 'productivity-tracker',
    name: 'Productivity Tracker Pro (Software)',
    description: 'An annual license for the ultimate digital productivity and focus tool.',
    price: 99.99,
    image: '/images/uploads/your-image.jpg', 
    category: 'Software',
    inStock: true,
    details: "Maximize your daily output with our Pomodoro-based productivity software. It uses deep work sessions and AI-driven interruption filtering to ensure you maintain peak focus on your most important tasks.",
    features: [
      'Integrated Pomodoro Timer and Work Logger.',
      'AI-powered Distraction Blocking.',
      'Detailed analytics on your deep work sessions.',
      'Cross-platform support (Desktop & Mobile).',
    ],
    what_included: [
      '1-Year Annual Software License',
      'Dedicated Customer Support',
      'Access to Beta Features',
    ],
    reviews_count: 60,
    rating: 4.9,
  },
  {
    id: 'mind-body-journal',
    name: 'Mind-Body Wellness Journal',
    description: 'A physical journal designed to track bio-wearable data and mental health.',
    price: 24.99,
    image: '/images/uploads/health-wearables-2025.jpg', 
    category: 'E-Books',
    inStock: false,
    details: "This journal is a perfect companion for anyone using bio-wearables (like smart rings or CGMs). Log your objective data alongside your subjective feelings to find meaningful correlations and optimize your wellness journey.",
    features: [
      'Daily logging pages for HRV, Sleep Score, and Stress Level.',
      'Guided prompts for mental health and gratitude.',
      'Durable, high-quality paper and binding.',
      'Undated, for flexible use.',
    ],
    what_included: [
      'One Physical Journal (Limited Edition)',
      'Free Shipping on all orders',
      'Digital Template Backup',
    ],
    reviews_count: 32,
    rating: 4.7,
  },
];

export function getAllProducts() {
  return products;
}

export function getProductById(id) {
  return products.find(p => p.id === id);
}

export function getAllProductIds() {
  return products.map(p => ({
    params: { id: p.id },
  }));
}