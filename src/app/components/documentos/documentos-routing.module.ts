import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'documentos', data: { breadcrumb: 'Descargar Documentos' }, loadChildren: () => import('./documentos/documentos.module').then(m => m.DocumentosModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class DocumentosRoutingModule { }
