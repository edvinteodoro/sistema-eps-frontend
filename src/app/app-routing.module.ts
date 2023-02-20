import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './shared/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: 'auth/login', component: LoginComponent},
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./components/principal/principal.module').then(m => m.PrincipalModule) },
                    { path: 'usuarios', loadChildren: () => import('./components/usuarios/usuarios.module').then(m => m.UsuariosModule) },
                    { path: 'gestiones', loadChildren: () => import('./components/gestiones/gestiones.module').then(m => m.GestionesModule) },
                ],
                canActivate:[AuthGuard]
            },
            { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
