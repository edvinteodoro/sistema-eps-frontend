import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'crear-proyecto', data: { breadcrumb: 'Crear Proyecto' }, loadChildren: () => import('./crearProyecto/crearProyecto.module').then(m => m.CrearProyectoModule) },
        { path: 'listado', data: { breadcrumb: 'Proyectos' }, loadChildren: () => import('./listado/listado.module').then(m => m.ListadoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class GestionesRoutingModule { }
