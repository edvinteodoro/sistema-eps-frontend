import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProrrogaRoutingModule } from './prorroga-routing.module';
import { ProrrogaComponent } from './prorroga.component';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { DividerModule } from 'primeng/divider';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    ProrrogaComponent
  ],
  imports: [
    CommonModule,
    ProrrogaRoutingModule,
    FormsModule,
    ToastModule,
    RadioButtonModule,
    InputTextareaModule,
    InputTextModule,
    FileUploadModule,
    InputNumberModule,
    DividerModule,
    ConfirmDialogModule,
    DialogModule,
    ProgressSpinnerModule
  ]
})
export class ProrrogaModule {
}
