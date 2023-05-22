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
import { Phase } from 'src/app/shared/models/phase.model';
import { Etapa } from 'src/app/model/Comentario';

@Component({
    templateUrl: './proyecto.component.html',
    providers: [ConfirmationService, MessageService]
})

export class ProyectoComponent implements OnInit {
    @ViewChild('editor') editor!: EditorComponent;
    bloquedo: boolean = true;
    boton2: any = {
        accion: this.confirm.bind(this),
        mostrar: false,
        icono: 'pi pi-check',
        titulo: 'Aceptar'
    }
    boton1: any = {
        accion: this.showDialog.bind(this),
        mostrar: false,
        icono: 'pi pi-comment',
        titulo: 'Solicitar Cambios'
    }
    cambiarInscripcion: boolean = false;
    etapas: Etapa[] = [];
    etapaActiva!: Etapa;
    proyecto!: Proyecto;
    link!: any;
    text: string = '';
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


    constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private location: Location,
        private documentosService: DocumentosService, private router: Router, private authService: AuthService, private proyectoService: ProyectoService) { }


    resetEditor() {
        // Borra el contenido del editor
        this.text = '';

        // Reinicializa el editor
        this.editor.ngOnDestroy();
        this.editor.ngAfterViewInit();
        this.editor.editor.focus(false);
    }

    ngOnInit() {
        this.proyecto = (this.location.getState() as { data: Proyecto }).data;
        if (this.proyecto == undefined) {
            const storedProyecto = sessionStorage.getItem('proyectoData');
            this.proyecto = storedProyecto ? JSON.parse(storedProyecto) : null;
        } else {
            sessionStorage.setItem('proyectoData', JSON.stringify(this.proyecto));
        }

        this.proyectoService.getEtapasProyecto(this.proyecto.idProyecto).subscribe(etapas => {
            this.etapas = etapas;
            this.etapaActiva = etapas[0];
            if (this.authService.getUserRole() == 'Estudiante') {
                if (this.etapaActiva.editable) {
                    this.boton2.mostrar = true;
                    this.boton2.titulo = 'Editar';
                    this.boton2.icono = 'pi pi-pencil';
                    this.boton2.accion = this.editar.bind(this);
                    this.boton1.titulo = 'Cancelar';
                    this.boton1.accion = this.cancelarCambios.bind(this);
                }
            } else {
                if (!this.etapaActiva.editable) {
                    this.boton1.mostrar = true;
                    this.boton2.mostrar = true;
                    if (this.etapaActiva.id == '3') {//id de la etapa definir evaluacion
                        this.boton2.titulo = 'Definir Evaluacion';
                        this.boton2.accion = this.definirEvaluacion.bind(this);
                        this.boton1.titulo = 'Modificar Evaluacion'
                    }
                }
            }
        });
    }

    editar() {
        this.bloquedo = false;
        this.boton1.mostrar = true;
        this.boton1.icono = 'pi pi-times';
        this.boton2.titulo = 'Guardar Cambios';
        this.boton2.icono = 'pi pi-save';
        this.boton2.accion = this.guardarCambios.bind(this);
    }

    cancelarCambios() {
        window.location.reload();
    }

    guardarCambios() {
        this.bloquedo = true;
        this.boton1.mostrar = false;
        this.boton2.mostar = false;
    }

    cambiarDocInscripcion(cambiar: boolean) {
        this.cambiarInscripcion = cambiar;
    }


    showDialog() {
        this.visible = true;
    }

    onActiveIndexChange(event: any) {
        console.log('event', event);
        this.activeIndex = event;
    }

    mostraOpciones(): boolean {
        if (this.authService.getUserRole() == Role.Secretaria) {
            return true;
        }
        return false;
    }

    definirEvaluacion() {
        this.router.navigate(['gestiones/definir-evaluacion'], { state: { data: this.proyecto } });
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
                                this.router.navigate(['gestiones/definir-evaluacion'], { state: { data: this.proyecto } });
                            }, 2000);
                        }
                    });
                }
            }
        });
    }

    comentar() {
        if (this.text) {
            this.proyectoService.comentar(this.proyecto.idProyecto, this.text).subscribe(comentario => this.etapas[0].comentarios.unshift(comentario));
            this.text = '';
        } else {
            console.log('Textarea is empty');
        }
    }

    cargarComentario(etapa: Etapa) {
        this.proyectoService.getComentariosEtapa(this.proyecto.idProyecto, etapa.id).subscribe(comentarios => etapa.comentarios = comentarios);
        etapa.activo = true;
        console.log('comentarios: ', etapa.comentarios);
    }

    mostrarBotones(): boolean {
        if (this.authService.getUserRole() != Role.Estudiante &&
            this.authService.getUserRole() != Role.Asesor) {
            return true;
        }
        return false;
    }

    descargar(requisito: any) {
        console.log('requisitos: ', requisito);
        this.documentosService.getDocumento(requisito.id).subscribe(
            requisito => {
                this.link = requisito.link;
                console.log('link: ', this.link);
                window.open(this.link, '_blank');
            },
            error => console.log('Error getting documento:', error)
        );
    }

    onUploadConstancia(event: any, documento: any) {
        documento = event.currentFiles[0];
    }
}
