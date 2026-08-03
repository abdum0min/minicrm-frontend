import {
  Briefcase,
  LayoutDashboard,
  ListTodo,
  // Palette,
  User,
  Users,
  UsersRound,
} from 'lucide-react'

import { ROUTES } from '@/shared/config'

export interface NavItem {
  to: string
  label: string
  icon: typeof LayoutDashboard
  adminOnly?: boolean
}

export const NAV_ITEMS: NavItem[] = [
  { to: ROUTES.dashboard, label: 'Dashboard', icon: LayoutDashboard, adminOnly: true },
  { to: ROUTES.customers, label: 'Customers', icon: UsersRound, adminOnly: true },
  { to: ROUTES.projects, label: 'Projects', icon: Briefcase, adminOnly: true },
  { to: ROUTES.tasks, label: 'Tasks', icon: ListTodo },
  { to: ROUTES.users, label: 'Users', icon: Users, adminOnly: true },
  { to: ROUTES.profile, label: 'Profile', icon: User },
  // { to: ROUTES.designSystem, label: 'Design System', icon: Palette },
]