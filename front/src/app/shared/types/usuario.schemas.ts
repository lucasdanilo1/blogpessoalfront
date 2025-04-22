export interface Usuario {
    id?: number;
    nome: string;
    foto?: string;
    bio?: string;
}

export interface CadastroUsuario {
    id?: number;
    nome?: string;
    usuario?: string;
    senha?: string;
    foto?: string;
    bio?: string;
    token?: string;
}

export interface UsuarioLogin {
    usuario: string;
    senha: string;
} 