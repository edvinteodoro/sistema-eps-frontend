import { Component, Input } from "@angular/core";
import { ElementoProyecto } from "../model/ElementoProyecto";
import { ProyectoService } from "../services/proyecto.service";
import { DescargasService } from "../services/descargas.service";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
    selector:'app-file',
    templateUrl:'./file.component.html'
})
export class FileComponent{
    elementoProyecto?:ElementoProyecto;
    @Input() modoEdicion!:boolean;
    @Input() eliminable:boolean=false;
    @Input() idProyecto!:number;
    @Input() idElemento!:number;
    elementoBloqueado:boolean=true;

    constructor(private proyectoService: ProyectoService,private messageService: MessageService,
        private descargasService: DescargasService,private confirmationService: ConfirmationService) {

    }

    ngOnInit(){
        this.proyectoService.getElementoProyecto(this.idProyecto, this.idElemento).subscribe(elementoProyecto => {
            this.elementoProyecto = elementoProyecto;
        });    
    }

    cargarElemento(event: any, elementoProyecto: ElementoProyecto){
        elementoProyecto.file = event.currentFiles[0];
    }

    descargar(elementoProyecto: ElementoProyecto) {
        this.descargasService.descargar(elementoProyecto.informacion!).subscribe(
            response => {
                window.open(response.link.toString(), '_blank');
            },
            error => console.log('Error getting documento:', error)
        );
    }

    modificarElemento(){
        this.elementoBloqueado = false;
        this.elementoProyecto = {};
    }

    cancelarElemento(){
        this.proyectoService.getElementoProyecto(this.idProyecto, this.idElemento).subscribe(elementoProyecto => {
            this.elementoProyecto = elementoProyecto;
            this.elementoBloqueado = true;
        }, (error) => {
            if(this.eliminable){
                this.elementoProyecto = undefined;
                this.elementoBloqueado = true;
            }
        })
    }

    guardarElemento(){
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Estas seguro de guardar el documento?',
            acceptLabel: "Si",
            icon: 'pi pi-check',
            accept: () => {
                this.proyectoService.agregarElementoProyecto(this.idProyecto, this.idElemento, this.elementoProyecto!).subscribe(
                    elementoProyecto => {
                        this.elementoProyecto = elementoProyecto;
                        this.messageService.add({ key: 'tst', severity: 'success', summary: 'Cambios guardados', detail: 'Los cambios se han guardado exitosamente.' });
                        this.elementoBloqueado = true;
                    }, (error) => {
                        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'No se pudo realizar los cambios.' });
                    }
                )
            }
        });
    }

    eliminarElemento(){
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Estas seguro de eliminar el documento?',
            acceptLabel: "Si",
            icon: 'pi pi-trash',
            accept: () => {
                this.proyectoService.desactivarElementoProyecto(this.elementoProyecto!.idElementoProyecto!)
                    .subscribe(response => {
                        this.elementoProyecto = undefined;
                        this.messageService.add({ key: 'tst', severity: 'success',
                            summary: 'Documento eliminado', detail: 'Se ha eliminado el documento exitosamente'
                        });
                    });
            }
        });
    }
}