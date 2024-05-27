import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Bitacora } from 'src/app/model/Bitacora';
import { Proyecto } from 'src/app/model/Proyecto';
import { Recurso } from 'src/app/model/Recurso';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Router } from '@angular/router';
import { BitacoraService } from 'src/app/services/bitacora.service';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ElementoProyecto } from 'src/app/model/ElementoProyecto';
import { ElementoUtils, Role } from 'src/app/model/Utils';
import { ComentarioBitacora } from 'src/app/model/ComentarioBitacora';
import { AuthService } from 'src/app/services/auth.service';
import { DescargasService } from 'src/app/services/descargas.service';

@Component({
    templateUrl: './bitacora.component.html',
    providers: [ConfirmationService, MessageService]
})

export class BitacoraComponent implements OnInit {

    idBitacora!: number;
    modoEdicion: boolean = false;
    editarInformacion: boolean = false;
    fecha: Date = new Date();
    bitacora!: Bitacora;
    recursos: Recurso[] = [];
    mostrarLinkDialog: boolean = false;
    linkNuevo: string = '';
    tituloProyecto!: ElementoProyecto;
    fechaRegistroText: string = '';
    comentarios: ComentarioBitacora[] = [];
    text: string = '';
    totalpages: number = 1;
    currentPage: number = 0;
    idUsuario!: number;
    mostrarBotonRevision: boolean = false;

    constructor(private location: Location, private proyectoService: ProyectoService,
        private router: Router, private bitacoraService: BitacoraService,
        private descargasService: DescargasService, private datePipe: DatePipe,
        private confirmationService: ConfirmationService, private authService: AuthService) { }

    ngOnInit() {
        this.idUsuario = this.authService.getUserId();
        this.getIdBitacora();
        sessionStorage.setItem('idBitacora', JSON.stringify(this.idBitacora));
        this.getComentarios();
        this.bitacoraService.getBitacora(this.idBitacora).subscribe(bitacora => {
            this.bitacora = bitacora;
            this.getUsuariosAsignados();
            this.fechaRegistroText = this.datePipe.transform(bitacora.fecha, 'dd-MM-yyyy')!;
            this.bitacoraService.getRecursos(this.idBitacora).subscribe(recursos => {
                this.recursos = recursos;
            })
            this.proyectoService.getElementoProyecto(bitacora.idProyecto!, ElementoUtils.ID_ELEMENTO_TITULO).subscribe(elementoProyecto => {
                this.tituloProyecto = elementoProyecto;
            });
        });
    }

    getIdBitacora() {
        this.idBitacora = (this.location.getState() as { data: number }).data;
        if (this.idBitacora == undefined) {
            const storedIdProyecto = sessionStorage.getItem('idBitacora');
            this.idBitacora = storedIdProyecto ? JSON.parse(storedIdProyecto) : undefined;
        }
        if (this.idBitacora == undefined) {
            this.router.navigate(['bitacoras/listado']);
        }
    }

    getUsuariosAsignados() {
        if (this.authService.hasRole(Role.Estudiante)) {
            this.modoEdicion = true;
        } else {
            if (!this.bitacora.revisionSupervisor) {
                this.proyectoService.getSupervisor(this.bitacora.idProyecto!).subscribe(supervisor => {
                    if (supervisor.idUsuario == this.idUsuario.toString()) {
                        this.mostrarBotonRevision = true;
                    }
                });
            }
            if (!this.bitacora.revisionContraparte) {
                console.log('contraparte: ', this.idUsuario)
                this.proyectoService.getUsuarioContraparte(this.bitacora.idProyecto!).subscribe(contraparte => {
                    console.log('contra: ', contraparte);
                    if (contraparte.idUsuario == this.idUsuario.toString()) {
                        this.mostrarBotonRevision = true;
                    }
                });
            }
            if (!this.bitacora.revisionAsesor) {
                this.proyectoService.getUsuarioAsesor(this.bitacora.idProyecto!).subscribe(asesor => {
                    if (asesor.idUsuario == this.idUsuario.toString()) {
                        this.mostrarBotonRevision = true;
                    }
                });
            }
        }
    }

    getComentarios() {
        this.bitacoraService.getComentarios(this.idBitacora, this.currentPage, 5).subscribe(response => {
            this.comentarios = response.content;
            this.totalpages = response.totalPages;
        })
    }

