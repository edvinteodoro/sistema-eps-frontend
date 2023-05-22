import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Proyecto } from 'src/app/model/Proyecto';
import { DocumentosService } from 'src/app/services/documentos.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/model/Role';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { EditorComponent } from '@tinymce/tinymce-angular';

@Component({
    templateUrl: './editarProyecto.component.html',
    providers: [ConfirmationService, MessageService]
})

export class EditarProyectoComponent implements OnInit {
    @ViewChild('editor') editor!: EditorComponent;
    proyecto!: Proyecto;
    link!: any;
    text: String = '';
    opciones: any = [
        { titulo: "Aceptar Documentos" },
        { titulo: "Solicitar Correccion" },
        { titulo: "Rechazar Proyecto" }
    ]
    opcion: any;
    items: any[] = [
        {
            label: 'Proyecto'
        },
        {
            label: 'Datos Asesor'
        }
    ];

    activeIndex: number = 0;
    visible: boolean = false;


    resetEditor() {
        // Borra el contenido del editor
        this.text = '';

        // Reinicializa el editor
        this.editor.ngOnDestroy();
        this.editor.ngAfterViewInit();
        this.editor.editor.focus(false);
    }


    showDialog() {
        this.visible = true;
    }

    onActiveIndexChange(event: any) {
        console.log('event', event);
        this.activeIndex = event;
    }

    ngOnInit() {
        this.proyecto = (this.location.getState() as { data: Proyecto }).data;
        if (this.proyecto == undefined) {
            this.router.navigate(['/gestiones/listado']);
        }
        //this.proyectoService.getProyectoPorId('10').subscribe(proyecto => this.proyecto=proyecto);
    }

    mostraOpciones(): boolean {
        if (this.authService.getUserRole() == Role.Secretaria) {
            return true;
        }
        return false;
    }

    confirm() {
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Estas seguro de aprobar estos documentos e informacion?',
            acceptLabel: "Si",
            icon: 'pi pi-check',
            accept: () => {
                if (this.authService.getUserRole() == Role.Secretaria) {
                    this.proyectoService.aprobarSecretaria(this.proyecto.idProyecto).pipe().subscribe({
                        next: (data) => {
                            setTimeout(() => {
                                this.router.navigate(['/gestiones/listado']);
                            }, 2000);
                        }
                    });
                } else if (this.authService.getUserRole() == Role.Supervisor) {
                    this.proyectoService.aprobarSupervisor(this.proyecto.idProyecto).pipe().subscribe({
                        next: (data) => {
                            setTimeout(() => {
                                this.router.navigate(['/gestiones/listado']);
                            }, 2000);
                        }
                    });
                }
            }
        });
    }

    mostrarBotones(): boolean {
        if (this.authService.getUserRole() != Role.Estudiante) {
            return true;
        }
        return false;
    }

    constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private location: Location,
        private documentosService: DocumentosService, private router: Router, private authService: AuthService, private proyectoService: ProyectoService) { }

    descargar(requisito: any) {
        this.documentosService.getDocumento(requisito.id).subscribe(
            requisito => {
                this.link = requisito.link;
                console.log('link: ', this.link);
                window.open(this.link, '_blank');
            },
            error => console.log('Error getting documento:', error)
        );
    }
}
