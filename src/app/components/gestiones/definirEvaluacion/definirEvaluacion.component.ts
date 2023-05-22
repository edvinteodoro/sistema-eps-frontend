import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Proyecto } from 'src/app/model/Proyecto';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/model/Role';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { Phase } from 'src/app/shared/models/phase.model';
import { Etapa } from 'src/app/model/Comentario';
import { Evaluacion } from 'src/app/model/Evaluacion';

@Component({
    templateUrl: './definirEvaluacion.component.html',
    providers: [ConfirmationService, MessageService]
})

export class DefinirEvaluacionComponent implements OnInit {
    proyecto!: Proyecto;
    mostrarRepresentante: boolean = false;
    fecha!: Date;
    representante!: String;

    constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private location: Location,
        private documentosService: DocumentosService, private router: Router, private authService: AuthService, private proyectoService: ProyectoService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.proyecto = (this.location.getState() as { data: Proyecto }).data;
        if (this.proyecto == undefined) {
            const storedProyecto = sessionStorage.getItem('proyectoData');
            this.proyecto = storedProyecto ? JSON.parse(storedProyecto) : null;
        } else {
            sessionStorage.setItem('proyectoData', JSON.stringify(this.proyecto));
        }
    }

    aceptar() {
        const evaluacion: Evaluacion = {
            fecha: this.fecha,
            representante: undefined
        };
        if (this.mostrarRepresentante) {
            evaluacion.representante = this.representante;
        }
        this.proyectoService.definirEvaluacion(this.proyecto.idProyecto, evaluacion).subscribe(
            () => {
                // Request was successful, redirect the user
                this.router.navigate(['gestiones/proyecto'], { state: { data: this.proyecto } });
            },
            (error) => {
                // Request encountered an error, show error message
                console.error(error);
                // Handle the error and display an appropriate error message to the user
            }
        );
    }

    regresar() {
        this.router.navigate(['gestiones/proyecto'], { state: { data: this.proyecto } });
    }

    getCoordinador() {
        if (this.proyecto.coordinador != undefined) {
            return this.proyecto.coordinador!.nombres + ' ' + this.proyecto.coordinador!.apellidos;
        }
        return '';
    }
}
