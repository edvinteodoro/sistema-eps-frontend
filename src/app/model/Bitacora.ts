import { Carrera } from "./Carrera";
import { Recurso } from "./Recurso";
import { Usuario } from "./Usuario";

export interface Bitacora {
    idBitacora?: Number;
    descripcion: String;
    avance: Number;
    idProyecto?:number;
    carrera?:Carrera;
    fechaReporte: Date;
    fechaReporteFormat?:Date;
    usuario?:Usuario;
    fecha?: Date;
    recursos?:Recurso[];
    revisionAsesor?:boolean;
    revisionSupervisor?:boolean;
    revisionContraparte?:boolean;
    contieneInforme?:boolean;
}