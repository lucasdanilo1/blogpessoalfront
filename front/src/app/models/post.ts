export interface Post {
    id?: number;
    titulo: string;
    texto: string;
    tema: {descricao: string};
    usuario: {id: number, nome: string}
    data: Date;
} 