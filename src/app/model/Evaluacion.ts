import { Titulo } from "./Titulo";

export interface Evaluacion {
    fecha?:Date;
    dia?:String;
    hora?:String;
    representante?:String;
    tituloRepresentante?:Titulo,
    nota?:String;
    salon?:string;
    resultado?:String;
    comentario?:String;
}