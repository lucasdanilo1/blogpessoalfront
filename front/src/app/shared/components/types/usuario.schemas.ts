export interface Usuario {
    id?: number;
    nome?: string;
    usuario?: string;
    senha?: string;
    foto?: string;
    token?: string;
}

export interface UsuarioLogin {
    usuario: string;
    senha: string;
} 