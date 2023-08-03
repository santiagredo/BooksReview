import type { WithId, Document } from "mongodb";
export interface AuthDocument extends WithId<Document> {
    nombre: string;
    correo: string;
    contrasena: string;
    resena?: string[];
}
