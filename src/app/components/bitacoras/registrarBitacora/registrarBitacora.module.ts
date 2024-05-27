import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistrarBitacoraComponent } from './registrarBitacora.component';
import { RegistrarBitacoraRoutingModule } from './registrarBitacora-routing.module';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
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
import { StepsModule } from 'primeng/steps';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { PhaseModule } from 'src/app/phase/phase.module';
import { CommentModule } from 'src/app/comment/comment.module';
import { TagModule } from 'primeng/tag';
import { MenuModule } from 'primeng/menu';
import { RadioButtonModule } from 'primeng/radiobutton';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RegistrarBitacoraRoutingModule,
		AutoCompleteModule,
		CalendarModule,
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
		PanelModule,
		StepsModule,
		DialogModule,
		DividerModule,
		PhaseModule,
		CommentModule,
		TagModule,
		MenuModule,
		RadioButtonModule
	],
	declarations: [RegistrarBitacoraComponent]
})
export class RegistrarBitacoraModule { }
