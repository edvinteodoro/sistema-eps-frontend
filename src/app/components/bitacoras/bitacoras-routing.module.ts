import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'listado', data: { breadcrumb: 'bitacoras' }, loadChildren: () => import('./listado/listado.module').then(m => m.ListadoModule) },
        { path: 'registrar-bitacora', data: { breadcrumb: 'registrar-bitacora' }, loadChildren: () => import('./registrarBitacora/registrarBitacora.module').then(m => m.RegistrarBitacoraModule) },
        { path: 'finalizar-bitacora', data: { breadcrumb: 'finalizar-bitacora' }, loadChildren: () => import('./finalizarBitacora/finalizarBitacora.module').then(m => m.FinalizarBitacoraModule) },
        { path: 'bitacora', data: { breadcrumb: 'bitacora' }, loadChildren: () => import('./bitacora/bitacora.module').then(m => m.BitacoraModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class BitacorasRoutingModule { }
