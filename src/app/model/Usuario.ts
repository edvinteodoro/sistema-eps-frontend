import { Carrera } from "./Carrera";
import { Rol } from "./Rol";

export interface Usuario{
    idUsuario?:String;
    nombres?:String;
    apellidos?:String;
    correo?:String;
    fechaNacimiento?:Date;
    direccion?:String;
    dpi?:String;
    telefono?:String;
    estadoCuenta?:String;
    rol?:Rol;
    carreras?:Carrera[];
    registroAcademico?:String;
    numeroColegiado?:String;
}