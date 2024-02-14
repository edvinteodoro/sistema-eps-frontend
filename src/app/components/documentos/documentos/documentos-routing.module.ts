import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentosComponent } from './documentos.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DocumentosComponent }
	])],
	exports: [RouterModule]
})
export class DocumentosRoutingModule { }
