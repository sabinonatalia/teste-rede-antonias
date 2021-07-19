import { ProdutosServicos } from "./ProdutosServicos"

export class Usuario{
    public id : number
    public nome : string
    public foto : string
    public email : string
    public senha : string
    public vendedor : string
    public dataAniversario : Date
    public produtosServicos : ProdutosServicos []
}