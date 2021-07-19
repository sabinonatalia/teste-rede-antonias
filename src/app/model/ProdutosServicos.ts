import { Categoria } from "./Categoria"
import { Usuario } from "./Usuario"


export class ProdutosServicos{
    public id : number
    public nomeProdutosServicos : string
    public preco : number
    public estoqueVendedor : number
    public descricao : string
    public midias : string
    public curtir : number
    public dislike : number
    public escolhaServicosProdutos: boolean
    public categoria : Categoria
    public usuario : Usuario
}