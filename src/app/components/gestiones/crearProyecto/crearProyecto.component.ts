import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';

interface Carrera {
    name: string,
    code: string
}

interface Campo{
    class: string,
    valor: any
}

@Component({
    templateUrl: './crearProyecto.component.html',
    providers: [ConfirmationService,MessageService]
})

export class CrearProyectoComponent implements OnInit {
    titulo!:String;
    campos:Campo[] = [
        {class:'', valor:undefined},
        {class:'', valor:undefined},
        {class:'', valor:undefined},
        {class:'', valor:undefined},
        {class:'', valor:undefined},
        {class:'', valor:undefined},
        {class:'', valor:undefined},
    ];
    errorLabel!:Message;
    carreras: Carrera[];
    carreraSeleccionada!: any;

    ngOnInit() {
    }

    showErrorViaToast() {
        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
    }

    constructor(private confirmationService: ConfirmationService,private messageService: MessageService) {
        this.carreras = [
            {name: 'Ingenieria en sistemas', code: '1'},
            {name: 'Ingenieria civil', code: '2'}
        ];
    }
    confirm() {
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Estas seguro de crear el proyecto?',
            acceptLabel:"Si",
            icon:'pi pi-check-circle',
            accept: ()=>{
                this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Validation failed' });   
                if(this.validarCampos()){

                }else{
                    this.errorLabel = {severity:'error', summary:'Error', detail:'Message Content'};
                } 
            }
        });
    }
    cancelar(){
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Estas seguro de cancelar la creacion del proyecto?',
            acceptLabel:"Si",
            icon:'pi pi-times-circle',
            accept: ()=>{
                if(this.validarCampos()){
                    //llamar la api    
                }     
            }
        });
    }
    onUploadConstancia(event: any) {
        this.campos[1].valor=event.currentFiles[0];
    }
    onRemoveConstancia() {
        this.campos[1].valor=undefined;
    }
    onUploadPropedeutico(event: any) {
        this.campos[2].valor=event.currentFiles[0];
    }
    onRemovePropedeutico() {
        this.campos[2].valor=undefined;
    }
    onUploadCertificado(event: any) {
        this.campos[3].valor=event.currentFiles[0];
    }
    onRemoveCertificado() {
        this.campos[3].valor=undefined;
    }
    onUploadAnteproyecto(event: any) {
        this.campos[4].valor=event.currentFiles[0];
    }
    onRemoveAnteproyecto() { 
        this.campos[4].valor=undefined;
    }

    validarCampos(){
        var valido:boolean=true; 
        this.campos.forEach(campo => {
            if(campo.valor==undefined || campo.valor==''){ 
                campo.class='p-error block';
                valido=false;    
            }else{
                campo.class='';
            }
        });
        
        return valido;
    }

}
