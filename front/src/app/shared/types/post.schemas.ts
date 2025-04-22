export interface Post {
    id?: number;
    titulo: string;
    texto: string;
    data: Date;
    usuario: {id: number, nome: string, foto?: string}
    tema: {descricao: string};
} 

export interface FiltrosPostagemDTO {
    usuarioId?: number;
    termo?: string;
    dataInicio?: Date;
    dataFim?: Date;
    temaId?: number;
  }