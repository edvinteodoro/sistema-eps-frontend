import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Carrera } from 'src/app/model/Carrera';
import { Departamento } from 'src/app/model/Departamento';
import { Elemento } from 'src/app/model/Elemento';
import { ElementoProyecto } from 'src/app/model/ElementoProyecto';
import { Institucion } from 'src/app/model/Institucion';
import { Municipio } from 'src/app/model/Municipio';
import { Proyecto } from 'src/app/model/Proyecto';
import { Titulo } from 'src/app/model/Titulo';
import { Usuario } from 'src/app/model/Usuario';
import { ElementoUtils, EtapaUtils } from 'src/app/model/Utils';
import { CarreraService } from 'src/app/services/carrera.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { ElementoService } from 'src/app/services/elemento.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TituloService } from 'src/app/services/titulo.service';
import { UsuarioService } from 'src/app/services/usuario.service';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

interface Campo {
    class: string,
    valor: any
}

@Component({
    templateUrl: './crearProyecto.component.html',
    providers: [ConfirmationService, MessageService]
})

export class CrearProyectoComponent implements OnInit {
    EtapaUtils=EtapaUtils;

    //elementos de proyecto
    elementoTitulo: ElementoProyecto = {};
    elementoAnteproyecto: ElementoProyecto = {};
    elementoSolicitud:ElementoProyecto={};
    elementoInscripcion: ElementoProyecto = {};
    elementoPropedeutico: ElementoProyecto = {};
    elementoConstanciaCierre:ElementoProyecto={};
    elementoOtros:ElementoProyecto={};
    elementoNacimiento: ElementoProyecto = {};
    elementoCarta: ElementoProyecto = {};
    elementoFiniquito: ElementoProyecto = {};

    crearProyecto: boolean = false;
    titulos!: Titulo[];
    items: any = [
        { label: 'Institucion' },
        { label: 'Asesor' },
        { label: 'Proyecto' }
    ];
    tiposProyecto: any = ['Aplicada','En docencia','En Investigacion'];
    semestres: any = ['Primer Semestre','Segundo Semestre'];

    activeIndex: number = 0;
    carreras!: Carrera[];
    proyecto: Proyecto = {
        institucion:undefined,
        contraparte:undefined,
        carrera: undefined!,
        semestre: undefined!,
        asesor: undefined
    }
    tituloProyecto: String = '';

    institucion: Institucion = {
        nombre: '',
        coordenadaProyecto: '',
        direccion: '',
        municipio: undefined,
    }
    contraparte: Usuario = {
        nombreCompleto: "",
        correo: "",
        dpi: "",
        telefono: "",
        titulo: undefined,
    }

    asesor: Usuario = {
        nombreCompleto: "",
        correo: "",
        //direccion: "",
        dpi: "",
        telefono: "",
        numeroColegiado: ""
    };
    loading: boolean = false;

    asesoresTecnicos: Usuario[] = [];
    elementos!: Elemento[];
    elementosProyecto: ElementoProyecto[] = [];

    departamentos!: Departamento[];
    departamentoSeleccionado!: Departamento;
    departamentoProyectoSeleccionado!:Departamento;
    departamentoFiltrado!: Departamento[];


    municipios!: Municipio[];
    municipiosProyecto!: Municipio[];
    municipioSeleccionado!: Municipio;
    municipioProyectoSeleccionado!: Municipio;
    municipioFiltrado!: Municipio[];

    constructor(private confirmationService: ConfirmationService,
        private messageService: MessageService, private carreraService: CarreraService,
        private usuarioService: UsuarioService, private proyectoService: ProyectoService,
        private router: Router, private departamentoService: DepartamentoService,
        private elementoService: ElementoService, private tituloService: TituloService) { }

    ngOnInit() {
        this.tituloService.getTitulos().subscribe(titulos => this.titulos = titulos);
        this.usuarioService.getUsuarioCarreras().subscribe(carreras => this.carreras = carreras);
        this.departamentoService.getDepartamentos().subscribe(departamentos => this.departamentos = departamentos);
        this.elementoService.getElementos(EtapaUtils.ID_ETAPA_CREACION_PROYECTO).subscribe(elementos => {
            this.elementos = elementos;
            this.elementos.forEach(elemento => {
                this.elementosProyecto.push({ elemento: elemento });
            })
        })
    }

