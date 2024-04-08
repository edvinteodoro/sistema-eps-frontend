import { Rol } from "./Rol";
import { Usuario } from "./Usuario";

export interface Etapa {
    idEtapa: number;
    nombre: string;
    rol:Rol;
    descripcion:string;
    //icono:String;
    //activo:boolean;
    //editable:boolean;
    //comentarios:Comentario[];    
}

export interface EtapaProyecto {
    idEtapaProyecto: number;
    editable: boolean;
    activo: boolean;
    etapa: Etapa;
}

export interface Comentario {
    id?: String;
    usuario?: Usuario;
    rol?: Rol;
    comentario: String;
    fecha?: String;
}