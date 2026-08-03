import { LoginForm } from '@/features/auth'

export function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
        <p className="text-sm text-muted-foreground">Hisobingizga kiring</p>
      </div>

      <LoginForm />

      <p className="rounded-lg bg-muted/60 p-3 text-center text-xs text-muted-foreground">
        Demo: <span className="font-medium text-foreground">admin@mail.com</span> /{' '}
        <span className="font-medium text-foreground">Secret123</span>
      </p>
    </div>
  )
}
