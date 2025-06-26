// Core domain types
export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  kycStatus: KYCStatus;
  createdAt: string;
  lastLoginAt?: string;
  isActive: boolean;
}

export interface UserProfile {
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  country: string;
  phoneNumber?: string;
  avatarUrl?: string;
}

export interface MarketplaceService {
  id: string;
  name: string;
  title?: string; // Alternative to name for display
  category: ServiceCategory;
  description: string;
  fullDescription?: string; // Detailed description for service detail page
  price?: number;
  originalPrice?: number; // For sales/discounts
  imageUrl: string;
  image?: string; // Alternative to imageUrl
  providerId: string;
  provider?: string; // Provider display name
  vendor?: string; // Alternative to provider
  vendorAvatar?: string; // Vendor avatar URL
  isActive: boolean;
  isFeatured: boolean;
  featured?: boolean; // Alternative to isFeatured
  rating?: number;
  reviews?: number; // Number of reviews
  purchaseCount?: number;
  features?: string[];
  tags?: string[]; // Service tags like "Popular", "New"
  compatibility?: string[]; // Tech compatibility list
  demoUrl?: string; // Demo/preview URL
  documentation?: string; // Documentation URL
  isPopular?: boolean;
  isNew?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceProvider {
  id: string;
  companyName: string;
  contactEmail: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Tournament {
  id: string;
  name: string;
  gameType: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  currentParticipants: number;
  prizePool: number;
  entryFee: number;
  status: TournamentStatus;
  description: string;
  rules: string[];
  organizerId: string;
  createdAt: string;
  updatedAt: string;
  participants?: User[];
}

export interface Purchase {
  id: string;
  userId: string;
  serviceId: string;
  amount: number;
  purchaseDate: string;
  status: PurchaseStatus;
  service?: MarketplaceService;
}

export interface Prize {
  id: string;
  name: string;
  value: number;
  type: PrizeType;
  isAvailable: boolean;
  claimedBy?: string;
  claimedAt?: string;
  imageUrl?: string;
}

export interface GameSession {
  id: string;
  userId: string;
  gameType: string;
  startTime: string;
  endTime?: string;
  score?: number;
  isCompleted: boolean;
}

export interface JackpotGame {
  id: string;
  name: string;
  currentJackpot: number;
  minimumBet: number;
  lastWinner?: string;
  lastWinDate?: string;
  isActive: boolean;
  imageUrl: string;
}

// Enums
export enum ServiceCategory {
  // Original gaming categories
  SmartICOPlugins = 'smartico_plugins',
  SEONFraudProtection = 'seon_fraud_protection',
  iGamingServers = 'igaming_servers',
  GameTournaments = 'game_tournaments',
  VirtualPitBoss = 'virtual_pit_boss',
  FreeGames = 'free_games',
  JackpotGames = 'jackpot_games',
  RandomPrizes = 'random_prizes',
  
  // New operator service categories
  DepositMethods = 'deposit_methods',
  PlayerJourneys = 'player_journeys',
  FraudPlayerProtection = 'fraud_player_protection',
  CRM = 'crm',
  AICallCentreComms = 'ai_call_centre_comms',
  CustomerManagement = 'customer_management',
  Reporting = 'reporting',
  Fraud = 'fraud',
  ComplianceAggregators = 'compliance_aggregators',
  NationalRegulator = 'national_regulator',
  Loyalty = 'loyalty',
  CryptoBlockchain = 'crypto_blockchain',
  Risk = 'risk',
  GameAggregator = 'game_aggregator'
}

export enum KYCStatus {
  NotStarted = 'not_started',
  InProgress = 'in_progress',
  Verified = 'verified',
  Rejected = 'rejected',
  Expired = 'expired'
}

export enum PurchaseStatus {
  Pending = 'pending',
  Completed = 'completed',
  Failed = 'failed',
  Refunded = 'refunded',
  Cancelled = 'cancelled'
}

export enum TournamentStatus {
  Upcoming = 'upcoming',
  Registration = 'registration',
  Active = 'active',
  InProgress = 'in_progress',
  Completed = 'completed',
  Cancelled = 'cancelled'
}

export enum PrizeType {
  Cash = 'cash',
  Credits = 'credits',
  Service = 'service',
  Physical = 'physical',
  Experience = 'experience'
}

export enum Theme {
  Light = 'light',
  Dark = 'dark'
}

// UI-specific types
export interface ServiceTileData {
  service: MarketplaceService;
  categoryInfo: CategoryInfo;
}

export interface CategoryInfo {
  name: string;
  icon: string;
  colors: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  description: string;
}

export interface FeaturedItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  type: 'service' | 'tournament' | 'jackpot' | 'prize';
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterForm {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  country: string;
  agreeToTerms: boolean;
}

export interface ServiceFilter {
  category?: ServiceCategory;
  categories?: ServiceCategory[];
  minPrice?: number;
  maxPrice?: number;
  isFeatured?: boolean;
  searchTerm?: string;
  isActive?: boolean;
}

// Component prop types
export interface HeaderProps {
  theme: Theme;
  onThemeToggle: () => void;
  user?: User;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
}

export interface MarketplaceTileProps {
  service: MarketplaceService;
  onClick: (service: MarketplaceService) => void;
  className?: string;
}

export interface FeaturedCarouselProps {
  items: FeaturedItem[];
  maxItems?: number;
  autoPlay?: boolean;
  showDots?: boolean;
  interval?: number;
}

export interface AuthModalProps {
  isOpen: boolean;
  mode: 'login' | 'register';
  onClose: () => void;
  onSuccess: (user: User) => void;
  onModeSwitch: (mode: 'login' | 'register') => void;
}

// Redux store types
export interface RootState {
  auth: AuthState;
  marketplace: MarketplaceState;
  ui: UIState;
  tournaments: TournamentState;
  gaming: GamingState;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface MarketplaceState {
  services: MarketplaceService[];
  featuredServices: MarketplaceService[];
  categories: ServiceCategory[];
  filter: ServiceFilter;
  isLoading: boolean;
  error: string | null;
}

export interface UIState {
  theme: Theme;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  isMobileMenuOpen: boolean;
  notifications: Notification[];
}

export interface TournamentState {
  tournaments: Tournament[];
  userTournaments: Tournament[];
  isLoading: boolean;
  error: string | null;
}

export interface GamingState {
  jackpotGames: JackpotGame[];
  freeGames: MarketplaceService[];
  prizes: Prize[];
  gameSession: GameSession | null;
  isLoading: boolean;
  error: string | null;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  isRead: boolean;
  createdAt: string;
}

// Utility types
export type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed';

export type SortOrder = 'asc' | 'desc';

export type SortField = 'name' | 'price' | 'createdAt' | 'updatedAt';

export interface SortConfig {
  field: SortField;
  order: SortOrder;
}

// Event handler types
export type ServiceSelectHandler = (service: MarketplaceService) => void;
export type PurchaseHandler = (serviceId: string) => void;
export type TournamentJoinHandler = (tournamentId: string) => void;
export type PrizeClaimHandler = (prizeId: string) => void;

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

// Theme configuration
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    warning: string;
    success: string;
    info: string;
  };
  fonts: {
    primary: string;
    heading: string;
    mono: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}
