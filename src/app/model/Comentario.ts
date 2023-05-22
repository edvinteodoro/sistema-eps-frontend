import { Usuario } from "./Usuario";

export interface Etapa{
    id:String;
    nombre:String;
    icono:String;
    activo:boolean;
    editable:boolean;
    comentarios:Comentario[];    
}

export interface Comentario{
    id:String;
    usuario:Usuario;
    texto:String;
    fecha:String;    
}