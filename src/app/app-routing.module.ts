import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './shared/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            //{ path: 'auth/login', component: LoginComponent },
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', redirectTo:'gestiones/listado', pathMatch:'full' },
                    { path: 'usuarios', loadChildren: () => import('./components/usuarios/usuarios.module').then(m => m.UsuariosModule) },
                    { path: 'gestiones', loadChildren: () => import('./components/gestiones/gestiones.module').then(m => m.GestionesModule) },
                    { path: 'bitacoras', loadChildren: () => import('./components/bitacoras/bitacoras.module').then(m => m.BitacorasModule) },
                    { path: 'actas', loadChildren: () => import('./components/actas/actas.module').then(m => m.ActasModule) },
                    { path: 'prorroga', loadChildren: () => import('./components/prorroga/prorroga.module').then(m => m.ProrrogaModule) },
                    { path: 'documentos', loadChildren: () => import('./components/documentos/documentos.module').then(m => m.DocumentosModule) }
                ],
                canActivate: [AuthGuard]
            },
            { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./components/landing/landing.module').then(m => m.LandingModule) },
            { path: '**', component: NotfoundComponent },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
