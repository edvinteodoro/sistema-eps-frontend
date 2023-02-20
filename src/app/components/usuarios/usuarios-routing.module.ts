import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'crear-usuario', data: { breadcrumb: 'Crear Usuario' }, loadChildren: () => import('./crearUsuario/crearUsuario.module').then(m => m.CrearUsuarioModule) },
        { path: 'listado', data: { breadcrumb: 'Lista Usuarios' }, loadChildren: () => import('./listado/listado.module').then(m => m.ListadoModule) },        
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class UsuariosRoutingModule { }
