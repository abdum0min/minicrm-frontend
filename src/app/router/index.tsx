import { Route, Routes } from 'react-router-dom'

import { CustomersPage } from '@/pages/customers-page'
import { DashboardPage } from '@/pages/dashboard-page'
import { DesignSystemPage } from '@/pages/design-system-page'
import { LoginPage } from '@/pages/login-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { ProfilePage } from '@/pages/profile-page'
import { ProjectsPage } from '@/pages/projects-page'
import { TasksPage } from '@/pages/tasks-page'
import { UsersPage } from '@/pages/users-page'
import { ROUTES } from '@/shared/config'
import { AuthLayout } from '../layouts/auth-layout'
import { DashboardLayout } from '../layouts/dashboard-layout'
import { AdminRoute, GuestRoute, ProtectedRoute } from './guards'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.login} element={<LoginPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path={ROUTES.dashboard} element={<DashboardPage />} />
          <Route path={ROUTES.customers} element={<CustomersPage />} />
          <Route path={ROUTES.projects} element={<ProjectsPage />} />
          <Route path={ROUTES.tasks} element={<TasksPage />} />
          <Route path={ROUTES.profile} element={<ProfilePage />} />
          <Route path={ROUTES.designSystem} element={<DesignSystemPage />} />

          <Route element={<AdminRoute />}>
            <Route path={ROUTES.users} element={<UsersPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
