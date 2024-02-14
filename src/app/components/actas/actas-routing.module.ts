import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'listado', data: { breadcrumb: 'actas' }, loadChildren: () => import('./listado/listado.module').then(m => m.ListadoModule) },
        { path: 'acta', data: { breadcrumb: 'acta' }, loadChildren: () => import('./acta/acta.module').then(m => m.ActaModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ActasRoutingModule { }
