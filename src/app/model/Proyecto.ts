import { Carrera } from "./Carrera";
import { Etapa } from "./Comentario";
import { ElementoProyecto } from "./ElementoProyecto";
import { Institucion } from "./Institucion";
import { Persona } from "./Persona";
import { Requisito } from "./Requisito";
import { Usuario } from "./Usuario";

export interface Proyecto {
    idProyecto?: number;
    activo?:boolean;
    etapaActiva?:Etapa;
    elementos?:any[];
    carrera: Carrera;
    semestre: String;
    usuario?:Usuario;
    asesor?:Usuario;
    contraparte?:Usuario;
    institucion?:Institucion;
    elementoTitulo?:ElementoProyecto;
    requiereAtencion?:boolean;
}