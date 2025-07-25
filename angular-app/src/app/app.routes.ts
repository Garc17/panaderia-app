import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { BancosComponent } from './pages/bancos/bancos.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { HistoricoComponent } from './pages/historico/historico.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: "", pathMatch: 'full', redirectTo: 'login' },
    { path: "login", component: LoginComponent },
    { path: "home", component: InicioComponent, canActivate: [authGuard] },
    { path: 'bancos', component: BancosComponent, canActivate: [authGuard] },
    { path: 'productos', component: ProductosComponent, canActivate: [authGuard] },
    { path: 'historico', component: HistoricoComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: 'login' }
];
