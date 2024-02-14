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

@Component({
    templateUrl: './bitacora.component.html',
    providers: [ConfirmationService, MessageService]
})

export class BitacoraComponent implements OnInit {

    idBitacora!: number;
    modoEdicion: boolean = true;
    editarInformacion: boolean = false;
    fecha: Date = new Date();
    bitacora!: Bitacora;
    recursos: Recurso[] = [];
    mostrarLinkDialog: boolean = false;
    linkNuevo: string = '';
    proyecto!: Proyecto;
    tituloProyecto!: ElementoProyecto;
    fechaReporteText: string = '';
    comentarios: ComentarioBitacora[] = [];
    text: string = '';
    totalpages: number = 1;
    currentPage: number = 0;
    idUsuario!:number;
    mostrarBotonRevision:boolean=false;

    constructor(private location: Location, private proyectoService: ProyectoService,
        private router: Router, private bitacoraService: BitacoraService,
        private documentosService: DocumentosService, private datePipe: DatePipe,
        private confirmationService: ConfirmationService,private authService:AuthService) { }

    ngOnInit() {
        this.idUsuario=this.authService.getUserId();
        if (this.idBitacora == undefined) {
            const storedIdProyecto = sessionStorage.getItem('idBitacora');
            this.idBitacora = storedIdProyecto ? JSON.parse(storedIdProyecto) : undefined;
        }
        if (this.idBitacora != undefined) {
            sessionStorage.setItem('idBitacora', JSON.stringify(this.idBitacora));
            this.getComentarios();
            this.bitacoraService.getBitacora(this.idBitacora).subscribe(bitacora => {
                this.bitacora = bitacora;
                this.fechaReporteText = this.datePipe.transform(bitacora.fechaReporte, 'dd-MM-yyyy')!;
                this.bitacoraService.getRecursos(this.idBitacora).subscribe(recursos => {
                    this.recursos = recursos;
                })
                this.proyectoService.getElementoProyecto(bitacora.idProyecto!, ElementoUtils.ID_ELEMENTO_TITULO).subscribe(elementoProyecto => {
                    this.tituloProyecto = elementoProyecto;
                });
            });
        } else {
            this.router.navigate(['bitacoras/listado']);
        }
    }

    getUsuariosAsignados(){
        if(!this.authService.hasRole(Role.Estudiante)){

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
            this.bitacoraService.agregarRecurso(this.idBitacora, { link: this.linkNuevo, icono: "pi pi-link",tipoRecurso:"LINK" }).subscribe(recurso => {
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
            this.documentosService.getDocumento(recurso.link!).subscribe(
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

}
