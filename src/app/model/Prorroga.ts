import { Proyecto } from "./Proyecto";

export interface Prorroga{
    idProrroga?:number;
    diasExtension:number;
    proyecto?:Proyecto;
    fechaSolicitud?:string;
    linkSolicitud?:string;
    linkAmparo?:string;
    comentarioSupervisor?:string;
    aprobado?:Boolean;
}