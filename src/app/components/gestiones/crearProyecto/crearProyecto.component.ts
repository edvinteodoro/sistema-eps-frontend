import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Carrera } from 'src/app/model/Carrera';
import { Proyecto } from 'src/app/model/Proyecto';
import { CarreraService } from 'src/app/services/carrera.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

interface Campo{
    class: string,
    valor: any
}

@Component({
    templateUrl: './crearProyecto.component.html',
    providers: [ConfirmationService,MessageService]
})

export class CrearProyectoComponent implements OnInit {
    campos:Campo[] = [
        {class:'', valor:undefined},
        {class:'', valor:undefined},
        {class:'', valor:undefined},
        {class:'', valor:undefined},
        {class:'', valor:undefined},
        {class:'', valor:undefined},
        {class:'', valor:undefined},
        {class:'', valor:undefined},
    ];
    carreras!: Carrera[];
    proyecto!:Proyecto;

    ngOnInit() {
        this.usuarioService.getUsuarioCarreras().subscribe(carreras => this.carreras=carreras);
    }

    constructor(private confirmationService: ConfirmationService,private messageService: MessageService,private carreraService:CarreraService,
        private usuarioService: UsuarioService, private proyectoService:ProyectoService) {}
    
    confirm() {
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Estas seguro de crear el proyecto?',
            acceptLabel:"Si",
            icon:'pi pi-check-circle',
            accept: ()=>{   
                if(this.validarCampos()){
                    console.log('Creando proyecto');
                    this.proyecto={
                        titulo: this.campos[0].valor,
                        coordenadas: this.campos[6].valor,
                        carrera: this.campos[7].valor,
                        constanciaInscripcion: this.campos[1].valor,
                        constanciaPropedeutico: this.campos[2].valor,
                        certificadoNacimiento: this.campos[3].valor,
                        cartaAsesorSupervisor: this.campos[4].valor,
                        anteproyecto: this.campos[5].valor,
                    }
                    this.proyectoService.crearProyecto(this.proyecto).subscribe((res: any) => {
                    }, (error) => {
                        if (error.status == 401) {
                            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Sin permisos para crear el proyecto' });
                        } else {
                            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Hubo un error en el sistema' });
                        }
                    })
                }else{
                    this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Ingrese los campos obligatorios' });
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
                this.limpiarCampos();         
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
    onUploadCartaAsesor(event: any){
        this.campos[5].valor=event.currentFiles[0];
    }
    onRemoveCartaAsesor() { 
        this.campos[5].valor=undefined;
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

    limpiarCampos() {
        this.campos = [
            { class: '', valor: undefined },
            { class: '', valor: undefined },
            { class: '', valor: undefined },
            { class: '', valor: undefined },
            { class: '', valor: undefined },
            { class: '', valor: undefined },
            { class: '', valor: undefined },
            { class: '', valor: undefined }
        ];

    }

}
