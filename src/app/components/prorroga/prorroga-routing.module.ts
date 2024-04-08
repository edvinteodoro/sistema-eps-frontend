import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'listado', data: { breadcrumb: 'Prorrogas' }, loadChildren: () => import('./listado/listado.module').then(m => m.ListadoModule) },
        { path: 'nuevo', data: { breadcrumb: 'Nuevo' }, loadChildren: () => import('./nuevo/nuevo.module').then(m => m.NuevoModule) },
        { path: 'prorroga', data: { breadcrumb: 'Prorroga' }, loadChildren: () => import('./prorroga/prorroga.module').then(m => m.ProrrogaModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ProrrogaRoutingModule { }
