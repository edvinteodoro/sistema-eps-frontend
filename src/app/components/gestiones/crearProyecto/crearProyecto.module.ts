import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StepsModule } from 'primeng/steps';
import { CrearProyectoComponent } from './crearProyecto.component';
import { CrearProyectoRoutingModule } from './crearProyecto-routing.module';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import {GMapModule} from 'primeng/gmap';
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {FileUploadModule} from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { PhaseModule } from 'src/app/phase/phase.module';
import { DividerModule } from 'primeng/divider';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		CrearProyectoRoutingModule,
		AutoCompleteModule,
		CalendarModule,
		GMapModule,
		ChipsModule,
		DropdownModule,
		InputMaskModule,
		InputNumberModule,
		CascadeSelectModule,
		MultiSelectModule,
		InputTextareaModule,
		InputTextModule,
		ConfirmDialogModule,
		FileUploadModule,
		ToastModule,
		StepsModule,
		PanelModule,
		PhaseModule,
		DividerModule
	],
	declarations: [CrearProyectoComponent]
})
export class CrearProyectoModule { }
