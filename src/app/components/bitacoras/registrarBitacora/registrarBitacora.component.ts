import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Bitacora } from 'src/app/model/Bitacora';
import { Proyecto } from 'src/app/model/Proyecto';
import { Recurso } from 'src/app/model/Recurso';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Router } from '@angular/router';
import { ID_ETAPA_BITACORA, ID_ETAPA_SUBIR_NOTA } from 'src/app/shared/utils/EtapaUtil';
import { ElementoUtils, EtapaUtils } from 'src/app/model/Utils';
@Component({
    templateUrl: './registrarBitacora.component.html',
    providers: [ConfirmationService, MessageService]
})

export class RegistrarBitacoraComponent implements OnInit {
    isLoading: boolean = false;
    validarCampos: boolean = false;

    proyectos: Proyecto[] = [];
    habilitarBitacora: boolean = false;
    bitacora: Bitacora = {
        descripcion: '',
        avance: 0,
        fechaReporte: new Date,
    };
    recursos: Recurso[] = [];
    recursoInforme?: Recurso;
    mostrarLinkDialog: boolean = false;
    linkNuevo: string = '';
    proyecto!: Proyecto;

    constructor(private location: Location, private proyectoService: ProyectoService,
        private router: Router, private confirmationService: ConfirmationService,
        private messageService: MessageService) { }

    ngOnInit() {
        this.proyectoService.getProyectosActivos().subscribe(proyectos => {
            for (const proyecto of proyectos) {
                this.proyectoService.getEtapaActiva(proyecto.idProyecto!).subscribe(etapaActiva => {
                    console.log('etapa: ', etapaActiva);
                    if (etapaActiva.etapa.idEtapa! === EtapaUtils.BITACORA) {
                        this.proyectoService.getElementoProyecto(proyecto.idProyecto!, ElementoUtils.ID_ELEMENTO_TITULO)
                            .subscribe(elementoTitulo => {
                                proyecto.elementoTitulo = elementoTitulo;
                            })
                        this.proyecto = proyecto;
                        this.proyectos.push(proyecto);
                        this.habilitarBitacora = true;
                    }
                });
                console.log('proyecto: ', proyecto.carrera)
            }
        })
    }

    cargarInforme(event: any) {
        const selectedFile = event.currentFiles[0];
        this.recursoInforme = { file: selectedFile, icono: "pi pi-book", tipoRecurso:"INFORME MENSUAL"};
    }

    cargarRecurso(event: any, fileUpload: any) {
        const selectedFile = event.currentFiles[0];
        const fileType = selectedFile.type;
        if (fileType.startsWith('image/')) {
            this.recursos.push({ file: selectedFile, icono: "pi pi-image", tipoRecurso:"IMAGEN" });
        } else {
            this.recursos.push({ file: selectedFile, icono: "pi pi-file",tipoRecurso:"PDF" });
        }
        fileUpload.clear();
    }

    eliminarRecurso(recurso: Recurso) {
        const indexToRemove = this.recursos.indexOf(recurso);
        if (indexToRemove !== -1) {
            this.recursos.splice(indexToRemove, 1); // Remove one element at the specified index
        }
    }

    eliminarRecursoInforme(informeFile: any) {
        this.recursoInforme = undefined;
        informeFile.clear();
    }

    agregarLink() {
        if (this.linkNuevo !== '') {
            this.recursos.push({ link: this.linkNuevo, icono: "pi pi-link",tipoRecurso:"LINK" })
        }
        this.linkNuevo = '';
        this.mostrarLinkDialog = false;
    }

    agregarBitacora() {
        this.validarCampos = true;
        if (!this.isFieldInvalid(this.bitacora.descripcion) &&
            !this.isFieldInvalid(this.bitacora.fechaReporte) &&
            !this.isFieldInvalid(this.bitacora.avance)) {
            this.confirmationService.confirm({
                key: 'confirm1',
                message: '¿Estas seguro de agregar registro de bitacora?',
                acceptLabel: "Si",
                icon: 'pi pi-check-circle',
                accept: () => {
                    this.bitacora.recursos = this.recursos;
                    this.proyectoService.agregarBitacora(this.proyecto.idProyecto!, this.bitacora).subscribe(
                        (bitacora) => {
                            this.messageService.add({ key: 'tst', severity: 'success', summary: 'Registro Creado', detail: 'Se ha creado el registro exitosamente' });
                            if (this.recursoInforme) {
                                this.proyectoService.agregarRecursoBitacora(bitacora.idBitacora, this.recursoInforme).subscribe();
                            }
                            this.recursos.forEach(recurso => {
                                this.proyectoService.agregarRecursoBitacora(bitacora.idBitacora, recurso).subscribe();
                            });
                            setTimeout(() => {
                                this.revisarBitacora(bitacora);
                            }, 2000);
                        },
                        (error) => {
                            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'No se puedo crear el registro' });
                        }
                    );
                    console.log('Bitacora: ', this.bitacora);
                }
            });
        }
    }

    isFieldInvalid(field: any): boolean {
        if (field == undefined && this.validarCampos) {
            return true;
        } else if (typeof field === 'string') {
            return this.validarCampos && field.trim() === '';
        }
        return false;
    }

    revisarBitacora(bitacora: Bitacora) {
        this.router.navigate(['bitacoras/bitacora'], { state: { data: bitacora.idBitacora } });
    }

}
