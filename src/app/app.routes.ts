import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { FinancesComponent } from './pages/finances/finances.component';
import { DashboardComponent } from './pages/finances/components/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { MovementsComponent } from './pages/finances/components/movements/movements.component';
import { HomeComponent } from './pages/finances/components/home/home.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'financas/home', pathMatch: 'full' },
    {
        path: 'financas',
        component: FinancesComponent,
        canActivate: [authGuard],
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'movimentacoes', component: MovementsComponent },
        ]
    }
];