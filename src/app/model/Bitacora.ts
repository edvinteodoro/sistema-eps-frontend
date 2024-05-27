import { Carrera } from "./Carrera";
import { Recurso } from "./Recurso";
import { Usuario } from "./Usuario";

export interface Bitacora {
    idBitacora?: Number;
    descripcion: String;
    avance: Number;
    numeroFolio:number;
    idProyecto?:number;
    carrera?:Carrera;
    fechaReporteInicio: Date;
    fechaReporteInicioFormat?:Date;
    fechaReporteFin: Date;
    fechaReporteFinFormat?:Date;
    usuario?:Usuario;
    fecha?: Date;
    recursos?:Recurso[];
    revisionAsesor?:boolean;
    revisionSupervisor?:boolean;
    revisionContraparte?:boolean;
    contieneInforme?:boolean;
}