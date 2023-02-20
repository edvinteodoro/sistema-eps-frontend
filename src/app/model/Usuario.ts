import { Rol } from "./Rol";

export interface Usuario{
    idUsuario?:String;
    nombres?:String;
    apellidos?:String;
    correo?:String;
    fechaNacimiento?:Date;
    dirreccion?:String;
    dpi?:String;
    telefono?:String;
    estado?:String;
    rol?:Rol;
}