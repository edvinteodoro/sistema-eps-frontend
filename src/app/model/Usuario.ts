import { Carrera } from "./Carrera";
import { Rol } from "./Rol";
import { Titulo } from "./Titulo";

export interface Usuario{
    idUsuario?:String;
    nombreCompleto?:String;
    correo?:String;
    //direccion?:String;
    dpi?:String;
    telefono?:String;
    activo?:Boolean;
    rol?:Rol;
    carreras?:Carrera[];
    titulo?:Titulo;
    registroAcademico?:String;
    numeroColegiado?:String;
}