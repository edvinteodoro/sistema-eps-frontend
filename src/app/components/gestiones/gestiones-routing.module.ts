import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'crear-proyecto', data: { breadcrumb: 'Crear Proyecto' }, loadChildren: () => import('./crearProyecto/crearProyecto.module').then(m => m.CrearProyectoModule) },
        { path: 'proyecto', data: { breadcrumb: 'Ver Proyecto' }, loadChildren: () => import('./proyecto/proyecto.module').then(m => m.ProyectoModule) },
        { path: 'listado', data: { breadcrumb: 'Proyectos' }, loadChildren: () => import('./listado/listado.module').then(m => m.ListadoModule) },
        { path: 'definir-evaluacion', data: { breadcrumb: 'Definir Evaluacion' }, loadChildren: () => import('./definirEvaluacion/definirEvaluacion.module').then(m => m.DefinirEvaluacionModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class GestionesRoutingModule { }
