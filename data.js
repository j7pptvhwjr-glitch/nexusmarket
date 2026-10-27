/* ========================================
   NEXUS MARKETPLACE - MOCK DATA
   ======================================== */

const marketplaceData = {
  // Categories
  categories: [
    {
      id: 'templates',
      name: 'Templates',
      description: 'Ready-to-use website & app templates',
      count: 3420,
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>`,
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'plugins',
      name: 'Plugins & Extensions',
      description: 'Powerful addons for your favorite tools',
      count: 1850,
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`,
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'courses',
      name: 'Courses',
      description: 'Learn from industry experts',
      count: 980,
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
      gradient: 'from-rose-500 to-pink-600'
    },
    {
      id: 'assets',
      name: 'Design Assets',
      description: 'UI kits, icons, illustrations & more',
      count: 4200,
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      id: 'tools',
      name: 'Dev Tools',
      description: 'CLI tools, libraries & productivity boosters',
      count: 1100,
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'services',
      name: 'Services',
      description: 'Professional services & consultations',
      count: 650,
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
      gradient: 'from-violet-500 to-fuchsia-600'
    }
  ],

  // Products
  products: [
    {
      id: 1,
      title: 'SaaSify - Next.js SaaS Boilerplate',
      description: 'Production-ready SaaS starter with auth, billing, teams, and admin dashboard. Save months of development.',
      category: 'templates',
      subcategory: 'Next.js / React',
      price: 149,
      originalPrice: 299,
      rating: 4.9,
      reviews: 342,
      sales: 2840,
      badge: 'featured',
      author: { name: 'DevCraft Studio', avatar: 'DC', verified: true },
      tags: ['Next.js 14', 'TypeScript', 'Tailwind', 'Prisma', 'Stripe'],
      images: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800'],
      features: ['Authentication (NextAuth)', 'Stripe Subscriptions', 'Team Management', 'Admin Dashboard', 'Email Templates', 'Dark Mode', 'API Routes', 'Database Setup'],
      updatedAt: '2024-01-15',
      createdAt: '2023-11-20'
    },
    {
      id: 2,
      title: 'VueMastery - Complete Vue 3 Course',
      description: 'Master Vue 3 from basics to advanced patterns. Includes Composition API, Pinia, Vue Router, Testing, and 3 real projects.',
      category: 'courses',
      subcategory: 'Vue.js',
      price: 89,
      originalPrice: 149,
      rating: 4.8,
      reviews: 567,
      sales: 4200,
      badge: 'hot',
      author: { name: 'Sarah Chen', avatar: 'SC', verified: true },
      tags: ['Vue 3', 'Composition API', 'Pinia', 'Vitest', 'TypeScript'],
      images: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'],
      features: ['40+ Hours Video', '3 Real Projects', 'Source Code Included', 'Lifetime Access', 'Discord Community', 'Certificate'],
      updatedAt: '2024-01-10',
      createdAt: '2023-09-01'
    },
    {
      id: 3,
      title: 'UI Kit Pro - 500+ Components',
      description: 'Massive React component library with Figma files. Built with Radix UI + Tailwind. Fully accessible & customizable.',
      category: 'assets',
      subcategory: 'React / Figma',
      price: 79,
      originalPrice: 129,
      rating: 4.9,
      reviews: 892,
      sales: 6500,
      badge: 'new',
      author: { name: 'PixelPerfect', avatar: 'PP', verified: true },
      tags: ['React', 'Tailwind', 'Radix UI', 'Figma', 'Storybook'],
      images: ['https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800'],
      features: ['500+ Components', 'Figma Source Files', 'Storybook Docs', 'Dark Mode', 'RTL Support', 'TypeScript', 'Tree Shakeable'],
      updatedAt: '2024-01-18',
      createdAt: '2023-12-01'
    },
    {
      id: 4,
      title: 'Analytics Pro - Privacy-First Analytics',
      description: 'Self-hosted analytics platform. GDPR compliant, no cookies, real-time dashboards. Alternative to Google Analytics.',
      category: 'tools',
      subcategory: 'Node.js / Go',
      price: 199,
      originalPrice: 399,
      rating: 4.7,
      reviews: 234,
      sales: 1100,
      badge: 'sale',
      author: { name: 'DataFlow Labs', avatar: 'DF', verified: true },
      tags: ['Node.js', 'Go', 'PostgreSQL', 'Docker', 'GDPR'],
      images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'],
      features: ['Real-time Dashboard', 'No Cookies', 'Self-hosted', 'Custom Events', 'Funnels', 'Retention', 'API Access'],
      updatedAt: '2024-01-12',
      createdAt: '2023-10-15'
    },
    {
      id: 5,
      title: 'FormCraft - React Form Builder',
      description: 'Drag-and-drop form builder with validation, conditional logic, and 40+ field types. Export to React Hook Form / Zod.',
      category: 'plugins',
      subcategory: 'React Plugin',
      price: 59,
      originalPrice: 99,
      rating: 4.8,
      reviews: 445,
      sales: 3200,
      badge: 'featured',
      author: { name: 'FormLabs', avatar: 'FL', verified: true },
      tags: ['React', 'React Hook Form', 'Zod', 'TypeScript', 'Drag & Drop'],
      images: ['https://images.unsplash.com/photo-1586717791821-3f44e58318e9?w=800'],
      features: ['Visual Builder', 'Conditional Logic', '40+ Field Types', 'Export Code', 'Validation', 'Multi-step Forms', 'File Uploads'],
      updatedAt: '2024-01-08',
      createdAt: '2023-11-10'
    },
    {
      id: 6,
      title: 'DevFlow - VS Code Extension Pack',
      description: 'Curated extension pack for full-stack developers. Includes snippets, themes, debuggers, and productivity tools.',
      category: 'plugins',
      subcategory: 'VS Code',
      price: 29,
      originalPrice: 49,
      rating: 4.6,
      reviews: 1200,
      sales: 8500,
      badge: 'hot',
      author: { name: 'CodeCraft', avatar: 'CC', verified: true },
      tags: ['VS Code', 'Extensions', 'Themes', 'Snippets', 'Debugging'],
      images: ['https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800'],
      features: ['25 Extensions', 'Custom Themes', 'Snippet Library', 'Debug Configs', 'Git Workflow', 'AI Assistants'],
      updatedAt: '2024-01-05',
      createdAt: '2023-08-20'
    },
    {
      id: 7,
      title: 'MobileKit - React Native Starter',
      description: 'Expo + TypeScript starter with navigation, auth, push notifications, and app store deployment guides.',
      category: 'templates',
      subcategory: 'React Native / Expo',
      price: 129,
      originalPrice: 199,
      rating: 4.8,
      reviews: 187,
      sales: 1450,
      badge: 'new',
      author: { name: 'MobileFirst', avatar: 'MF', verified: true },
      tags: ['React Native', 'Expo', 'TypeScript', 'Expo Router', 'EAS Build'],
      images: ['https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800'],
      features: ['Expo Router v3', 'Authentication', 'Push Notifications', 'Deep Linking', 'EAS Config', 'App Store Guides', 'OTA Updates'],
      updatedAt: '2024-01-20',
      createdAt: '2023-12-10'
    },
    {
      id: 8,
      title: 'Design System Kit - Figma + Code',
      description: 'Complete design system with 200+ components, tokens, documentation. Sync between Figma and code automatically.',
      category: 'assets',
      subcategory: 'Figma / React',
      price: 159,
      originalPrice: 249,
      rating: 4.9,
      reviews: 312,
      sales: 2100,
      badge: 'featured',
      author: { name: 'SystemUI', avatar: 'SU', verified: true },
      tags: ['Figma', 'React', 'Design Tokens', 'Storybook', 'Chromatic'],
      images: ['https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800'],
      features: ['200+ Components', 'Design Tokens', 'Auto-layout', 'Dark Mode', 'Documentation', 'Figma Plugin', 'CI/CD Sync'],
      updatedAt: '2024-01-14',
      createdAt: '2023-11-01'
    },
    {
      id: 9,
      title: 'API Fortress - Backend Boilerplate',
      description: 'Node.js/Express API starter with TypeScript, Prisma, JWT, Rate Limiting, Swagger, Tests, and Docker.',
      category: 'templates',
      subcategory: 'Node.js / Express',
      price: 89,
      originalPrice: 149,
      rating: 4.7,
      reviews: 278,
      sales: 1900,
      badge: 'sale',
      author: { name: 'BackendPro', avatar: 'BP', verified: true },
      tags: ['Node.js', 'Express', 'TypeScript', 'Prisma', 'JWT', 'Docker'],
      images: ['https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800'],
      features: ['TypeScript', 'Prisma ORM', 'JWT Auth', 'Rate Limiting', 'Swagger Docs', 'Unit Tests', 'Docker', 'CI/CD'],
      updatedAt: '2024-01-11',
      createdAt: '2023-10-01'
    },
    {
      id: 10,
      title: 'Motion One - Animation Library',
      description: 'Lightweight animation library for React, Vue, and Vanilla JS. 3kb gzipped. Spring, timeline, and scroll animations.',
      category: 'tools',
      subcategory: 'JavaScript Library',
      price: 39,
      originalPrice: 59,
      rating: 4.8,
      reviews: 567,
      sales: 4800,
      badge: 'hot',
      author: { name: 'Matt Perry', avatar: 'MP', verified: true },
      tags: ['JavaScript', 'React', 'Vue', 'Vanilla', 'Animations'],
      images: ['https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800'],
      features: ['3kb gzipped', 'Spring Physics', 'Timeline', 'Scroll Anim', 'React/Vue/Vanilla', 'Gesture Support', 'Reduce Motion'],
      updatedAt: '2024-01-03',
      createdAt: '2023-09-15'
    },
    {
      id: 11,
      title: 'E-commerce Template - Full Stack',
      description: 'Complete e-commerce with Next.js, Stripe, Sanity CMS, inventory, orders, and customer dashboard.',
      category: 'templates',
      subcategory: 'Next.js / Sanity',
      price: 199,
      originalPrice: 349,
      rating: 4.9,
      reviews: 156,
      sales: 890,
      badge: 'new',
      author: { name: 'ShopDev', avatar: 'SD', verified: true },
      tags: ['Next.js 14', 'Stripe', 'Sanity CMS', 'Tailwind', 'TypeScript'],
      images: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800'],
      features: ['Product Catalog', 'Cart & Checkout', 'Stripe Payments', 'Order Management', 'Customer Dashboard', 'Inventory', 'Email Notifications'],
      updatedAt: '2024-01-19',
      createdAt: '2023-12-15'
    },
    {
      id: 12,
      title: 'React Query Masterclass',
      description: 'Deep dive into TanStack Query v5. Caching, mutations, infinite scroll, optimistic updates, and testing strategies.',
      category: 'courses',
      subcategory: 'React / TanStack',
      price: 69,
      originalPrice: 99,
      rating: 4.9,
      reviews: 423,
      sales: 3100,
      badge: 'featured',
      author: { name: 'TkDodo', avatar: 'TK', verified: true },
      tags: ['React', 'TanStack Query', 'TypeScript', 'Testing', 'Performance'],
      images: ['https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800'],
      features: ['15+ Hours', 'Advanced Patterns', 'Testing Workshop', 'Source Code', 'Discord Access', 'Lifetime Updates'],
      updatedAt: '2024-01-16',
      createdAt: '2023-11-15'
    }
  ],

  // Testimonials
  testimonials: [
    {
      id: 1,
      text: "Nexus Marketplace completely changed how I build products. The SaaS boilerplate saved me 3 months of work. Best $149 I've ever spent.",
      author: "Marcus Johnson",
      role: "Founder @ TechStart",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      rating: 5
    },
    {
      id: 2,
      text: "The quality control here is unmatched. Every product I've bought works out of the box. The Vue course took me from junior to senior in 6 weeks.",
      author: "Elena Rodriguez",
      role: "Senior Frontend Engineer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      rating: 5
    },
    {
      id: 3,
      text: "As a seller, the revenue split is fair and the payouts are instant. I've made $47k in 8 months selling my React component library.",
      author: "David Park",
      role: "Creator @ UI Components Pro",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      rating: 5
    },
    {
      id: 4,
      text: "The design assets are incredible. I use the UI Kit Pro on every client project. It pays for itself on the first project.",
      author: "Aisha Patel",
      role: "Freelance Designer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      rating: 5
    },
    {
      id: 5,
      text: "Best developer experience I've seen in a marketplace. Search is fast, categories make sense, and the admin panel for sellers is actually usable.",
      author: "James Wilson",
      role: "Full Stack Developer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      rating: 5
    },
    {
      id: 6,
      text: "Analytics Pro replaced Google Analytics for all my clients. Privacy-first, self-hosted, and the dashboards are gorgeous. Highly recommend.",
      author: "Lisa Chen",
      role: "Privacy Consultant",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
      rating: 5
    }
  ],

  // Users (for admin panel)
  users: [
    { id: 1, name: 'Marcus Johnson', email: 'marcus@techstart.io', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', role: 'buyer', joined: '2023-06-15', purchases: 23, spent: 2840, status: 'active' },
    { id: 2, name: 'Elena Rodriguez', email: 'elena@dev.io', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', role: 'buyer', joined: '2023-08-22', purchases: 12, spent: 1200, status: 'active' },
    { id: 3, name: 'David Park', email: 'david@uicomponents.pro', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', role: 'seller', joined: '2023-03-10', purchases: 5, spent: 450, sales: 47000, products: 3, status: 'active' },
    { id: 4, name: 'Aisha Patel', email: 'aisha@designfreelance.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', role: 'buyer', joined: '2023-11-05', purchases: 8, spent: 890, status: 'active' },
    { id: 5, name: 'James Wilson', email: 'james@fullstack.dev', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', role: 'buyer', joined: '2023-01-20', purchases: 31, spent: 4200, status: 'active' },
    { id: 6, name: 'Lisa Chen', email: 'lisa@privacyconsult.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', role: 'buyer', joined: '2023-09-12', purchases: 6, spent: 780, status: 'active' },
    { id: 7, name: 'Sarah Chen', email: 'sarah@vuecourse.com', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100', role: 'seller', joined: '2022-11-01', purchases: 2, spent: 120, sales: 89000, products: 2, status: 'active' },
    { id: 8, name: 'DevCraft Studio', email: 'team@devcraft.studio', avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100', role: 'seller', joined: '2022-08-15', purchases: 0, spent: 0, sales: 234000, products: 5, status: 'active' },
    { id: 9, name: 'PixelPerfect', email: 'hello@pixelperfect.design', avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100', role: 'seller', joined: '2022-10-01', purchases: 1, spent: 89, sales: 156000, products: 4, status: 'active' },
    { id: 10, name: 'DataFlow Labs', email: 'ops@dataflowlabs.io', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100', role: 'seller', joined: '2023-02-20', purchases: 0, spent: 0, sales: 89000, products: 1, status: 'active' }
  ],

  // Orders (for admin panel)
  orders: [
    { id: 'ORD-2024-001', user: 'Marcus Johnson', email: 'marcus@techstart.io', product: 'SaaSify - Next.js SaaS Boilerplate', amount: 149, status: 'completed', date: '2024-01-20', method: 'Stripe' },
    { id: 'ORD-2024-002', user: 'Elena Rodriguez', email: 'elena@dev.io', product: 'VueMastery - Complete Vue 3 Course', amount: 89, status: 'completed', date: '2024-01-20', method: 'PayPal' },
    { id: 'ORD-2024-003', user: 'Aisha Patel', email: 'aisha@designfreelance.com', product: 'UI Kit Pro - 500+ Components', amount: 79, status: 'completed', date: '2024-01-19', method: 'Stripe' },
    { id: 'ORD-2024-004', user: 'James Wilson', email: 'james@fullstack.dev', product: 'Analytics Pro - Privacy-First Analytics', amount: 199, status: 'completed', date: '2024-01-19', method: 'Crypto' },
    { id: 'ORD-2024-005', user: 'Lisa Chen', email: 'lisa@privacyconsult.com', product: 'FormCraft - React Form Builder', amount: 59, status: 'completed', date: '2024-01-18', method: 'Stripe' },
    { id: 'ORD-2024-006', user: 'Marcus Johnson', email: 'marcus@techstart.io', product: 'MobileKit - React Native Starter', amount: 129, status: 'pending', date: '2024-01-18', method: 'Stripe' },
    { id: 'ORD-2024-007', user: 'Elena Rodriguez', email: 'elena@dev.io', product: 'DevFlow - VS Code Extension Pack', amount: 29, status: 'completed', date: '2024-01-17', method: 'PayPal' },
    { id: 'ORD-2024-008', user: 'Aisha Patel', email: 'aisha@designfreelance.com', product: 'Design System Kit - Figma + Code', amount: 159, status: 'completed', date: '2024-01-17', method: 'Stripe' },
    { id: 'ORD-2024-009', user: 'James Wilson', email: 'james@fullstack.dev', product: 'API Fortress - Backend Boilerplate', amount: 89, status: 'refunded', date: '2024-01-16', method: 'Stripe' },
    { id: 'ORD-2024-010', user: 'Lisa Chen', email: 'lisa@privacyconsult.com', product: 'Motion One - Animation Library', amount: 39, status: 'completed', date: '2024-01-16', method: 'Crypto' }
  ],

  // Analytics data
  analytics: {
    revenue: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      data: [45000, 52000, 48000, 61000, 58000, 67000, 72000, 69000, 78000, 85000, 89000, 92000]
    },
    users: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      data: [1200, 1450, 1380, 1620, 1580, 1890, 2100, 2050, 2340, 2580, 2720, 2890]
    },
    categories: {
      labels: ['Templates', 'Plugins', 'Courses', 'Assets', 'Tools', 'Services'],
      data: [35, 22, 15, 18, 7, 3]
    },
    topProducts: [
      { name: 'UI Kit Pro', sales: 6500, revenue: 513500 },
      { name: 'DevFlow VS Code', sales: 8500, revenue: 246500 },
      { name: 'VueMastery Course', sales: 4200, revenue: 373800 },
      { name: 'SaaSify Boilerplate', sales: 2840, revenue: 423160 },
      { name: 'FormCraft Builder', sales: 3200, revenue: 188800 },
      { name: 'Motion One', sales: 4800, revenue: 187200 }
    ]
  }
};

// Export for use in other files
window.marketplaceData = marketplaceData;