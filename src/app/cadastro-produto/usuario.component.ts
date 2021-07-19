import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { ProdutosServicos } from '../model/ProdutosServicos';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  produto: ProdutosServicos = new ProdutosServicos
  listaProduto: ProdutosServicos[]
  produtoOuServico: boolean
  idProduto : number
  listaCategoria: Categoria[]
  categoria: Categoria = new Categoria()
  idCategoria: number
  usuario: Usuario = new Usuario()

  //(antes) idUsuario: number
  idUsuario = environment.id
  id = environment.id
  foto = environment.foto
  nome =environment.nome
  
  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private route:ActivatedRoute,
    private categoriaService:CategoriaService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
    if (environment.token == '') {
      // alert('Sua sessão expirou, faça login novamente')
      this.router.navigate(['/entrar'])
    }
    this.idProduto = this.route.snapshot.params['id']
    this.findByIdProdutos(this.idProduto)
    this.findAllProdutos()
    this.findAllCategoria()
    // this.findByIdUsuarios(this.idUsuario)
  }
  //true = produtos e false = serviços
  setRadio(resp: boolean) {
    this.produtoOuServico = resp
    this.produto.escolhaServicosProdutos = this.produtoOuServico
  }

  findAllProdutos() {
    this.produtoService.getAllProdutos().subscribe((resp: ProdutosServicos[]) => {
      this.listaProduto = resp
    })
  }
  
  findByIdCategoria(){
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria)=>{
      this.categoria = resp;
    })
  }
  findAllCategoria() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp;
    });
  }

  findByIdProdutos(id:number){
    this.produtoService.getByIdProduto(id).subscribe((resp:ProdutosServicos)=>{
      this.produto = resp
    })
  }
  // Esta parte não funciona É O FINDBYUSUARIO! PRA PODER USAR O GET ID NO BOTÃO DE EDITAR DADOS PESSOAIS 
  findByIdUsuarios(id:number){
    this.authService.getByIdUsuario(id).subscribe((resp:Usuario)=>{
      this.usuario = resp
    })
  }

  //Mudei de lugar o cadastrar 
  cadastrar() {

    //adicionei
    this.categoria.id = this.idCategoria
    this.produto.categoria = this.categoria
    this.usuario.id = this.idUsuario
    this.produto.usuario = this.usuario
    //

    this.produtoService.postProdutos(this.produto).subscribe((resp: ProdutosServicos) => {
      this.produto = resp
      alert('Produto/Serviço cadastrado com sucesso!')
      this.findAllProdutos()
      this.produto = new ProdutosServicos
    })
  }

  atualizarProdutos(){
    this.produtoService.putProduto(this.produto).subscribe((resp:ProdutosServicos)=>{
      this.produto = resp
      alert('Produto/Serviço atualizado com sucesso!')
      this.router.navigate(['/usuario'])
    })
  }

  deletarProdutos(){
    this.produtoService.deleteProduto(this.idProduto).subscribe(()=>{
      alert('Produto/Serviço apagado com sucesso!')
      this.router.navigate(['/usuario'])
    })
  }

  sair(){
    this.router.navigate(['/quemsomos'])
    environment.token=''
    environment.nome=''
    environment.foto=''
    environment.id=0
  }
}
