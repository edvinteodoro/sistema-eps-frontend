import { Proyecto } from "./Proyecto";

export interface Acta {
    idActa?:number;
    nota:number;
    proyecto?:Proyecto;
    actaGenerada?:boolean;
    tipo?:String;
    resultado:String;
    fechaEvaluacion?:Date;
    fechaEvaluacionInput?:Date;
    horaInicioEvaluacion?:String;
    horaFinEvaluacion:String;
    salon?:String;
    comentario?:String;    
}