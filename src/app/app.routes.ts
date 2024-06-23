import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { FinancesComponent } from './pages/finances/finances.component';
import { DashboardComponent } from './pages/finances/components/dashboard/dashboard.component';
import { ExpensesComponent } from './pages/finances/components/expenses/expenses.component';
import { IncomeComponent } from './pages/finances/components/income/income.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'financas', pathMatch: 'full' },
    {
        path: 'financas',
        component: FinancesComponent,
        canActivate: [authGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'saidas', component: ExpensesComponent },
            { path: 'entradas', component: IncomeComponent },
        ]
    }
];