    confirm() {
        if (this.elementoTitulo.informacion != undefined &&
            this.elementoAnteproyecto.file != undefined &&
            this.elementoInscripcion.file != undefined &&
            this.elementoPropedeutico.file != undefined &&
            this.elementoNacimiento.file != undefined &&
            this.elementoCarta.file != undefined &&
            this.elementoSolicitud.file != undefined && 
            this.elementoConstanciaCierre.file != undefined) {
            this.confirmationService.confirm({
                key: 'confirm1',
                message: '¿Estas seguro de crear el proyecto?',
                acceptLabel: "Si",
                icon: 'pi pi-check-circle',
                accept: () => {
                    this.loading = true;
                    this.crearProyecto = false;
                    this.proyectoService.crearProyecto(this.proyecto).subscribe(proyecto => {
                        this.asesoresTecnicos.forEach(asesorTecnico => {
                            this.proyectoService.agregarAsesorTecnicos(proyecto.idProyecto!, asesorTecnico).subscribe();
                        });
                        this.proyectoService.agregarElementoProyecto(proyecto.idProyecto!, ElementoUtils.ID_ELEMENTO_TITULO, this.elementoTitulo).subscribe();
                        this.proyectoService.agregarElementoProyecto(proyecto.idProyecto!, ElementoUtils.ID_ELEMENTO_ANTEPROYECTO, this.elementoAnteproyecto).subscribe();
                        this.proyectoService.agregarElementoProyecto(proyecto.idProyecto!, ElementoUtils.ID_ELEMENTO_INSCRIPCION, this.elementoInscripcion).subscribe();
                        this.proyectoService.agregarElementoProyecto(proyecto.idProyecto!, ElementoUtils.ID_ELEMENTO_PROPEDEUTICO, this.elementoPropedeutico).subscribe();
                        this.proyectoService.agregarElementoProyecto(proyecto.idProyecto!, ElementoUtils.ID_ELEMENTO_NACIMIENTO, this.elementoNacimiento).subscribe();
                        this.proyectoService.agregarElementoProyecto(proyecto.idProyecto!, ElementoUtils.ID_ELEMENTO_CARTA, this.elementoCarta).subscribe();
                        this.proyectoService.agregarElementoProyecto(proyecto.idProyecto!, ElementoUtils.ID_ELEMENTO_SOLICITUD_ESTUDIANTE, this.elementoSolicitud).subscribe();
                        this.proyectoService.agregarElementoProyecto(proyecto.idProyecto!, ElementoUtils.ID_ELEMENTO_CONSTANCIA_CIERRE, this.elementoConstanciaCierre).subscribe();
                        if (this.elementoFiniquito.file != undefined) {
                            this.proyectoService.agregarElementoProyecto(proyecto.idProyecto!, ElementoUtils.ID_ELEMENTO_FINIQUITO, this.elementoFiniquito).subscribe();
                        }
                        if(this.elementoOtros.file!=undefined){
                            this.proyectoService.agregarElementoProyecto(proyecto.idProyecto!, ElementoUtils.ID_ELEMENTO_OTROS, this.elementoOtros).subscribe();     
                        }
                        this.messageService.add({ key: 'tst', severity: 'success', summary: 'Proyecto Creado', detail: 'Se ha creado el proyecto exitosamente' });
                        setTimeout(() => {
                            this.router.navigate(['gestiones/proyecto'], { state: { data: proyecto.idProyecto } });
                        }, 2000);

                    }, (error) => {
                        this.loading = false;
                        if (error.status == 401) {
                            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Sin permisos para crear el proyecto' });
                        } else {
                            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Hubo un error en el sistema' });
                        }
                    })

                }
            });

        } else {
            this.crearProyecto = true;
            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Ingrese los campos obligatorios' });
        }
    }
    cancelar() {
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Estas seguro de cancelar la creacion del proyecto?',
            acceptLabel: "Si",
            icon: 'pi pi-times-circle',
            accept: () => {
                this.router.navigate(['/gestiones/listado']);
            }
        });
    }

    isFieldInvalid(field: any): boolean {
        if (field == undefined && this.crearProyecto) {
            return true;
        } else if (typeof field === 'string') {
            return this.crearProyecto && field.trim() === '';
        }
        return false;
    }

    onUploadAnteproyecto(event: any) {
        this.elementoAnteproyecto.file = event.currentFiles[0];
    }
    onRemoveAnteproyecto() {
        this.elementoAnteproyecto.file = undefined;
    }
    onUploadSolicitud(event: any) {
        this.elementoSolicitud.file = event.currentFiles[0];
    }
    onRemoveSolicitud() {
        this.elementoSolicitud.file = undefined;
    }
    onUploadInscripcion(event: any) {
        this.elementoInscripcion.file = event.currentFiles[0];
    }
    onRemoveInscripcion() {
        this.elementoInscripcion.file = undefined;
    }
    onUploadPropedeutico(event: any) {
        this.elementoPropedeutico.file = event.currentFiles[0];
    }
    onRemovePropedeutico() {
        this.elementoPropedeutico.file = undefined;
    }

    onUploadConstanciaCierre(event: any) {
        this.elementoConstanciaCierre.file = event.currentFiles[0];
    }
    onRemoveConstanciaCierre() {
        this.elementoConstanciaCierre.file = undefined;
    }
    onUploadOtros(event: any) {
        this.elementoOtros.file = event.currentFiles[0];
    }
    onRemoveOtros() {
        this.elementoOtros.file = undefined;
    }
    onUploadNacimiento(event: any) {
        this.elementoNacimiento.file = event.currentFiles[0];
    }
    onRemoveNacimiento() {
        this.elementoNacimiento.file = undefined;
    }
    onUploadCartaAsesor(event: any) {
        this.elementoCarta.file = event.currentFiles[0];
    }
    onRemoveCartaAsesor() {
        this.elementoCarta.file = undefined;
    }
    onUploadFiniquito(event: any) {
        this.elementoFiniquito.file = event.currentFiles[0];
    }
    onRemoveFiniquito() {
        this.elementoFiniquito.file = undefined;
    }

    validarCampos(obj: any, excludeFields: string[]): boolean {
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && !excludeFields.includes(key)) {
                const value = obj[key];
                if (value === undefined || (typeof value === 'string' && value.trim() === '')) {
                    return false;
                }
            }
        }
        return true;
    }

    siguiente() {
        if (this.validarCampos(this.institucion, ['direccionProyecto','municipioProyecto','coordenadaProyecto']) && this.validarCampos(this.contraparte, [])) {
            this.proyecto.institucion = this.institucion;
            this.proyecto.contraparte = this.contraparte;
            this.crearProyecto = false;
            this.activeIndex++;
        } else {
            this.crearProyecto = true;
            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Ingrese los campos obligatorios' });
        }
    }

    siguienteAsesor() {
        var next: Boolean = true;
        if (!this.validarCampos(this.asesor, ['registroAcademico'])) {
            next = false;
        }
        for(let asesor of this.asesoresTecnicos){
            if (!this.validarCampos(asesor, ['registroAcademico'])) {
                next = false;
            }    
        }
        if (next) {
            this.crearProyecto = false;
            this.activeIndex++;
            this.asesor!.titulo=this.titulos[0];
            this.proyecto.asesor = this.asesor;
        }else{
            this.crearProyecto = true;
            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Ingrese los campos obligatorios' });
        }
    }

    regresar(): void {
        this.activeIndex--;
    }

    filtrarDepartamento(event: AutoCompleteCompleteEvent) {
        let filtered: Departamento[] = [];
        let query = event.query;

        for (let i = 0; i < (this.departamentos as Departamento[]).length; i++) {
            let departamento = (this.departamentos as Departamento[])[i];
            if (departamento.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(departamento);
            }
        }
        this.departamentoFiltrado = filtered;
    }

    filtrarMunicipio(event: AutoCompleteCompleteEvent) {
        let filtered: Municipio[] = [];
        let query = event.query;

        for (let i = 0; i < (this.municipios as Municipio[]).length; i++) {
            let municipio = (this.municipios as Municipio[])[i];
            if (municipio.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(municipio);
            }
        }
        this.municipioFiltrado = filtered;
    }

    filtrarMunicipioProyecto(event: AutoCompleteCompleteEvent) {
        let filtered: Municipio[] = [];
        let query = event.query;

        for (let i = 0; i < (this.municipiosProyecto as Municipio[]).length; i++) {
            let municipio = (this.municipiosProyecto as Municipio[])[i];
            if (municipio.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(municipio);
            }
        }
        this.municipioFiltrado = filtered;
    }

    AgregarAsesorTecnico() {
        const nuevoAsesor: Usuario = {
            nombreCompleto: "",
            correo: "",
            dpi: "",
            telefono: "",
            numeroColegiado: "",
            //titulo: undefined,
        };
        this.asesoresTecnicos.push(nuevoAsesor);
    }

    removerAsesorTecnico() {
        this.asesoresTecnicos.pop();
    }

    getMunicipios() {
        this.departamentoService.getMunicipios(this.departamentoSeleccionado.idDepartamento).subscribe(municipios => this.municipios = municipios);
    }

    getMunicipiosProyecto() {
        this.departamentoService.getMunicipios(this.departamentoProyectoSeleccionado.idDepartamento).subscribe(municipios => this.municipiosProyecto = municipios);
    }

    seleccionarMunicipio() {
        this.institucion.municipio = this.municipioSeleccionado;
    }

    seleccionarMunicipioProyecto() {
        this.institucion.municipioProyecto = this.municipioProyectoSeleccionado;
    }
}
