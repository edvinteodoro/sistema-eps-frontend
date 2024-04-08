import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProyectoComponent } from './proyecto.component';
import { ProyectoRoutingModule } from './proyecto-routing.module';
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
import { EditorModule } from '@tinymce/tinymce-angular';
import { PanelModule } from 'primeng/panel';
import { StepsModule } from 'primeng/steps';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { PhaseModule } from 'src/app/phase/phase.module';
import { CommentModule } from 'src/app/comment/comment.module';
import { TagModule } from 'primeng/tag';
import { MenuModule } from 'primeng/menu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FileModule } from 'src/app/file/file.module';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ProyectoRoutingModule,
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
		EditorModule,
		PanelModule,
		StepsModule,
		DialogModule,
		DividerModule,
		PhaseModule,
		CommentModule,
		TagModule,
		MenuModule,
        ProgressSpinnerModule,
		FileModule
	],
	declarations: [ProyectoComponent]
})
export class ProyectoModule { }
