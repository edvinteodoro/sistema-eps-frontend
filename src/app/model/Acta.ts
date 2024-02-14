import { Proyecto } from "./Proyecto";

export interface Acta {
    idActa?:number;
    nota:number;
    proyecto?:Proyecto;
    actaGenerada?:boolean;
    resultado:String;
    fechaEvaluacion?:Date;
    horaInicioEvaluacion?:String;
    horaFinEvaluacion:String;
    salon?:String;
    comentario?:String;    
}