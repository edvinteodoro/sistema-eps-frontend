import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Carrera } from 'src/app/model/Carrera';
import { Rol } from 'src/app/model/Rol';
import { Titulo } from 'src/app/model/Titulo';
import { Usuario } from 'src/app/model/Usuario';
import { CarreraService } from 'src/app/services/carrera.service';
import { RolService } from 'src/app/services/rol.service';
import { TituloService } from 'src/app/services/titulo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PersonaService } from 'src/app/services/persona.service';
import { Role } from 'src/app/model/Utils';

interface Campo {
    class: string,
    valor: any
}

@Component({
    templateUrl: './crearUsuario.component.html',
    providers: [ConfirmationService, MessageService]
})

export class CrearUsuarioComponent implements OnInit {
    idPersona?: string;
    tipo?: number;
    roles!: Rol[];
    titulos!: Titulo[];
    carreras!: Carrera[];
    crearUsuario: boolean = false;
    usuario: Usuario = {
        nombreCompleto: '',
        correo: '',
        direccion: '',
        dpi: '',
        telefono: '',
        rol: undefined
    };

    constructor(private confirmationService: ConfirmationService, private rolService: RolService,
        private carreraService: CarreraService, private messageService: MessageService,
        private usuarioService: UsuarioService, private router: Router,
        private tituloService: TituloService, private location: Location,
        private personaService: PersonaService) {
    }

    ngOnInit() {
        this.getPersonaData();
        this.tituloService.getTitulos().subscribe(titulos => this.titulos = titulos);
        this.rolService.getRoles().subscribe(roles => this.roles = roles);
        this.carreraService.getCarreras().subscribe(carreras => this.carreras = carreras);
    }

    getPersonaData() {
        this.idPersona = (this.location.getState() as { idPersona: string }).idPersona;
        this.tipo = (this.location.getState() as { tipo: number }).tipo;
        if (this.idPersona != undefined) {
            this.personaService.getPersona(this.idPersona).subscribe(persona => {
                this.usuario = persona;
                console.log('persona',this.usuario);
                this.getPersonaRol();
            })
        }
    }

    getPersonaRol() {
        if (this.tipo == 1) {
            this.rolService.getRol(Role.ID_ASESOR).subscribe(rol => {
                this.usuario.rol = rol;
                console.log('asesor: ', this.usuario);
            })
        } else if (this.tipo == 2) {
            this.rolService.getRol(Role.ID_CONTRAPARTE).subscribe(rol => {
                this.usuario.rol = rol;
            })
        }
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
        this.crearUsuario = true;
        console.log('usuario: ',this.usuario);
        if (!this.validarCampos(this.usuario, [])) {
            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Campos invalidos', detail: 'Ingrese informacion en los campos obligatorias' });
        } else {
            if (!this.usuario.titulo) {
                this.usuario.titulo = this.titulos[0];
            }
            this.confirmationService.confirm({
                key: 'confirm1',
                message: '¿Estas seguro de crear el usuario?',
                acceptLabel: "Si",
                icon: 'pi pi-check-circle',
                accept: () => {
                    this.usuarioService.crearUsuario(this.usuario).subscribe((res: any) => {
                        this.messageService.add({ key: 'tst', severity: 'success', summary: 'Usuario Creado', detail: 'Se ha creado el usuario exitosamente' });
                        setTimeout(() => {
                            if (this.idPersona != undefined) {
                                this.location.back();
                            }
                            this.router.navigate(['/usuarios/listado']);
                        }, 2000);
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

    validarCampos(obj: any, excludeFields: string[]): boolean {
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && !excludeFields.includes(key)) {
                const value = obj[key];
                if (value === undefined || (typeof value === 'string' && value.trim() === '')) {
                    console.log('campo',key);
                    return false;
                }
            }
        }
        return true;
    }
}
