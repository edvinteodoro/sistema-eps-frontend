import { Titulo } from "./Titulo";

export interface Convocatoria {
    fechaEvaluacion?:Date;
    fechaEvaluacionFormat?:Date;
    horaEvaluacion:String;
    salon:string;
    representante?:String;
    tituloRepresentante?:Titulo,
    comentario?:String;
}