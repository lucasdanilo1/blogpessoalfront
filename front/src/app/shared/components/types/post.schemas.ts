export interface Post {
    id?: number;
    titulo: string;
    texto: string;
    data: Date;
    usuario: {id: number, nome: string}
    tema: {descricao: string};
} 

export interface FiltrosPostagemDTO {
    titulo?: string;
    data?: string;
    usuarioId?: number;
    usuarioNome?: string;
    temaId?: number;
  }