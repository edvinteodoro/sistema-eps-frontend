import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Carrera } from 'src/app/model/Carrera';
import { Rol } from 'src/app/model/Rol';
import { Usuario } from 'src/app/model/Usuario';
import { CarreraService } from 'src/app/services/carrera.service';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';

interface Campo {
    class: string,
    valor: any
}

@Component({
    templateUrl: './actualizar.component.html',
    providers: [ConfirmationService, MessageService]
})

export class ActualizarComponent implements OnInit {
    usuarioSeleccionado:Usuario={};
    campos: Campo[] = [
        { class: '', valor: undefined },
        { class: '', valor: undefined },
        { class: '', valor: undefined },
        { class: '', valor: undefined },
        { class: '', valor: undefined },
        { class: '', valor: undefined },
        { class: '', valor: undefined },
        { class: '', valor: undefined }
    ];
    registro: any = { class: '', mostrar: false, valor: undefined };
    colegiado: any = { class: '', mostrar: false, valor: undefined };
    usuario!: Usuario;
    roles!: Rol[];
    carreras!: Carrera[];
    carreraSeleccionada: any = { class: '', mostrar: false, valor: undefined };

    constructor(private confirmationService: ConfirmationService, private rolService: RolService,
        private carreraService: CarreraService, private messageService: MessageService, private usuarioService: UsuarioService,
        private router: Router,private location:Location,private activatedroute:ActivatedRoute) {
    }

    ngOnInit() {
        this.usuarioSeleccionado = (this.location.getState() as { data: Usuario }).data;
        //console.log('data',this.location.getState().data);
        console.log('data',this.usuarioSeleccionado);
        this.rolService.getRoles().subscribe(roles => this.roles=roles);
        this.carreraService.getCarreras().subscribe(carreras => this.carreras=carreras);
    }

    onChange(event: any) {

        this.carreraSeleccionada.mostrar=false;
        this.carreraSeleccionada.valor=undefined;
        this.registro.mostrar=false;
        this.registro.valor=undefined;
        this.colegiado.mostrar=false;
        this.colegiado.valor=undefined;
        if(event.value.contieneCarrera){
            this.carreraSeleccionada.mostrar=true;
        }
        if(event.value.contieneRegistro){
            this.registro.mostrar=true;
        }
        if(event.value.contieneColegiado){
            this.colegiado.mostrar=true;
        }
        console.log('event :' + event);
        console.log(event.value);
    }

    confirm() {
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Estas seguro de crear el usuario?',
            acceptLabel: "Si",
            icon: 'pi pi-check-circle',
            accept: () => {
                if (this.validarCampos()) {
                    this.usuario = {
                        nombres: this.campos[0].valor,
                        apellidos: this.campos[1].valor,
                        correo: this.campos[2].valor,
                        fechaNacimiento: this.campos[3].valor,
                        direccion: this.campos[4].valor,
                        dpi: this.campos[5].valor,
                        telefono: this.campos[6].valor,
                        rol: this.campos[7].valor,
                        carreras: this.carreraSeleccionada.valor,
                        registroAcademico: this.registro.valor,
                        numeroColegiado:this.colegiado.valor
                    }
                    console.log('body ', this.usuario);
                    this.usuarioService.crearUsuario(this.usuario).subscribe((res: any) => {
                        this.limpiarCampos();
                    }, (error) => {
                        if (error.status == 401) {
                            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Sin permisos para crear el usuario' });
                        } else {
                            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Hubo un error en el sistema' });
                        }
                    })
                } else {
                    this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
                }
            }
        });
    }


    cancelar() {
        this.confirmationService.confirm({
            key: 'confirm2',
            message: '¿Estas seguro de cancelar la creacion del usuario?',
            acceptLabel: "Si",
            icon: 'pi pi-times-circle',
            accept: () => {
                this.limpiarCampos();
                this.router.navigate(['usuarios/listado']);
            }
        });
    }

    validarCampos() {
        var valido: boolean = true;
        this.campos.forEach(campo => {
            if (campo.valor == undefined || campo.valor == '') {
                campo.class = 'p-error block';
                valido = false;
            } else {
                campo.class = '';
            }
        });
        if(this.campos[7].valor!=undefined||this.campos[7].valor!=''){
            console.log('log', this.campos[7].valor.contieneCarrera);
            console.log('log', this.carreraSeleccionada);
            if(this.campos[7].valor.contieneCarrera&&this.carreraSeleccionada.valor==undefined){
                valido = false;
                this.carreraSeleccionada.class = 'p-error block';    
            }else{
                this.carreraSeleccionada.class = '';     
            }
        }
        if(this.campos[7].valor!=undefined){
            if(this.campos[7].valor.contieneCarrera&&this.carreraSeleccionada.valor==undefined){
                valido = false;
                this.carreraSeleccionada.class = 'p-error block';    
            }else{
                this.carreraSeleccionada.class = '';     
            }
            if(this.campos[7].valor.contieneRegistro && (this.registro.valor==undefined||this.registro.valor=='')){ 
                valido = false;
                this.registro.class = 'p-error block';    
            }else{
                this.registro.class = '';     
            }
            if(this.campos[7].valor.contieneColegiado && (this.colegiado.valor==undefined||this.colegiado.valor=='')){ 
                valido = false;
                this.colegiado.class = 'p-error block';    
            }else{
                this.colegiado.class = '';     
            }
        }
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
        this.registro = { class: '', mostrar: false, valor: undefined };
        this.colegiado = { class: '', mostrar: false, valor: undefined };
        this.carreraSeleccionada = { class: '', mostrar: false, valor: undefined };
    }

    isNotEmptyField(data:any){
        if(data!=undefined){
            if(data.trim().length !== 0){
                return true;
            }
        }
        return false;    
    }

}
