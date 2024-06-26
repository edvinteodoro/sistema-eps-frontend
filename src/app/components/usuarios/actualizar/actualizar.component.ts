import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Carrera } from 'src/app/model/Carrera';
import { Rol } from 'src/app/model/Rol';
import { Usuario } from 'src/app/model/Usuario';
import { CarreraService } from 'src/app/services/carrera.service';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Titulo } from 'src/app/model/Titulo';
import { TituloService } from 'src/app/services/titulo.service';
import { Role } from 'src/app/model/Utils';

interface Campo {
    class: string,
    valor: any
}

@Component({
    templateUrl: './actualizar.component.html',
    providers: [ConfirmationService, MessageService]
})

export class ActualizarComponent implements OnInit {
    usuario!: Usuario;
    idUsuario!: string;
    roles!: Rol[];
    carreras!: Carrera[];
    titulos!: Titulo[];
    guardarCambios: boolean = false;
    bloqueado: boolean = true;
    menuItems: MenuItem[] = [];
    optionalFields: string[] = [];

    constructor(private confirmationService: ConfirmationService, private rolService: RolService,
        private carreraService: CarreraService, private messageService: MessageService, private usuarioService: UsuarioService,
        private router: Router, private location: Location, private activatedroute: ActivatedRoute,
        private tituloService: TituloService) {
    }

    ngOnInit() {
        this.getUsuarioData();
        this.getCarreras();
    }

    getUsuarioData() {
        this.idUsuario = (this.location.getState() as { idUsuario: string }).idUsuario;
        if (this.idUsuario == undefined) {
            this.idUsuario = sessionStorage.getItem('idUsuario')!;
        }
        if (this.idUsuario != undefined) {
            sessionStorage.setItem('idUsuario', this.idUsuario);
            this.usuarioService.getUsuario(this.idUsuario).subscribe(usuario => {
                this.usuario = usuario;
                this.getRoles();
                this.getTitulos();
                this.getOpcionesMenu();
            })
        } else {
            this.router.navigate(['usuarios/listado']);
        }
    }

    getCarreras() {
        this.carreraService.getCarreras().subscribe(carreras => this.carreras = carreras);
    }

    getOpcionesMenu() {
        if (this.usuario.activo) {
            this.menuItems = [
                { label: 'Reiniciar contraseña', icon: 'pi pi-fw pi-replay', command: this.activarUsuario.bind(this) },
                { label: 'Desactivar usuario', icon: 'pi pi-fw pi-times', command: this.desactivarUsuario.bind(this) }];
        } else {
            this.menuItems = [
                { label: 'Activar Usuario', icon: 'pi pi-fw pi-check', command: this.activarUsuario.bind(this) }
            ];
        }
    }

    getUsuario() {
        this.usuarioService.getUsuarios(0, 10, { numeroColegiado: this.usuario.numeroColegiado, registroAcademico: this.usuario.registroAcademico }).subscribe(usuarios => {
            this.usuario = usuarios[0];
        });
    }

    getTitulos() {
        this.tituloService.getTitulos().subscribe(titulos => {
            this.titulos = titulos;
            this.usuario.titulo = this.titulos.filter(titulo => titulo.idTitulo == this.usuario.titulo?.idTitulo)[0];
        });
    }

    getRoles() {
        this.rolService.getRoles().subscribe(roles => {
            this.roles = roles;
        });
    }

    editar() {
        this.bloqueado = false;
    }

    cancelarEdicion() {
        window.location.reload();
    }

    desactivarUsuario() {
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Estas seguro de desactivar el usuario?',
            acceptLabel: "Si",
            icon: 'pi pi-check-circle',
            accept: () => {
                this.usuarioService.desactivarUsuario(this.usuario.idUsuario!).subscribe(usuario => {
                    this.messageService.add({ key: 'tst', severity: 'success', summary: 'Usuario Desactivado', detail: 'Se ha desactivado el usuario.' });
                    this.usuario.activo=false;
                    this.getOpcionesMenu();
                }, (error) => {
                    this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: error.error });
                });
            }
        });
    }

    activarUsuario() {
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Estas seguro de activar el usuario?',
            acceptLabel: "Si",
            icon: 'pi pi-check-circle',
            accept: () => {
                this.usuarioService.activarUsuario(this.usuario.idUsuario!).subscribe(() => {
                    this.messageService.add({ key: 'tst', severity: 'success', summary: 'Listo!', detail: 'Se ha enviado un correo al usuario para activar su cuenta.' });
                });
            }
        });
    }

    isFieldInvalid(field: any): boolean {
        if (field == undefined && this.guardarCambios) {
            return true;
        } else if (typeof field === 'string') {
            return this.guardarCambios && field.trim() === '';
        }
        return false;
    }

    showTitulos(): boolean {
        if (this.usuario.rol != undefined && this.usuario.rol.idRol != 1) {

            return this.usuario.rol.contieneCarrera;
        }
        return false;
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

    goBack(): void {
        this.location.back();
    }

    onChangeRol(event: any) {
        this.optionalFields = [];
        this.usuario.carreras = undefined;
        this.usuario.registroAcademico = undefined;
        this.usuario.numeroColegiado = undefined;
        this.usuario.titulo = undefined;
        if (!event.value.contieneCarrera) {
            this.optionalFields.push('carreras');
        }
        if (!event.value.contieneColegiado) {
            this.optionalFields.push('numeroColegiado');
        }
        if (!event.value.contieneRegistro) {
            this.optionalFields.push('registroAcademico');
        }
        if (!event.value.contieneTitulo) {
            this.optionalFields.push('titulo');
        }
    }

    guardarUsuario() {
        if (!this.validarCampos(this.usuario, this.optionalFields)) {
            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Campos invalidos', detail: 'Ingrese informacion en los campos obligatorias' });
        } else {
            if (!this.usuario.titulo) {
                this.usuario.titulo = this.titulos[0];
            }
            this.confirmationService.confirm({
                key: 'confirm1',
                message: '¿Estas seguro de actualizar datos del usuario?',
                acceptLabel: "Si",
                icon: 'pi pi-check-circle',
                accept: () => {
                    console.log('usuario', this.usuario);
                    this.usuarioService.actualizarUsuario(this.usuario.idUsuario!, this.usuario).subscribe((res: any) => {
                        this.messageService.add({ key: 'tst', severity: 'success', summary: 'Usuario Actualizado', detail: 'Se han actualizado los datos del usuarios exitosamente.' });
                        this.bloqueado = true;
                    }, (error) => {
                        if (error.status == 401) {
                            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: error.error });
                        } else {
                            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: error.error });
                        }
                    });
                }
            });
        }

    }

    validarCampos(obj: any, excludeFields: string[]): boolean {
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && !excludeFields.includes(key)) {
                const value = obj[key];
                if (value === undefined || (typeof value === 'string' && value.trim() === '')) {
                    console.log('campo', key);
                    return false;
                }
            }
        }
        return true;
    }

}