    cargarMasComentarios() {
        this.currentPage++;
        this.bitacoraService.getComentarios(this.idBitacora, this.currentPage, 5).subscribe(response => {
            this.comentarios = this.comentarios.concat(response.content);
        })
    }

    comentar() {
        if (this.text) {
            this.bitacoraService.comentar(this.idBitacora, { comentario: this.text }).subscribe(comentario => {
                this.comentarios.unshift(comentario);
            });
            this.text = '';
        } else {
            console.log('Textarea is empty');
        }
    }

    cargarRecurso(event: any, fileUpload: any) {
        const selectedFile = event.currentFiles[0];
        const fileType = selectedFile.type;
        let recurso = {};
        if (fileType.startsWith('image/')) {
            recurso = { file: selectedFile, icono: "pi pi-image", tipoRecurso: "IMAGEN" };
        } else {
            recurso = { file: selectedFile, icono: "pi pi-file", tipoRecurso: "PDF" };
        }
        this.bitacoraService.agregarRecurso(this.idBitacora, recurso).subscribe(recurso => {
            this.recursos.push(recurso);
        })
        fileUpload.clear();
    }


    eliminarRecurso(recurso: Recurso) {
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Estas seguro de eliminar el recurso?',
            acceptLabel: "Si",
            icon: 'pi pi-trash',
            accept: () => {
                this.bitacoraService.eliminarRecurso(this.idBitacora, recurso.idRecurso!).subscribe(bitacora => {
                    this.bitacora = bitacora;
                    const indexToRemove = this.recursos.indexOf(recurso);
                    if (indexToRemove !== -1) {
                        this.recursos.splice(indexToRemove, 1); // Remove one element at the specified index
                    }
                })
            }
        });
    }

    cargarInforme(event: any, fileUpload: any) {
        const selectedFile = event.currentFiles[0];
        const recurso = { file: selectedFile, icono: "pi pi-book", tipoRecurso: "INFORME MENSUAL" };
        this.bitacoraService.agregarRecurso(this.idBitacora, recurso).subscribe(recurso => {
            this.bitacora.contieneInforme = true;
            this.recursos.push(recurso);
        })
        fileUpload.clear();
    }

    agregarLink() {
        if (this.linkNuevo !== '') {
            this.bitacoraService.agregarRecurso(this.idBitacora, { link: this.linkNuevo, icono: "pi pi-link", tipoRecurso: "LINK" }).subscribe(recurso => {
                this.recursos.push(recurso);
                this.linkNuevo = '';
                this.mostrarLinkDialog = false;
            })
        }

    }

    agregarBitacora() {
    }

    descargarRecurso(recurso: Recurso) {
        let link = recurso.link;
        if (recurso.tipoRecurso !== 'LINK') {
            this.descargasService.descargar(recurso.link!).subscribe(
                requisito => {
                    //this.link = requisito.link;
                    window.open(requisito.link.toString(), '_blank');
                },
                error => console.log('Error getting documento:', error)
            );
        } else {
            window.open(link, '_blank');
        }
    }

    listaBitacoras() {
        this.router.navigate(['bitacoras/listado']);
    }

    guardarEdicionContenido() {
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Estas seguro de guardar los cambios?',
            acceptLabel: "Si",
            icon: 'pi pi-check-circle',
            accept: () => {
                this.bitacoraService.actualizarBitacora(this.idBitacora, this.bitacora).subscribe(bitacora => {
                    this.bitacora = bitacora;
                    this.editarInformacion = false;

                },(error)=>{

                })
            }
        });
    }

    cancelarEdicionContenido() {
        this.bitacoraService.getBitacora(this.idBitacora).subscribe(bitacora => {
            this.bitacora = bitacora;
            this.editarInformacion = false;
        })
    }

    marcarRevisado() {
        this.confirmationService.confirm({
            key: 'confirm1',
            message: 'Estas seguro de marcar el registro como revisado?',
            acceptLabel: "Si",
            icon: 'pi pi-check-circle',
            accept: () => {
                this.bitacoraService.revisarBitacora(this.idBitacora).subscribe(bitacora => {
                    this.mostrarBotonRevision = false;
                    this.bitacora = bitacora;
                })
            }
        });
    }

}
