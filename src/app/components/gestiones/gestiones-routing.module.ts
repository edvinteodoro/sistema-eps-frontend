import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'crear-proyecto', data: { breadcrumb: 'Crear Proyecto' }, loadChildren: () => import('./crearProyecto/crearProyecto.module').then(m => m.CrearProyectoModule) },
        { path: 'proyecto', data: { breadcrumb: 'Ver Proyecto' }, loadChildren: () => import('./proyecto/proyecto.module').then(m => m.ProyectoModule) },
        { path: 'listado', data: { breadcrumb: 'Proyectos' }, loadChildren: () => import('./listado/listado.module').then(m => m.ListadoModule) },
        { path: 'definir-evaluacion', data: { breadcrumb: 'Definir Evaluacion' }, loadChildren: () => import('./definirEvaluacion/definirEvaluacion.module').then(m => m.DefinirEvaluacionModule) },
        { path: 'evaluar-proyecto', data: { breadcrumb: 'Evaluar Proyecto' }, loadChildren: () => import('./evaluarProyecto/evaluarProyecto.module').then(m => m.EvaluarProyectoModule) },
        { path: 'cambiar-usuario', data: { breadcrumb: 'Cambiar Usuario' }, loadChildren: () => import('./cambiarUsuario/cambiarUsuario.module').then(m => m.CambiarUsuarioModule) },
        { path: 'asignar-usuario', data: { breadcrumb: 'Asignar Usuario' }, loadChildren: () => import('./asignarUsuario/asignarUsuario.module').then(m => m.AsignarUsuarioModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class GestionesRoutingModule { }
