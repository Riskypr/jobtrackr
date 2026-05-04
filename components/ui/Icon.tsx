"use client";

import { 
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Building2,
  CalendarDays,
  Circle,
  Check,
  CheckCircle, 
  ChevronRight,
  ChevronUp,
  Clock,
  Database,
  Filter, 
  LayoutDashboard,
  LayoutGrid,
  LogOut,
  Moon,
  Mail,
  Heart,
  Plus,
  RotateCw,
  Save, 
  Search,
  Settings,
  Sparkles,
  Sun,
  Target,
  Trash2,
  TrendingUp,
  User,
  X,
  XCircle,
  Zap,
  type LucideProps 
} from "lucide-react";

// tipe nama icon yang tersedia
export type IconName = 
  | "activity"
  | "alert-triangle"
  | "arrowleft"
  | "arrowright"
  | "arrow-up-right"
  | "briefcase"
  | "building2"
  | "clock"
  | "check-circle"
  | "circle"
  | "check" 
  | "database"
  | "plus" 
  | "search" 
  | "filter" 
  | "dashboard" 
  | "settings" 
  | "logout" 
  | "moon"
  | "heart" 
  | "mail"
  | "rotate-cw"
  | "sun"
  | "save" 
  | "user" 
  | "zap"
  | "target"
  | "trash2"
  | "trending-up"
  | "sparkles"
  | "chevronright"
  | "layout-grid" 
  | "calendar"
  | "chevron-up"
  | "x"
  | "x-circle";

interface IconProps extends LucideProps {
  name: IconName;
}

const icons = {
  activity: Activity,
  arrowleft: ArrowLeft,
  arrowright: ArrowRight,
  "arrow-up-right": ArrowUpRight,
  "alert-triangle": AlertTriangle,
  briefcase: Briefcase,
  building2: Building2,
  "check-circle": CheckCircle,
  circle: Circle,
  check: Check,
  clock: Clock,
  database: Database,
  plus: Plus,
  search: Search,
  filter: Filter,
  dashboard: LayoutDashboard,
  save: Save,
  settings: Settings,
  heart:Heart,
  logout: LogOut,
  moon: Moon,
  mail: Mail,
  sun: Sun,
  user: User,
  "rotate-cw": RotateCw,
  target: Target,
  "trending-up": TrendingUp,
  trash2: Trash2,
  zap: Zap,
  sparkles: Sparkles,
  chevronright: ChevronRight,
  "layout-grid":LayoutGrid,
  calendar: CalendarDays,
  "chevron-up": ChevronUp,
  x:X,
  "x-circle": XCircle,
};

export function Icon({ name, ...props }: IconProps) {
  const LucideIcon = icons[name];
  if (!LucideIcon) return null; // Fallback jika nama tidak ditemukan

  return <LucideIcon {...props} />;
}