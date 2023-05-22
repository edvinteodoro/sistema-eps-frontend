import { Component, OnInit } from '@angular/core';
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
    templateUrl: './crearUsuario.component.html',
    providers: [ConfirmationService, MessageService]
})

export class CrearUsuarioComponent implements OnInit {
    roles!: Rol[];
    carreras!: Carrera[];
    rolSeleccionado!: Rol;
    carrerasSeleccionadas!: Carrera[]
    crearUsuario: boolean = false;
    usuario: Usuario = {
        nombres: '',
        apellidos: '',
        correo: '',
        fechaNacimiento: undefined,
        direccion: '',
        dpi: '',
        telefono: '',
        rol: undefined,
        carreras: undefined,
        registroAcademico: '',
        numeroColegiado: ''

    };

    constructor(private confirmationService: ConfirmationService, private rolService: RolService,
        private carreraService: CarreraService, private messageService: MessageService, private usuarioService: UsuarioService) {
    }

    ngOnInit() {

        this.rolService.getRoles().subscribe(roles => this.roles = roles);
        this.carreraService.getCarreras().subscribe(carreras => this.carreras = carreras);
    }


    isFieldInvalid(field: any): boolean {
        if (field == undefined && this.crearUsuario) {
            return true;
        } else if (typeof field === 'string') {
            return this.crearUsuario && field.trim() === '';
        }
        return false;
    }

    confirm() {
        this.crearUsuario = !this.crearUsuario;
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Estas seguro de crear el usuario?',
            acceptLabel: "Si",
            icon: 'pi pi-check-circle',
            accept: () => {
                console.log('rol: ',this.rolSeleccionado,' - ',this.usuario.rol);
                console.log('nombres: ',this.usuario.nombres)
                this.usuarioService.crearUsuario(this.usuario).subscribe((res: any) => {
                }, (error) => {
                    if (error.status == 401) {
                        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Sin permisos para crear el usuario' });
                    } else {
                        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Hubo un error en el sistema' });
                    }
                });
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
                //this.limpiarCampos();
            }
        });
    }

    showCarreras(): boolean {
        if (this.usuario.rol != undefined) {
            return this.usuario.rol.contieneCarrera;
        }
        return false;
    }
    showRegistro(): boolean {
        if (this.usuario.rol != undefined) {
            return this.usuario.rol.contieneRegistro;
        }
        return false;
    }

    showColegiado(): boolean {
        if (this.usuario.rol != undefined) {
            return this.usuario.rol.contieneColegiado;
        }
        return false;
    }
}
