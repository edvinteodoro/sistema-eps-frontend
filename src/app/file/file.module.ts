import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileComponent } from './file.component';
import {FileUploadModule} from 'primeng/fileupload';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		FileUploadModule
	],
	declarations: [FileComponent ],
    exports:[FileComponent]
})
export class FileModule { }
