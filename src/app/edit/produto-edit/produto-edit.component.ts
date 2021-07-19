import { AuthService } from './../../service/auth.service';
import { Usuario } from './../../model/Usuario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { ProdutosServicos } from 'src/app/model/ProdutosServicos';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  templateUrl: './produto-edit.component.html',
  styleUrls: ['./produto-edit.component.css']
})
export class ProdutoEditComponent implements OnInit {

  //Adicionei o () em produto e categoria
  produto: ProdutosServicos = new ProdutosServicos()
  listaProduto: ProdutosServicos[]
  produtoOuServico: boolean
  idProduto: number

  //Adicionei usuário e o IdUsuário
  usuario : Usuario = new Usuario()
  idUsuario = environment.id

  categoria: Categoria = new Categoria() 
  idCategoria: number
  listaCategoria: Categoria[]


  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private authService : AuthService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
    if (environment.token == '') {
      alert('Sua sessão expirou, faça login novamente')
      this.router.navigate(['/entrar'])
    }
    let id = this.route.snapshot.params['id']
    this.findByIdProdutos(id)
    //adicionei o this.findAllCategoria()
    this.findAllCategoria()
  
  }

  findByIdProdutos(id: number) { 
    this.produtoService.getByIdProduto(id).subscribe((resp: ProdutosServicos) => {
      this.produto = resp
    })
  }
  
  findByIdCategoria(){
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria)=> {this.categoria=resp})
  }

  findAllCategoria(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {this.listaCategoria=resp})
  }

  //Adicionei
  findByIdUsuarios(){
    this.authService.getByIdUsuario(this.idUsuario).subscribe((resp : Usuario) =>{
      this.usuario = resp
    })
  }
  //

  atualizarProdutos() {
    this.categoria.id = this.idCategoria;
    this.produto.categoria = this.categoria;

    //Adicionei
    this.usuario.id = this.idUsuario
    this.produto.usuario = this.usuario
    //

    this.produtoService.putProduto(this.produto).subscribe((resp: ProdutosServicos) => {
      this.produto = resp
      alert('Produto/Serviço atualizado com sucesso!')
      this.router.navigate(['/usuario'])
    })
  }

  deletarProdutos() {
    this.produtoService.deleteProduto(this.idProduto).subscribe(() => {
      alert('Produto/Serviço apagado com sucesso!')
      this.router.navigate(['/usuario'])
    })
  }
}